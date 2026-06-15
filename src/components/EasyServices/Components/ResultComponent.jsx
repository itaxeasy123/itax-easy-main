"use client"

const ResultComponent = ({ details, dispatch, title }) => {
  // Group details into two columns for better space utilization
  const leftColumnDetails = details.slice(0, 6)
  const rightColumnDetails = details.slice(6)

  return (
    <div className="overflow-hidden">
      <div className="flex flex-col space-y-4">
        {/* GSTIN and Registration Date - Most important info at the top */}
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 mb-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-500">{details[0].label}</span>
              <span className="text-base font-semibold text-gray-800">{details[0].value || "Not Available"}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-500">{details[1].label}</span>
              <span className="text-base font-semibold text-gray-800">{details[1].value || "Not Available"}</span>
            </div>
          </div>
        </div>

        {/* Two column layout for remaining details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
          {/* Left column */}
          <div className="space-y-2">
            {leftColumnDetails.slice(2).map((detail, index) => (
              <div key={index} className="p-2 bg-white rounded border border-gray-100">
                <div className="flex justify-between items-start">
                  <span className="text-sm font-medium text-gray-500 w-2/5">{detail.label}</span>
                  <span className="text-sm font-semibold text-gray-800 w-3/5 text-right">
                    {detail.value || "Not Available"}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Right column */}
          <div className="space-y-2">
            {rightColumnDetails.map((detail, index) => (
              <div key={index} className="p-2 bg-white rounded border border-gray-100">
                <div className="flex justify-between items-start">
                  <span className="text-sm font-medium text-gray-500 w-2/5">{detail.label}</span>
                  <span className="text-sm font-semibold text-gray-800 w-3/5 text-right">
                    {detail.value || "Not Available"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

   
      </div>
    </div>
  )
}

export default ResultComponent
