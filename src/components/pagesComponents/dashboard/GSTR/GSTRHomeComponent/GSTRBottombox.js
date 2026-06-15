"use client";
import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import ActionBtn from "../Button";

export default function GSTRBottombox({ utilities, otherLinks, points }) {
  const router = useRouter();

  const utilItems = useMemo(
    () =>
      utilities ?? [
        { label: "Bulk Update", href: "/utilities/bulk-update" },
        { label: "Verify GSTIN", href: "/utilities/verify-gstin" },
        { label: "Reports", href: "/utilities/reports" },
        { label: "Filing Entries", href: "/utilities/filing-entries" },
        { label: "Export Party", href: "/utilities/export-party" },
      ],
    [utilities]
  );

  const otherItems = useMemo(
    () =>
      otherLinks ?? [
        { label: "Other Forms", href: "/links/other-forms" },
        { label: "D Letters", href: "/links/d-letters" },
        { label: "DMS", href: "/links/dms" },
        { label: "Mails", href: "/links/mails" },
        { label: "Logs", href: "/links/logs" },
      ],
    [otherLinks]
  );

  const pointsList = useMemo(() => points ?? [], [points]);

  // FORCE one color on all states; also remove any gradients from inner component
  const btnClass = [
    "rounded-sm border border-slate-300 px-2 py-1 text-[12px] leading-none shadow-sm",
    "bg-none", // drop any gradient
    "!bg-[#b9dbff]", // base color
    "!from-transparent !to-transparent", 
    "hover:!bg-[#b9dbff]",
    "active:!bg-[#b9dbff]",
    "focus:!bg-[#b9dbff]"
  ].join(" ");

  const forceStyle = { backgroundColor: "#b9dbff" };

  const go = (item) => () => {
    if (item?.onClick) return item.onClick();
    if (item?.href) router.push(item.href);
  };

  return (
    <section className="rounded-md border bg-white p-2 shadow-sm w-full max-w-full">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-12">
        {/* Utilities */}
        <div className="md:col-span-6 rounded border border-slate-300 p-2">
          <div className="flex items-center justify-between border-b border-slate-300 bg-white px-2 py-1">
            <h3 className="text-[12px] font-semibold text-rose-700">Utilities</h3>
          </div>

          <div className="-mx-1 flex snap-x snap-mandatory gap-2 overflow-x-auto px-1 py-2 md:flex-wrap md:overflow-visible">
            {utilItems.map((it, idx) => (
              <div key={idx} className="snap-start md:snap-none">
                <ActionBtn
                  title={it.label}
                  onClick={go(it)}
                  className={btnClass}
                  style={forceStyle}
                >
                  {it.label}
                </ActionBtn>
              </div>
            ))}
          </div>
        </div>

        {/* Points to Remember */}
        <div className="md:col-span-2 rounded border border-slate-300">
          <div className="flex items-center justify-between border-b border-slate-300 bg-white px-2 py-1">
            <h3 className="flex items-center gap-1 text-[12px] font-semibold text-sky-700">
              <span className="inline-block h-3 w-3 rounded-full bg-green-500" />
              Points to Remember
            </h3>
          </div>

          <div className="px-2 py-2 text-[12px] min-h-[40px]">
            {pointsList.length === 0 ? (
              <div className="text-slate-500">—</div>
            ) : (
              <ul className="list-disc pl-4 space-y-1">
                {pointsList.map((p, i) => (
                  <li key={i} className="leading-4">{p}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Other Links */}
        <div className="md:col-span-4 rounded border border-slate-300 p-1">
          <div className="flex items-center justify-between border-b border-slate-300 bg-white px-2 py-1">
            <h3 className="text-[12px] font-semibold text-rose-700">Other Links</h3>
          </div>

          <div className="-mx-1 flex snap-x snap-mandatory gap-2 overflow-x-auto px-1 py-2 md:flex-wrap md:overflow-visible">
            {otherItems.map((it, idx) => (
              <div key={idx} className="snap-start md:snap-none">
                <ActionBtn
                  title={it.label}
                  onClick={go(it)}
                  className={btnClass + " flex items-center gap-1"}
                  style={forceStyle}
                >
                  {it.label}
                </ActionBtn>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
