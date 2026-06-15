import InterestaccruedonnationalVIIIth from '@/components/downloads/InterestaccruedonnationalVIIIth';

export const dynamic = 'force-dynamic';

const index = () => {
  return (
    <div className="transition-all duration-100 lg:container 2xl:max-w-7xl mx-auto mb-12">
      <InterestaccruedonnationalVIIIth />
    </div>
  );
};

export default index;

export async function generateMetadata() {
  return {
    title: 'Interest accruedon national saving certificates(viiithissue)',
  };
}
