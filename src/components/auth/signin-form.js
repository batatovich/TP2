import SubmitBtn from './submit-btn';

export default function SignInForm() {
    return (
        <form
            action='api/auth/signin'
            method='POST'
            className="flex flex-col rounded max-w-[500px] mb-10 mx-auto space-y-2">
            <input
                type='text'
                name='email'
                placeholder='Email'
                className='border rounded h-10 px-3'
                required />
            <input
                type='text'
                name='password'
                placeholder='Password'
                className='border rounded h-10 px-3'
                required />
            <SubmitBtn text='Sign In' />
        </form>
    )
}
