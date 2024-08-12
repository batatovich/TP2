import prisma from '@/lib/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function POST(request) {
    const data = await request.json();
    const { email, password } = data;

    try {
        // Check if user exists
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
        }

        // Check if password is valid
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
        }

        const token = jwt.sign({ data: user.email }, process.env.SECRET_KEY, { expiresIn: '1h' });

        const res = NextResponse.json({ success: 'Signed in successfully!' }, { status: 200 });

        res.cookies.set('token', token, {
            httpOnly: true, // Helps prevent XSS
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            maxAge: 60 * 60, // 1 hour
            sameSite: 'strict', // CSRF protection
            path: '/',
        });

        return res;
    } catch (error) {
        console.error('Error during sign in:', error);
        return NextResponse.json(
            { error: 'An unexpected error occurred.' },
            { status: 500 }
        );
    }
}
