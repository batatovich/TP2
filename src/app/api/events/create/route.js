import prisma from '@/lib/db';
import { getUserIdFromSession } from '@/lib/sessions';  
import { NextResponse } from 'next/server';

export async function POST(request) {
  const data = await request.json();

  try {
    const userId = await getUserIdFromSession(request);

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

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

    return NextResponse.json({ success: 'Event created successfully!' }, { status: 200 });

  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json({ error: 'Unexpected error occurred!' }, { status: 500 });
  }
}
