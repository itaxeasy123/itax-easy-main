import ApiDocs from '@/components/pagesComponents/apiService/ApiDocs';

export const dynamic = 'force-dynamic';

function ApiDocsPage({ params }) {
  return <ApiDocs params={params} />;
}

export default ApiDocsPage;
