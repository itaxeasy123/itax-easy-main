"use client";
import { Icon } from "@iconify/react";

const stats = [
  { name: "Subscribers", stat: "71,897", change: "12%", type: "up" },
  { name: "Open Rate", stat: "58.16%", change: "2.02%", type: "up" },
  { name: "Click Rate", stat: "24.57%", change: "4.05%", type: "down" },
];

export default function DataState() {
  return (
    <div className="space-y-1">

      <p className="text-[11px] text-gray-600">Last 30 days</p>

      {/* RESPONSIVE GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">

        {stats.map((item, i) => (
          <div
            key={i}
            className="border rounded-md px-2 py-2 flex flex-col gap-1"
          >
            <p className="text-[11px] text-gray-500 truncate">
              {item.name}
            </p>

            <div className="flex justify-between items-center">

              <span className="text-sm font-semibold text-indigo-600">
                {item.stat}
              </span>

              <span
                className={`
                  flex items-center px-1.5 py-[2px] rounded text-[10px]
                  ${item.type === "up"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"}
                `}
              >
                <Icon
                  icon={item.type === "up" ? "formkit:arrowup" : "formkit:arrowdown"}
                  className="w-3 h-3 mr-[2px]"
                />
                {item.change}
              </span>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}