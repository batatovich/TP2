import prisma from '@/lib/db';
import { getUserIdFromSession } from '@/lib/sessions';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const userId = await getUserIdFromSession(request);

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const events = await prisma.event.findMany({
      where: { creatorId: userId },
      orderBy: { date: 'asc' },
    });

    return NextResponse.json(events, { status: 200 });

  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ error: 'Unexpected error!' }, { status: 500 });
  }
}
