// 'use client';

// import React, { useState } from 'react';
// import Button from '@/components/ui/Button';
// import { toast } from 'react-toastify';
// import Image from 'next/image';
// import useAuth from '@/hooks/useAuth';
// import userAxiosNext from '@/lib/userbackAxios';
// import { useRouter } from 'next/navigation';

// const getAuthToken = () => {
//   return document.cookie
//     .split('; ')
//     .find((row) => row.startsWith('token='))
//     ?.split('=')[1];
// };

// const PayNowHandler = ({ services = [] }) => {
//   const router = useRouter();
//   const { currentUser } = useAuth();
//   const [isLoading, setIsLoading] = useState(false);

//   const subsHandler = async () => {
//     try {
//       if (isLoading) return;

//       if (!services || services.length === 0) {
//         toast.error('No services selected');
//         return;
//       }

//       setIsLoading(true);

//       const token = getAuthToken();
//       if (!token) {
//         toast.error('User not authenticated');
//         return;
//       }

//       /* ===============================
//          1️⃣ CREATE RAZORPAY ORDER
//       =============================== */

//       const serviceIds = services.map((s) => s.id); // ✅ UUID 그대로 send

//       const { data } = await userAxiosNext.post(
//         `/razorpay/initiate_payment`,
//         { serviceIds },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       if (!data?.success || !data?.order) {
//         toast.error(data?.message || 'Order creation failed');
//         return;
//       }

//       const order = data.order;

//       /* ===============================
//          2️⃣ OPEN RAZORPAY POPUP
//       =============================== */

//       if (!window.Razorpay) {
//         toast.error('Razorpay SDK not loaded');
//         return;
//       }

//       const options = {
//         key: process.env.NEXT_PUBLIC_RZP_KEY,
//         amount: order.amount,
//         currency: order.currency,
//         name: 'iTaxEasy',
//         description: 'Service Payment',
//         order_id: order.id,

//         handler: async function () {
//           try {
//             await userAxiosNext.put(
//               `/razorpay/refetch`,
//               { orderId: order.id },
//               {
//                 headers: { Authorization: `Bearer ${token}` },
//               }
//             );

//             toast.success('Payment Successful!');
//             router.push('/checkout/payment-success');
//           } catch (err) {
//             toast.error('Payment verification failed');
//           }
//         },

//         prefill: {
//           name: `${currentUser?.firstName || ''} ${currentUser?.lastName || ''}`,
//           email: currentUser?.email || '',
//           contact: currentUser?.phone || '',
//         },

//         theme: {
//           color: '#4f46e5',
//         },
//       };

//       const razor = new window.Razorpay(options);
//       razor.open();

//     } catch (error) {
//       console.error(error);
//       toast.error('Payment failed to start');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Button size="lg" disabled={isLoading} onClick={subsHandler}>
//       {isLoading ? (
//         <div className="flex gap-1 items-center">
//           <Image
//             src="/whiteLoader.svg"
//             alt="Loading..."
//             width={20}
//             height={20}
//           />
//           <p>Processing...</p>
//         </div>
//       ) : (
//         'Pay Now'
//       )}
//     </Button>
//   );
// };

// export default PayNowHandler;

'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import { toast } from 'react-toastify';
import Image from 'next/image';
import useAuth from '@/hooks/useAuth';
import userAxiosNext from '@/lib/userbackAxios';
import { useRouter } from 'next/navigation';
import { getAccessToken } from '@/lib/authToken';

// In-memory access token (the userAxiosNext interceptor also attaches it).
const getAuthToken = () => getAccessToken();

// Lazily inject the Razorpay Checkout script. It is NOT bundled or globally
// loaded anywhere, so without this `window.Razorpay` is undefined and the
// payment popup never opens. Resolves true once the SDK is ready.
const loadRazorpayScript = () =>
  new Promise((resolve) => {
    if (typeof window === 'undefined') return resolve(false);
    if (window.Razorpay) return resolve(true);

    const existing = document.getElementById('razorpay-checkout-js');
    if (existing) {
      existing.addEventListener('load', () => resolve(true));
      existing.addEventListener('error', () => resolve(false));
      // Already loaded but listener missed → assume ready on next tick.
      if (window.Razorpay) resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.id = 'razorpay-checkout-js';
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

const PayNowHandler = ({ services = [] }) => {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const subsHandler = async () => {
    try {
      console.log("SERVICES DATA:", services);

      if (isLoading) return;

      if (!services || services.length === 0) {
        toast.error('No services selected');
        return;
      }

      setIsLoading(true);

      const token = getAuthToken();
      if (!token) {
        toast.error('User not authenticated');
        return;
      }

      /* ===============================
         🔥 FINAL FIX HERE
      =============================== */

      const serviceIds = services.map((s) => {
        // ✅ CASE 1: अगर string है (current case)
        if (typeof s === "string") return s;

        // ✅ CASE 2: अगर object है
        return s._id || s.id;
      });

      console.log("SENDING IDS:", serviceIds);

      /* ===============================
         1️⃣ CREATE RAZORPAY ORDER
      =============================== */

      const { data } = await userAxiosNext.post(
        `/razorpay/initiate_payment`,
        { serviceIds },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!data?.success || !data?.order) {
        toast.error(data?.message || 'Order creation failed');
        return;
      }

      const order = data.order;

      /* ===============================
         2️⃣ LOAD SDK + OPEN RAZORPAY POPUP
      =============================== */

      const sdkReady = await loadRazorpayScript();
      if (!sdkReady || !window.Razorpay) {
        toast.error('Payment gateway failed to load. Check your connection and try again.');
        return;
      }

      if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
        toast.error('Payment is not configured. Please contact support.');
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'iTaxEasy',
        description: 'Service Payment',
        order_id: order.id,

        handler: async function () {
          try {
            await userAxiosNext.put(
              `/razorpay/refetch`,
              { orderId: order.id },
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );

            toast.success('Payment Successful!');
            router.push('/checkout/payment-success');
          } catch (err) {
            toast.error('Payment verification failed');
          }
        },

        prefill: {
          name: `${currentUser?.firstName || ''} ${currentUser?.lastName || ''}`,
          email: currentUser?.email || '',
          contact: currentUser?.phone || '',
        },

        theme: {
          color: '#4f46e5',
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();

    } catch (error) {
      console.error(error);
      toast.error('Payment failed to start');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button size="lg" disabled={isLoading} onClick={subsHandler}>
      {isLoading ? (
        <div className="flex gap-1 items-center">
          <Image
            src="/whiteLoader.svg"
            alt="Loading..."
            width={20}
            height={20}
          />
          <p>Processing...</p>
        </div>
      ) : (
        'Pay Now'
      )}
    </Button>
  );
};

export default PayNowHandler;