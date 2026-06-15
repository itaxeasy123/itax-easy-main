"use client"

import { useRef, useState } from "react"
import axios from "axios"
import useAuth from "../../../hooks/useAuth"
import { useReactToPrint } from "react-to-print"
import { CheckCircle, XCircle } from "lucide-react"
import ServiceToolShell, { ToolInput } from "../ServiceToolShell"

/* ================================
REGEX
================================ */

const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
const aadhaarRegex = /^[0-9]{12}$/

export default function CheckPanAadhaarStatus() {

  const { token } = useAuth()

  const pdf_ref = useRef()

  const [pan, setPan] = useState("")
  const [aadhaar, setAadhaar] = useState("")
  const [showdata, setShowData] = useState("")
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  /* ================================
   HANDLE SUBMIT
  ================================= */

  const handleSubmit = async (e) => {

    if (e?.preventDefault) e.preventDefault()

    const newErrors = {}

    if (!pan || !panRegex.test(pan)) {
      newErrors.pan = "Invalid PAN number"
    }

    if (!aadhaar || !aadhaarRegex.test(aadhaar)) {
      newErrors.aadhaar = "Invalid Aadhaar number"
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) return

    setLoading(true)

    try {

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/pan/pan-aadhaar-link-status/`,
        {
          pan: pan,
          aadhaar: aadhaar,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      )

      setShowData(response?.data?.data?.message || "Verification completed")

    } catch (error) {

      console.log(error)

      setShowData(
        error?.response?.data?.message ||
          "Error: Unable to verify the link status. Please try again."
      )

    } finally {
      setLoading(false)
    }
  }

  /* ================================
   CLEAR FORM
  ================================= */

  const manageHandleClear = (e) => {

    if (e?.preventDefault) e.preventDefault()

    setPan("")
    setAadhaar("")

    setShowData("")
    setErrors({})
  }

  /* ================================
   PAN INPUT CHANGE
  ================================= */

  const handlePanChange = (e) => {

    let value = e.target.value.toUpperCase()

    value = value.replace(/[^A-Z0-9]/g, "")

    setPan(value)
  }

  /* ================================
   AADHAAR INPUT CHANGE
  ================================= */

  const handleAadhaarChange = (e) => {

    let value = e.target.value.replace(/\D/g, "")

    setAadhaar(value)
  }

  /* ================================
   PDF
  ================================= */

  const generatePDF = useReactToPrint({
    content: () => pdf_ref.current,
    documentTitle: "Pan Aadhaar Status",
  })

  /* ================================
   STATUS TYPE
  ================================= */

  const getLinkStatusType = (message) => {

    if (!message) return "neutral"

    const text = message.toLowerCase()

    if (
      text.includes("linked") ||
      text.includes("success") ||
      text.includes("valid")
    ) {
      return "success"
    }

    if (
      text.includes("not linked") ||
      text.includes("invalid") ||
      text.includes("failed") ||
      text.includes("error")
    ) {
      return "error"
    }

    return "neutral"
  }

  const getLinkStatusStyle = (message) => {

    const type = getLinkStatusType(message)

    if (type === "success") return "bg-emerald-50 border-emerald-200 text-emerald-800"

    if (type === "error") return "bg-rose-50 border-rose-200 text-rose-800"

    return "bg-blue-50 border-blue-200 text-blue-800"
  }

  const getLinkStatusIcon = (message) => {

    const type = getLinkStatusType(message)

    if (type === "success")
      return <CheckCircle className="mr-3 h-7 w-7 text-emerald-500" />

    if (type === "error")
      return <XCircle className="mr-3 h-7 w-7 text-rose-500" />

    return null
  }

  /* ================================
   RESULT
  ================================= */

  const result = showdata ? (
    <div>
      <h2 className="mb-3 text-base font-bold text-slate-800">
        PAN-Aadhaar Link Status
      </h2>

      <div
        className={`flex items-start rounded-lg border p-4 ${getLinkStatusStyle(
          showdata,
        )}`}
      >
        {getLinkStatusIcon(showdata)}

        <div>
          <h3 className="mb-1 text-lg font-semibold">Verification Result</h3>
          <p>{showdata}</p>
        </div>
      </div>
    </div>
  ) : null

  /* ================================
   UI
  ================================= */

  return (
    <ServiceToolShell
      title="Check PAN-Aadhaar Link Status"
      formTitle="PAN-Aadhaar Link Status"
      formSubtitle="Verify whether your PAN is linked with your Aadhaar"
      icon="ph:link"
      searchLabel="Verify"
      onSearch={handleSubmit}
      onClear={manageHandleClear}
      onDownload={generatePDF}
      canDownload={!!showdata}
      loading={loading}
      result={result}
      resultRef={pdf_ref}
    >
      <ToolInput
        label="PAN Number"
        type="text"
        value={pan}
        onChange={handlePanChange}
        maxLength={10}
        placeholder="Enter PAN Number"
        className="uppercase"
        error={errors.pan}
        hint={!errors.pan ? "Format: ABCDE1234F" : ""}
      />

      <ToolInput
        label="Aadhaar Number"
        type="text"
        value={aadhaar}
        onChange={handleAadhaarChange}
        maxLength={12}
        placeholder="Enter Aadhaar Number"
        error={errors.aadhaar}
        hint={!errors.aadhaar ? "Format: 12 digit Aadhaar" : ""}
      />
    </ServiceToolShell>
  )
}
