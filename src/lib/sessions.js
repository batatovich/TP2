import 'server-only';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const secretKey = process.env.SECRET_KEY;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(encodedKey)
}

export async function decrypt(session) {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    console.log('Failed to verify session:', error.message);
    return null;
  }
}

export async function createSession(userId) {
  const expiresAt = Math.floor(Date.now() / 1000) + 60 * 60;  // 1 hour from now
  const session = await new SignJWT({ userId, expiresAt })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiresAt)
    .sign(encodedKey);

  cookies().set('session', session, {
    httpOnly: true,
    secure: true,
    expires: new Date(expiresAt * 1000),
    sameSite: 'strict',
    path: '/',
  });
}

export function deleteSession() {
  cookies().delete('session');
}

export async function getUserIdFromSession(req) {
  try {
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get('session')?.value;

    if (!sessionCookie) {
      throw new Error('Session cookie not found');
    }

    const session = await decrypt(sessionCookie);
    return session.userId;
  } catch (error) {
    console.error('Error retrieving user ID from session:', error);
    return null;
  }
}
