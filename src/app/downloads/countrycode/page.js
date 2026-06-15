import Countrycode from '@/components/downloads/Countrycode';

export const dynamic = 'force-dynamic';

const CountryCodePage = () => {
  return (
    <div className="transition-all duration-100 lg:container 2xl:max-w-7xl mx-auto mb-12">
      <Countrycode />
    </div>
  );
};

export default CountryCodePage;

export async function generateMetadata() {
  return {
    title: 'Country code',
  };
}
