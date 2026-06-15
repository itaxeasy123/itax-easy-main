import Apis from '@/components/pagesComponents/apiService/Apis';

export const dynamic = 'force-dynamic';

function ApiCategoryPage({ params }) {
  const { category } = params;
  return <Apis/>;
}

export default ApiCategoryPage;

export const metadata = {
  title: 'Apis Services',
};
