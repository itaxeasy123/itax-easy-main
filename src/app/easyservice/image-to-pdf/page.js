import ImgToPdf from '@/components/EasyServices/Converter/ImgToPdf';

const index = () => {
  return <ImgToPdf />;
};

export default index;
export async function generateMetadata({ params }) {
  return {
    title: 'Image To Pdf',
  };
}
