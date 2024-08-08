import SubmitBtn from './SubmitBtn';
import prisma from '../../lib/db.js';

export default function SignInForm() {
    const login = async (formData) => {
        "use server";
        await prisma.User.create({
            data: {
                email: formData.get('email'),
                password: formData.get('password'),
            },
        })
    };

    return (
        <form
            action={login}
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
            <SubmitBtn/>
        </form>
    )
}
