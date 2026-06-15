
import LoginForm from '@/components/pagesComponents/auth/login/LoginForm';
import FormBrand from '@/components/pagesComponents/auth/FormBrand';

// Easiest: static metadata (works in JS)
export const metadata = {
  title: 'Login',
};

export default function Page() {
  return (
    <div className="min-h-screen px-4 py-4 bg-neutral-50 lg:bg-gray-100 grid gap-8 sm:place-content-center lg:grid-cols-2 mx-auto lg:container">
      <FormBrand />
      <LoginForm />
    </div>
  );
}
