import { NextResponse } from 'next/server';
import { deleteSession } from '@/lib/sessions';

export async function POST() {

  deleteSession();

  return NextResponse.json({ message: 'Signed out successfully!' }, { status: 200 });
}