"use client";
import React, { useEffect, useState, useCallback, useRef, useMemo } from "react";
import { getCookie } from "cookies-next";
import Filter from "../Filter";
import ActionBtn from "../Button";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useReactToPrint } from "react-to-print";
import handleExport from "@/helper/ExcelExport";
import userAxios from "@/lib/userAxios";
import { useGstin } from "@/contexts/GstinContext";
import { useAuth } from "@/context/AuthContext";

/* ----------------------- Helpers ----------------------- */
const validateFinancialYear = (year) => {
  if (!year || year === "Choose..") return false;
  const patterns = [/^FY\s?\d{4}-\d{2}$/, /^\d{4}-\d{2}$/, /^\d{4}-\d{4}$/];
  return patterns.some((pattern) => pattern.test(year));
};
const validateGSTIN = (gstin) =>
  /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z{1}[0-9A-Z]{1}$/.test(
    gstin || ""
  );

// Map frontend Return type → backend expected gstr format
const mapReturnToGstr = (ret) =>
  (ret || "").toUpperCase().replace(/\s+/g, "").replace("-", ""); // GSTR-1 → GSTR1

const quarterToMonths = {
  Q1: ["April", "May", "June"],
  Q2: ["July", "August", "September"],
  Q3: ["October", "November", "December"],
  Q4: ["January", "February", "March"],
};
const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];
const getQuarterForDate = (d = new Date()) => {
  const m = d.getMonth();
  if (m >= 3 && m <= 5) return "Q1";
  if (m >= 6 && m <= 8) return "Q2";
  if (m >= 9 && m <= 11) return "Q3";
  return "Q4";
};
const getFyStartYearForDate = (d = new Date()) => {
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  return m < 4 ? y - 1 : y;
};
const buildFyOptions = (uptoStartYear) => {
  const arr = [];
  for (let y = 2010; y <= uptoStartYear; y++) {
    const label = `${y}-${(y + 1).toString().slice(-2)}`;
    arr.unshift(label);
  }
  return arr;
};

/* ------------------- NavigationBar ------------------- */
export function NavigationBar() {
  const router = useRouter();
  const { token } = useAuth(); // in-memory access token (reactive)
  const pdf_ref = useRef(null);

  // GSTIN Context
  const { gstin, setGstin } = useGstin();

  // Defaults based on today
  const now = new Date();
  const initialQuarter = getQuarterForDate(now);
  const initialMonthName = MONTH_NAMES[now.getMonth()];
  const initialFyStartYear = getFyStartYearForDate(now);

  const [autoSync, setAutoSync] = useState(true);
  const [fyOptions, setFyOptions] = useState(() =>
    buildFyOptions(initialFyStartYear)
  );
  const [fy, setFy] = useState(fyOptions[0]);
  const [period, setPeriod] = useState(initialQuarter);
  const [monthOptions, setMonthOptions] = useState(
    quarterToMonths[initialQuarter]
  );
  const [month, setMonth] = useState(
    quarterToMonths[initialQuarter].includes(initialMonthName)
      ? initialMonthName
      : quarterToMonths[initialQuarter][0]
  );
  const [regType, setRegType] = useState("Regular");
  const [retType, setRetType] = useState("GSTR-1");
  const regTypeOptions = ["Regular", "Composition"];
  const returnOptionsForReg = useMemo(() => ({
    Regular: ["GSTR-1", "GSTR-3B", "GSTR-9"],
    Composition: ["GSTR-4"],
  }), []);
  const [retTypeOptions, setRetTypeOptions] = useState(
    returnOptionsForReg[regType]
  );

  // API/UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const headers = {
    "Return Type": "rtntype",
    "Arn Number": "arn",
    "Date of Filing": "dof",
    "Mode of Filing": "mof",
    "Return Period": "ret_prd",
    Status: "status",
    Valid: "valid",
  };

  /* Keep month & return types aligned */
  useEffect(() => {
    const months = quarterToMonths[period] || [];
    setMonthOptions(months);
    if (!months.includes(month)) setMonth(months[0] || "");
  }, [period, month]);

  useEffect(() => {
    const retOpts = returnOptionsForReg[regType] || [];
    setRetTypeOptions(retOpts);
    if (!retOpts.includes(retType)) setRetType(retOpts[0] || "");
  }, [regType, retType, returnOptionsForReg]);

  /* Calendar auto-sync */
  const syncByCalendar = useCallback(
    (date = new Date()) => {
      const startYear = getFyStartYearForDate(date);
      const newFyOpts = buildFyOptions(startYear);
      setFyOptions(newFyOpts);
      if (!newFyOpts.includes(fy)) setFy(newFyOpts[0]);

      if (autoSync) {
        const q = getQuarterForDate(date);
        const monthName = MONTH_NAMES[date.getMonth()];
        setPeriod(q);
        const months = quarterToMonths[q] || [];
        setMonthOptions(months);
        setMonth(months.includes(monthName) ? monthName : months[0] || "");
      }
    },
    [autoSync, fy]
  );

  useEffect(() => {
    syncByCalendar(new Date());
    const nowLocal = new Date();
    const nextMidnight = new Date(
      nowLocal.getFullYear(),
      nowLocal.getMonth(),
      nowLocal.getDate() + 1,
      0, 0, 0, 0
    );
    const msUntilMidnight = nextMidnight.getTime() - nowLocal.getTime();
    const firstTimeout = setTimeout(() => {
      syncByCalendar(new Date());
      const dailyInterval = setInterval(
        () => syncByCalendar(new Date()),
        24 * 60 * 60 * 1000
      );
      window.__dailyCalendarSync = dailyInterval;
    }, msUntilMidnight);
    return () => {
      clearTimeout(firstTimeout);
      if (window.__dailyCalendarSync) {
        clearInterval(window.__dailyCalendarSync);
        delete window.__dailyCalendarSync;
      }
    };
  }, [syncByCalendar]);

  useEffect(() => {
    if (autoSync) syncByCalendar(new Date());
  }, [autoSync, syncByCalendar]);

  /* ✅ API call: trackGSTReturn */
  const fetchReturns = useCallback(async () => {
    if (!token) {
      setError("No token found. Please login.");
      toast.error("No token found. Please login.");
      return;
    }
    if (!validateGSTIN(gstin) || !validateFinancialYear(fy)) {
      toast.error("Invalid GSTIN or Financial Year");
      return;
    }
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const payload = {
        gstin,
        financial_year: fy,
        gstr: mapReturnToGstr(retType),
      };
      const result = await userAxios.post(`/gst/return/track`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const apiData = result?.data || result;
      if (!apiData?.success) {
        throw new Error(apiData?.message || "API responded with success:false");
      }
      sessionStorage.setItem("gstTrackData", JSON.stringify(apiData));
      setData(apiData);
      toast.success("Return status fetched successfully!");
      router.push("/gst-dashboard/track-results");
    } catch (err) {
      console.error("❌ fetchReturns error:", err);
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to fetch return status";
      toast.error(msg);
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [token, gstin, fy, retType, router]);

  /* Excel export */
  const handleExcelExport = async () => {
    const stored = sessionStorage.getItem("gstTrackData");
    const parsed = stored ? JSON.parse(stored) : data;
    const body = parsed?.data?.data?.data?.EFiledlist || [];
    const excelData = {
      "Track Gst Return": {
        headers,
        bodyData: body,
        bannerData: [
          {
            text: "Blaze",
            fontSize: 25,
            fontBold: true,
            textColor: "fffffff",
            backgroundColor: "FF3C7CDD",
            startRow: 1,
            endRow: 1,
            startCol: 1,
            endCol: 24,
            height: 60,
          },
          
          {
            text: "Track GST return",
            fontSize: 11,
            backgroundColor: "fef9c3",
            startRow: 2,
            endRow: 2,
            startCol: 1,
            endCol: 24,
            height: 40,
          },
        ],
      },
    };
    await handleExport(excelData, "Track_GST_Return");
  };

  const generatePDF = useReactToPrint({
    content: () => pdf_ref.current,
    documentTitle: "track-gst-return",
  });

  return (
    <section className="rounded-2xl border bg-white p-3 shadow-sm">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2 mr-3">
          <input
            id="autoSync"
            type="checkbox"
            checked={autoSync}
            onChange={(e) => setAutoSync(e.target.checked)}
            className="h-4 w-4 accent-blue-600"
          />
        </div>
        <label htmlFor="autoSync" className="text-sm mr-4 select-none"></label>

        <div>
          <label className="text-sm mr-1">GSTIN:</label>
          <input
            type="text"
            value={gstin || ""}
            onChange={(e) => setGstin(e.target.value)}
            className="border rounded p-1 text-sm"
            placeholder="Enter GSTIN"
            inputMode="text"
            autoCapitalize="characters"
            spellCheck={false}
          />
        </div>

        <Filter label="F.Y:" value={fy} onChange={setFy} options={fyOptions} />
        <Filter label="Period:" value={period} onChange={setPeriod} options={["Q1","Q2","Q3","Q4"]} />
        <Filter label="Month:" value={month} onChange={setMonth} options={monthOptions} />
        <Filter label="Reg. Type:" value={regType} onChange={setRegType} options={["Regular","Composition"]} />
        <Filter label="Return:" value={retType} onChange={setRetType} options={retTypeOptions} />
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap items-center pt-2 gap-2">
        <ActionBtn onClick={fetchReturns} disabled={loading}>
          {loading ? " Return Status Checking..." : "Check Return Status"}
        </ActionBtn>
        <ActionBtn onClick={() => router.push("/gst-dashboard/permanentinfo")} variant="secondary">Permanent Information</ActionBtn>
        <ActionBtn onClick={() => router.push("/gst-dashboard/registration")} variant="secondary">Registration Details</ActionBtn>
        <ActionBtn onClick={() => setIsOpen(true)} variant="primary">Login</ActionBtn>
        <ActionBtn onClick={handleExcelExport} variant="secondary">Export Excel</ActionBtn>
        <ActionBtn onClick={generatePDF} variant="secondary">Export PDF</ActionBtn>
      </div>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
          <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 w-full max-w-md z-10">
            <h2 className="text-xl font-bold text-center mb-4 text-gray-800 dark:text-white">GST Login</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium">GSTIN</label>
                <input type="text" placeholder="Enter your GSTIN" className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium">Username</label>
                <input type="text" placeholder="Enter your username" className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium">Password</label>
                <input type="password" placeholder="Enter your password" className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition">Login</button>
            </form>
            <button onClick={() => setIsOpen(false)} className="absolute top-2 right-2">✕</button>
          </div>
        </div>
      )}

      <div ref={pdf_ref} className="hidden" />
    </section>
  );
}
