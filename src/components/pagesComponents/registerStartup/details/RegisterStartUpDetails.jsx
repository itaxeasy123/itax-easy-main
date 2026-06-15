'use client';

import Image from 'next/image';
import Loader from '@/components/partials/loading/Loader';
import { useCallback, useEffect, useState } from 'react';
import userbackAxios from '@/lib/userbackAxios';
import axios from 'axios';
import { formatINRCurrency } from '@/utils/utilityFunctions';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-toastify';
import AddToCart from './AddtoCart';
import useAuth from '@/hooks/useAuth';

const validateFile = (file) => {
  if (!file) return false;

  const actualFile = file[0];

  if (actualFile) {
    const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    const isValidType = validTypes.includes(actualFile.type);
    const isValidSize = actualFile.size <= 1 * 1024 * 1024; // 1MB
    return isValidType && isValidSize;
  }
  return false;
};

const fileSchema = z
  .any()
  .refine((file) => file instanceof FileList, { message: 'Must be a file' })
  .refine(validateFile, {
    message: 'File must be a PDF or Image and less than 1MB',
  });

const userDocuments = z.object({
  aadhaarCard: fileSchema,
  panCard: fileSchema,
  gstCertificate: fileSchema,
  photo: fileSchema,
});

function RegisterStartUpDetails({ params }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      aadhaarCard: null,
      panCard: null,
      gstCertificate: null,
      photo: null,
    },
    resolver: zodResolver(userDocuments),
  });
  const { token, currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [serviceData, setServiceData] = useState(null);
  const [showAbout, setShowAbout] = useState(true);
  const [startupData, setStartupData] = useState({});
  const [isInCart, setIsInCart] = useState(false);

  const getStartupData = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data, status } = await userbackAxios.get(
        `/Startup/getOne/${+params.serviceId}`,
      );
      console.log("Startup data:", data);
      console.log("Status:", status);
      
      if (status === 200 && data) {
        setStartupData(data);
      }
    } catch (error) {
      console.log(error.message);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [params.serviceId]);

  const checkIfInCart = useCallback(async () => {
    try {
      if (!token || !startupData?.id) return;
      
      setIsLoading(true);
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/cartStartup/`,
        console.log("Checking cart for startup ID:", process.env.NEXT_PUBLIC_API_URL),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (data?.data && Array.isArray(data.data)) {
        // Check if item exists in cart
        const itemExists = data.data.some(cartItem => 
          cartItem.id === startupData.id || cartItem.startupId === startupData.id
        );
        setIsInCart(itemExists);
        console.log(`Item ${startupData.id} in cart: ${itemExists}`);
      } else {
        setIsInCart(false);
      }
    } catch (error) {
      console.error("Error checking cart status:", error);
      setIsInCart(false);
    } finally {
      setIsLoading(false);
    }
  }, [token, startupData]);

  const getServiceData = async () => {
    try {
      const { status, data } = await userbackAxios.get(`/registration`);
      if (status === 200) {
        const stuff = data?.data[0];
        if (stuff) {
          setServiceData(stuff);
        }
      }
    } catch (error) {
      setIsError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const submitHandler = async (rawData) => {
    try {
      setIsLoading(true);
      if (!startupData || !startupData.id) {
        return toast.error('Service details not found!');
      }

      const body = userDocuments.parse(rawData);
      const formData = new FormData();

      formData.append('serviceId', startupData.id);
      formData.append('userId', currentUser?.id);
      Object.keys(body).forEach((key) => formData.append(key, body[key][0]));

      const { status, data } = await userbackAxios.post(`/registration`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      if (status === 201) {
        await getServiceData();
        toast.success(
          'Successfully uploaded your documents, Our admins will call you soon.',
        );
      }
    } catch (error) {
      toast.error(error.message ?? 'Server error');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle cart status change
  const handleCartStatusChange = (cartStatus) => {
    console.log("Cart status changed to:", cartStatus);
    setIsInCart(cartStatus);
  };

  useEffect(() => {
    getStartupData();
  }, [getStartupData]);

  useEffect(() => {
    if (token && currentUser) {
      getServiceData();
    }
  }, [token, currentUser]);

  useEffect(() => {
    if (token && startupData?.id) {
      checkIfInCart();
    }
  }, [token, startupData, checkIfInCart]);

  return (
    <>
      {isLoading ? (
        <Loader fullScreen />
      ) : (
        <div className="my-10 mx-2 md:mx-10 lg:mx-20 flex flex-col lg:flex-row gap-5 p-5 text-slate-900 bg-slate-50">
          <div className="flex flex-col lg:w-4/12 gap-3 mt-4 text-center rounded-2xl border border-slate-200 bg-white shadow-sm p-6 h-fit">
            <Image
              src={startupData?.image}
              alt={startupData?.title || "Service image"}
              width={200}
              height={200}
              className="mx-auto"
            />
            <h3 className="text-2xl font-bold text-slate-900">{startupData?.title}</h3>
            <div className="text-xl font-bold text-slate-900">
              Price <span>{formatINRCurrency(startupData?.priceWithGst)}</span>
              <span className="text-xs font-medium text-slate-500"> Incl. GST</span>
            </div>
            {!isLoading && startupData && (
              <AddToCart
                item={startupData}
                alreadyInCart={isInCart}
                onCartStatusChange={handleCartStatusChange}
              />
            )}
          </div>
          <div className="w-full rounded-2xl border border-slate-200 bg-white shadow-sm p-5">
            <h3 className="text-2xl font-bold text-slate-900 text-center border-b border-slate-200 pb-3 mx-auto max-w-3xl">
              {startupData?.title}
            </h3>
            <div className="flex flex-col lg:flex-row mt-4 gap-3">
              <button
                className={`w-full lg:w-1/2 text-base font-semibold py-2 rounded-xl transition ${showAbout ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                onClick={() => {
                  setShowAbout(true);
                }}
              >
                About
              </button>
              <button
                className={`w-full lg:w-1/2 text-base font-semibold py-2 rounded-xl transition ${!showAbout ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                onClick={() => {
                  setShowAbout(false);
                }}
              >
                Documents Required
              </button>
            </div>
            {showAbout ? (
              <div className="mt-4 text-xl leading-8 p-5">
                <p className="whitespace-pre-wrap text-justify text-lg font-medium text-slate-600 mb-5">
                  {startupData?.aboutService}
                </p>
              </div>
            ) : (
              <>
                {!serviceData ? (
                  <div className="mt-5 text-base leading-8 lg:ml-5">
                    <h4 className="text-center font-bold text-slate-900 mb-5 text-base sm:text-2xl">
                      Documents required for registration
                    </h4>
                    <div>
                      <form
                        onSubmit={handleSubmit(submitHandler)}
                        className="flex flex-col gap-5"
                      >
                        <div className="flex justify-between flex-wrap items-center gap-2 sm:gap-0">
                          <label htmlFor="aadhaar" className="text-slate-700 font-medium">
                            Aadhaar Card (PDF or Image):
                          </label>
                          <input
                            type="file"
                            {...register('aadhaarCard')}
                            id="aadhaar"
                            accept=".pdf, .jpg, .jpeg, .png"
                            required
                            className="text-sm text-slate-600 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
                          />
                          {errors.aadhaarCard && (
                            <span className="text-rose-600">
                              {errors.aadhaarCard.message}
                            </span>
                          )}
                        </div>

                        <div className="flex justify-between flex-wrap items-center gap-2 sm:gap-0">
                          <label htmlFor="pan" className="text-slate-700 font-medium">PAN Card (PDF or Image):</label>
                          <input
                            type="file"
                            {...register('panCard')}
                            id="pan"
                            accept=".pdf, .jpg, .jpeg, .png"
                            required
                            className="text-sm text-slate-600 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
                          />
                          {errors.panCard && (
                            <span className="text-rose-600">
                              {errors.panCard.message}
                            </span>
                          )}
                        </div>

                        <div className="flex justify-between flex-wrap items-center gap-2 sm:gap-0">
                          <label htmlFor="gst" className="text-slate-700 font-medium">
                            GST Certificate (PDF or Image):
                          </label>
                          <input
                            type="file"
                            {...register('gstCertificate')}
                            id="gst"
                            accept=".pdf, .jpg, .jpeg, .png"
                            required
                            className="text-sm text-slate-600 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
                          />
                          {errors.gstCertificate && (
                            <span className="text-rose-600">
                              {errors.gstCertificate.message}
                            </span>
                          )}
                        </div>

                        <div className="flex justify-between flex-wrap items-center gap-2 sm:gap-0">
                          <label htmlFor="photo" className="text-slate-700 font-medium">Photo (PDF or Image):</label>
                          <input
                            type="file"
                            {...register('photo')}
                            id="photo"
                            accept=".pdf, .jpg, .jpeg, .png"
                            required
                            className="text-sm text-slate-600 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
                          />
                          {errors.photo && (
                            <span className="text-rose-600">
                              {errors.photo.message}
                            </span>
                          )}
                        </div>

                        <button
                          className="mt-5 bg-blue-600 text-white font-semibold rounded-xl py-2.5 hover:bg-blue-700 transition"
                          type="submit"
                        >
                          Upload Documents
                        </button>
                      </form>
                    </div>
                  </div>
                ) : (
                  <div className="mt-5 text-base leading-8 lg:ml-5 flex justify-center items-center">
                    <h3 className="my-4 text-xl font-medium text-slate-600">
                      We have successfully received your documents! Our Team
                      will contact you further
                    </h3>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default RegisterStartUpDetails;
