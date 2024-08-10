import SignUpForm from '@/components/auth/signup-form';

export default function SignUpPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Sign Up
      </h1>
      <SignUpForm />
    </div>
  );
}
