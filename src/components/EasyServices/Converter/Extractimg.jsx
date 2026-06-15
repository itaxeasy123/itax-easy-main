"use client"
import React, { useState, useRef } from "react";
import Navbar from "../../../Components/Header/Navbar";

function Extractimg() {
  const [uploadedFileName, setUploadedFileName] = useState(null);
  const inputRef = useRef(null);

  const handleUpload = () => {
    inputRef.current?.click();
    showinfo();
  };
  const handleDisplayFileDetails = () => {
    inputRef.current?.files &&
      setUploadedFileName(inputRef.current.files[0].name);
    
  };
  const showinfo=()=>{
  
  }
  return (
    <>

      <Navbar />
      <div className="container" style={{ paddingTop: "6rem" }}>
       <div className="row">
       <div className="col"></div>
        <div className="col text-center my-2 ">
        <h1>Extract PDF file</h1>
          <h5 className='text-secondary'>
          Extract file Data .
          </h5>
          <div className="m-3">
            <input
              ref={inputRef}
              onChange={handleDisplayFileDetails}
              className="d-none"
              type="file"
            />
            <button
              onClick={handleUpload} style={{height:"5rem",width:"20rem"}} className={`my-4 btn btn-${uploadedFileName ? "success" : "danger"}`}
            >
              {uploadedFileName ? uploadedFileName : <h2>Select PDF File</h2>}
            </button>
            <p >or drag a file </p>
          </div>
        </div>
        <div className="col">
     
        </div>
       </div>
      </div>

    </>
  );
}


export default Extractimg
