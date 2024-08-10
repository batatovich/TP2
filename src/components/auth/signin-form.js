import SubmitBtn from './submit-btn';
import Link from 'next/link';

export default function SignInForm() {
    return (
        <div className="flex flex-col items-center">
            <form
                action='/api/auth/signin'
                method='POST'
                className="flex flex-col rounded max-w-[500px] mb-4 mx-auto space-y-2"
            >
                <input
                    type='text'
                    name='email'
                    placeholder='Email'
                    className='border rounded h-10 px-3'
                    required
                />
                <input
                    type='password'
                    name='password'
                    placeholder='Password'
                    className='border rounded h-10 px-3'
                    required
                />
                <SubmitBtn text='Sign In' />
            </form>

            <p className="mt-4 text-gray-600">
                Don't have an account?{' '}
                <Link href="/auth/signup" className="text-blue-500 hover:text-blue-700 font-bold">
                    Sign up!
                </Link>
            </p>
        </div>
    );
}
