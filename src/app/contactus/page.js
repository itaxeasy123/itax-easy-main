import ContactUs from '@/components/pagesComponents/footerPages/ContactUs';
const index = () => {
  return <ContactUs />;
};

export default index;
export async function generateMetadata({ params }) {
  return {
    title: 'contact us',
  };
}
