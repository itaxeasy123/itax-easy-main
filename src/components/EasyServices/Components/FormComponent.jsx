"use client"

import { useState, useRef } from "react"
import { IoMdDownload } from "react-icons/io"

const FormComponent = ({
  onSubmit,
  validateInput,
  inputLabel,
  inputPlaceholder,
  buttonText,
  handleClear,
  showhide,
  generatePDF,
  loading,
}) => {
  const [inputValue, setInputValue] = useState("")
  const [isValid, setIsValid] = useState(true)
  const inputRef = useRef(null)

  const handleInputChange = (e) => {
    const value = e.target.value.toUpperCase()
    setInputValue(value)

    if (value) {
      setIsValid(validateInput(value))
    } else {
      setIsValid(true) // Empty input is considered valid until submission
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!inputValue || !validateInput(inputValue)) {
      setIsValid(false)
      return
    }

    onSubmit(e, inputValue)
  }

  const handleClearForm = (e) => {
    setInputValue("")
    setIsValid(true)
    handleClear(e)

    // Focus the input after clearing
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <div className="flex flex-col">
          <label htmlFor="searchInput" className="form-label inline-block mb-1 text-gray-700 font-medium">
            {inputLabel}
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-grow">
              <input
                type="text"
                id="searchInput"
                ref={inputRef}
                className={`form-input w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none transition-all duration-200 ${
                  !isValid ? "border-red-500 bg-red-50" : "border-blue-500"
                }`}
                placeholder={inputPlaceholder}
                value={inputValue}
                onChange={handleInputChange}
                autoComplete="off"
              />
              {!isValid && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-2 grid-cols-1 sm:grid-cols-3">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`flex items-center justify-center gap-2 px-3 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
          type="button"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>Searching...</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{buttonText}</span>
            </>
          )}
        </button>

        <button
          onClick={handleClearForm}
          disabled={loading}
          className={`flex items-center justify-center gap-2 px-3 py-2 rounded-md text-white bg-amber-500 hover:bg-amber-600 transition-colors ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
          type="button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
              clipRule="evenodd"
            />
          </svg>
          <span>Clear</span>
        </button>

        {showhide && (
          <button
            onClick={generatePDF}
            type="button"
            className="flex items-center justify-center gap-2 px-3 py-2 rounded-md text-white bg-green-500 hover:bg-green-600 transition-colors"
          >
            <IoMdDownload className="h-4 w-4" />
            <span>PDF</span>
          </button>
        )}
      </div>
    </form>
  )
}

export default FormComponent
