"use client";
import Image from "next/image";
import Loader from "@/components/partials/loading/Loader";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RemoveFromCart from "./RemoveFromCart";
import ButtonLink from "../dashboard/GSTR/Button";
import { iconList } from "../apiService/staticData";
import { formatINRCurrency } from "@/utils/utilityFunctions";
import UseAuth from "../../../hooks/useAuth";
import axios from "axios";
import { ShoppingCart, Package, ArrowRight, CheckCircle2, ShoppingBag } from "lucide-react";
import { toast } from "react-toastify";

export default function Cart() {
  const { token } = UseAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [startupcartItems, setStartUpCartItems] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const refreshCart = useCallback(() => {
    setRefreshKey((prevKey) => prevKey + 1);
  }, []);

  const fetchServiceCart = useCallback(async () => {
    if (!token) return;
    try {
      setIsLoading(true);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/cart/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200 && response.data) {
        setCartItems(response.data.services || []);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  const fetchStartupCart = useCallback(async () => {
    if (!token) return;
    try {
      setIsLoading(true);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/cartStartup/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200 && response.data) {
        setStartUpCartItems(response.data.startupItems || []);
      }
    } catch (error) {
      console.error("Error fetching startup cart:", error);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchServiceCart();
      fetchStartupCart();
    }
  }, [token, refreshKey, fetchServiceCart, fetchStartupCart]);

  // Calculate totals (all prices are GST inclusive now)
  const serviceSubtotal = cartItems.reduce((total, item) => total + (item.price || 0), 0);
  const startupSubtotal = startupcartItems.reduce(
    (total, item) => total + (item.price ? item.price : item.priceWithGst || 0),
    0
  );
  const totalAmount = serviceSubtotal + startupSubtotal;

  const handlePayment = () => {
    if (!token) {
      toast.error("Please login to continue");
      return;
    }
    if (cartItems.length === 0 && startupcartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    if (!termsAccepted) {
      toast.error("Please accept the terms and privacy policy");
      return;
    }
    router.push("/checkout");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Loader />
      </div>
    );
  }

  const hasItems = (cartItems.length > 0 || startupcartItems.length > 0);

  // Empty cart state
  if (!hasItems) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="text-center py-20 px-8">
              <div className="flex justify-center mb-8">
                <div className="relative p-4 bg-gray-50 rounded-full">
                  <ShoppingCart className="h-16 w-16 text-gray-400" strokeWidth={1.5} />
                </div>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Cart is Empty</h2>
              <p className="text-gray-600 mb-10 max-w-lg mx-auto leading-relaxed text-base">
                You havent added any items to your cart yet. Browse our comprehensive range of services and startup solutions to get started.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <button
                  onClick={() => router.push("/apis/all_apis")}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                >
                  <Package className="h-4 w-4" />
                  Browse Services
                </button>
                <button
                  onClick={() => router.push("/register-startup")}
                  className="flex-1 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Startup Packages
                </button>
              </div>
              <div className="mt-12 pt-8 border-t border-gray-100">
                <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Secure Payments</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Expert Support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Quick Processing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Cart Items Section */}
          <div className="md:col-span-2 space-y-4">
            {/* Services Section */}
            {cartItems.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <div className="bg-blue-50 px-4 py-3 border-b border-blue-100">
                  <h2 className="font-semibold text-blue-800 flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    Services
                  </h2>
                </div>
                <div className="divide-y divide-gray-100">
                  {cartItems.map((item) => (
                    <div
                      key={`service-${item.id}`}
                      className="p-4 hover:bg-gray-50 transition-colors duration-200 group"
                    >
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-blue-50 transition-colors duration-200">
                          {iconList[item.title]?.icon ? (
                            <span className="h-8 w-8 text-blue-600">{iconList[item.title]?.icon}</span>
                          ) : (
                            <Image
                              src={iconList[item.title]?.src || "/default-service.svg"}
                              width={40}
                              height={40}
                              alt={item.title}
                              className="object-contain"
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-medium text-gray-900 truncate">
                            {item.title}
                            {item.category && <span className="ml-2 text-xs text-gray-500">({item.category})</span>}
                          </h3>
                          <div className="mt-1 flex flex-wrap gap-2">
                            <ButtonLink
                              title="View Details"
                              size="xs"
                              linkTo={item?.link || `/apis/all_apis/${item.id}`}
                              className="text-xs"
                            />
                            <RemoveFromCart refresh={refreshCart} item={item} type="service" />
                          </div>
                        </div>
                        <div className="flex-shrink-0 flex flex-col items-end">
                          <span className="font-medium text-gray-900">{formatINRCurrency(item.price)}</span>
                          <span className="text-xs text-gray-500 mt-1">(GST included)</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Startup Items Section */}
            {startupcartItems.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <div className="bg-green-50 px-4 py-3 border-b border-green-100">
                  <h2 className="font-semibold text-green-800 flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    Startup Services
                  </h2>
                </div>
                <div className="divide-y divide-gray-100">
                  {startupcartItems.map((item) => (
                    <div
                      key={`startup-${item.id}`}
                      className="p-4 hover:bg-gray-50 transition-colors duration-200 group"
                    >
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden group-hover:bg-green-50 transition-colors duration-200">
                          <Image
                            src={item.image || "/default-startup.svg"}
                            width={50}
                            height={50}
                            alt={item.title}
                            className="object-contain"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-medium text-gray-900 truncate">
                            {item.title}
                            {item.category && <span className="ml-2 text-xs text-gray-500">({item.category})</span>}
                          </h3>
                          {item.aboutService && (
                            <p className="mt-1 text-xs text-gray-500 line-clamp-2">{item.aboutService}</p>
                          )}
                          <div className="mt-2 flex flex-wrap gap-2">
                            <ButtonLink
                              title="View Details"
                              size="xs"
                              linkTo={`/register-startup/registration/${item.id}`}
                              className="text-xs"
                            />
                            <RemoveFromCart refresh={refreshCart} item={item} type="startup" />
                          </div>
                        </div>
                        <div className="flex-shrink-0 flex flex-col items-end">
                          <span className="font-medium text-gray-900">
                            {formatINRCurrency(item.priceWithGst || item.price)}
                          </span>
                          <span className="text-xs text-gray-500 mt-1">(GST included)</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Section */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 sticky top-4">
              <div className="bg-gradient-to-r from-blue-50 to-gray-50 px-4 py-3 border-b border-gray-200">
                <h2 className="font-semibold text-gray-800">Order Summary</h2>
              </div>
              <div className="p-5 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatINRCurrency(totalAmount)}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">GST (18%)</span>
                  <span className="font-medium">{formatINRCurrency(0)}</span>
                </div>

                <div className="mt-4 flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="terms-policy"
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                  />
                  <label htmlFor="terms-policy" className="text-sm text-gray-600">
                    I agree to the {" "}
                    <a href="/privacy-policy" className="text-blue-600 hover:underline">
                      Terms and Privacy Policy
                    </a>
                  </label>
                </div>

                <div className="border-t border-gray-200 pt-4 mt-2">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-blue-700">{formatINRCurrency(totalAmount)}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    All prices are inclusive of GST
                  </p>
                </div>

                <button
                  onClick={handlePayment}
                  disabled={!hasItems || !termsAccepted}
                  className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow transition-colors duration-200 flex items-center justify-center gap-2 disabled:bg-blue-300 disabled:cursor-not-allowed"
                >
                  <span>Proceed to Payment</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Secure checkout enabled</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
