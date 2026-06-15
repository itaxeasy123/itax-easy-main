import { nodeAxios as api } from '@/lib/axios';
import Loader from '@/components/partials/loading/Loader';
import { Suspense } from 'react';
import { generateQueryFromObject } from '@/utils/utilityFunctions';
import Newcostinflationindex from '@/components/downloads/Newcostinflationindex';

export const dynamic = 'force-dynamic';

const Index = async () => {
  let data = [];
  let status = false;
  const res = await getCostInflationIndex();

  if (res) {
    data = res.data;
    status = res.status;
  }

  return (
    <div className="2xl:max-w-7xl mx-auto px-3 mb-12">
      <Suspense fallback={<Loader />}>
        <Newcostinflationindex
          name={'newCostInflation'}
          data={Array.isArray(data) && data?.at(0)}
        />
      </Suspense>
    </div>
  );
};

export default Index;

export async function generateMetadata() {
  return {
    title: 'New cost inflation index',
  };
}

export const getCostInflationIndex = async () => {
  try {
    const query = generateQueryFromObject({
      listName: 'New Cost Inflation Index List 2022',
      financialAct: '2022',
    });
    const { data } = await api.get(
      `/api/downloads/cost-inflation-index?${query}`,
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
