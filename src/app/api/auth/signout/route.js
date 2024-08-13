import { NextResponse } from 'next/server';

export async function POST() {

  const res = NextResponse.json({ message: 'Signed out successfully!' }, { status: 200 });

  res.cookies.set('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0,
    sameSite: 'strict',
    path: '/',
  });

  return res;
}