"use client"

import DownloadButton from "@/components/downloads/DownloadButton"
import { useState } from "react"

const CalculatorLayout = ({ title, description, children, resultComponent, chartComponent }) => {
  const [activeTab, setActiveTab] = useState("calculator")

  // Extract results from resultComponent if it exists
  const getResults = () => {
    if (!resultComponent) return null;
    
    // Try to get results from CalculatorResultCard
    const resultsElement = resultComponent.props?.results;
    if (resultsElement) {
      return resultsElement;
    }
    
    return null;
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h1>
        {description && <p className="text-muted-foreground mt-2">{description}</p>}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="w-full">
            <div className="flex border-b mb-4">
              <button
                className={`flex items-center gap-2 px-4 py-2 ${
                  activeTab === "calculator" ? "border-b-2 border-primary font-medium" : "text-muted-foreground"
                }`}
                onClick={() => setActiveTab("calculator")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="16" height="16" x="4" y="4" rx="2" />
                  <path d="M8 10h8" />
                  <path d="M8 14h8" />
                  <path d="M12 8v8" />
                </svg>
                <span>Calculator</span>
              </button>
              <button
                className={`flex items-center gap-2 px-4 py-2 ${
                  activeTab === "chart" ? "border-b-2 border-primary font-medium" : "text-muted-foreground"
                }`}
                onClick={() => setActiveTab("chart")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2a10 10 0 1 0 10 10H12V2Z" />
                  <path d="M21.18 8.02A10 10 0 0 0 12 2v10h10a10.01 10.01 0 0 0-.82-3.98Z" />
                </svg>
                <span>Chart</span>
              </button>
            </div>

            <div className={activeTab === "calculator" ? "block" : "hidden"}>
              <div className="border rounded-lg p-6 bg-white shadow-sm">{children}</div>
            </div>

            <div className={activeTab === "chart" ? "block" : "hidden"}>
              <div className="border rounded-lg p-6 bg-white shadow-sm">
                {chartComponent || (
                  <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mb-4 opacity-20"
                    >
                      <path d="M12 2a10 10 0 1 0 10 10H12V2Z" />
                      <path d="M21.18 8.02A10 10 0 0 0 12 2v10h10a10.01 10.01 0 0 0-.82-3.98Z" />
                    </svg>
                    <p>Calculate first to see the chart visualization</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="border rounded-lg bg-white shadow-sm h-full">
            <div className="p-4 border-b">
              <h3 className="text-lg font-medium">Results</h3>
              <p className="text-sm text-muted-foreground">Your calculation summary</p>
            </div>
            <div className="p-6">
              {resultComponent || (
                <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                  <p>Fill in the calculator to see results</p>
                  <div className="flex items-center gap-2 mt-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                    <span>Input your values</span>
                  </div>
                </div>
              )}
              <div className="p-4 border-b text-center">
              <DownloadButton 
                id="result-table" 
                fileName="calculation_result.pdf" 
                results={getResults()}
                title={title}
              />
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CalculatorLayout
