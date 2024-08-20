import prisma from '@/lib/prisma-client';

const resolvers = {
  Query: {
    users: async () => {
      return await prisma.user.findMany();
    },
    user: async (_, { id }) => {
      return await prisma.user.findUnique({
        where: { id },
      });
    },
    myEvents: async (_, __, context) => {
      const { userId } = context;
      if (!userId) {
        throw new Error('Unauthorized');
      }
      return await prisma.event.findMany({
        where: { creatorId: userId },
      });
    },
    othersEvents: async (_, __, context) => {
      const { userId } = context;
      if (!userId) {
        throw new Error('Unauthorized');
      }

      const events = await prisma.event.findMany({
        where: { creatorId: { not: userId } },
        include: {
          applications: {
            where: { userId },
            select: {
              id: true,
              status: true,
            },
          },
        },
      });

      return events;
    },
    eventApplications: async (_, { eventId }, context) => {
      const { userId } = context;
      if (!userId) {
        throw new Error('Unauthorized');
      }

      const event = await prisma.event.findUnique({
        where: { id: eventId },
        include: {
          applications: {
            include: {
              user: true,
            },
          },
        },
      });

      if (!event || event.creatorId !== userId) {
        throw new Error('You do not have permission to view applications for this event.');
      }

      return event.applications;
    },
  },
  Mutation: {
    createEvent: async (_, { name, description, location, date, capacity, fee }, context) => {
      const { userId } = context;

      if (!userId) {
        throw new Error('Unauthorized');
      }

      return await prisma.event.create({
        data: {
          name,
          description,
          location,
          date: new Date(date),
          capacity: parseInt(capacity, 10),
          fee: parseFloat(fee),
          creatorId: userId,
        },
      });
    },
    deleteEvent: async (_, { id }, context) => {
      const { userId } = context;

      if (!userId) {
        throw new Error('Unauthorized');
      }

      const event = await prisma.event.findUnique({
        where: { id },
      });

      if (!event || event.creatorId !== userId) {
        throw new Error('You do not have permission to delete this event.');
      }

      await prisma.event.delete({
        where: { id },
      });

      return true;
    },
    applyToEvent: async (_, { id }, context) => {
      const { userId } = context;

      if (!userId) {
        throw new Error('Unauthorized');
      }

      const event = await prisma.event.findUnique({
        where: { id },
      });

      if (!event) {
        throw new Error('Event not found');
      }

      const existingApplication = await prisma.application.findFirst({
        where: {
          AND: [
            { userId: userId },
            { eventId: id }
          ]
        },
      });

      if (existingApplication) {
        if (existingApplication.status === 'REJECTED') {
          // If the application was rejected, allow the user to reapply by updating the status
          await prisma.application.update({
            where: {
              id: existingApplication.id,
            },
            data: {
              status: 'PENDING',  // Reset the status to pending
            },
          });
        } else {
          throw new Error('You have already applied to this event');
        }
      } else {
        // Create a new application if it doesn't exist
        await prisma.application.create({
          data: {
            userId: userId,
            eventId: id,
            status: 'PENDING',
          },
        });
      }

      return true;
    },
    cancelApplication: async (_, { id }, context) => {
      const { userId } = context;

      if (!userId) {
        throw new Error('Unauthorized');
      }

      const application = await prisma.application.findUnique({
        where: { id },
      });

      if (!application || application.userId !== userId) {
        throw new Error('You do not have permission to cancel this application.');
      }

      await prisma.application.delete({
        where: { id },
      });

      return true;
    },
    updateApplicationStatus: async (_, { id, status }, context) => {
      const { userId } = context;
      if (!userId) {
        throw new Error('Unauthorized');
      }

      // Find the application and check if the event belongs to the current user
      const application = await prisma.application.findUnique({
        where: { id },
        include: {
          event: true,
        },
      });

      if (!application) {
        throw new Error('Application not found');
      }

      if (application.event.creatorId !== userId) {
        throw new Error('You do not have permission to update this application.');
      }

      // Update the status of the application
      const updatedApplication = await prisma.application.update({
        where: { id },
        data: { status },
      });

      return true;
    },
  },
  Event: {
    acceptedApplicationCount: async (parent, _, context) => {
      return await prisma.application.count({
        where: {
          eventId: parent.id,
          status: 'ACCEPTED',
        },
      });
    },
  },
  Application: {
    event: async (parent) => {
      return await prisma.event.findUnique({
        where: { id: parent.eventId },
      });
    },
    user: async (parent) => {
      return await prisma.user.findUnique({
        where: { id: parent.userId },
      });
    },
  },
};

export default resolvers;
