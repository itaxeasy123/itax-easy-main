import VerifyOTPForm from '@/components/pagesComponents/auth/verifyOTP/VerifyOTPForm';
import FormBrand from '@/components/pagesComponents/auth/FormBrand';

export default function verifyOtp() {
  return (
    <div className="min-h-screen px-4 py-4 bg-neutral-50 lg:bg-gray-100 grid gap-8 sm:place-content-center lg:grid-cols-2 mx-auto lg:container">
      <FormBrand />
      <VerifyOTPForm />
    </div>
  );
}
