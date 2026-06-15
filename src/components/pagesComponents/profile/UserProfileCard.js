
'use client';
import { Icon } from "@iconify/react";
import Image from "next/image";

 const UserProfileCard = ({ data = {}, panDetails }) => {
  const profileData = data || {};

  // Form input fields mapping standard key sync (pan instead of panCard)
  const userPan = profileData.pan || profileData.panCard || "";
  const isPanVerified = profileData.ispanlinked || profileData.isPanVerified || profileData.panVerified || (userPan !== "");

  // Check if business profile exists
  const hasBusinessProfile = true;

  // Calculate profile completion percentage dynamically
  const calculateProfileCompletion = () => {
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "gender",
      "address",
      "pin",
      "pan",
      "aadhaar",
      "avatar",
      "businessProfile",
    ];

    const filledFields = requiredFields.filter((field) => {
      if (field === "businessProfile") return hasBusinessProfile;
      if (field === "pan") return isPanVerified;
      return profileData[field] && String(profileData[field]).trim() !== "";
    }).length;

    const percentage = Math.round((filledFields / requiredFields.length) * 100);

    return {
      percentage: percentage || 0,
      filledFields,
      totalFields: requiredFields.length,
    };
  };

  const completion = calculateProfileCompletion();

  // Determine indicator color based on completion level
  const getCompletionColor = (percentage) => {
    if (percentage < 40) return "bg-rose-500 text-rose-600";
    if (percentage < 70) return "bg-amber-500 text-amber-600";
    return "bg-emerald-500 text-emerald-600";
  };

  const completionStyles = getCompletionColor(completion.percentage);
  const barBgColor = completionStyles.split(" ")[0];
  const textIndicatorColor = completionStyles.split(" ")[1];
  const isEmailVerified = profileData.emailVerified || profileData.isEmailVerified || true;
  const isPhoneVerified = profileData.phoneVerified || profileData.isPhoneVerified || (profileData.phone && profileData.phone !== "");

  return (
    <div className="bg-white shadow-sm border border-slate-200 rounded-2xl text-slate-900 overflow-hidden hover:shadow-md transition-all duration-300 w-full">

      {/* Profile Banner Wrapper */}
      <div className="relative h-32 sm:h-40 w-full overflow-hidden bg-slate-200">
        <Image
          src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600&fit=max"
          alt="Profile Cover"
          className="w-full h-full object-cover"
          width={600}
          height={200}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40"></div>
      </div>

      {/* Profile Photo Area */}
      <div className="relative px-4 sm:px-6 pb-6">
        <div className="mx-auto w-28 h-28 sm:w-32 sm:h-32 relative -mt-14 sm:-mt-16 border-4 border-white rounded-full overflow-hidden bg-white ring-2 ring-blue-100 shadow-sm z-10">
          {profileData.avatar ? (
            <Image
              width={128}
              height={128}
              src={profileData.avatar}
              className="w-full h-full object-cover"
              alt="User profile photo"
              unoptimized={profileData.avatar.startsWith('blob:')}
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-slate-50">
              <Icon className="text-5xl sm:text-6xl text-slate-400" icon="mdi:user" />
            </div>
          )}
        </div>

        {/* Identity Headings */}
        <div className="text-center mt-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-800 tracking-tight px-2 break-words">
            {profileData.firstName || profileData.lastName ? `${profileData.firstName || ""} ${profileData.lastName || ""}`.trim() : "Guest User"}
          </h2>
          <p className="text-sm text-slate-500 mt-0.5 px-2 break-all max-w-full truncate">
            {profileData.email || "No email address linked"}
          </p>

          {/* Profile Completion Indicator Container */}
          <div className="mt-4 mb-2 bg-slate-50 p-3 sm:p-4 rounded-xl border border-slate-200 text-left">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs sm:text-sm font-semibold text-slate-700">Profile Progress</span>
              <span className={`text-xs sm:text-sm font-bold ${textIndicatorColor}`}>
                {completion.percentage}%
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${barBgColor} transition-all duration-500 ease-in-out`}
                style={{ width: `${completion.percentage}%` }}
              ></div>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-500 mt-1.5 font-medium">
              {completion.filledFields} of {completion.totalFields} info blocks synchronized
            </p>
          </div>
        </div>

        {/* Details Grid (Responsive Flexbox/Grid Mix) */}
        <div className="mt-5 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

            {/* Contact Information Subcard */}
            <div className="p-3 sm:p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between min-w-0">
              <h3 className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">Contact</h3>
              <div className="text-xs sm:text-sm text-slate-600 space-y-1.5 min-w-0">
                <p className="truncate" title={profileData.email}>
                  <span className="font-semibold text-slate-400">Email:</span> <span className="break-all">{profileData.email || "N/A"}</span>
                </p>
                <p className="truncate">
                  <span className="font-semibold text-slate-400">Phone:</span> <span>{profileData.phone || "N/A"}</span>
                </p>
              </div>
            </div>

            {/* Personal Government KYC Subcard */}
            <div className="p-3 sm:p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between min-w-0">
              <h3 className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">Personal</h3>
              <div className="text-xs sm:text-sm text-slate-600 space-y-1.5">
                <p className="capitalize">
                  <span className="font-semibold text-slate-400">Gender:</span> <span>{profileData.gender || "Not specified"}</span>
                </p>
                <p className="uppercase tracking-wider truncate">
                  <span className="font-semibold text-slate-400 capitalize">PAN:</span> <span>{userPan || "Not linked"}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Address Location Block */}
          <div className="p-3 sm:p-4 bg-slate-50 rounded-xl border border-slate-200 min-w-0">
            <h3 className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider mb-1.5">Registered Address</h3>
            <p className="text-xs sm:text-sm text-slate-600 break-words leading-relaxed">
              {profileData.address ? profileData.address : "No billing address provided setup yet"}
              {profileData.pin && <span className="font-medium text-slate-800">, {profileData.pin}</span>}
            </p>
          </div>

          {/* Interactive Document Verification Badges Matrix */}
          <div className="p-3 sm:p-4 bg-slate-50 rounded-xl border border-slate-200">
            <h3 className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider mb-2.5">Verification Matrix</h3>
            <div className="grid grid-cols-2 gap-x-2 gap-y-3">
              <div className="flex items-center text-xs sm:text-sm min-w-0">
                <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 mr-2 ${isPanVerified ? "bg-emerald-500" : "bg-rose-500"}`}></div>
                <span className="text-slate-600 truncate">PAN Record</span>
              </div>
              <div className="flex items-center text-xs sm:text-sm min-w-0">
                <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 mr-2 ${profileData.aadhaar ? "bg-emerald-500" : "bg-rose-500"}`}></div>
                <span className="text-slate-600 truncate">Aadhaar Status</span>
              </div>
              <div className="flex items-center text-xs sm:text-sm min-w-0">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0 mr-2 bg-emerald-500"></div>
                <span className="text-slate-600 truncate">Business ID</span>
              </div>
              <div className="flex items-center text-xs sm:text-sm min-w-0">
                <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 mr-2 ${isEmailVerified ? "bg-emerald-500" : "bg-rose-500"}`}></div>
                <span className="text-slate-600 truncate">Email Verified</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;