import Blogs from '@/components/pagesComponents/Blogs/Blogs';
const index = () => {
  return (
    <div>
      <Blogs />
    </div>
  );
};

export default index;
export async function generateMetadata({ params }) {
  return {
    title: 'blogs',
  };
}
