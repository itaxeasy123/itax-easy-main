
"use client";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

import userAxios from "@/lib/userAxios";
import { useBusiness } from "@/context/BusinessContext";

/* ==============================
   CHILD FORM (READ ONLY)
============================== */
function BusinessProfile_Form({ watch }) {
  const field =
    "border border-blue-600/10 rounded w-full py-2 px-3 min-h-[42px]";

  return (
    <ul className="grid md:grid-cols-2 gap-4 p-2">
      <li>
        <label className="text-blue-700 font-semibold text-sm">Trade Name</label>
        <div className={field}>{watch?.businessName}</div>
      </li>

      <li>
        <label className="text-blue-700 font-semibold text-sm">PAN</label>
        <div className={field}>{watch?.pan}</div>
      </li>

      <li>
        <label className="text-blue-700 font-semibold text-sm">
          Tax Payer Type
        </label>
        <div className={field}>{watch?.tan}</div>
      </li>

      <li>
        <label className="text-blue-700 font-semibold text-sm">GST Number</label>
        <div className={field}>{watch?.gstin}</div>
      </li>

      <li>
        <label className="text-blue-700 font-semibold text-sm">Status</label>
        <div className={field}>{watch?.bankName}</div>
      </li>

      <li>
        <label className="text-blue-700 font-semibold text-sm">CTB</label>
        <div className={field}>{watch?.bankAccountNo}</div>
      </li>

      <li className="col-span-2">
        <label className="text-blue-700 font-semibold text-sm">Address</label>
        <div className={field}>{watch?.address}</div>
      </li>
    </ul>
  );
}

/* ==============================
   MAIN COMPONENT
============================== */
export default function BusinessProfile() {
  const { setSelectedBusiness } = useBusiness(); // ⭐ CONTEXT

  const [panDetails, setPanDetails] = useState(null);
  const [panAddress, setPanAddress] = useState("");
  const [createBusiness, setCreateBusiness] = useState(true);
  const [businessProfile, setBusinessProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, getValues } = useForm();

  /* ==============================
     LOAD EXISTING BUSINESS
  ============================== */
  useEffect(() => {
    userAxios
      .get("/business/profile")
      .then((res) => {
        const profile = res.data.data.profile;

        if (profile) {
          setBusinessProfile(profile);
          setSelectedBusiness(profile); // ⭐ HEADER UPDATE
          setCreateBusiness(false);
        }
      })
      .catch(() => {});
  }, [setSelectedBusiness]);

  /* ==============================
     CREATE BUSINESS (FIXED)
  ============================== */
  const handleCreateBusinessProfile = () => {
    const payload = {
      businessName: panDetails?.tradeNam,
      gstin: panDetails?.gstin,
      pan: getValues("pan"),
      tan: panDetails?.dty,
      address: panAddress,
      bankName: panDetails?.sts,
      bankAccountNo: panDetails?.ctb,
    };

    userAxios
      .post("/business", payload)
      .then((res) => {
        const createdBusiness = res.data.data; // ✅ BACKEND RESPONSE

        toast.success("Business Created Successfully");

        // ⭐⭐⭐ MOST IMPORTANT ⭐⭐⭐
        setSelectedBusiness(createdBusiness); // HEADER UPDATE
        setBusinessProfile(createdBusiness);

        setCreateBusiness(false);
      })
      .catch(() => {
        toast.error("Failed to create business");
      });
  };

  /* ==============================
     PAN SEARCH
  ============================== */
  const handlePanInput = () => {
    const pan = getValues("pan");
    const statecode = getValues("statecode");

    if (statecode?.length === 2) {
      setLoading(true);
      userAxios
        .get(`/gst/search/gstin-by-pan?pan=${pan}&gst_state_code=${statecode}`)
        .then((res) => {
          const data = res.data.data[0].data;
          setPanDetails(data);
          setPanAddress(
            `${data.pradr.addr.bno}, ${data.pradr.addr.dst}, ${data.pradr.addr.stcd}`
          );
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  };

  /* ==============================
     UI
  ============================== */
  return (
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* LEFT CARD */}
      <div className="bg-gradient-to-br from-blue-800 to-neutral-900 rounded-md p-6 text-white">
        <Icon
          icon="mdi:office-building"
          className="text-7xl mb-4 bg-white text-black rounded-xl p-4"
        />
        <div className="text-lg font-semibold">
          {businessProfile?.businessName || "No Business"}
        </div>
        <div className="text-sm opacity-80">
          {businessProfile?.gstin}
        </div>
      </div>

      {/* RIGHT */}
      {!createBusiness ? (
        <div className="shadow-md border rounded-md p-6">
          <BusinessProfile_Form watch={businessProfile} />
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(handleCreateBusinessProfile)}
          className="shadow-md border rounded-md p-6"
        >
          <input
            placeholder="PAN"
            {...register("pan")}
            onChange={(e) =>
              (e.target.value = e.target.value.toUpperCase())
            }
            className="border p-2 w-full mb-3"
          />

          <input
            placeholder="State Code"
            {...register("statecode", { onChange: handlePanInput })}
            className="border p-2 w-full mb-3"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Please wait..." : "Create Business"}
          </button>
        </form>
      )}
    </div>
  );
}
