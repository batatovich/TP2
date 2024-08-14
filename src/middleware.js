import { NextResponse } from 'next/server';
import { decrypt } from '@/lib/sessions';
import { cookies } from 'next/headers';

const publicRoutes = ['/signin', '/signup'];

export default async function middleware(req) {

  const path = req.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = cookies().get('session')?.value
  const session = await decrypt(cookie);

  if (!isPublicRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/signin', req.nextUrl));
  }

  return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}