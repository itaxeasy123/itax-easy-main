"use client"
import { useMemo, useRef, useState } from "react"
import axios from "axios"
import { useReactToPrint } from "react-to-print"
import { BadgeCheck } from "lucide-react"
import useAuth from "../../../hooks/useAuth"
import ServiceToolShell, {
  ToolInput,
  ResultHeader,
  DetailGrid,
} from "../ServiceToolShell"

const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]$/
const NAME_REGEX = /^[A-Za-z][A-Za-z\s.]*$/
const DDMMYYYY_REGEX = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/

const sanitizePan = (value = "") => value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10)

const sanitizeName = (value = "") =>
  value
    .replace(/[^A-Za-z\s.]/g, "")
    .replace(/\s{2,}/g, " ")
    .slice(0, 100)

const formatDateForApi = (value = "") => {
  if (!value) return ""
  const [year, month, day] = value.split("-")
  if (!year || !month || !day) return ""
  return `${day}/${month}/${year}`
}

const formatDateForInput = (value = "") => {
  if (!value || !DDMMYYYY_REGEX.test(value)) return ""
  const [day, month, year] = value.split("/")
  return `${year}-${month}-${day}`
}

export default function VerifyPanDetails() {
  const { token } = useAuth()
  const pdfRef = useRef(null)

  const [showdata, setShowData] = useState(null)
  const [showhide, setShowHide] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [formValues, setFormValues] = useState({
    pan: "",
    name_as_per_pan: "",
    date_of_birth: "",
  })

  const [formErrors, setFormErrors] = useState({
    pan: "",
    name_as_per_pan: "",
    date_of_birth: "",
  })

  const validatePAN = (pan) => PAN_REGEX.test(pan)

  const validateName = (name) => {
    const trimmed = name.trim()
    return trimmed.length >= 2 && NAME_REGEX.test(trimmed)
  }

  const validateDate = (date) => DDMMYYYY_REGEX.test(date)

  const getStatusType = (status) => {
    if (!status) return "neutral"
    const value = String(status).toLowerCase()

    if (value.includes("active") || value.includes("valid") || value.includes("verified")) {
      return "success"
    }

    if (value.includes("inactive") || value.includes("invalid") || value.includes("failed")) {
      return "error"
    }

    return "neutral"
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target

    setFormErrors((prev) => ({
      ...prev,
      [name]: "",
    }))

    if (name === "pan") {
      setFormValues((prev) => ({
        ...prev,
        pan: sanitizePan(value),
      }))
      return
    }

    if (name === "name_as_per_pan") {
      setFormValues((prev) => ({
        ...prev,
        name_as_per_pan: sanitizeName(value),
      }))
      return
    }

    if (name === "date_of_birth") {
      setFormValues((prev) => ({
        ...prev,
        date_of_birth: formatDateForApi(value),
      }))
      return
    }

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateForm = () => {
    let isValid = true

    const newErrors = {
      pan: "",
      name_as_per_pan: "",
      date_of_birth: "",
    }

    if (!formValues.pan) {
      newErrors.pan = "PAN number is required"
      isValid = false
    } else if (!validatePAN(formValues.pan)) {
      newErrors.pan = "Invalid PAN format. Example: ABCDE1234F"
      isValid = false
    }

    if (!formValues.name_as_per_pan.trim()) {
      newErrors.name_as_per_pan = "Name is required"
      isValid = false
    } else if (!validateName(formValues.name_as_per_pan)) {
      newErrors.name_as_per_pan = "Enter valid name as per PAN"
      isValid = false
    }

    if (!formValues.date_of_birth) {
      newErrors.date_of_birth = "Date of birth is required"
      isValid = false
    } else if (!validateDate(formValues.date_of_birth)) {
      newErrors.date_of_birth = "Invalid date"
      isValid = false
    }

    setFormErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e) => {
    if (e?.preventDefault) e.preventDefault()

    if (!validateForm()) return

    setLoading(true)
    setError("")
    setShowHide(false)

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/pan/get-pan-details`,
        {
          pan: formValues.pan,
          name_as_per_pan: formValues.name_as_per_pan.trim(),
          date_of_birth: formValues.date_of_birth,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      )

      setShowData(response?.data?.data || null)
      setShowHide(true)
    } catch (err) {
      console.error(err)
      setShowData(null)
      setShowHide(false)
      setError(
        err?.response?.data?.message ||
          "An error occurred while fetching PAN details. Please check your information and try again.",
      )
    } finally {
      setLoading(false)
    }
  }

  const handleClear = (e) => {
    if (e?.preventDefault) e.preventDefault()
    setShowData(null)
    setShowHide(false)
    setError("")
    setLoading(false)
    setFormValues({
      pan: "",
      name_as_per_pan: "",
      date_of_birth: "",
    })
    setFormErrors({
      pan: "",
      name_as_per_pan: "",
      date_of_birth: "",
    })
  }

  const generatePDF = useReactToPrint({
    content: () => pdfRef.current,
    documentTitle: "PAN DETAILS",
  })

  const details = useMemo(
    () => [
      {
        label: "PAN",
        value: formValues.pan || "Not Available",
      },
      {
        label: "Name",
        value: formValues.name_as_per_pan || "Not Available",
      },
      {
        label: "Aadhaar Seeding Status",
        value:
          showdata?.aadhaar_seeding_status === "y"
            ? "Yes"
            : showdata?.aadhaar_seeding_status === "n"
              ? "No"
              : "Not Available",
      },
      {
        label: "Category",
        value: showdata?.category || "Not Available",
      },
      {
        label: "Last Updated",
        value: showdata?.last_updated || "Not Available",
      },
      {
        label: "Status",
        value: showdata?.status || "Not Available",
      },
    ],
    [showdata, formValues.pan, formValues.name_as_per_pan],
  )

  const statusType = getStatusType(showdata?.status)

  const result = showhide ? (
    <div>
      <div className="mb-4 flex flex-col gap-3 border-b border-slate-100 pb-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-800">
            PAN Verification Result
          </h2>
          <p className="mt-0.5 text-sm text-slate-500">
            Verified details fetched from submitted PAN information
          </p>
        </div>
        <span
          className={`inline-flex w-fit items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
            statusType === "success"
              ? "bg-emerald-100 text-emerald-700"
              : statusType === "error"
                ? "bg-rose-100 text-rose-700"
                : "bg-blue-100 text-blue-700"
          }`}
        >
          <BadgeCheck className="h-4 w-4" />
          {showdata?.status || "Status Not Available"}
        </span>
      </div>
      <DetailGrid items={details} />
    </div>
  ) : null

  return (
    <ServiceToolShell
      title="PAN Verification"
      formTitle="Verify PAN Details"
      formSubtitle="Enter your information to verify your PAN card details"
      icon="ph:identification-card"
      searchLabel="Verify"
      onSearch={handleSubmit}
      onClear={handleClear}
      onDownload={generatePDF}
      canDownload={showhide}
      loading={loading}
      result={result}
      error={error || null}
      resultRef={pdfRef}
    >
      <ToolInput
        label="PAN Number"
        name="pan"
        type="text"
        inputMode="text"
        autoComplete="off"
        value={formValues.pan}
        onChange={handleInputChange}
        maxLength={10}
        placeholder="Your PAN Number"
        className="uppercase tracking-wide"
        error={formErrors.pan}
        hint={!formErrors.pan ? "Format: ABCDE1234F (5 letters + 4 digits + 1 letter)" : ""}
      />

      <ToolInput
        label="Name as per PAN"
        name="name_as_per_pan"
        type="text"
        autoComplete="off"
        value={formValues.name_as_per_pan}
        onChange={handleInputChange}
        maxLength={100}
        placeholder="Name as shown on PAN card"
        error={formErrors.name_as_per_pan}
      />

      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">
          Date of Birth
        </label>
        <input
          name="date_of_birth"
          type="date"
          value={formatDateForInput(formValues.date_of_birth)}
          onChange={handleInputChange}
          max={new Date().toISOString().split("T")[0]}
          className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${
            formErrors.date_of_birth ? "border-rose-400 bg-rose-50" : "border-slate-300"
          }`}
        />
        {formErrors.date_of_birth ? (
          <p className="mt-1 text-xs text-rose-600">{formErrors.date_of_birth}</p>
        ) : (
          <p className="mt-1 text-xs text-slate-400">
            Format sent to API: {formValues.date_of_birth || "DD/MM/YYYY"}
          </p>
        )}
      </div>
    </ServiceToolShell>
  )
}
