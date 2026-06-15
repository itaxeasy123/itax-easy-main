"use client";
import React, { useState } from "react";
import DashSection from "@/components/pagesComponents/pageLayout/DashSection";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import userAxios from "@/lib/userAxios";
import { useRouter } from "next/navigation";


const createAgentSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  phone: yup.string().required("Phone number is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  gender: yup.string().required("Gender is required"),
  address: yup.string().required("Address is required"),
});

export default function Create_Agents() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createAgentSchema),
  });

  const onFormSubmit = async (data) => {
    try {
      setLoading(true);
      setError("");
      setSuccess(false);

      const resp = await userAxios.post("/user/sign-up-agent", {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        phone: data.phone,
        gender: data.gender,
        address: data.address,
      });

      if (resp?.status === 200 || resp?.status === 201) {
        setSuccess(true);
        reset();

        setTimeout(() => {
          router.push("/dashboard/admin/network");
        }, 1500);
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to create agent"
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
  "w-full h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  return (
    <DashSection
      title={
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Create Agent
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Add a new agent to your network
          </p>
        </div>
      }
      className="mt-4"
    >
      <div className="max-w-3xl mx-auto">
        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="border-b border-slate-200 px-5 py-4">
            <h2 className="text-xl font-semibold text-slate-900">
              Agent Information
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Fill all required details to create an agent account.
            </p>
          </div>

          {/* Alerts */}
          <div className="px-6 pt-5">
            {error && (
              <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-600 text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-green-700 text-sm">
                Agent created successfully.
              </div>
            )}
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onFormSubmit)}
            className="p-2 md:p-3"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* First Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  First Name
                </label>

                <input
                  type="text"
                  {...register("firstName")}
                  className={inputClass}
                  placeholder="Enter first name"
                />

                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Last Name
                </label>

                <input
                  type="text"
                  {...register("lastName")}
                  className={inputClass}
                  placeholder="Enter last name"
                />

                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address
                </label>

                <input
                  type="email"
                  {...register("email")}
                  className={inputClass}
                  placeholder="Enter email address"
                />

                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mobile Number
                </label>

                <input
                  type="tel"
                  {...register("phone")}
                  className={inputClass}
                  placeholder="Enter mobile number"
                />

                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Password
                </label>

                <input
                  type="password"
                  {...register("password")}
                  className={inputClass}
                  placeholder="Enter password"
                />

                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Gender */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Gender
                </label>

                <select
                  {...register("gender")}
                  className={inputClass}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>

                {errors.gender && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.gender.message}
                  </p>
                )}
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Address
                </label>

                <textarea
                  rows={3}
                  {...register("address")}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-700 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-100 resize-none"
                  placeholder="Enter complete address"
                />

                {errors.address && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.address.message}
                  </p>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={() => router.back()}
                className="h-12 px-6 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="h-12 px-8 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition disabled:opacity-50"
              >
                {loading ? "Creating Agent..." : "Create Agent"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashSection>
  );
}
