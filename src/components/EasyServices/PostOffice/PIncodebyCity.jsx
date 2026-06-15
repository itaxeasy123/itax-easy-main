"use client";
import React, { useRef, useState } from "react";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { useReactToPrint } from "react-to-print";
import ServiceToolShell, {
  ToolInput,
  ResultHeader,
} from "../ServiceToolShell";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

/* ============================
   CITY VALIDATION REGEX
============================ */

const CITY_REGEX = /^[a-zA-Z\s.]{2,50}$/;

const PIncodebyCity = () => {

  const { token } = useAuth();

  const [city, setCity] = useState("");
  const [showdata, setShowData] = useState([]);
  const [showhide, setShowHide] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const pdf_ref = useRef();

  /* ============================
     PDF DOWNLOAD
  ============================ */

  const generatePDF = useReactToPrint({
    content: () => pdf_ref.current,
    documentTitle: "Pin Code by City",
  });

  /* ============================
     SEARCH
  ============================ */

  const handleSubmit = async () => {

    const value = city.trim();

    setError("");

    /* validation */

    if (!CITY_REGEX.test(value)) {
      setError("Please enter a valid city name.");
      setShowHide(false);
      return;
    }

    try {

      setLoading(true);

      const response = await axios.get(
        `${BACKEND_URL}/pincode/pincode-by-city?city=${value}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = response?.data?.data || [];

      setShowData(result);
      setShowHide(true);

    } catch (err) {

      console.log(err);
      setError("Unable to fetch pincode information.");
      setShowHide(false);

    } finally {

      setLoading(false);

    }

  };

  /* ============================
     CLEAR
  ============================ */

  const manageHandleClear = () => {

    setCity("");
    setShowData([]);
    setShowHide(false);
    setError("");
    setLoading(false);

  };

  /* ============================
     RESULT
  ============================ */

  const result =
    showhide && showdata.length > 0 ? (
      <div>
        <ResultHeader
          title="Post Office Details"
          subtitle={`Showing ${showdata.length} record(s) for ${city}`}
        />

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-slate-500">
                <th className="px-3 py-2 font-medium">District Name</th>
                <th className="px-3 py-2 font-medium">Office Name</th>
                <th className="px-3 py-2 font-medium">Pincode</th>
                <th className="px-3 py-2 font-medium">State Name</th>
                <th className="px-3 py-2 font-medium">Taluk</th>
              </tr>
            </thead>

            <tbody>
              {showdata.map((currdata, i) => (
                <tr key={i} className="border-b border-slate-100 text-slate-700">
                  <td className="px-3 py-2">{currdata.districtName}</td>
                  <td className="px-3 py-2">{currdata.officeName}</td>
                  <td className="px-3 py-2">{currdata.pincode}</td>
                  <td className="px-3 py-2">{currdata.stateName}</td>
                  <td className="px-3 py-2">{currdata.taluk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ) : null;

  const noResults =
    showhide && showdata.length === 0
      ? "No post office found for this city."
      : "";

  return (
    <ServiceToolShell
      title="By City Pin Code"
      formTitle="Pincode by City"
      formSubtitle="Enter a city name to find its post office pincodes"
      icon="ph:buildings"
      onSearch={handleSubmit}
      onClear={manageHandleClear}
      onDownload={generatePDF}
      canDownload={showhide && showdata.length > 0}
      loading={loading}
      result={result}
      error={error || noResults}
      resultRef={pdf_ref}
    >
      <ToolInput
        label="City Name"
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value.replace(/[^a-zA-Z\s.]/g, ""))}
        maxLength={50}
        placeholder="Enter city"
        autoComplete="off"
        error={error}
      />
    </ServiceToolShell>
  );

};

export default PIncodebyCity;
