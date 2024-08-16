import prisma from '@/lib/prisma-client';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import { createSession } from '@/lib/sessions';

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

        // Create session and set cookie
        await createSession(user.id);

        return NextResponse.json({ success: 'Signed in successfully!' }, { status: 200 });

    } catch (error) {
        console.error('Error during sign in:', error);
        return NextResponse.json(
            { error: 'An unexpected error occurred.' },
            { status: 500 }
        );
    }
}
