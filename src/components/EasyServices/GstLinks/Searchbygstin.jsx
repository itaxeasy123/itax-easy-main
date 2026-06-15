"use client";
import { useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import useAuth from "../../../hooks/useAuth";
import userAxios from "@/lib/userbackAxios";
import ServiceToolShell, {
  ToolInput,
  ResultHeader,
  DetailGrid,
} from "../ServiceToolShell";

const PDF_DOC = "PDF_DOC";

/* ================= GSTIN REGEX ================= */

const GSTIN_REGEX =
/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][0-9A-Z]Z[0-9A-Z]$/;

/* ================= PAGE ================= */

export default function Searchbygstin() {

const { token } = useAuth();
const router = useRouter();
const dispatch = useDispatch();

const pdf_ref = useRef(null);

const [showdata,setShowData] = useState(null);
const [showhide,setShowHide] = useState(false);
const [loading,setLoading] = useState(false);
const [error,setError] = useState("");
const [gstin,setGstin] = useState("");

/* ================= INPUT VALIDATION ================= */

const handleGSTINInput = (value) => {

let v = String(value).toUpperCase();

/* REMOVE SPACES */

v = v.replace(/\s+/g,"");

/* HARD LIMIT 15 */

if(v.length > 15){
v = v.slice(0,15);
setError("GSTIN cannot exceed 15 characters");
}

/* ONLY A-Z 0-9 */

if(!/^[0-9A-Z]*$/.test(v)){
setError("Only letters and numbers allowed");
return;
}

/* FINAL GSTIN CHECK */

if(v.length === 15){

if(!GSTIN_REGEX.test(v)){
setError("Invalid GSTIN format. Example: 12ABCDE1234F1Z5");
}else{
setError("");
}

}else{

setError("");

}

setGstin(v);

};

/* ================= PDF ================= */

const generatePDF = useReactToPrint({
content:()=>pdf_ref.current || null,
documentTitle:"GSTIN Detail"
});

/* ================= SUBMIT ================= */

const handleSubmit = useCallback(async(e,inputValue)=>{

if(e?.preventDefault) e.preventDefault();

if(loading) return;

const value = (inputValue || gstin).trim().toUpperCase();

if(!GSTIN_REGEX.test(value)){

setError("GSTIN must follow format like 23BNJBS3408M1ZP");

setShowHide(false);

return;

}

setLoading(true);
setError("");
setShowHide(false);

try{

const res = await userAxios.post(
"/gst/search/gstin",
{ gstin:value },
token ? {headers:{Authorization:`Bearer ${token}`}} : undefined
);

const gstData = res?.data?.data || res?.data;

if(!gstData) throw new Error();

setShowData(gstData);
setShowHide(true);

toast.success("GST details fetched successfully");

}catch(err){

const status = err?.response?.status;

if(status===401 || status===403){

toast.error("Unauthorized. Please login again.");

}else if(status===429){

toast.error("Too many requests. Please try again later.");

}else{

toast.error("Failed to fetch GST details");

}

setShowHide(false);

}finally{

setLoading(false);

}

},[loading,token,gstin]);

/* ================= CLEAR ================= */

const handleClear = useCallback((e)=>{

if(e?.preventDefault) e.preventDefault();

setShowData(null);
setShowHide(false);
setError("");
setGstin("");

},[]);

/* ================= RESULT DETAILS ================= */

const details = [
{ label:"Legal Name Of Business", value:showdata?.lgnm },
{ label:"Trade Name", value:showdata?.tradeNam },
{ label:"Effective Date Of Registration", value:showdata?.rgdt },
{ label:"Constitution of Business", value:showdata?.ctb },
{ label:"GSTIN/UIN Status", value:showdata?.sts },
{ label:"Tax Payer Type", value:showdata?.dty },
{ label:"State Jurisdiction", value:showdata?.stj },
{ label:"Principal Place of Business", value:showdata?.pradr?.ntr },
];

const result = showhide ? (
<div>
<ResultHeader
title="Tax Payer Detail"
subtitle={`Information for GSTIN: ${gstin}`}
/>
<DetailGrid items={details} />
</div>
) : null;

/* ================= UI ================= */

return(

<ServiceToolShell
title="Search by GSTIN"
formTitle="GSTIN Search"
formSubtitle="Enter a GST Identification Number to retrieve taxpayer details"
icon="ph:identification-card"
onSearch={(e)=>handleSubmit(e,gstin)}
onClear={handleClear}
onDownload={generatePDF}
canDownload={showhide}
loading={loading}
result={result}
resultRef={pdf_ref}
>

<ToolInput
label="Search By GSTIN"
type="text"
value={gstin}
maxLength={15}
onChange={(e)=>handleGSTINInput(e.target.value)}
placeholder="Your GST Identification Number"
autoComplete="off"
error={error || ""}
hint={!error ? "Format: 12ABCDE1234F1Z5 (15 characters)" : ""}
/>

</ServiceToolShell>

);

}
