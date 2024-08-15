'use server';

import prisma from '@/lib/db';
import { cookies } from 'next/headers';
import { decrypt } from './sessions';

async function getUserIdFromSession() {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get('session')?.value;
  const session = await decrypt(sessionCookie);

  if (!session?.userId) {
    throw new Error('Unauthorized');
  }

  return session.userId;
}

export async function fetchMyEvents() {
  try {
    const userId = await getUserIdFromSession();
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

export async function createEvent(data) {
  try {
    const userId = await getUserIdFromSession();
    await prisma.event.create({
      data: {
        name: data.name,
        description: data.description,
        location: data.location,
        date: new Date(data.date),
        capacity: parseInt(data.capacity, 10),
        fee: parseFloat(data.fee),
        creatorId: userId,
      },
    });
  } catch (error) {
    console.error('Error creating event:', error);
    throw new Error('Failed to create event');
  }
}


export async function deleteEvent(eventId) {
  try {
    const userId = await getUserIdFromSession();

    await prisma.event.delete({
      where: { id: eventId, creatorId: userId },
    });
  } catch (error) {
    console.error('Error deleting event:', error);
    throw new Error('Could not delete event');
  }
}