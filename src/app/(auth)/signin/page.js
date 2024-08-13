'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SignInSchema } from '@/lib/definitions';
import Link from 'next/link';

export default function SignInPage() {
  const [statusMessage, setStatusMessage] = useState('');
  const [processing, setProcessing] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    setValidationErrors({});

    const formData = new FormData(event.target);
    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    try {
      await SignInSchema.validate(data, { abortEarly: false });

      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.error) {
        setStatusMessage(`Error: ${result.error}`);
        setProcessing(false);
      } else {
        setStatusMessage('Successfully authenticated!');
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      }
    } catch (error) {
      setProcessing(false);
      if (error.name === 'ValidationError') {
        const formattedErrors = error.inner.reduce((acc, err) => {
          acc[err.path] = err.message;
          return acc;
        }, {});
        setValidationErrors(formattedErrors);
      } else {
        setStatusMessage('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Sign In
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center rounded max-w-[400px] mx-auto space-y-4">
        <input
          type='email'
          name='email'
          placeholder='Email'
          className='w-full border rounded h-10 px-3'
          required
        />
        {validationErrors.email && <p className="text-red-500">{validationErrors.email}</p>}

        <input
          type='password'
          name='password'
          placeholder='Password'
          className='w-full border rounded h-10 px-3'
          required
        />
        {validationErrors.password && <p className="text-red-500">{validationErrors.password}</p>}

        <button
          type="submit"
          className={`w-full font-bold py-2 px-4 rounded ${processing ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
          disabled={processing}
        >
          Sign In
        </button>

        {statusMessage && (
          <div className={`mt-4 w-full text-center p-3 rounded ${statusMessage.includes('Error') ? 'bg-red-100 text-red-700 border border-red-500' : 'bg-green-100 text-green-700 border border-green-500'}`}>
            <p>
              {statusMessage}
            </p>
          </div>
        )}
      </form>

      <p className="mt-4 text-center text-gray-600">
        Don&apos;t have an account?{' '}
        <Link href="/signup" className="text-blue-500 hover:text-blue-700 font-bold">
          Sign Up!
        </Link>
      </p>
    </div>
  );
}
