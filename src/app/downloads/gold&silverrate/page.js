import Goldsilverrate from '@/components/downloads/Goldsilverrate';

export const dynamic = 'force-dynamic';

const GoldPage = () => {
  return (
    <div className="transition-all duration-100 lg:container 2xl:max-w-7xl mx-auto mb-12">
      <Goldsilverrate />
    </div>
  );
};

export default GoldPage;

export async function generateMetadata() {
  return {
    title: 'Gold and silver rate',
  };
}
