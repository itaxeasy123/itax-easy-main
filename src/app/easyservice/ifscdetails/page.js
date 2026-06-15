import IfscDetails from '@/components/EasyServices/BankLinks/IfscDetails';

const index = () => {
  return <IfscDetails />;
};

export default index;
export async function generateMetadata({ params }) {
  return {
    title: 'IFSC details',
  };
}
