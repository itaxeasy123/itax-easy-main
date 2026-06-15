"use client";

import { useMemo, useRef, useState } from "react";
import axios from "axios";
import {
  Building2,
  Mail,
  Users,
  Calendar,
  MapPin,
  FileText,
  DollarSign,
  Briefcase,
  Hash,
  BadgeCheck,
} from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import { useReactToPrint } from "react-to-print";
import ServiceToolShell, { ToolInput } from "../ServiceToolShell";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;
const CIN_REGEX = /^[A-Z]\d{5}[A-Z]{2}\d{4}[A-Z]{3}\d{6}$/;

/* =========================================
   HELPERS
========================================= */
const sanitizeCIN = (value = "") =>
  value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 21);

const formatValue = (value) => {
  if (value === null || value === undefined || value === "") return "Not Available";
  return String(value);
};

export default function CompanyDetails() {
  const { token } = useAuth();

  const [showdata, setShowData] = useState({});
  const [loading, setLoading] = useState(false);
  const [showhide, setShowHide] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isValid, setIsValid] = useState(true);

  const pdf_ref = useRef(null);

  // PDF Generation Hook
  const generatePDF = useReactToPrint({
    content: () => pdf_ref.current,
    documentTitle: `Company Details - ${inputValue || "CIN"}`,
  });

  const validateCIN = (cin) => CIN_REGEX.test(cin);

  const handleInputChange = (e) => {
    const value = sanitizeCIN(e.target.value);
    setInputValue(value);

    if (value) {
      setIsValid(validateCIN(value));
    } else {
      setIsValid(true);
    }

    if (error) {
      setError(false);
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e) => {
    if (e?.preventDefault) e.preventDefault();
    const cleanCIN = sanitizeCIN(inputValue);

    if (!cleanCIN || !validateCIN(cleanCIN)) {
      setIsValid(false);
      return;
    }

    setLoading(true);
    setError(false);
    setErrorMessage("");
    setShowHide(false);

    try {
      const response = await axios.get(`${BACKEND_URL}/mca/company-details?cin=${cleanCIN}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const companyData = response?.data?.data?.company_master_data || {};
      setShowData(companyData);
      setShowHide(true);
    } catch (err) {
      console.error("Error fetching company details:", err);
      setError(true);
      setShowHide(false);
      setShowData({});
      setErrorMessage(
        err?.response?.data?.message || "An error occurred while fetching company details. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClear = (e) => {
    if (e?.preventDefault) e.preventDefault();
    setInputValue("");
    setShowData({});
    setShowHide(false);
    setError(false);
    setErrorMessage("");
    setIsValid(true);
  };

  // Optimized: Memoized section building structure
  const sections = useMemo(() => {
    const d = showdata || {};
    return [
      {
        title: "Basic Information",
        icon: <Building2 className="mr-2 h-4 w-4 text-blue-600" />,
        grid: "grid-cols-1 sm:grid-cols-2",
        items: [
          { label: "Company Name", value: formatValue(d.company_name) },
          { label: "Class", value: formatValue(d.class_of_company) },
          { label: "Company Category", value: formatValue(d.company_category) },
          { label: "Company Subcategory", value: formatValue(d.company_subcategory) },
        ],
      },
      {
        title: "Contact Information",
        icon: <Mail className="mr-2 h-4 w-4 text-blue-600" />,
        grid: "grid-cols-1",
        items: [
          { label: "Email Id", value: formatValue(d.email_id) },
          { label: "Registered Address", value: formatValue(d.registered_address) },
          { label: "Address Other Than R/O", value: formatValue(d["address_other_than_r/o_where_all_or_any_books_of_account_and_papers_are_maintained"]) },
        ],
      },
      {
        title: "Financial Information",
        icon: <DollarSign className="mr-2 h-4 w-4 text-blue-600" />,
        grid: "grid-cols-1 sm:grid-cols-2",
        items: [
          { label: "Paid Up Capital (Rs)", value: formatValue(d["paid_up_capital(rs)"]) },
          { label: "Authorised Capital (Rs)", value: formatValue(d["authorised_capital(rs)"]) },
          { label: "Whether Listed Or Not", value: formatValue(d.whether_listed_or_not) },
          { label: "Suspended At Stock Exchange", value: formatValue(d.suspended_at_stock_exchange) },
        ],
      },
      {
        title: "Compliance Information",
        icon: <BadgeCheck className="mr-2 h-4 w-4 text-blue-600" />,
        grid: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        items: [
          { label: "Active Compliance", value: formatValue(d.active_compliance) },
          { label: "Company Status (For Efiling)", value: formatValue(d["company_status(for_efiling)"]) },
          { label: "Number Of Members", value: formatValue(d.number_of_members) },
        ],
      },
      {
        title: "Important Dates",
        icon: <Calendar className="mr-2 h-4 w-4 text-blue-600" />,
        grid: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        items: [
          { label: "Date Of Incorporation", value: formatValue(d.date_of_incorporation) },
          { label: "Date Of The Last AGM", value: formatValue(d.date_of_last_agm) },
          { label: "Date Of Balance Sheet", value: formatValue(d.date_of_balance_sheet) },
        ],
      },
      {
        title: "Other Information",
        icon: <Hash className="mr-2 h-4 w-4 text-blue-600" />,
        grid: "grid-cols-1 sm:grid-cols-2",
        items: [
          { label: "Registration Number", value: formatValue(d.registration_number) },
          { label: "ROC Code", value: formatValue(d.roc_code) },
        ],
      },
    ];
  }, [showdata]);

  const result = showhide ? (
    <div>
      <div className="mb-4 border-b border-slate-100 pb-3">
        <h2 className="text-base font-bold text-slate-800">Company Information</h2>
        <p className="mt-0.5 text-sm text-slate-500">
          CIN: <span className="font-semibold uppercase text-slate-700">{inputValue}</span>
        </p>
      </div>

      <div className="space-y-5">
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <h3 className="mb-3 flex items-center text-xs font-bold uppercase tracking-wide text-slate-600">
              {section.icon}
              {section.title}
            </h3>

            <div className={`grid gap-3 ${section.grid}`}>
              {section.items.map((detail, index) => (
                <div
                  key={`${section.title}-${index}`}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-3"
                >
                  <p className="text-xs uppercase tracking-wide text-slate-400">{detail.label}</p>
                  <p className="mt-0.5 break-words text-sm font-semibold text-slate-800">{detail.value}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-lg border border-blue-100 bg-blue-50 p-4">
        <h3 className="mb-2 flex items-center text-sm font-semibold text-blue-800">
          <Building2 className="mr-1.5 h-4 w-4" /> What is a CIN?
        </h3>
        <p className="mb-3 text-xs leading-relaxed text-blue-700 sm:text-sm">
          A Corporate Identity Number (CIN) is a unique 21-character alphanumeric identifier assigned to companies
          registered in India by the Ministry of Corporate Affairs (MCA).
        </p>
        <ul className="grid grid-cols-1 gap-x-6 gap-y-1.5 pl-2 text-xs text-blue-700 sm:text-sm md:grid-cols-2">
          <li className="list-inside list-disc"><span className="font-semibold">1st Character:</span> Type (U: Unlisted / L: Listed)</li>
          <li className="list-inside list-disc"><span className="font-semibold">Next 5 Digits:</span> Industry classification code</li>
          <li className="list-inside list-disc"><span className="font-semibold">Next 2 Letters:</span> State location code (e.g., TG, MH)</li>
          <li className="list-inside list-disc"><span className="font-semibold">Next 4 Digits:</span> Year of incorporation</li>
          <li className="list-inside list-disc"><span className="font-semibold">Next 3 Letters:</span> Status type (e.g., PTC: Private Ltd)</li>
          <li className="list-inside list-disc"><span className="font-semibold">Last 6 Digits:</span> Registry registration number</li>
        </ul>
      </div>
    </div>
  ) : null;

  return (
    <ServiceToolShell
      title="Company Details"
      formTitle="Company Information Search"
      formSubtitle="Enter a Company Identification Number (CIN) to retrieve details"
      icon="ph:buildings"
      onSearch={handleSubmit}
      onClear={handleClear}
      onDownload={generatePDF}
      canDownload={showhide}
      loading={loading}
      result={result}
      error={error ? errorMessage || "Please enter a valid CIN" : null}
      resultRef={pdf_ref}
    >
      <ToolInput
        label="Company Identification Number (CIN)"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        maxLength={21}
        autoComplete="off"
        placeholder="Enter CIN (e.g., U74999TG2016PTC111111)"
        className="uppercase tracking-wide"
        error={!isValid ? "Please enter a valid 21-character CIN code." : ""}
        hint={isValid ? "Format Example: U74999TG2016PTC111111" : ""}
      />
    </ServiceToolShell>
  );
}
