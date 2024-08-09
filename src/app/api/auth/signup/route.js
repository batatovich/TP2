import prisma from '@/lib/db';
import bcrypt from 'bcrypt';

export async function POST(request) {
  const formData = await request.formData();
  const email = formData.get('email');
  const password = formData.get('password');
  const confirmPassword = formData.get('confirmPassword');

  if (password !== confirmPassword) {
    return new Response(JSON.stringify({ error: 'Passwords do not match.' }), {
      status: 400,
    });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new Response(
        JSON.stringify({ error: 'Email already registered.' }),
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    });

    return new Response(JSON.stringify({ success: 'User registered successfully!' }), {
      status: 201,
    });
  } catch (error) {
    console.error('Error during sign up:', error);
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred. Please try again.' }),
      { status: 500 }
    );
  }
}
