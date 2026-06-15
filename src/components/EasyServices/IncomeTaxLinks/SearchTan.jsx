"use client"
import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import useAuth from "../../../hooks/useAuth"
import { useReactToPrint } from "react-to-print"
import userAxios from "@/lib/userAxios"
import ServiceToolShell, {
  ToolInput,
  ResultHeader,
  DetailGrid,
} from "../ServiceToolShell"

/* ================================
   TAN REGEX
================================ */

const tanRegex = /^[A-Z]{4}[0-9]{5}[A-Z]$/

export default function SearchTan() {

  const navigate = useRouter()
  const { token } = useAuth()

  const [showdata, setShowdata] = useState({})
  const [showhide, setShowHide] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const [inputValue, setInputValue] = useState("")
  const [isValid, setIsValid] = useState(true)

  const pdf_ref = useRef()

  /* ================================
   VALIDATE TAN
  ================================= */

  const validateTan = (tan) => tanRegex.test(tan)

  /* ================================
   HANDLE INPUT
  ================================= */

  const handleInputChange = (e) => {

    let value = e.target.value.toUpperCase()

    value = value.replace(/[^A-Z0-9]/g, "")

    if (value.length > 10) value = value.slice(0, 10)

    setInputValue(value)

    if (value) {
      setIsValid(validateTan(value))
    } else {
      setIsValid(true)
    }
  }

  /* ================================
   SUBMIT
  ================================= */

  const handleSubmit = async (e) => {

    if (e?.preventDefault) e.preventDefault()

    if (!inputValue || !validateTan(inputValue)) {
      setIsValid(false)
      return
    }

    setLoading(true)
    setError(false)

    try {

      const response = await userAxios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/tan/search?tan=${inputValue}`
      )

      setShowdata(response?.data?.data || {})
      setShowHide(true)

    } catch (err) {

      console.error(err)

      setError(true)
      setShowHide(false)

    } finally {

      setLoading(false)

    }
  }

  /* ================================
   CLEAR
  ================================= */

  const handleClear = (e) => {

    if (e?.preventDefault) e.preventDefault()

    setInputValue("")
    setShowdata({})
    setShowHide(false)
    setError(false)
    setIsValid(true)
  }

  /* ================================
   DETAILS ARRAY
  ================================= */

  const details = [
    { label: "Name", value: showdata.nameOrgn || "Not Available" },
    {
      label: "Address",
      value:
        `${showdata.addLine1 || ""} ${showdata.addLine2 || ""} ${showdata.addLine3 || ""} ${showdata.addLine5 || ""}`.trim() ||
        "Not Available",
    },
    { label: "Pin Code", value: showdata.pin || "Not Available" },
    { label: "Tan Allotment", value: showdata.dtTanAllotment || "Not Available" },
    { label: "Email", value: showdata.emailId1 || "Not Available" },
  ]

  /* ================================
   PDF
  ================================= */

  const generatePDF = useReactToPrint({
    content: () => pdf_ref.current,
    documentTitle: "TAN Details"
  })

  const result = showhide ? (
    <div>
      <ResultHeader
        title="TAN Details"
        subtitle={`Information for TAN: ${inputValue}`}
      />
      <DetailGrid items={details} />
    </div>
  ) : null

  /* ================================
   UI
  ================================= */

  return (
    <ServiceToolShell
      title="Search TAN Details"
      formTitle="TAN Search"
      formSubtitle="Enter a TAN number to retrieve associated details"
      icon="ph:identification-badge"
      onSearch={handleSubmit}
      onClear={handleClear}
      onDownload={generatePDF}
      canDownload={showhide}
      loading={loading}
      result={result}
      error={error ? "Could not retrieve details for this TAN." : null}
      resultRef={pdf_ref}
    >
      <ToolInput
        label="TAN Number"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter TAN Number"
        maxLength={10}
        autoComplete="off"
        error={!isValid ? "Invalid TAN (Format: AAAA00000A)" : ""}
        hint={isValid ? "Format: AAAA00000A (4 letters + 5 digits + 1 letter)" : ""}
      />
    </ServiceToolShell>
  )
}
