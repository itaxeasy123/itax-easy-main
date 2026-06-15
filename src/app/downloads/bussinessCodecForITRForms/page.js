import BussinessCodecForITRForms from '@/components/downloads/BussinessCodecForITRForms';

const index = () => {
  return (
    <div className="transition-all duration-100 lg:container 2xl:max-w-7xl mx-auto mb-12">
      <BussinessCodecForITRForms />
    </div>
  );
};

export default index;

export function generateMetadata() {
  return {
    title: 'Bussiness Codec For ITR Forms',
  };
}
