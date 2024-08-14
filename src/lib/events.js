import prisma from '@/lib/db';

export async function fetchMyEvents(userId) {
  try {
    const events = await prisma.event.findMany({
      where: { creatorId: userId },
      orderBy: { date: 'asc' },
    });
    return events;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}