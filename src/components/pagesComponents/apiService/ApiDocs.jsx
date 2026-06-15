'use client';
import { useState, useEffect, useContext } from 'react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { GrVmMaintenance } from 'react-icons/gr';
import { API_CART } from '../../../store/actions';
import { StoreContext } from '../../../store/store-context';
import UseAuth from '../../../hooks/useAuth';
import { apiDocsData } from './staticData';
import axios from 'axios';
import AddToCart from './AddToCart'; // Adjust path as needed
import Loader from '@/components/partials/loading/Loader';

export default function ApiDocs() {
  const pathname = usePathname();
  const apiName = pathname.split('/').pop();
  const router = useRouter();
  const { token } = UseAuth();

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [alreadyInCart, setAlreadyInCart] = useState(false);
  const [state, dispatch] = useContext(StoreContext);
  const [error, setError] = useState('');

  useEffect(() => {
    const apiData = apiDocsData.find((item) => {
      const title = item.title.replace(/ /g, '').toLowerCase();
      if (title === apiName) {
        return item;
      }
      return false;
    });
    console.log('API Data:', apiData); // Debugging line
    console.log('API Name:', apiName); // Debugging line

    if (apiData !== undefined) {
      setData(apiData);
      if (token) {
        checkIfInCart();
      }
    } else {
      router.push('/404', {
        replace: true,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiName, router, token]);

  // Handle cart status change from AddToCart component
  const handleCartStatusChange = (isInCart) => {
    console.log('Cart status changed to:', isInCart);
    setAlreadyInCart(isInCart);
  };

  // Check if the current API is in user's cart
  const checkIfInCart = async () => {
    if (!token || !data?.id) return;

    try {
      setIsLoading(true);

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/cart`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log('Cart response:', response.data); // Debug

      // Handle both possible response structures
      const cartItems = response.data?.services || response.data?.data || [];

      // Check if the current item exists in the cart
      const isInCart = cartItems.some(
        (item) =>
          item?.id === data.id ||
          item?.serviceId === data.id ||
          data.id === item?.serviceId,
      );

      setAlreadyInCart(isInCart);
      console.log('Is in cart:', isInCart, 'for item ID:', data.id);
    } catch (error) {
      console.error('Error checking cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (data && token) {
      checkIfInCart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, token]);

  // Debug function to test if the data exists and has expected structure
  const debugData = () => {
    console.log('Current data:', data);
    if (data) {
      console.log('ID exists:', !!data.id);
      console.log('ID type:', typeof data.id);
      console.log('ID value:', data.id);
      console.log('Already in cart:', alreadyInCart);
    }
  };

  return (
    <>
      {data ? (
        <div className="max-w-5xl mx-auto my-10">
          <h1 className="text-center font-semibold text-2xl">{data.title}</h1>
          <div className="mt-8">
            <h5 className="font-medium text-xl">Overview</h5>
            <p className="text-sm mt-2">{data.overview}</p>
          </div>
          <div className="flex p-3 mt-5 bg-[#f0f0f1] rounded font-semibold justify-between items-center">
            <div className="flex text-2xl ">
              <h2>Price :</h2>
              <div className="ml-2">₹ {data.price} monthly</div>
            </div>
            <div className="flex gap-2">
              {/* Using the AddToCart component with callback */}
              <AddToCart
                item={data}
                alreadyInCart={alreadyInCart}
                onCartStatusChange={handleCartStatusChange}
              />

              {/* Debug button - remove in production */}
              {token && (
                <button
                  onClick={debugData}
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  Debug
                </button>
              )}
            </div>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
              {error}
            </div>
          )}

          {/* <div className="mt-8">
            <h5 className="font-medium text-xl">Endpoint</h5>
            <table className="border-collapse w-full mt-2 text-sm">
              <thead>
                <tr className="text-left bg-zinc-200">
                  <th className="border px-5 py-2">HTTP Method</th>
                  <th className="border px-5 py-2">Endpoint</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-left">
                  <td className="border px-5 py-2 uppercase">
                    {data.endpoint.method}
                  </td>
                  <td className="border px-5 py-2">{data.endpoint.endpoint}</td>
                </tr>
              </tbody>
            </table>
          </div> */}
          <div className="mt-8">
            <h5 className="font-medium text-xl">Endpoint</h5>
            <table className="border-collapse w-full mt-2 text-sm">
              <thead>
                <tr className="text-left bg-zinc-200">
                  <th className="border px-5 py-2">HTTP Method</th>
                  <th className="border px-5 py-2">Endpoint</th>
                  <th className="border px-5 py-2">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-left">
                  <td className="border px-5 py-2 uppercase">
                    {data.endpoint.method}
                  </td>

                  <td className="border px-5 py-2">{data.endpoint.endpoint}</td>

                  <td className="border px-5 py-2">
                    {data.endpoint.description}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            {!data.upcoming ? (
              <>
                {data.headers && (
                  <div className="mt-8">
                    <h5 className="font-medium text-xl">Headers</h5>
                    <table className="table-auto border w-full mt-2 text-sm">
                      <thead>
                        <tr className="text-left bg-zinc-200">
                          <th className="px-3 py-3">Name</th>
                          <th className="px-3 py-3">Type</th>
                          <th className="px-3 py-3">Required</th>
                          <th className="px-3 py-3">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.headers.map((element, index) => (
                          <tr
                            key={index}
                            className="text-left odd:bg-white even:bg-zinc-100"
                          >
                            <td className="px-3 py-5 border">{element.name}</td>
                            <td className="px-3 py-5 border">{element.type}</td>
                            <td className="px-3 py-5 border">
                              {element.required}
                            </td>
                            <td className="px-3 py-5 border">
                              {element.description}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {data.queryParams && (
                  <div className="mt-8">
                    <h5 className="font-medium text-xl">Query Parameters</h5>
                    <table className="table-auto border w-full mt-2 text-sm">
                      <thead>
                        <tr className="text-left bg-zinc-200">
                          <th className="px-3 py-3">Name</th>
                          <th className="px-3 py-3">Type</th>
                          <th className="px-3 py-3">Required</th>
                          <th className="px-3 py-3">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.queryParams.map((element, index) => (
                          <tr
                            key={index}
                            className="text-left odd:bg-white even:bg-zinc-100"
                          >
                            <td className="px-3 py-5 border">{element.name}</td>
                            <td className="px-3 py-5 border">{element.type}</td>
                            <td className="px-3 py-5 border">
                              {element.required}
                            </td>
                            <td className="px-3 py-5 border">
                              {element.description}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {data.bodyParams && (
                  <div className="mt-8">
                    <h5 className="font-medium text-xl">Body Parameters</h5>
                    <table className="table-auto border w-full mt-2 text-sm">
                      <thead>
                        <tr className="text-left bg-zinc-200">
                          <th className="px-3 py-3">Name</th>
                          <th className="px-3 py-3">Type</th>
                          <th className="px-3 py-3">Required</th>
                          <th className="px-3 py-3">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.bodyParams.map((element, index) => (
                          <tr
                            key={index}
                            className="text-left odd:bg-white even:bg-zinc-100"
                          >
                            <td className="px-3 py-5 border">{element.name}</td>
                            <td className="px-3 py-5 border">{element.type}</td>
                            <td className="px-3 py-5 border">
                              {element.required}
                            </td>
                            <td className="px-3 py-5 border">
                              {element.description}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                <div className="mt-8">
                  <h5 className="font-medium text-xl">Response Body</h5>
                 
                </div>
                <code className="block bg-zinc-100 rounded-md px-8 py-5 mt-5 overflow-x-auto">
                  <pre className="whitespace-pre">{data.responseJSON}</pre>
                </code>
              </>
            ) :
            (
              <div className="flex p-3 bg-red-200 mt-10 text-red-500 fill-current justify-center text-xl ">
                <div className=" flex items-center gap-2">
                  <GrVmMaintenance /> Error code : 503 Api under Maintainence
                </div>
              </div>
            )
            }
          </div>
        </div>
      ) : (
        <Loader fullScreen />
      )}
    </>
  );
}
