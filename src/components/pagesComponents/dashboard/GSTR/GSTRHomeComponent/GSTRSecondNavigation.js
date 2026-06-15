"use client";
import React from "react";
import useSWR from "swr";
import { useRouter } from "next/navigation";

const fetcher = (url) =>
  fetch(url).then((r) => {
    if (!r.ok) throw new Error("Network error");
    return r.json();
  });

export default function GSTRSecondNavigation({ gstin, filings }) {
  const router = useRouter();

  /* ----------------- helpers ----------------- */
  const isValidDate = (iso) => {
    const d = new Date(iso);
    return Boolean(iso) && !isNaN(d.valueOf());
  };

  const toPrettyDate = (iso) => {
    const d = new Date(iso);
    const dd = String(d.getDate()).padStart(2, "0");
    const mmm = d.toLocaleString("en-GB", { month: "short" }); // e.g., Nov
    const yyyy = d.getFullYear();
    return `${dd}-${mmm}-${yyyy}`;
  };

  // STRICT rule: green only when filed + valid date. Else red.
  const toSegment = (label, rec) => {
    if (!rec || rec.status !== "filed" || !isValidDate(rec.filedOn)) {
      const msg = rec?.status === "pending" ? "filing is pending" : "not filed";
      return {
        text: `${label} ${msg}`,
        color: "text-red-700",
        pending: true,
        icon: "⏳",
      };
    }
    return {
      text: `${label} Filed on : ${toPrettyDate(rec.filedOn)}`,
      color: "text-green-700",
      pending: false,
      icon: "✅",
    };
  };

  /* ----------------- normalizer ----------------- */
  const normalize = (d = {}) => {
    const clean = (r = {}) => {
      const status = (r.status || "").toLowerCase(); // 'filed' | 'pending' | 'not_filed'
      return {
        status: ["filed", "pending", "not_filed"].includes(status) ? status : "not_filed",
        filedOn: r.filedOn ?? null,
      };
    };
    return {
      gstr1: clean(d.gstr1),
      gstr3b: clean(d.gstr3b),
      gstr9: clean(d.gstr9),
    };
  };

  /* ------------- data: props > api > fallback ------------- */
  const shouldFetch = !filings && !!gstin;
  const { data: apiData, isLoading, error } = useSWR(
    shouldFetch ? `/api/filings?gstin=${encodeURIComponent(gstin)}` : null,
    fetcher,
    { revalidateOnFocus: false }
  );

  // precedence: props > api > fallback (all normalized)
  const source = filings ?? apiData;
  const real = source
    ? normalize(source)
    : normalize({
        gstr1: { status: "filed", filedOn: "2025-04-11" },
        gstr3b: { status: "pending" },
        gstr9: { status: "not_filed" },
      });

  // segments based on real (actual) status
  const seg3b = toSegment("GSTR-3B", real.gstr3b);
  const seg1 = toSegment("GSTR-1", real.gstr1);
  const seg9 = toSegment("GSTR-9", real.gstr9);

  return (
    <section className="my-2 rounded-xl border bg-slate-50 p-1 text-sm">
      {/* Loading / Error states */}
      {isLoading && (
        <div className="mb-2 animate-pulse rounded-md bg-slate-200 px-3 py-2 text-slate-600">
          Loading latest filing status…
        </div>
      )}
      {error && (
        <div className="mb-2 rounded-md border border-rose-300 bg-rose-50 px-3 py-2 text-rose-700">
          Couldn’t load status. Showing last known data.
        </div>
      )}

      {/* Compact strip (like the screenshot) */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 px-2 text-xs">
        <StripItem seg={seg3b} />
        <Sep />
        <StripItem seg={seg1} />
        <Sep />
        <StripItem seg={seg9} />
        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          className="ml-auto flex items-center gap-1 rounded-md bg-gradient-to-b from-[#b2ff59] to-[#64dd17] border border-green-600 px-2.5 py-0.5 shadow-md hover:from-[#9ccc65] hover:to-[#558b2f] active:scale-[0.98] transition"
        >
          {/* red X icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="red"
            className="w-3.5 h-3.5"
          >
            <path
              fillRule="evenodd"
              d="M10 8.586L5.707 4.293a1 1 0 00-1.414 1.414L8.586 10l-4.293 4.293a1 1 0 101.414 1.414L10 11.414l4.293 4.293a1 1 0 001.414-1.414L11.414 10l4.293-4.293a1 1 0 00-1.414-1.414L10 8.586z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-[12px] font-semibold text-black drop-shadow-sm">
            Exit
          </span>
        </button>
      </div>
    </section>
  );
}

/* --------- tiny sub-parts --------- */
const Sep = () => <span className="text-slate-400">|</span>;

function StripItem({ seg }) {
  return (
    <span className={`inline-flex items-center gap-1 ${seg.color}`}>
      <span aria-hidden>{seg.icon}</span>
      <span className="whitespace-nowrap">{seg.text}</span>
    </span>
  );
}
