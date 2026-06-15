import { Suspense } from 'react';
import { getCartItems } from '../api/fetchData';
import Loader from '@/components/partials/loading/Loader';
import Checkout from '@/components/pagesComponents/checkout/Checkout';
import CheckoutDetails from '@/components/pagesComponents/checkout/CheckoutDetails';

export const dynamic = 'force-dynamic';

export default async function CheckoutPage() {
  // const cartItems = await getCartItems();
  return (
    <Suspense fallback={<Loader />}>
      {/* <CheckoutDetails cartItems={cartItems} /> */}
      <CheckoutDetails />
      {/* <Checkout cartItems={cartItems} /> */}
    </Suspense>
  );
}
