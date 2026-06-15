import Loader from '@/components/partials/loading/Loader';

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <Loader />
    </div>
  );
}
