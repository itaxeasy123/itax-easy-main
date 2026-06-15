import { Icon } from "@iconify/react";

export default function CardOverview({
  className = "",
  data = [
    {
      label: "Total Income",
      value: "₹4,20,000",
      icon: "mdi:cash-multiple",
      color: "text-green-600 bg-green-100",
    },
    {
      label: "Total Expense",
      value: "₹2,10,000",
      icon: "mdi:cash-minus",
      color: "text-red-600 bg-red-100",
    },
    {
      label: "Net Profit",
      value: "₹2,10,000",
      icon: "mdi:chart-line",
      color: "text-blue-600 bg-blue-100",
    },
  ],
}) {
  return (
    <div
      className={`
        w-full
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        lg:grid-cols-3 
        gap-3
        ${className}
      `}
    >
      {data.map((item, index) => (
        <div
          key={index}
          className="
            bg-white 
            rounded-xl 
            border border-zinc-200
            px-4 py-4
            min-h-[100px]
            flex flex-col justify-between
            shadow-sm
            hover:shadow-md hover:-translate-y-[1px]
            transition-all duration-200
          "
        >
          {/* TOP */}
          <div className="flex items-center justify-between">
            
            <p className="text-l font-semibold text-zinc-600">
              {item.label}
            </p>

            <div
              className={`
                p-2 rounded-md
                flex items-center justify-center
                ${item.color}
              `}
            >
              <Icon icon={item.icon} className="w-5 h-5" />
            </div>

          </div>

          {/* VALUE */}
          <div className="mt-2">
            <h2 className="text-lg sm:text-xl font-bold text-zinc-900">
              {item.value}
            </h2>
          </div>

          {/* BOTTOM LINE (design touch) */}
          <div className="mt-2 h-[2px] w-full bg-zinc-100 rounded-full">
            <div className="h-full w-[60%] bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
          </div>

        </div>
      ))}
    </div>
  );
}