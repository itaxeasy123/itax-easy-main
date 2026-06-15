import { Suspense } from 'react';
import Loader from '@/components/partials/loading/Loader';
import { getBusinessProfile } from '@/hooks/authProvider';
import TrackGstReturn from '@/components/pagesComponents/dashboard/GSTR/GSTRPages/trackGstReturn/TrackGstReturn';

export default async function checkReturnStatus() {
  const businessProfile = await getBusinessProfile();

  return (
    <Suspense fallback={<Loader />}>
      <TrackGstReturn
        businessProfile={businessProfile?.response?.data?.profile}
      />
    </Suspense>
  );
}
