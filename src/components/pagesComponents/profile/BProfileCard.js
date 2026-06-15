
import Image from "next/image"
import { Icon } from "@iconify/react"

const BProfileCard = ({ businessProfile }) => {
  const bData = businessProfile || {};

  // Clean trailing commas and empty spaces from address string safely
  const addressParts = [
    bData.street,
    bData.landmark,
    bData.city,
    bData.dst,
    bData.stcd
  ].filter(Boolean).map(str => String(str).trim());

  const formattedAddress = addressParts.join(", ");

  const profileLabels = {
    businessName: "Name",
    pan: "PAN Card",
    taxpayer_type: "Tax Payer Type",
    status: "Status",
    ctb: "CTB",
    gstin: "GST Number",
  };

  return (
    <div className="bg-white shadow-sm border border-slate-200 rounded-2xl text-slate-900 overflow-hidden hover:shadow-md transition-all duration-300 w-full">

      {/* Cover Image Banner */}
      <div className="relative h-32 sm:h-36 w-full overflow-hidden bg-slate-100">
        <Image
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max"
          alt="Business Profile Cover"
          width={400}
          height={150}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
      </div>

      {/* Avatar Content Section */}
      <div className="relative px-4 sm:px-6 pb-5">
        <div className="mx-auto w-28 h-28 sm:w-32 sm:h-32 relative -mt-14 sm:-mt-16 border-4 border-white rounded-full overflow-hidden shadow-sm bg-white ring-2 ring-blue-100 z-10">
          {bData?.user?.avatar ? (
            <Image
              className="w-full h-full object-cover"
              src={bData.user.avatar}
              alt="User Profile"
              width={128}
              height={128}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-50">
              <Icon className="text-5xl sm:text-6xl text-slate-400" icon="mdi:user" />
            </div>
          )}
        </div>

        {/* Corporate Title Header */}
        <div className="text-center mt-3">
          <h2 className="font-bold text-lg sm:text-xl text-slate-800 tracking-tight px-2 break-words">
            {bData?.businessName || "No Business Registered"}
          </h2>
        </div>

        {/* Information Grid System (Mobile: 2-columns, Tablet/Desktop: 3-columns) */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 mt-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-4">
            {Object.entries(profileLabels).map(([key, labelName]) => (
              <div key={key} className="flex flex-col min-w-0">
                <dt className="text-[11px] font-bold uppercase tracking-wider text-slate-400 truncate" title={labelName}>
                  {labelName}
                </dt>
                <dd className="text-xs sm:text-sm font-semibold text-slate-700 mt-0.5 break-all">
                  {bData[key] ? String(bData[key]).toUpperCase() : "-"}
                </dd>
              </div>
            ))}

            {/* Address Spans Full Width */}
            <div className="flex flex-col col-span-2 sm:col-span-3 pt-3 border-t border-slate-200 min-w-0">
              <dt className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                Registered Office Address
              </dt>
              <dd className="text-xs sm:text-sm font-medium text-slate-600 break-words leading-relaxed capitalize">
                {formattedAddress || "No administrative office address linked setup yet"}
              </dd>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default BProfileCard;