import prisma from '@/lib/db';
import { getUserIdFromSession } from '@/lib/sessions';
import { NextResponse } from 'next/server';

export async function DELETE(request) {
  const { eventId } = await request.json();
  try {
    const userId = await getUserIdFromSession(request);

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event || event.creatorId !== userId) {
      return NextResponse.json({ error: 'Resource not found.' }, { status: 404 });
    }

    await prisma.event.delete({
      where: { id: eventId },
    });

    return NextResponse.json({ success: 'Event deleted successfully!' }, { status: 200 });

  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json({ error: 'Unexpected error occurred!' }, { status: 500 });
  }
}
