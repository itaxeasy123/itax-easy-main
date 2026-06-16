
'use client';

import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { toast } from 'react-toastify';

import { I } from '@/components/iconify/I';
import userbackAxios from '@/lib/userbackAxios';
import regex from '@/utils/regex';
import { useAuth } from '@/context/AuthContext';

const formClassName = {
  Label: 'text-sm font-medium',
  Input:
    'w-full py-2 px-3 mt-1 outline-none border rounded focus:border-primary disabled:opacity-60 disabled:cursor-not-allowed',
  Error: 'text-xs text-red-600 mt-1',
};

export default function LoginForm() {
  const router = useRouter();
 const { handleLoginSuccess } = useAuth();  // 🔥 IMPORTANT

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // ✅ stable email regex
  const EMAIL_RGX = useMemo(
    () =>
      regex?.EMAIL_RGX instanceof RegExp
        ? regex.EMAIL_RGX
        : /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    []
  );

  // abort controller
  const abortRef = useRef(null);
  useEffect(() => {
    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, []);

  const onLogin = useCallback(
    async ({ email, password }) => {
      if (!EMAIL_RGX.test(email)) {
        toast.error('Please enter a valid email address');
        return;
      }

      if (!password) {
        toast.error('Password is required');
        return;
      }

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await userbackAxios.post(
          '/user/login',
          { email, password },
          { signal: controller.signal }
        );

        const token = res?.data?.data?.token;
        const user = res?.data?.data?.user;

        if (res.status === 200 && token && user?.userType) {
          // 🔥 LIGHT USER (ENUM SAFE)
          const lightUser = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            userType: user.userType, // admin | normal | agent | superadmin
            verified: user.verified,
          };

          // 🔥 SINGLE SOURCE OF TRUTH
          handleLoginSuccess(token, lightUser);

          toast.success('Login successful');

          // Return to the page the user was trying to reach (e.g. the ITR
          // form), else the home/landing page.
          const redirect =
            typeof window !== 'undefined'
              ? new URLSearchParams(window.location.search).get('redirect')
              : null;
          router.replace(redirect && redirect.startsWith('/') ? redirect : '/');

          return;
        }

        toast.error(res?.data?.message || 'Invalid login');
      } catch (error) {
        if (error?.name === 'CanceledError' || error?.name === 'AbortError') {
          return;
        }

        const status = error?.response?.status;
        const data = error?.response?.data;
        const message = data?.message;

        // Unverified account: backend returns 403 with needsVerification and a
        // fresh otp_key. Send the user to the OTP screen; on success it
        // auto-logs them in (from=login) and lands them on the landing page.
        if (status === 403 && data?.needsVerification) {
          toast.info(message || 'Please verify your email');
          const otpKey = data?.data?.otp_key;
          const qs = new URLSearchParams({ email });
          if (otpKey != null) qs.set('otp_key', String(otpKey));
          qs.set('from', 'login');
          router.push(`/verify-otp?${qs.toString()}`);
          return;
        }

        toast.error(message || 'Something went wrong');
      } finally {
        abortRef.current = null;
      }
    },
    [EMAIL_RGX, router, handleLoginSuccess]
  );

  return (
    <form
      className="shadow-lg bg-neutral-50 p-4 sm:max-w-sm mx-auto rounded-lg py-4 sm:p-8"
      onSubmit={handleSubmit(onLogin)}
      noValidate
    >
      <h1 className="text-2xl font-bold text-center mb-8">Login</h1>

      <ul className="grid gap-3">
        <li>
          <label className={formClassName.Label} htmlFor="email">
            Email <span className="text-red-600">*</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="📧 Enter your email"
            className={formClassName.Input}
            disabled={isSubmitting}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: EMAIL_RGX,
                message: 'Enter a valid email',
              },
            })}
          />
          {errors.email && (
            <p className={formClassName.Error}>{errors.email.message}</p>
          )}
        </li>

        <li>
          <label className={formClassName.Label} htmlFor="password">
            Password <span className="text-red-600">*</span>
          </label>
          <div className="relative">
            <input
              id="password"
              type={isPasswordVisible ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="🔑 Enter your password"
              className={formClassName.Input}
              disabled={isSubmitting}
              {...register('password', {
                required: 'Password is required',
              })}
            />
            <I
              icon={isPasswordVisible ? 'mdi:eye' : 'mdi:eye-off'}
              onClick={() => setIsPasswordVisible(v => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xl cursor-pointer text-zinc-500"
            />
          </div>
          {errors.password && (
            <p className={formClassName.Error}>{errors.password.message}</p>
          )}
        </li>
      </ul>

      <div className="pt-4 text-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="py-2 px-4 w-[50%] bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl disabled:opacity-60"
        >
          {isSubmitting ? (
            <span className="inline-block w-4 h-4 border-2 border-white border-b-transparent rounded-full animate-spin" />
          ) : (
            'Login'
          )}
        </button>
      </div>

      <div className="flex text-sm justify-center pt-2 font-semibold">
        Forgot Password?
        <Link href="/reset-password" className="ml-2 text-blue-600 hover:underline">
          Reset
        </Link>
      </div>

      <div className="flex justify-center text-sm font-semibold">
        Don&apos;t have an account?
        <Link href="/signup" className="ml-2 text-blue-600 hover:underline">
          Signup
        </Link>
      </div>
    </form>
  );
}
