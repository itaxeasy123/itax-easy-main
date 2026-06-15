"use client";
import { Footer } from "antd/lib/layout/layout";
import axios from "axios";
import React, { useCallback } from "react";
import Navbar from "../../../Components/Header/Navbar";
import { useDropzone } from "react-dropzone";

const AadhaarComvertor = () => {
  const onDrop = useCallback(async (acceptedFiles) => {
    try {
      // 1) FormData sahi tarah banao
      const formData = new FormData();
      // Swagger ke hisaab se field-name "file" hai
      acceptedFiles.forEach((file) => {
        formData.append("file", file);
      });

      // 2) Next.js proxy route ko hit karo (token ki zarurat nahi)
      const res = await axios.post("/api/ocr/pan", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("PAN OCR Response:", res.data);
      // TODO: yahin se state lift karke UI me dikhao / next screen pe bhejo
    } catch (err) {
      console.error("PAN OCR Error:", err);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <Navbar />
      <div className="container d-flex justify-content-center" style={{ paddingTop: "6rem" }}>
        <div {...getRootProps()} className="dragzone ">
          <input {...getInputProps()} />
          {isDragActive ? <p>Drop the files here ...</p> : <p>Drag &apos;n&apos; drop file here, or click to select</p>}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AadhaarComvertor;
