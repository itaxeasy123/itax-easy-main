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

/* ===============================
   PINCODE VALIDATION REGEX
================================ */

const PINCODE_REGEX = /^[1-9][0-9]{5}$/;

const PincodeInfo = () => {

  const { token } = useAuth();

  const [pincode, setPincode] = useState("");
  const [showdata, setShowData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showhide, setShowHide] = useState(false);
  const [error, setError] = useState("");

  const pdf_ref = useRef();

  /* ===============================
     PDF GENERATOR
  ================================= */

  const generatePDF = useReactToPrint({
    content: () => pdf_ref.current,
    documentTitle: "Pin code Info",
  });

  /* ===============================
     SEARCH PINCODE
  ================================= */

  const handleSubmit = async () => {

    const value = pincode.trim();

    setError("");

    /* validation */

    if (!PINCODE_REGEX.test(value)) {

      setError("Please enter a valid 6 digit pincode.");
      setShowHide(false);
      return;
    }

    try {

      setLoading(true);

      const response = await axios.get(
        `${BACKEND_URL}/pincode/info-by-pincode?pincode=${value}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = response?.data?.data || [];

      setShowData(result);
      setShowHide(true);

    } catch (error) {

      console.log(error);
      setError("Unable to fetch pincode information.");
      setShowHide(false);

    } finally {

      setLoading(false);

    }

  };

  /* ===============================
     CLEAR
  ================================= */

  const manageHandleClear = () => {

    setPincode("");
    setLoading(false);
    setShowData([]);
    setShowHide(false);
    setError("");

  };

  /* ===============================
     RESULT
  ================================= */

  const result =
    showhide && showdata.length > 0 ? (
      <div>
        <ResultHeader
          title="Post Office Details"
          subtitle={`Showing ${showdata.length} record(s) for pincode ${pincode}`}
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
      ? "No post office found for this pincode."
      : "";

  return (
    <ServiceToolShell
      title="Pin Code Info"
      formTitle="Pincode Search"
      formSubtitle="Enter a 6-digit pincode to find post office details"
      icon="ph:map-pin"
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
        label="Pin Code"
        type="text"
        value={pincode}
        onChange={(e) => setPincode(e.target.value.replace(/[^0-9]/g, ""))}
        maxLength={6}
        inputMode="numeric"
        pattern="[0-9]*"
        placeholder="Enter Pin Code"
        autoComplete="off"
        error={error}
      />
    </ServiceToolShell>
  );

};

export default PincodeInfo;
