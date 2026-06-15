import BlogIndividualPage from '@/components/pagesComponents/Blogs/BlogIndividualPage';
const index = ({ params }) => {
  return (
    <div>
      <BlogIndividualPage params={params} />
    </div>
  );
};

export default index;
