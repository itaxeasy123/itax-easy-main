"use client"
import React, { useRef, useState, useContext } from "react";
import axios from "axios";
const LARAVEL_ITAX_URL = process.env.NEXT_PUBLIC_LARAVEL_ITAX_URL;
import { PDF_DOC } from "../../../store/actions";
import { RiFileDownloadFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../../store/store-context";

const VerifyBankDetailsPennyless = () => {
  const IfscRef = useRef("");
  const nameRef = useRef("");
  const acnRef = useRef("");
  const mobileRef = useRef("");
  const [showdata, setShowData] = useState("");
  const [showhide, setShowHide] = useState(false);
  const [loading, setLoading] = useState("");

  const [state, dispatch] = useContext(StoreContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await axios
      .post(
        `${LARAVEL_ITAX_URL}/bank/verification-pennyless`,
        {
          accountNumber: acnRef.current.value,
          ifsc: IfscRef.current.value,
          name: nameRef.current.value,
          mobile: mobileRef.current.value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function (response) {
        // console.log(response.data.data.data);
        setShowData(response.data.data.data);

        setLoading(false);
        setShowHide(true);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <>
      <div className="">
        <h3 className="text-2xl mx-10 text-bold m-5 font-medium leading-tight text-blue-600">
          {" "}
          Verify Bank Details Pennyless
        </h3>
        <div className="m-10">
          <form action="" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
              <div>
                <div className="grid grid-cols-1 md:grid-cols-5  ">
                  <div className="mb-3 xl:w-75 mx-2">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label inline-block mb-2 text-gray-700"
                    >
                      Account Number
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        className="form-control
                                        block
                                        w-full
                                        px-3    
                                        py-1.5
                                        text-base
                                        font-normal
                                        text-gray-700
                                        bg-white bg-clip-padding
                                        border border-solid border-gray-300
                                        rounded-l
                                        transition
                                        ease-in-out
                                        m-0

                                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                    "
                        id="exampleFormControlInput1"
                        placeholder="Enter Account Number "
                        ref={acnRef}
                      />
                    </div>
                  </div>
                  <div className="mb-3 xl:w-75 mx-2">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label inline-block mb-2 text-gray-700"
                    >
                      IFSC Code
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        className="form-control
                                        block
                                        w-full
                                        px-3    
                                        py-1.5
                                        text-base
                                        font-normal
                                        text-gray-700
                                        bg-white bg-clip-padding
                                        border border-solid border-gray-300
                                        rounded-l
                                        transition
                                        ease-in-out
                                        m-0

                                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                    "
                        id="exampleFormControlInput1"
                        placeholder="Enter IFSC Code  "
                        ref={IfscRef}
                      />
                    </div>
                  </div>
                  <div className="mb-3 xl:w-75 mx-2">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label inline-block mb-2 text-gray-700"
                    >
                      Ac Holder Name
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        className="form-control
                                        block
                                        w-full
                                        px-3    
                                        py-1.5
                                        text-base
                                        font-normal
                                        text-gray-700
                                        bg-white bg-clip-padding
                                        border border-solid border-gray-300
                                        rounded-l
                                        transition
                                        ease-in-out
                                        m-0

                                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                    "
                        id="exampleFormControlInput1"
                        placeholder="Enter Name  "
                        ref={nameRef}
                      />
                    </div>
                  </div>
                  <div className="mb-3 xl:w-75 mx-2">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label inline-block mb-2 text-gray-700"
                    >
                      Mobile
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        className="form-control
                                        block
                                        w-full
                                        px-3    
                                        py-1.5
                                        text-base
                                        font-normal
                                        text-gray-700
                                        bg-white bg-clip-padding
                                        border border-solid border-gray-300
                                        rounded-l
                                        transition
                                        ease-in-out
                                        m-0

                                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                    "
                        id="exampleFormControlInput1"
                        placeholder="Enter Mobile no.  "
                        ref={mobileRef}
                      />
                    </div>
                  </div>
                  <div className="mb-3 xl:w-75 mx-2 mt-7">
                    <button
                      disabled={loading}
                      className="bg-primary px-8 py-3 text-white rounded-md font-semibold text-sm cursor-pointer"
                    >
                      {loading ? (
                        <span className="inline-block w-4 h-4 border-white border-b-zinc-400 border-r-zinc-400 border-2 border-solid rounded-full animate-spin"></span>
                      ) : (
                        "Search"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>

          {showhide === true && (
            <div class="flex justify-center">
              <div class="flex flex-col">
                <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div class="overflow-hidden">
                      <table className="table table-borderless">
                        <tbody>
                          <tr>
                            <th>Account Status</th>
                            <td>{showdata.message}</td>
                          </tr>
                          <tr>
                            <th>Account Holder Name </th>
                            <td>{showdata.name_at_bank}</td>
                          </tr>
                          <tr>
                            <th>Account Reference Id</th>
                            <td>{showdata.reference_id}</td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="flex flex-col items-end justify-center z-50">
                        <button
                          className=" py-4 px-5 rounded-full bg-[#2a275c] text-white"
                          onClick={() => {
                            dispatch({
                              type: PDF_DOC,
                              payload: {
                                title: "VERIFICATION DETAILS",
                                column: ["Field", "Detail"],
                                data: [
                                  {
                                    Field: "Account Status",
                                    Detail: showdata.message,
                                  },
                                  {
                                    Field: "Account Holder Name ",
                                    Detail: showdata.name_at_bank,
                                  },
                                  {
                                    Field: "Account Reference Id",
                                    Detail: showdata.reference_id,
                                  },
                                ],
                              },
                            });
                            navigate("/pdfViewer");
                          }}
                        >
                          <div>PDF</div>
                          <div className="translate-x-2">
                            <RiFileDownloadFill />
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default VerifyBankDetailsPennyless;
