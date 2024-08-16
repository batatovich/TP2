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
    events: async (_, __, context) => {
      const { userId } = context;
      if (!userId) {
        throw new Error('Unauthorized');
      }
      return await prisma.event.findMany({
        where: { creatorId: userId },
      });
    },
    event: async (_, { id }, context) => {
      const { userId } = context;
      if (!userId) {
        throw new Error('Unauthorized');
      }
      const event = await prisma.event.findUnique({
        where: { id },
      });
      if (event.creatorId !== userId) {
        throw new Error('You do not have permission to view this event.');
      }
      return event;
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

      return event;
    },
  },
  User: {
    events: async (parent) => {
      return await prisma.event.findMany({
        where: { creatorId: parent.id },
      });
    },
    applications: async (parent) => {
      return await prisma.application.findMany({
        where: { userId: parent.id },
      });
    },
  },
  Event: {
    creator: async (parent) => {
      return await prisma.user.findUnique({
        where: { id: parent.creatorId },
      });
    },
    applications: async (parent) => {
      return await prisma.application.findMany({
        where: { eventId: parent.id },
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
