import Depreciationtable from '@/components/downloads/Depreciationtable';

const Index = () => {
  return (
    <div className="transition-all duration-100 lg:container 2xl:max-w-7xl mx-auto mb-12">
      <Depreciationtable />
    </div>
  );
};

export default Index;

export function generateMetadata() {
  return {
    title: 'Depreciation table',
  };
}
