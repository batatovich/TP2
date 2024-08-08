import SubmitBtn from './SubmitBtn';

export default function SignInForm() {
    const login = async (formData) => {
        "use server";
        //TO DO: db sign in query
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
