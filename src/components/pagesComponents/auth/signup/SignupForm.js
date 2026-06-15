'use client';

import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { I } from '@/components/iconify/I';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import regex from '@/utils/regex';
import userbackAxios from '@/lib/userbackAxios';

const formClassName = {
  Label: 'text-sm font-medium',
  Input:
    'w-full py-2 px-3 text-slate-900 mt-1 outline-none border focus:border-primary rounded disabled:opacity-60 disabled:cursor-not-allowed',
  Error: 'text-xs text-red-500 mt-1',
};

const signupSchema = Yup.object({
  firstName: Yup.string().trim().required('First name is required'),
  middleName: Yup.string().trim().nullable(),
  lastName: Yup.string().trim().required('Last name is required'),
  email: Yup.string().email('This email is invalid*').required('Email is required'),
  phone: Yup.string()
    .required('Phone number is required')
    .matches(/^\d{10}$/, 'Phone number must be 10 digits'),
  password: Yup.string()
    .required('Password is required')
    .matches(/^(?=.*[a-z])(?=.*\d).{8,}$/, 'Password must have at least 8 characters, one digit and one lowercase letter'),
  confirmPassword: Yup.string()
    .required('Confirm Password is required*')
    .oneOf([Yup.ref('password')], 'Confirm Password must match password'),

  // ✅ JS-safe: no generics
  // Use string + oneOf to restrict allowed values
  gender: Yup.string()
    .oneOf(['male', 'female', 'other'], 'Invalid gender')
    .required('Gender is required'),

  pin: Yup.string()
    .trim()
    .matches(regex?.PIN_RGX ?? /^\d{6}$/, 'Enter a valid PIN Code')
    .nullable(),
  address: Yup.string().trim().nullable(),
});





export default function SignupForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      gender: 'male',
      pin: '',
      address: '',
    },
    mode: 'onSubmit',
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordVisible2, setIsPasswordVisible2] = useState(false);

  // Abort in-flight request if unmount
  const abortRef = useRef(null);
  useEffect(() => {
    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, []);

  const onSendOtp = useCallback(async (formData) => {
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const {
        firstName,
        middleName,
        lastName,
        gender,
        pin,
        phone,
        email,
        password,
        address,
      } = formData;

  const response = await userbackAxios.post(
  "/user/sign-up",
  {
    firstName,
    middleName: middleName || undefined,
    lastName: lastName || undefined,
    email,
    phone,
    gender,                 // ✅ male | female | other
    pin: pin || undefined,
    address: address || undefined,
    password,
    userType: "normal"      // ✅ type nahi, userType
  },
  { signal: controller.signal }
);


      const { data } = response;

      if (response.status === 200 && data?.data?.verified === true) {
        // Dev mode: account auto-verified, no OTP — go straight to login.
        toast.success(data.message || 'Account created. Please log in.');
        router.push('/login');
      } else if (response.status === 200 && data?.data?.otp_key) {
        toast.success(data.message || 'OTP sent successfully');
        router.push(`/verify-otp?email=${encodeURIComponent(email)}&otp_key=${encodeURIComponent(data.data.otp_key)}`);
      } else {
        toast.error(data?.message || 'Failed to send OTP. Please try again.');
      }
    } catch (error) {
      if (error?.name === 'CanceledError' || error?.name === 'AbortError') return;

      if (error?.response?.status === 409) {
        toast.info('User already exists! Please login with your email address.');
      } else if (error?.response?.status === 500) {
        toast.error('Something went wrong. Please try again later.');
      } else {
        toast.error(error?.response?.data?.message || 'Failed to sign up. Please try again.');
      }
    } finally {
      abortRef.current = null;
    }
  }, [router]);

  return (
    <div className="flex justify-center">
      <form
        className="lg:w-2/3 shadow-lg rounded-md bg-neutral-50 p-4 sm:max-w-2xl py-4 sm:p-8"
        onSubmit={handleSubmit(onSendOtp)}
        noValidate
      >
        <h1 className="text-2xl font-bold text-center mb-8">Create Your Account</h1>

        <ul className="grid gap-2">
          <li>
            <label className={formClassName.Label} htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              className={formClassName.Input}
              maxLength={20}
              autoComplete="given-name"
              {...register('firstName')}
            />
            {errors.firstName && <p className={formClassName.Error}>{errors.firstName.message}</p>}
          </li>

          <li>
            <label className={formClassName.Label} htmlFor="middleName">Middle Name</label>
            <input
              type="text"
              id="middleName"
              maxLength={25}
              className={formClassName.Input}
              autoComplete="additional-name"
              {...register('middleName')}
            />
            {errors.middleName && <p className={formClassName.Error}>{errors.middleName.message}</p>}
          </li>

          <li>
            <label className={formClassName.Label} htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              maxLength={25}
              className={formClassName.Input}
              autoComplete="family-name"
              {...register('lastName')}
            />
            {errors.lastName && <p className={formClassName.Error}>{errors.lastName.message}</p>}
          </li>

          <li>
            <label className={formClassName.Label} htmlFor="email">
              Email <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              id="email"
              placeholder="📧 Enter your email"
              className={formClassName.Input}
              autoComplete="email"
              {...register('email')}
            />
            {errors.email && <p className={formClassName.Error}>{errors.email.message}</p>}
          </li>

          <li>
            <label className={formClassName.Label} htmlFor="phone">
              Phone Number <span className="text-red-600">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="📞 Enter 10 digit phone number"
              className={formClassName.Input}
              autoComplete="tel"
              inputMode="numeric"
              {...register('phone')}
            />
            {errors.phone && <p className={formClassName.Error}>{errors.phone.message}</p>}
          </li>

          <li className="relative">
            <label className={formClassName.Label} htmlFor="password">
              Password <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                placeholder="🔑 Enter password"
                id="password"
                className={formClassName.Input}
                autoComplete="new-password"
                {...register('password')}
              />
              <I
                onClick={() => setIsPasswordVisible(v => !v)}
                icon={isPasswordVisible ? 'mdi:eye' : 'mdi:eye-off'}
                className="select-none text-zinc-500 absolute top-[50%] right-[10px] -translate-y-[40%] text-xl cursor-pointer"
                role="button"
                aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
              />
            </div>
            {errors.password && <p className={formClassName.Error}>{errors.password.message}</p>}
          </li>

          <li>
            <label className={formClassName.Label} htmlFor="confirmPassword">
              Confirm password <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <input
                type={isPasswordVisible2 ? 'text' : 'password'}
                id="confirmPassword"
                placeholder="🔑 Confirm your password"
                className={formClassName.Input}
                autoComplete="new-password"
                {...register('confirmPassword')}
              />
              <I
                onClick={() => setIsPasswordVisible2(v => !v)}
                icon={isPasswordVisible2 ? 'mdi:eye' : 'mdi:eye-off'}
                className="select-none text-zinc-500 absolute top-[50%] right-[10px] -translate-y-[40%] text-xl cursor-pointer"
                role="button"
                aria-label={isPasswordVisible2 ? 'Hide password' : 'Show password'}
              />
            </div>
            {errors.confirmPassword && <p className={formClassName.Error}>{errors.confirmPassword.message}</p>}
          </li>

          <li>
            <label className={formClassName.Label} htmlFor="gender">
              Gender <span className="text-red-600">*</span>
            </label>
            <select
              id="gender"
              className={formClassName.Input}
              {...register('gender')}
              defaultValue="male"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              {/* MUST be 'other', not 'others' */}
              <option value="other">Other</option>
            </select>
            {errors.gender && <p className={formClassName.Error}>{errors.gender.message}</p>}
          </li>

          <li>
            <label className={formClassName.Label} htmlFor="pin">PIN Code</label>
            <input
              type="text"
              id="pin"
              className={formClassName.Input}
              inputMode="numeric"
              autoComplete="postal-code"
              {...register('pin')}
            />
            {errors.pin && <p className={formClassName.Error}>{errors.pin.message}</p>}
          </li>

          <li className="sm:col-span-2">
            <label className={formClassName.Label} htmlFor="address">Address</label>
            <textarea
              id="address"
              className={formClassName.Input}
              autoComplete="street-address"
              rows={3}
              {...register('address')}
            />
          </li>
        </ul>

        <div className="pt-4 text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="py-2 px-4 w-[50%] bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="inline-block w-4 h-4 border-white border-b-zinc-400 border-r-zinc-400 border-2 border-solid rounded-full animate-spin"></span>
            ) : (
              'Submit'
            )}
          </button>
        </div>

        <div className="flex justify-center pt-4">
          Forgot Password ?
          <Link className="ml-2 text-blue-600 font-bold" href="/reset-password">
            Reset
          </Link>
        </div>

        <div className="flex text-sm font-semibold justify-center pt-4">
          Already have an account?
          <Link className="ml-2 text-blue-600 font-bold" href="/login">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}

