"use client"

import { useRef, useState, useMemo } from "react"
import { useReactToPrint } from "react-to-print"
import { FileSpreadsheet } from "lucide-react"

import handleExport from "@/helper/ExcelExport"
import userAxios from "@/lib/userAxios"
import ServiceToolShell, {
  ToolInput,
  ResultHeader,
} from "../ServiceToolShell"

/* =====================================================
CONFIG
===================================================== */

const API_COOLDOWN = 5000

/* =====================================================
VALIDATION
===================================================== */

const GSTIN_REGEX =
  /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/

/* =====================================================
FY GENERATOR (DYNAMIC)
===================================================== */

const generateFY = () => {

  const list = []

  const year = new Date().getFullYear()

  for (let i = year + 1; i >= 2010; i--) {

    const end = (i + 1).toString().slice(-2)

    list.push(`FY ${i}-${end}`)

  }

  return list

}

/* =====================================================
NORMALIZE FY
===================================================== */

const normalizeFY = (value = "") => {

  if (!value) return null

  const v = value.toUpperCase().replace(/\s+/g, "")

  const match = v.match(/(FY)?(\d{4})-(\d{2}|\d{4})/)

  if (!match) return null

  const start = match[2]

  const end = match[3].length === 4 ? match[3].slice(-2) : match[3]

  return `FY ${start}-${end}`

}

const isValidGSTIN = (gstin) => GSTIN_REGEX.test(gstin)

/* =====================================================
COMPONENT
===================================================== */

export default function Trackgstreturn() {

  const pdf_ref = useRef(null)

  const requestLock = useRef(false)

  const fyList = useMemo(() => generateFY(), [])

  const [gstin, setGstin] = useState("")
  const [year, setYear] = useState("")
  const [showdata, setShowData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [showhide, setShowHide] = useState(false)

  /* =====================================================
SUBMIT
===================================================== */

  const handleSubmit = async (e) => {

    if (e?.preventDefault) e.preventDefault()

    if (requestLock.current) return

    const gstinValue = gstin?.trim()?.toUpperCase()
    const fyNormalized = normalizeFY(year)

    if (!gstinValue) {

      setError(true)
      setErrorMsg("GSTIN is required")

      return

    }

    if (!isValidGSTIN(gstinValue)) {

      setError(true)
      setErrorMsg("Enter a valid 15-digit GSTIN")

      return

    }

    if (!fyNormalized) {

      setError(true)
      setErrorMsg("Enter a valid Financial Year (FY 2024-25)")

      return

    }

    requestLock.current = true

    setLoading(true)
    setError(false)
    setErrorMsg("")
    setShowHide(false)

    try {

      const response = await userAxios.post("/gst/return/track", {

        gstin: gstinValue,
        financial_year: fyNormalized,

      })

      setShowData(response?.data)
      setShowHide(true)

    } catch (err) {

      if (err?.response?.status === 429) {

        setErrorMsg("Too many requests. Please wait a few seconds.")

      } else {

        setErrorMsg("Failed to fetch GST return data.")

      }

      setError(true)
      setShowHide(false)

    } finally {

      setLoading(false)

      setTimeout(() => {

        requestLock.current = false

      }, API_COOLDOWN)

    }

  }

  const manageHandleClear = (e) => {

    if (e?.preventDefault) e.preventDefault()

    setGstin("")
    setYear("")

    setShowData(null)
    setShowHide(false)
    setError(false)
    setErrorMsg("")

  }

  /* =====================================================
EXPORT
===================================================== */

  const generatePDF = useReactToPrint({

    content: () => pdf_ref.current,
    documentTitle: "track-gst-return",

  })

  const headers = {

    "Return Type": "rtntype",
    "Arn Number": "arn",
    "Date of Filing": "dof",
    "Mode of Filing": "mof",
    "Return Period": "ret_prd",
    Status: "status",
    Valid: "valid",

  }

  const handleExcelExport = async () => {

    const rows = showdata?.data?.data?.data?.EFiledlist

    if (!rows?.length) return

    await handleExport({

      "Track GST Return": {
        headers,
        bodyData: rows,
      },

    }, "Track_GST_Return")

  }

  /* =====================================================
UI HELPERS
===================================================== */

  const getStatusColor = (status) => {

    if (status?.toLowerCase().includes("filed"))
      return "bg-emerald-100 text-emerald-700"

    if (status?.toLowerCase().includes("pending"))
      return "bg-amber-100 text-amber-700"

    if (status?.toLowerCase().includes("failed"))
      return "bg-rose-100 text-rose-700"

    return "bg-blue-100 text-blue-700"

  }

  const getValidityColor = (valid) =>
    valid === "Y"
      ? "bg-emerald-100 text-emerald-700"
      : "bg-rose-100 text-rose-700"

  const formatReturnPeriod = (period) => {

    if (!period || period.length !== 6) return period

    const month = parseInt(period.substring(0, 2)) - 1
    const yr = period.substring(2)

    const months = [
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec",
    ]

    return `${months[month]} 20${yr}`

  }

  /* =====================================================
RESULT
===================================================== */

  const rows = showdata?.data?.data?.data?.EFiledlist || []

  const result = showhide ? (
    <div>
      <div className="mb-4 flex flex-col gap-3 border-b border-slate-100 pb-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-800">
            GST Return Filing Status
          </h2>
          <p className="mt-0.5 text-sm text-slate-500">
            Returns filed for {gstin}
          </p>
        </div>
        {rows.length > 0 && (
          <button
            type="button"
            onClick={handleExcelExport}
            className="inline-flex w-fit items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            <FileSpreadsheet className="h-4 w-4" /> Excel
          </button>
        )}
      </div>

      {rows.length === 0 ? (
        <p className="py-6 text-center text-sm text-slate-500">
          No returns found for the selected period.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <th className="px-3 py-2.5 font-medium">Return Type</th>
                <th className="px-3 py-2.5 font-medium">ARN</th>
                <th className="px-3 py-2.5 font-medium">Period</th>
                <th className="px-3 py-2.5 font-medium">Date of Filing</th>
                <th className="px-3 py-2.5 font-medium">Mode</th>
                <th className="px-3 py-2.5 font-medium">Status</th>
                <th className="px-3 py-2.5 font-medium">Valid</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((row, i) => (
                <tr key={i} className="text-slate-700">
                  <td className="px-3 py-2.5 font-semibold text-slate-800">
                    {row.rtntype || "-"}
                  </td>
                  <td className="px-3 py-2.5 break-all">{row.arn || "-"}</td>
                  <td className="px-3 py-2.5">
                    {formatReturnPeriod(row.ret_prd) || "-"}
                  </td>
                  <td className="px-3 py-2.5">{row.dof || "-"}</td>
                  <td className="px-3 py-2.5">{row.mof || "-"}</td>
                  <td className="px-3 py-2.5">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${getStatusColor(
                        row.status,
                      )}`}
                    >
                      {row.status || "-"}
                    </span>
                  </td>
                  <td className="px-3 py-2.5">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${getValidityColor(
                        row.valid,
                      )}`}
                    >
                      {row.valid || "-"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  ) : null

  /* =====================================================
UI
===================================================== */

  return (

    <ServiceToolShell
      title="Track GST Return"
      formTitle="Track GST Return"
      formSubtitle="Check the filing status of GST returns by GSTIN and financial year"
      icon="ph:receipt"
      onSearch={handleSubmit}
      onClear={manageHandleClear}
      onDownload={generatePDF}
      canDownload={showhide}
      loading={loading}
      result={result}
      error={error ? errorMsg : null}
      resultRef={pdf_ref}
    >

      <ToolInput
        label="GSTIN"
        value={gstin}
        maxLength={15}
        onChange={(e) => setGstin(e.target.value.toUpperCase())}
        onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
        placeholder="22AAAAA0000A1Z5"
        autoComplete="off"
      />

      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">
          Financial Year
        </label>
        <input
          list="financial-years"
          value={year}
          onChange={(e) => setYear(e.target.value.toUpperCase())}
          onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
          placeholder="FY 2024-25"
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
        <datalist id="financial-years">
          {fyList.map((fy) => (
            <option key={fy} value={fy} />
          ))}
        </datalist>
      </div>

    </ServiceToolShell>

  )

}
