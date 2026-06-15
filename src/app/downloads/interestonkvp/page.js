import Wordkvp from '@/components/downloads/Wordkvp';

export const dynamic = 'force-dynamic';

const index = () => {
  return (
    <div className="transition-all duration-100 lg:container 2xl:max-w-7xl mx-auto mb-12">
      <Wordkvp />
    </div>
  );
};

export default index;

export async function generateMetadata() {
  return {
    title: 'Interest on kvp',
  };
}
