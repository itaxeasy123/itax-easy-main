'use client';
import React from 'react';
import useSWR from 'swr';
import ActionBtn from '../Button';
import { useRouter } from 'next/navigation';

/* =========================================================
   Fetch helper
   ========================================================= */
const fetcher = (url) =>
  fetch(url).then((r) => {
    if (!r.ok) throw new Error('Network error');
    return r.json();
  });

/* =========================================================
   Small helpers
   ========================================================= */
function fmtINR(n) {
  const v = Number.isFinite(+n) ? +n : 0;
  return v.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function fmtCell(v) {
  if (v === null || v === undefined || v === '') return '';
  return Number(v).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

/* ---------- demo fallback MATRIX (until API) ---------- */
const DEMO_MATRIX = {
  A: {
    supplyValue: 1797506.09,
    igst: null,
    cgst: 161775.55,
    sgst: 161775.55,
    cess: null,
  },
  B: {
    supplyValue: 1853483.92,
    igst: null,
    cgst: 166813.55,
    sgst: 166813.55,
    cess: null,
  },
  C: {},
  D: {},
  E: {},
  F: {},
  G: {},
  H: {
    supplyValue: null,
    igst: null,
    cgst: 161775.55,
    sgst: 161775.55,
    cess: null,
  },
};

/* =========================================================
   LEFT: SupplyMatrix (A–H table like screenshot)
   ========================================================= */
function emptyRow() {
  return { supplyValue: null, igst: null, cgst: null, sgst: null, cess: null };
}
function normalizeMatrix(d = {}) {
  const pick = (r = {}) => ({
    supplyValue: isFinite(+r.supplyValue) ? +r.supplyValue : null,
    igst: isFinite(+r.igst) ? +r.igst : null,
    cgst: isFinite(+r.cgst) ? +r.cgst : null,
    sgst: isFinite(+r.sgst) ? +r.sgst : null,
    cess: isFinite(+r.cess) ? +r.cess : null,
  });
  const out = {};
  letters.forEach((L) => {
    out[L] = d[L] ? pick(d[L]) : emptyRow();
  });
  return out;
}

function SupplyMatrix({
  gstin,
  matrix,
  activeTab,
  setActiveTab,
  actions = {},
}) {
  const router = useRouter();
  const shouldFetch = !matrix && !!gstin;
  const { data } = useSWR(
    shouldFetch ? `/api/supplies?gstin=${encodeURIComponent(gstin)}` : null,
    fetcher,
    { revalidateOnFocus: false },
  );

  // precedence: props > api > DEMO
  const source = matrix ?? data ?? DEMO_MATRIX;
  const rows = normalizeMatrix(source);

  function ActionButton(props) {
    const { className = '', children } = props;
    const base =
      'inline-flex items-center rounded border border-slate-300 bg-gradient-to-b from-slate-100 to-slate-200 font-semibold';
    if (props.href) {
      return (
        <a
          href={props.href}
          target={props.target || '_self'}
          className={`${base} ${className}`}
        >
          {children}
        </a>
      );
    }

    return (
      <button
        type="button"
        onClick={props.onClick}
        className={`${base} ${className}`}
      >
        {children}
      </button>
    );
  }

  // Indian format for RIGHT table only
  const fmt = (n) =>
    n == null || Number.isNaN(n)
      ? ''
      : new Intl.NumberFormat('en-IN', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(n);

  // safe defaults + merge incoming actions
  const safeActions = {
    gstr1: { onClick: () => {} },
    gstr2: { onClick: () => {} },
    utilizedItc: { onClick: () => {} },
    challanDetail: { onClick: () => {} },
    ...actions,
  };

  return (
    <div className="rounded-2xl border bg-white p-3 shadow-sm w-full max-w-full overflow-hidden">
      {/* grid: stacks on mobile, left+right on md+ */}
      <div className="mt-2 grid grid-cols-1 md:grid-cols-[minmax(220px,280px),1fr] gap-2 w-full">
        {/* LEFT rail (compact) */}
        <div className="px-1 w-full max-w-full">
          <div className="space-y-1 text-[10.5px] sm:text-[11px] leading-tight">
            <ActionButton
              {...(safeActions.gstr1 || { href: '/gst-dashboard/outword' })}
              className="px-2 py-1 text-[10.5px] sm:text-[11px]"
            >
              <span className="ml-1">
                {' '}
                A Outward Supplies Liability (GSTR-1)
              </span>
            </ActionButton>

            <ActionButton
              {...(safeActions.gstr2 || { href: '/gst-dashboard/inword' })}
              className="px-1 py-1 text-[10.5px] sm:text-[11px]"
            >
              <span className="ml-1"> B Inward Supplies Credit (GSTR-2)</span>
            </ActionButton>

            <div className="rounded border border-slate-300 bg-white px-2 py-1 font-semibold break-words">
              <span className="ml-1">
                Net Tax Liability on Outward Supply: (A - C)
              </span>
            </div>

            <div className="ml-2">
              <span className="ml-1 text-slate-700 text-[11px]">
                Add: Tax Liability on Inward Supply
              </span>
            </div>

            <div className="rounded border border-slate-300 bg-white px-2 py-1 font-semibold break-words">
              <span className="ml-1">Total Tax Payable in Cash: (D + E)</span>
            </div>

            <div className="mt-2 grid grid-cols-2 gap-2">
              <button
                onClick={safeActions.challanDetail?.onClick}
                className="rounded border border-slate-400 bg-gradient-to-b from-slate-100 to-slate-200 px-1 py-1 text-[10.5px] sm:text-[11px] font-semibold text-slate-800 hover:from-slate-200 hover:to-slate-300"
              >
                Challan Detail
              </button>
            </div>

            <div className="rounded border border-slate-300 bg-white px-2 py-1 font-semibold break-words">
              <span className="inline-block text-slate-600">G</span>
              <span className="ml-1">Balance GST Due: (F - G)</span>
            </div>
          </div>
        </div>

        {/* RIGHT table */}
        <div className="p-2 w-full max-w-full overflow-x-auto">
          {/* table-auto + w-full prevents layout overflow; container can scroll horizontally if needed */}
          <table className="table-auto w-full border border-slate-300 text-[11.5px] sm:text-[13px]">
            <thead className="bg-slate-100 text-slate-800">
              <tr>
                <th className="w-8 sm:w-10 border border-slate-300 px-1.5 sm:px-2 py-1 text-left"></th>
                <th className="border border-slate-300 px-1.5 sm:px-2 py-1 text-left">
                  Supply Value
                </th>
                <th className="border border-slate-300 px-1.5 sm:px-2 py-1 text-center whitespace-nowrap">
                  IGST
                </th>
                <th className="border border-slate-300 px-1.5 sm:px-2 py-1 text-center whitespace-nowrap">
                  CGST
                </th>
                <th className="border border-slate-300 px-1.5 sm:px-2 py-1 text-center whitespace-nowrap">
                  SGST
                </th>
                <th className="border border-slate-300 px-1.5 sm:px-2 py-1 text-center whitespace-nowrap">
                  CESS
                </th>
              </tr>
            </thead>
            <tbody>
              {letters.map((L, i) => {
                const r = rows[L] || emptyRow();
                const shaded = i === 1;
                return (
                  <tr key={L} className={shaded ? 'bg-slate-50' : ''}>
                    <td className="border border-slate-300 px-1.5 sm:px-2 py-1 font-medium text-slate-600">
                      {L}
                    </td>
                    <td className="border border-slate-300 px-1.5 sm:px-2 py-1 text-left tabular-nums break-words">
                      {fmt(r.supplyValue)}
                    </td>
                    <td className="border border-slate-300 px-1.5 sm:px-2 py-1 text-center tabular-nums">
                      {fmt(r.igst)}
                    </td>
                    <td className="border border-slate-300 px-1.5 sm:px-2 py-1 text-center tabular-nums">
                      {fmt(r.cgst)}
                    </td>
                    <td className="border border-slate-300 px-1.5 sm:px-2 py-1 text-center tabular-nums">
                      {fmt(r.sgst)}
                    </td>
                    <td className="border border-slate-300 px-1.5 sm:px-2 py-1 text-center tabular-nums">
                      {fmt(r.cess)}
                    </td>
                  </tr>
                );
              })}
            </tbody>

            <tfoot>
              <tr>
                <td colSpan={6} className="border-t-2 border-slate-700" />
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   RIGHT: LedgerPanel (GST portal UI)
   ========================================================= */

function LedgerPanel({ warning }) {
  const headers = [
    'Integrated Tax',
    'Central Tax',
    'State/UI Tax',
    'Cess',
    'Total',
  ];
  const rows = ['Tax', 'Interest', 'Fee', 'Penalty', 'Others', 'Total'];

  return (
    <div className="space-y-3 w-full max-w-full">
      {/* Warning */}
      {warning && (
        <div className="rounded-md border border-rose-200 bg-white shadow-sm">
          <div className="border-b border-rose-200 bg-rose-50 px-3 py-1.5 text-[12px] sm:text-[13px] font-semibold text-rose-700">
            {warning.title}
          </div>
          <div className="px-3 py-2 text-[12px] sm:text-[13px] text-rose-700">
            {(warning.lines || []).map((l, i) => (
              <div key={i} className="leading-5 break-words">
                • {l}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ledger card */}
      <section>
        <h3 className="text-sm font-semibold text-sky-700 mb-3">
          Cash Ledger Balance
        </h3>
        <div className="overflow-x-auto border border-gray-300 rounded-lg">
          <table className="w-full text-xs text-center border-collapse table-auto">
            <thead>
              <tr className="bg-gray-200 text-sm">
                <th className="p-2 border font-medium">
                  {/* Increased height and consistent text size */}Description
                </th>
                {headers.map((header, index) => (
                  <th key={index} className="p-2 border font-medium">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIdx) => (
                <tr key={rowIdx} className="odd:bg-white even:bg-gray-50">
                  <td className="p-2 border font-medium">{row}</td>
                  {headers.map((_, colIdx) => (
                    <td key={colIdx} className="p-2 border text-sm">
                      0
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function LedgerRow({ label, value }) {
  return (
    <div className="grid grid-cols-[1fr,minmax(88px,100px)] items-center border-b text-[12px] sm:text-[13px]">
      <div className="px-3 py-1.5 font-medium">{label}</div>
      <div className="px-3 py-1.5 text-right">{value}</div>
    </div>
  );
}

/* =========================================================
   PAGE: GSTR Ledger Component (wraps both columns)
   ========================================================= */
export default function GSTRLedgerComponent({
  gstin,
  matrix,
  ledger,
  lateFees,
  warning,
}) {
  const shouldFetchLedger = !ledger && !!gstin;
  const { data: ledgerApi } = useSWR(
    shouldFetchLedger ? `/api/ledger?gstin=${encodeURIComponent(gstin)}` : null,
    fetcher,
    { revalidateOnFocus: false },
  );
  const router = useRouter();

  const [activeTab, setActiveTab] = React.useState('Outword');

  // links for left-rail actions
  const actions = {
    gstr1: { href: '/gst-dashboard/outword' },
    gstr2: { href: '/gst-dashboard/inword' },
    // utilizedItc: { href: "/ledger/itc-utilization" },
    // challanDetail: { href: "/payments/challan" },
  };

  return (
    <section className="my-2 grid grid-cols-1 gap-2 lg:grid-cols-[1fr,minmax(300px,340px)] w-full max-w-full">
      {/* Left: matrix */}
      <SupplyMatrix
        gstin={gstin}
        matrix={matrix}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        actions={actions}
      />

      {/* Right: ledger panel */}
      <LedgerPanel
        onLedgerDetails={() => alert('Open Ledger Details')}
        onPMT09={() => alert('Go to PMT-09')}
        onGSTR3BLateFees={() => alert('Open GSTR-3B Late Fees')}
        onGSTR1LateFees={() => alert('Open GSTR-1 Late Fees')}
        onAnnualReturn={() => alert('Open Annual Return (GSTR-9)')}
        onGstr9c={() => alert('Open GSTR-9C')}
      />
    </section>
  );
}
