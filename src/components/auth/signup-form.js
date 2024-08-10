import SubmitBtn from './submit-btn';

export default function SignUpForm() {

    return (
        <div className="flex flex-col items-center">
            <form
                action='/api/auth/signup'
                method='POST'
                className="flex flex-col rounded max-w-[500px] mb-10 mx-auto space-y-2">
                <input
                    type='email'
                    name='email'
                    placeholder='Email'
                    className='border rounded h-10 px-3'
                    required />
                <input
                    type='password'
                    name='password'
                    placeholder='Password'
                    className='border rounded h-10 px-3'
                    required />
                <input
                    type='password'
                    name='confirmPassword'
                    placeholder='Confirm Password'
                    className='border rounded h-10 px-3'
                    required />
                <SubmitBtn text='Sign Up' />
            </form>
        </div>
    );
}