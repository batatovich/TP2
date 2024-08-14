import prisma from '@/lib/db';
import { NextResponse } from 'next/server';
import { decrypt } from '@/lib/sessions';
import { cookies } from 'next/headers';

export async function POST(request) {
  const cookie = cookies().get('session')?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const data = await request.json();


  try {

    await prisma.event.create({
      data: {
        name: data.name,
        description: data.description,
        location: data.location,
        date: new Date(data.date),
        capacity: parseInt(data.capacity, 10), 
        fee: parseFloat(data.fee),
        creatorId: session.userId,
      },
    });

    return NextResponse.json({ success: 'Event created successfully!' }, { status: 200 });

  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
