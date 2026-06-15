"use client";
import { Footer } from "antd/lib/layout/layout";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../../../Components/Header/Navbar";
import { useDropzone } from "react-dropzone";
import { getAccessToken } from "@/lib/authToken";

 const AadhaarComvertor = () => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [extracted, setExtracted] = useState(null);

  useEffect(() => {
    // Access token now lives in memory (not localStorage).
    setData(getAccessToken());
  }, []);

  const onDrop = useCallback(async (acceptedFiles) => {
    if (!acceptedFiles || acceptedFiles.length === 0) {
      setError("Please select a file.");
      return;
    }
    setLoading(true);
    setError("");
    setResult("");
    try {
      let formData = new FormData();
      formData.append("file", acceptedFiles[0]);
      const response = await axios.post(
        "https://360bima.com/api/aadhar",
        
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setResult(response.data?.message || "File uploaded successfully!");
      setExtracted(response.data?.extracted_fields || null); // <-- Add this
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed.");
    } finally {
      setLoading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <Navbar />
      <div
        className="container d-flex justify-content-center"
        style={{ paddingTop: "6rem" }}
      >
        <div {...getRootProps()} className="dragzone ">
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>
              Drag &apos;n&apos; drop some files here, or click to select files
            </p>
          )}
          {loading && <p>Uploading...</p>}
          {result && <p style={{ color: "green" }}>{result}</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
        {extracted && (
          <div style={{ marginTop: 20 }}>
            <h4>Extracted Data:</h4>
            <div>
              <label>Aadhaar Number:</label>
              <input value={extracted.Aadhar_Numbers?.[0] || ""} readOnly />
            </div>
            <div>
              <label>Date of Birth:</label>
              <input value={extracted["Date of Birth"]?.[0] || ""} readOnly />
            </div>
            <div>
              <label>Gender:</label>
              <input value={extracted.Gender?.[0] || ""} readOnly />
            </div>
            <div>
              <label>Name:</label>
              <input value={extracted.Names?.[0] || ""} readOnly />
            </div>
            <div>
              <label>Father Name:</label>
              <input value={extracted["Father Name"]?.[0] || ""} readOnly />
            </div>
            <div>
              <label>Address:</label>
              <input value={extracted.address?.[0] || ""} readOnly />
            </div>
            <div>
              <label>Pincode:</label>
              <input value={extracted.pin?.[0] || ""} readOnly />
            </div>
            {/* Agar aur fields chahiye to yahan add kar sakte hain */}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default AadhaarComvertor;
