import InterestaccruedonIndira from '@/components/downloads/InterestaccruedonIndira';

export const dynamic = 'force-dynamic';

const index = () => {
  return (
    <div className="transition-all duration-100 lg:container 2xl:max-w-7xl mx-auto mb-12">
      <InterestaccruedonIndira />
    </div>
  );
};

export default index;
export async function generateMetadata() {
  return {
    title: 'Interest accrued on indira vikas patras(ivp)',
  };
}
