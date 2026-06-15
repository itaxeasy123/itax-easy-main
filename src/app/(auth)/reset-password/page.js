import FormBrand from '@/components/pagesComponents/auth/FormBrand';
import ResetPassword from '@/components/pagesComponents/auth/resetPassword/ResetPassword';

export default function resetPassword() {
  return (
    <div className="min-h-screen px-4 py-4 bg-neutral-50 lg:bg-gray-100 grid gap-8 sm:place-content-center lg:grid-cols-2 mx-auto lg:container">
      <FormBrand />
      <ResetPassword />
    </div>
  );
}
