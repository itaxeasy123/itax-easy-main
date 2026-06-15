'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import userAxios from '@/lib/userbackAxios';
import UseAuth from '@/hooks/useAuth';
import axios from 'axios';
import Image from 'next/image';
import Loader from '@/components/partials/loading/Loader';
import {
  ArrowLeft,
  ShoppingCart,
  CheckCircle2,
  CreditCard,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import PayNowHandler from './PayNowHandler';
import { iconList } from '../apiService/staticData';

export default function CheckoutDetails() {
  const { token } = UseAuth();
  const router = useRouter();

  const [services, setServices] = useState([]);
  const [registrationStartup, setRegistrationStartup] = useState([]);
  const [registrationServices, setRegistrationServices] = useState([]);
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gst: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(true);

  /* ================================
     FETCH CART DATA
  ================================= */
  const fetchCartData = useCallback(async () => {
    if (!token) {
      setCartLoading(false);
      return;
    }

    try {
      setCartLoading(true);

      const serviceRes = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/cart`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const startupRes = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/cartStartup`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setServices(serviceRes.data?.services || []);
      setRegistrationStartup(startupRes.data?.startupItems || []);
    } catch (error) {
      console.error('Cart load error:', error);
      toast.error('Error loading cart data');
    } finally {
      setCartLoading(false);
    }
  }, [token]);

  /* ================================
     FETCH USER PROFILE
  ================================= */
  const getUserDetails = useCallback(async () => {
    try {
      setIsLoading(true);

      const res = await userAxios.get('/user/profile');

      // ✅ Backend direct user object bhej raha hai
      const user = res.data;

      if (user) {
        setUserDetails({
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          email: user.email || '',
          gst: user.gst || '',
        });
      }
    } catch (error) {
      console.error('Profile fetch error:', error);
      toast.error('Error fetching user details');
    } finally {
      setIsLoading(false);
    }
  }, []);

  /* ================================
     INITIAL LOAD
  ================================= */
  useEffect(() => {
    if (!token) {
      setCartLoading(false);
      return;
    }

    getUserDetails();
    fetchCartData();
  }, [token, getUserDetails, fetchCartData]);

  /* ================================
     TOTAL CALCULATION
  ================================= */
  const serviceTotal = services.reduce(
    (acc, item) => acc + (item.price || 0),
    0,
  );

  const startupTotal = registrationStartup.reduce(
    (acc, item) => acc + (item.priceWithGst || item.price || 0),
    0,
  );

  const totalAmount = serviceTotal + startupTotal;

  const goBackToCart = () => router.push('/cart');

  /* ================================
     LOADING STATE
  ================================= */
  if (cartLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  /* ================================
     EMPTY CART STATE
  ================================= */
  if (!services.length && !registrationStartup.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
          <h2 className="mt-4 text-xl font-semibold">Your cart is empty</h2>
          <button
            onClick={goBackToCart}
            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Back to Cart
          </button>
        </div>
      </div>
    );
  }

  /* ================================
     MAIN UI
  ================================= */
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gray-50 p-6 border-b border-gray-200 flex items-center gap-4">
          <button
            onClick={goBackToCart}
            className="p-2 hover:bg-white rounded-lg"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <h1 className="text-2xl font-semibold">Checkout</h1>
        </div>

        <div className="lg:grid lg:grid-cols-3 gap-6 p-6">
          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-6">
            {/* User Info */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">
                Customer Information
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded border">
                  <p className="text-sm text-gray-500">Name</p>
                  <p>
                    {userDetails.firstName} {userDetails.lastName}
                  </p>
                </div>

                <div className="bg-white p-3 rounded border">
                  <p className="text-sm text-gray-500">Email</p>
                  <p>{userDetails.email || 'Not Available'}</p>
                </div>

                {userDetails.gst && (
                  <div className="bg-white p-3 rounded border">
                    <p className="text-sm text-gray-500">GST</p>
                    <p>{userDetails.gst}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Order Items */}

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-6">Order Items</h2>

              <div className="space-y-4">
                {[...services, ...registrationStartup].map((item, idx) => {
                  const price = item.priceWithGst || item.price || 0;
                  const type = item.priceWithGst ? 'Startup' : 'Service';

                  return (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:shadow-sm transition-all duration-200"
                    >
                      {/* LEFT SIDE */}
                      <div className="flex items-center gap-4">
                        {/* ICON */}
                        <div className="w-12 h-12 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center overflow-hidden">
                          {/* If startup image exists (backend image) */}
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.title}
                              width={28}
                              height={28}
                              className="object-contain"
                            />
                          ) : iconList[item.title]?.icon ? (
                            /* If lucide icon exists */
                            <span className="text-blue-600 w-6 h-6 flex items-center justify-center">
                              {iconList[item.title].icon}
                            </span>
                          ) : iconList[item.title]?.src ? (
                            /* If local static icon exists */
                            <Image
                              src={iconList[item.title].src}
                              alt={item.title}
                              width={28}
                              height={28}
                              className="object-contain"
                            />
                          ) : (
                            /* Final fallback */
                            <ShoppingCart className="w-6 h-6 text-gray-400" />
                          )}
                        </div>

                        {/* TITLE + BADGE */}
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-gray-800">
                              {item.title}
                            </p>

                            <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full font-medium">
                              {type}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* RIGHT SIDE */}
                      <div className="text-right">
                        <p className="font-semibold text-gray-800 text-lg">
                          ₹{price.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500">GST included</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">
            <div className="bg-white border rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>₹{totalAmount.toLocaleString()}</span>
              </div>

              <div className="border-t pt-3 mt-3 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-blue-600">
                  ₹{totalAmount.toLocaleString()}
                </span>
              </div>

              <div className="mt-6">
                {/* <PayNowHandler
                  totalAmount={totalAmount.toFixed(2)}
                  services={services}
                  registrationStartup={registrationStartup}
                  registrationServices={registrationServices}
                > */}
                <PayNowHandler
                  totalAmount={totalAmount.toFixed(2)}
                  services={services}
                  registrationStartup={registrationStartup}
                  registrationServices={registrationServices}
                >
                  <button className="w-full bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Complete Payment
                  </button>
                </PayNowHandler>
              </div>

              <div className="mt-4 text-xs text-gray-500 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                Secure Payment Enabled
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
