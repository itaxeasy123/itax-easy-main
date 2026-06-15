
"use client";
import userAxios from "@/lib/userbackAxios";
import { useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import BProfileCard from "./BProfileCard";
import { toast } from "react-toastify";
import { defaultValuesBsProfile, labelKeyMapping } from "./validation/staticData";
import GreenTick from "./Tick";
import Loader from "./Loader";
import { zodResolver } from "@hookform/resolvers/zod";
import { bsProfileCreateSchema } from "./validation/schemas";
import regex from "@/utils/regex";
import { useRouter } from "next/navigation";
import { PlusCircle, Edit2, Save, X } from "lucide-react";
import { useGstin } from "@/contexts/GstinContext";
import { useBusiness } from "@/context/BusinessContext";

const BusinessProfile = () => {
  const router = useRouter();
  const { setGstin: setCtxGstin } = useGstin();
  const { updateBusiness } = useBusiness();

  const [businessProfile, setBusinessProfile] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingGstDetails, setIsLoadingGstDetails] = useState(false);
  const [editable, setEditable] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [gstDetails, setGstDetails] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
    watch,
    reset,
  } = useForm({
    defaultValues: defaultValuesBsProfile,
    resolver: zodResolver(bsProfileCreateSchema),
  });

  const pan = watch("pan");
  const gstin = watch("gstin");
  const keysToBeCap = ["pan", "gstin"];

  /* ---------------- GST FETCH ---------------- */
  const getGstProfileByGstin = useCallback(async (gstinVal) => {
    try {
      setIsLoadingGstDetails(true);
      const { data, status } = await userAxios.post(`/gst/search/gstin`, {
        gstin: gstinVal,
      });
      if (status === 200 && data?.data?.data) {
        setGstDetails(data.data.data.data);
        toast.success("GST details fetched successfully");
      }
    } catch {
      toast.error("Error while fetching GST profile!");
    } finally {
      setIsLoadingGstDetails(false);
    }
  }, []);

  useEffect(() => {
    if (editable && regex.GSTIN.test(gstin) && isDirty) {
      getGstProfileByGstin(gstin);
    }
  }, [editable, gstin, isDirty, getGstProfileByGstin]);

  /* ---------------- FETCH BUSINESS PROFILE ---------------- */
  const getBusinessProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data, status } = await userAxios.get(`/business/profile`);
      const profile = data?.data?.profile;

      if (status === 200 && profile) {
        setBusinessProfile(profile);
        reset(profile);

        // SYNC WITH HEADER / DASHBOARD
        updateBusiness(profile);

        if (profile?.gstin) setCtxGstin(String(profile.gstin));
      }
    } catch (error) {
      if (error?.response?.status === 404) {
        toast.info("No business profile created yet!");
        return;
      }
      toast.error("Failed to fetch business profile.");
    } finally {
      setIsLoading(false);
    }
  }, [reset, setCtxGstin, updateBusiness]);

  useEffect(() => {
    getBusinessProfile();
  }, [getBusinessProfile]);

  /* ---------------- HANDLERS ---------------- */
  const handleEdit = () => {
    reset(businessProfile?.id ? businessProfile : defaultValuesBsProfile);
    setEditable((v) => !v);
  };

  const onChangeHandler = (key, value) => {
    setValue(key, value);
  };

  /* ---------------- SUBMIT ---------------- */
  const formSubmitHandler = async (body) => {
    try {
      setIsSubmitting(true);
      setIsLoading(true);
      const { data, status } = await userAxios.post(`/business`, body);

      if (status === 200 && data) {
        toast.success(data.message || "Business profile updated successfully");

        // IMMEDIATE UPDATE FOR HEADER
        updateBusiness(body);

        await getBusinessProfile();
        if (body?.gstin) setCtxGstin(body.gstin);
        setEditable(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to create business profile");
    } finally {
      setIsSubmitting(false);
      setIsLoading(false);
    }
  };

  /* ---------------- GST AUTO MAP ---------------- */
  useEffect(() => {
    if (regex.GSTIN.test(gstin)) {
      setValue("statecode", gstin.slice(0, 2));
      setValue("pan", gstin.slice(2, 12));
      setCtxGstin(gstin);
    }
  }, [gstin, setValue, setCtxGstin]);

  useEffect(() => {
    if (gstDetails?.lgnm) {
      const addr = gstDetails?.pradr?.addr;
      if (addr) {
        setValue("businessName", gstDetails.tradeNam || gstDetails.lgnm);
        setValue("taxpayer_type", gstDetails.dty);
        setValue("status", gstDetails.sts);
        setValue("ctb", gstDetails.ctb);
        setValue("street", addr.bno ? `${addr.bno}, ${addr.st}` : addr.st);
        setValue("landmark", addr.landMark);
        setValue("city", addr.loc);
        setValue("dst", addr.dst);
        setValue("stcd", addr.stcd);
      }
    }
  }, [gstDetails, setValue]);

  return (
    <div className="w-full">
      {isLoading ? (
        <div className="flex justify-center items-center h-[60vh] sm:h-[70vh]">
          <Loader />
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 xl:grid-cols-5 items-start">

          {/* Left Panel - Card Dashboard Display */}
          <div className="xl:col-span-2 w-full sticky xl:top-24">
            <BProfileCard businessProfile={businessProfile} />
          </div>

          {/* Right Panel - Configuration Dynamic Form Layout */}
          <div className="xl:col-span-3 bg-white shadow-sm border border-slate-200 rounded-2xl overflow-hidden w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 sm:p-6 border-b border-slate-200 gap-4">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
                {businessProfile?.id ? "Your Business Profile" : "Create Business Profile"}
              </h1>
              {!editable && (
                <button
                  type="button"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-5 rounded-lg shadow-sm hover:shadow transition-all duration-200"
                  onClick={handleEdit}
                >
                  {businessProfile?.id ? (
                    <>
                      <Edit2 size={16} /> Edit Profile
                    </>
                  ) : (
                    <>
                      <PlusCircle size={16} /> Create Profile
                    </>
                  )}
                </button>
              )}
            </div>

            <form className="p-4 sm:p-6" onSubmit={handleSubmit(formSubmitHandler)}>
              <div className="grid gap-x-6 gap-y-5 grid-cols-1 md:grid-cols-2">
                {Object.keys(defaultValuesBsProfile).map((key) => (
                  <div key={key} className="w-full">
                    <label
                      className="flex justify-between uppercase items-center tracking-wider text-slate-600 text-xs font-bold mb-2"
                      htmlFor={key}
                    >
                      <span>{labelKeyMapping[key] || key}</span>
                      {false && <GreenTick />}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed ${
                          errors[key] ? "border-rose-400 bg-rose-50" : "border-slate-300"
                        } ${keysToBeCap.includes(key) ? "placeholder:capitalize uppercase tracking-wider" : ""}`}
                        placeholder={`Enter ${labelKeyMapping[key] || key}`}
                        disabled={!editable}
                        id={key}
                        {...register(key, {
                          onChange: (e) => onChangeHandler(key, e.target.value),
                        })}
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none z-10">
                        {key === "gstin" && isLoadingGstDetails && <Loader />}
                      </div>
                    </div>
                    {errors[key] && (
                      <p className="text-rose-600 text-xs mt-1 font-medium">{errors[key].message}</p>
                    )}
                  </div>
                ))}
              </div>

              {/* Form Action Controls Trigger Panels */}
              {editable && (
                <div className="flex flex-col-reverse sm:flex-row gap-3 justify-end mt-8 border-t border-slate-200 pt-5">
                  <button
                    type="button"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold py-2.5 px-6 rounded-lg transition-all text-sm"
                    onClick={handleEdit}
                  >
                    <X size={16} /> Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg transition-all text-sm shadow-sm hover:shadow disabled:bg-blue-400"
                  >
                    <Save size={16} /> Save Changes
                  </button>
                </div>
              )}
            </form>
          </div>

        </div>
      )}
    </div>
  );
};

export default BusinessProfile;