
"use client";

import { useRef, useState } from "react";
import userbackAxios from "@/lib/userbackAxios";
import useAuth from "../../../hooks/useAuth";
import { useRouter } from "next/navigation";
import { useReactToPrint } from "react-to-print";
import gstStateCodes from "@/utils/gstStateCodes";
import { useDispatch } from "react-redux";
import ServiceToolShell, {
  ToolInput,
  ResultHeader,
  DetailGrid,
} from "../ServiceToolShell";

const PDF_DOC = "PDF_DOC";

export default function Searchbypan() {

const { token } = useAuth();
const router = useRouter();
const dispatch = useDispatch();

const pdf_ref = useRef(null);

const [selectStateCode,setSelectStateCode] = useState(0);
const [panValue,setPanValue] = useState("");
const [showdata,setShowData] = useState("");
const [loading,setLoading] = useState(false);
const [showHide,setShowHide] = useState(false);
const [error,setError] = useState(false);

/* ================= PAN VALIDATION ================= */

const validatePAN = (pan)=>{
const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
return panRegex.test(pan);
};

/* ================= PDF ================= */

const generatePDF = useReactToPrint({
content:()=>pdf_ref.current,
documentTitle:"PAN Of Tax Payer"
});

/* ================= SUBMIT ================= */

const handleSubmit = async(e)=>{

if(e?.preventDefault) e.preventDefault();

if(loading) return;

const enteredPAN = panValue?.trim().toUpperCase();
const enteredStateCode = Number(selectStateCode);

if(!validatePAN(enteredPAN)){
setError(true);
setShowHide(false);
return;
}

if(!enteredStateCode){
setError(true);
setShowHide(false);
return;
}

if(!token){
setError(true);
setShowHide(false);
return;
}

setLoading(true);
setError(false);

try{

const response = await userbackAxios.post(
"/gst/search/gstin-by-pan",
{
pan:enteredPAN,
gst_state_code:enteredStateCode
}
);

const result = response?.data?.data?.data?.[0]?.data;

if(!result){
throw new Error("No GST data found");
}

setShowData(result);
setShowHide(true);

}catch(err){

console.error("PAN Search Error:",err);

setError(true);
setShowHide(false);

}finally{

setLoading(false);

}

};

/* ================= CLEAR ================= */

const manageHandleClear = (e)=>{

if(e?.preventDefault) e.preventDefault();

setPanValue("");
setSelectStateCode(0);
setShowData("");
setShowHide(false);
setError(false);

};

/* ================= PDF DATA ================= */

const generateDataObject = ()=>({

title:"TAX PAYER DETAIL",

column:["Field","Detail"],

data:[
{Field:"Legal Name Of Business",Detail:showdata?.lgnm || "-"},
{Field:"Trade Name",Detail:showdata?.tradeNam || "-"},
{Field:"Effective Date Of Registration",Detail:showdata?.rgdt || "-"},
{Field:"Constitution of Business",Detail:showdata?.ctb || "-"},
{Field:"GSTIN/UIN/Status",Detail:showdata?.sts || "-"},
{Field:"Tax Payer Type",Detail:showdata?.dty || "-"},
{Field:"State Juridication",Detail:showdata?.stj || "-"},
{Field:"Principal place of Business",Detail:showdata?.pradr?.ntr || "-"},
]

});

const payload = ()=>{

dispatch({type:PDF_DOC,payload:generateDataObject()});

router.push("/pdfViewer");

};

/* ================= RESULT DETAILS ================= */

const details = [
{label:"Legal Name Of Business",value:showdata?.lgnm},
{label:"Trade Name",value:showdata?.tradeNam},
{label:"Effective Date Of Registration",value:showdata?.rgdt},
{label:"Constitution of Business",value:showdata?.ctb},
{label:"GSTIN/UIN/Status",value:showdata?.sts},
{label:"Tax Payer Type",value:showdata?.dty},
{label:"State Juridication",value:showdata?.stj},
];

const result = showHide ? (
<div>
<ResultHeader
title="PAN Card Details"
subtitle="Taxpayer details fetched from PAN and state code"
/>
<DetailGrid items={details} />
</div>
) : null;

/* ================= RENDER ================= */

return(

<ServiceToolShell
title="Search by PAN"
formTitle="PAN Search"
formSubtitle="Find taxpayer details using PAN number and GST state code"
icon="ph:identification-card"
onSearch={handleSubmit}
onClear={manageHandleClear}
onDownload={generatePDF}
canDownload={showHide}
loading={loading}
result={result}
error={error ? "Please enter valid PAN and State Code" : null}
resultRef={pdf_ref}
>

<ToolInput
label="PAN Of Tax Payer"
type="text"
maxLength={10}
value={panValue}
onChange={(e)=>setPanValue(e.target.value.toUpperCase())}
className="uppercase"
placeholder="ABCDE1234F"
hint="Format: ABCDE1234F"
/>

<div>
<label className="mb-1.5 block text-sm font-medium text-slate-700">
GST State Code
</label>
<select
className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
value={selectStateCode}
onChange={(e)=>setSelectStateCode(Number(e.target.value))}
>
<option value={0}>Select State</option>
{gstStateCodes.map((state)=>(
<option key={state.code} value={state.code}>
{state.code} - {state.state}
</option>
))}
</select>
</div>

</ServiceToolShell>

);

}
