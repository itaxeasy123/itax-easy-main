
"use client";
import { toast } from "react-toastify";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import PageContainer from "../pageLayout/PageContainer.jsx";
import publicAxios from "@/lib/publicAxios.js";
import {
  Loader2,
  MapPin,
  Phone,
  Mail,
  Globe,
  CheckCircle,
  Upload,
  User,
  MapPinIcon,
  FileText,
} from "lucide-react";

const MAX_FILE_BYTES = 1024 * 1024; // 1MB

const Career = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      gender: "",
      address: "",
      pin: "",
      cv: null,
    },
  });

  const backendBase = useMemo(
    () => process.env.NEXT_PUBLIC_API_URL,
    []
  );

  const validateFile = (file) => {
    if (!file) return "Resume PDF is required";
    if (file.type !== "application/pdf") return "Only PDF files are accepted";
    if (file.size > MAX_FILE_BYTES) return "File size should be less than 1 MB";
    return null;
  };

  const handleFileChange = (e) => {
    const file = e?.target?.files?.[0];

    if (!file) {
      setUploadedFile(null);
      setValue("cv", null);
      return;
    }

    const fileErr = validateFile(file);
    if (fileErr) {
      toast.error(fileErr);
      setUploadedFile(null);
      setValue("cv", null);
      e.target.value = "";
      return;
    }

    setUploadedFile({
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2),
    });
  };

  const handleReset = () => {
    reset();
    setUploadedFile(null);
    setSubmitted(false);

    // Clear file input value
    const input = document.getElementById("cv");
    if (input) input.value = "";
  };

  const onSubmit = async (body) => {
    try {
      if (!backendBase) {
        toast.error("Backend URL missing. Set NEXT_PUBLIC_API_URL in .env.local");
        return;
      }

      const file = body?.cv?.[0];
      const fileErr = validateFile(file);
      if (fileErr) {
        toast.error(fileErr);
        return;
      }

      setLoading(true);

      const formData = new FormData();
      formData.append("name", body.name.trim());
      formData.append("email", body.email.trim());
      formData.append("mobile", body.mobile.trim());
      formData.append("gender", body.gender);
      formData.append("address", body.address.trim());
      formData.append("pin", body.pin.trim());
      formData.append("skills", "Available in CV");
      formData.append("cv", file);

      // ✅ IMPORTANT: no manual Content-Type header here
      const { data } = await publicAxios.post("/career/create", formData);

      if (data?.success) {
        toast.success(data?.message || "Application submitted successfully!");
        setSubmitted(true);
        setUploadedFile(null);
        reset();
        const input = document.getElementById("cv");
        if (input) input.value = "";
        return;
      }

      toast.error(data?.message || "Server error - please try again");
    } catch (error) {
      console.error("Career submit error:", error);

      let msg = "An error occurred while submitting your application";

      if (error?.response?.data?.message) {
        msg = error.response.data.message;
      } else if (error?.message) {
        if (String(error.message).includes("Network Error")) {
          msg = "Network error - please check your connection or try again later";
        } else if (String(error.message).toLowerCase().includes("timeout")) {
          msg = "Request timeout - please try again";
        } else {
          msg = error.message;
        }
      }

      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer className="p-4">
      <div className="max-w-6xl mx-auto bg-white">
        {/* Header */}
        <div className="bg-[#3C7CDD] text-white text-center py-4 mb-6 rounded-lg">
          <h1 className="text-2xl font-semibold">Career Application</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Form Section */}
          <div className="flex-1">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Application Submitted!
                  </h3>
                  <p className="text-gray-600 mb-4">
                    We will review your application and get back to you soon.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-2 bg-[#3C7CDD] hover:bg-[#2A5EBB] text-white rounded transition-colors"
                  >
                    Submit Another Application
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Personal Info */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-3">
                        <User className="w-4 h-4 text-[#3C7CDD]" />
                        <h3 className="font-semibold text-gray-900">
                          Personal Info
                        </h3>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Enter your name"
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-[#3C7CDD] focus:border-[#3C7CDD]"
                          {...register("name", { required: "Name required" })}
                        />
                        {errors.name && (
                          <p className="text-red-500 text-xs mt-1">
                            {String(errors.name.message)}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          placeholder="your@email.com"
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-[#3C7CDD] focus:border-[#3C7CDD]"
                          {...register("email", {
                            required: "Email required",
                            pattern: {
                              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                              message: "Enter a valid email",
                            },
                          })}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1">
                            {String(errors.email.message)}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Phone number"
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-[#3C7CDD] focus:border-[#3C7CDD]"
                          {...register("mobile", {
                            required: "Phone required",
                            pattern: {
                              value: /^[0-9]{10}$/,
                              message: "Enter 10 digit mobile number",
                            },
                          })}
                        />
                        {errors.mobile && (
                          <p className="text-red-500 text-xs mt-1">
                            {String(errors.mobile.message)}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Gender <span className="text-red-500">*</span>
                        </label>
                        <select
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-[#3C7CDD] focus:border-[#3C7CDD]"
                          {...register("gender", {
                            required: "Gender required",
                          })}
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="others">Others</option>
                        </select>
                        {errors.gender && (
                          <p className="text-red-500 text-xs mt-1">
                            {String(errors.gender.message)}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Location */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-3">
                        <MapPinIcon className="w-4 h-4 text-[#3C7CDD]" />
                        <h3 className="font-semibold text-gray-900">
                          Location
                        </h3>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Address <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          rows="3"
                          placeholder="Complete address"
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-[#3C7CDD] focus:border-[#3C7CDD] resize-none"
                          {...register("address", {
                            required: "Address required",
                          })}
                        />
                        {errors.address && (
                          <p className="text-red-500 text-xs mt-1">
                            {String(errors.address.message)}
                          </p>
                        )}
                      </div>


                                            <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                       Skills <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Skills"
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-[#3C7CDD] focus:border-[#3C7CDD]"
                          {...register("skills", {
                            required: "Skills required",
                          })}
                        />
                        {errors.pin && (
                          <p className="text-red-500 text-xs mt-1">
                            {String(errors.pin.message)}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          PIN Code <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="PIN code"
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-[#3C7CDD] focus:border-[#3C7CDD]"
                          {...register("pin", {
                            required: "PIN required",
                            pattern: {
                              value: /^[0-9]{6}$/,
                              message: "Enter 6 digit PIN",
                            },
                          })}
                        />
                        {errors.pin && (
                          <p className="text-red-500 text-xs mt-1">
                            {String(errors.pin.message)}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Resume Upload */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-3">
                        <FileText className="w-4 h-4 text-[#3C7CDD]" />
                        <h3 className="font-semibold text-gray-900">Resume</h3>
                      </div>

                      <div className="border-2 border-dashed border-gray-300 rounded p-4 text-center">
                        <input
                          type="file"
                          id="cv"
                          className="hidden"
                          accept="application/pdf"
                          {...register("cv", {
                            required: "Resume required",
                            onChange: handleFileChange,
                          })}
                        />

                        <label htmlFor="cv" className="cursor-pointer">
                          {uploadedFile ? (
                            <div>
                              <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                              <p className="text-sm font-medium text-green-700">
                                {uploadedFile.name}
                              </p>
                              <p className="text-xs text-green-600">
                                {uploadedFile.size} MB
                              </p>
                            </div>
                          ) : (
                            <div>
                              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-600">
                                Upload CV/Resume
                              </p>
                              <p className="text-xs text-gray-500">
                                PDF only, max 1MB
                              </p>
                            </div>
                          )}
                        </label>

                        {errors.cv && (
                          <p className="text-red-500 text-xs mt-2">
                            {String(errors.cv.message)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 px-4 py-2 bg-[#3C7CDD] hover:bg-[#2A5EBB] disabled:bg-gray-400 text-white rounded transition-colors flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Application"
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition-colors"
                    >
                      Reset
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Contact Section */}
          <div className="lg:w-80">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Contact Info</h3>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#3C7CDD] mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Head Office</p>
                    <p className="text-xs text-gray-600">
                      1. G - 41, Gandhi Nagar, Near Defense Colony, Padav Gwalior 474002 (M.P)
                    </p>
                    <br />
                    <p className="text-xs text-gray-600">
                      2. Sat1,811, Logix Zest Blossom, Get No 3 sector 143 Noida 201305 (U.P)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#3C7CDD] mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Phone</p>
                    <p className="text-xs text-gray-600">+918770877270</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#3C7CDD] mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Email</p>
                    <p className="text-xs text-gray-600">info@itaxeasy.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Globe className="w-4 h-4 text-[#3C7CDD] mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Website</p>
                    <p className="text-xs text-gray-600">https://itaxeasy.com/</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  © {new Date().getFullYear()} ITaxEasy. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Small dev hint (optional) */}
        {!backendBase ? (
          <p className="text-xs text-red-600 mt-4">
            Missing NEXT_PUBLIC_API_URL in frontend env.
          </p>
        ) : null}
      </div>
    </PageContainer>
  );
};

export default Career;
