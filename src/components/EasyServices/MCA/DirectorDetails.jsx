"use client"

import { useState, useRef, useMemo } from "react"
import axios from "axios"
import useAuth from "../../../hooks/useAuth"
import { useReactToPrint } from "react-to-print"
import ServiceToolShell, {
  ToolInput,
  ResultHeader,
  DetailGrid,
} from "../ServiceToolShell"

/* ===============================
   REGEX VALIDATION
================================ */

const DIN_REGEX = /^\d{8}$/

/* ===============================
   SANITIZE INPUT
================================ */

const sanitizeDIN = (value = "") => {
  return value.replace(/\D/g, "").slice(0, 8)
}

/* ===============================
   FORMAT VALUE
================================ */

const formatValue = (val) => {
  if (!val || val === "") return "Not Available"
  return String(val)
}

const DirectorDetails = () => {

  const { token } = useAuth()

  const [directorData, setDirectorData] = useState({})
  const [showResult, setShowResult] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [inputValue, setInputValue] = useState("")
  const [isValid, setIsValid] = useState(true)

  const pdf_ref = useRef()

  /* ===============================
     PDF GENERATION
  ============================== */

  const generatePDF = useReactToPrint({
    content: () => pdf_ref.current,
    documentTitle: `Director Details - ${inputValue || "DIN"}`
  })

  /* ===============================
     VALIDATE DIN
  ============================== */

  const validateDIN = (din) => DIN_REGEX.test(din)

  /* ===============================
     HANDLE INPUT
  ============================== */

  const handleInputChange = (e) => {

    const clean = sanitizeDIN(e.target.value)

    setInputValue(clean)

    if (clean) {
      setIsValid(validateDIN(clean))
    } else {
      setIsValid(true)
    }

    if (error) {
      setError(false)
      setErrorMessage("")
    }

  }

  /* ===============================
     FETCH DATA
  ============================== */

  const handleSubmit = async (e) => {

    if (e?.preventDefault) e.preventDefault()

    const cleanDIN = sanitizeDIN(inputValue)

    if (!cleanDIN || !validateDIN(cleanDIN)) {
      setIsValid(false)
      return
    }

    setLoading(true)
    setError(false)
    setShowResult(false)

    try {

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/mca/director-details?din=${cleanDIN}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      const responseData = response?.data?.data || {}

      const companyData = responseData?.company_data?.[0] || {}

      const updatedDirectorData = {
        company_name: companyData.company_name,
        begin_date: companyData.begin_date,
        end_date: companyData.end_date,
        cin_fcrn: companyData["cin/fcrn"],
        director_name: responseData?.director_data?.name,
        director_din: responseData?.director_data?.din,
        llp_data: responseData?.llp_data || []
      }

      setDirectorData(updatedDirectorData)
      setShowResult(true)

    } catch (err) {

      console.error("Error fetching director details:", err)

      setError(true)
      setShowResult(false)
      setDirectorData({})

      setErrorMessage(
        err?.response?.data?.message ||
        "Unable to fetch director details. Please try again."
      )

    } finally {

      setLoading(false)

    }

  }

  /* ===============================
     CLEAR INPUT
  ============================== */

  const handleClear = (e) => {

    if (e?.preventDefault) e.preventDefault()

    setInputValue("")
    setDirectorData({})
    setShowResult(false)
    setError(false)
    setErrorMessage("")
    setIsValid(true)

  }

  /* ===============================
     RESULT DETAILS (DYNAMIC)
  ============================== */

  const resultDetails = useMemo(() => [
    { label: "Company Name", value: formatValue(directorData.company_name) },
    { label: "Begin Date", value: formatValue(directorData.begin_date) },
    { label: "End Date", value: formatValue(directorData.end_date) },
    { label: "CIN / FCRN", value: formatValue(directorData.cin_fcrn) },
    { label: "Director Name", value: formatValue(directorData.director_name) },
    { label: "DIN Number", value: formatValue(directorData.director_din) },
  ], [directorData])

  const result = showResult ? (
    <div>
      <ResultHeader
        title="Director Information"
        subtitle={`DIN: ${directorData.director_din || inputValue}`}
      />
      <DetailGrid items={resultDetails} />
    </div>
  ) : null

  return (
    <ServiceToolShell
      title="Director Details"
      formTitle="Company Director Search"
      formSubtitle="Enter a Director Identification Number (DIN) to retrieve details"
      icon="ph:user-circle"
      onSearch={handleSubmit}
      onClear={handleClear}
      onDownload={generatePDF}
      canDownload={showResult}
      loading={loading}
      result={result}
      error={error ? errorMessage : null}
      resultRef={pdf_ref}
    >
      <ToolInput
        label="Director Identification Number (DIN)"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        maxLength={8}
        autoComplete="off"
        inputMode="numeric"
        placeholder="Enter 8 digit DIN"
        error={!isValid ? "Please enter valid 8 digit DIN" : ""}
        hint={isValid ? "Format: 8 digit number (e.g., 00123456)" : ""}
      />
    </ServiceToolShell>
  )

}

export default DirectorDetails
