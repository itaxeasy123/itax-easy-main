'use client';

import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const Form16 = () => {
  const conponentPDF = useRef();
  const generatePDF = useReactToPrint({
    content: () => conponentPDF.current,

    documentTitle: 'Form 16 Itaxeasy',
  });

  return (
    <>
      <button onClick={generatePDF}>Print</button>
      <div className="mx-10  ">
        <div ref={conponentPDF}>
          <div className="text-center border border-neutral-600">
            <h5 className="font-bold">FORM NO. 16</h5>
            <h5>[See rule 31(1)(a)]</h5>
            <h4>
              Certificate under section 203 of the Inc ome-tax Act, 1961 for tax
              deducted at source on salary paid to an employee under section 192
              or pension/interest income of specified senior citizen under
              section 194P
            </h4>
          </div>
          <div class="flex flex-col">
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div class="overflow-hidden">
                  <table class="min-w-full border-collapse  text-center">
                    <tbody>
                      <tr class="border border-neutral-600">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border border-neutral-600">
                          Certificate No.
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border border-neutral-600">
                          Last updated on
                        </td>
                      </tr>
                      {/* <tr className="my-10 ">
                        <td className=""></td>
                        <td className=""></td>
                      </tr> */}
                      <tr class="">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border border-neutral-600">
                          Name and address of the Employer/Specified Bank
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border border-neutral-600">
                          Name and address of the Employee/ Specified senior
                          citizen
                        </td>
                      </tr>
                      {/* <tr className="my-10 border-b">
                        <td className="border-r"></td>
                        <td className="border-r"></td>
                      </tr> */}
                      <tr className="my-10">
                        <td className="">
                          <table class="min-w-full border-collapse  text-center">
                            <tbody>
                              <tr className="my-10 ">
                                <td className="border border-neutral-600">
                                  PAN of Deductor{' '}
                                </td>
                                <td className="border border-neutral-600">
                                  TAN of the Deductor
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                        <td className="">
                          <table class="min-w-full border-collapse  text-center">
                            <tbody>
                              <tr className=" ">
                                <td className="border border-neutral-600">
                                  PAN of the Employee/ <br /> specificed senior{' '}
                                  <br />
                                  citizen
                                </td>
                                <td className="border border-neutral-600">
                                  Employee Reference No./ <br />
                                  Pension Payment order no.
                                  <br />
                                  provided by the Employer
                                  <br />
                                  (If available)
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr className=" ">
                        <td className="border border-neutral-600">
                          <table className="border-collapse">
                            <tr className="">
                              <td className="border border-neutral-600">
                                CIT (TDS)
                              </td>
                            </tr>
                            <tr className=" ">
                              <td className="border border-neutral-600">
                                Address…………………………………………………………………..
                              </td>
                            </tr>
                          </table>
                        </td>
                        <td className="border border-neutral-600">
                          <table className="border-collapse">
                            <thead>
                              <tr className=" ">
                                <th className="border border-neutral-600">
                                  Assessment Year
                                </th>
                                <th className="border border-neutral-600">
                                  Period with the Employer
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="">
                                {/* <td className="border"></td> */}
                                <td className="border border-neutral-600">
                                  <table className="border-collapse">
                                    <thead>
                                      <tr className="">
                                        <th className="border border-neutral-600">
                                          From
                                        </th>
                                        <th className="border border-neutral-600">
                                          To
                                        </th>
                                      </tr>
                                    </thead>
                                    {/* <tbody>
                                      <tr className=" ">
                                        <td className="border"></td>
                                        <td className="border"></td>
                                      </tr>
                                      <tr className="">
                                        <td className="border"></td>
                                        <td className="border"></td>
                                      </tr>
                                    </tbody> */}
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <h6 className="my-5">
                    1. Substituted by the Income-tax (Twenty-sixth Amendment)
                    Rules, 2021, w.e.f. F-9-2021.{' '}
                  </h6>
                  <div class="flex flex-col">
                    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div class="overflow-hidden">
                          <table class="min-w-full  border-collapse text-center">
                            <tbody>
                              <tr className="my-10 border-b">
                                <td colSpan={2} className="border-r">
                                  <table className="border-collapse">
                                    <tr className="border" my-10>
                                      <th className="border-r">City</th>
                                    </tr>
                                    <tr className="border" my-10>
                                      <th className="border-r">Pin code</th>
                                    </tr>
                                  </table>
                                </td>
                                <td className="border-r"></td>
                                <td className="border-r"></td>
                                <td className="border-r"></td>
                              </tr>
                              <tr className="my-10 border-b">
                                <td colSpan={4}>
                                  Summary of amount paid/credited and tax
                                  deducted at source thereon in respect of the
                                  employee
                                </td>
                              </tr>
                              <tr className="my-10 border-b">
                                <td className="border-r">Quarter(s)</td>
                                <td className="border-r">
                                  Receipt Numbers of
                                  <br />
                                  original quarterly <br />
                                  statements of TDS
                                  <br />
                                  under sub-section (3) of
                                  <br />
                                  section 200
                                </td>
                                <td className="border-r">
                                  Amount paid/credited
                                </td>
                                <td className="border-r">
                                  Amount of tax deducted (Rs.)
                                </td>
                                <td className="border-r">
                                  Amount of tax deposited/remitted (Rs.)
                                </td>
                              </tr>
                              <tr className="my-10 border-b">
                                <td className="border-r"></td>
                                <td className="border-r"></td>
                                <td className="border-r"></td>
                                <td className="border-r"></td>
                                <td className="border-r"></td>
                              </tr>
                              <tr className="my-10 border-b">
                                <td className="border-r"></td>
                                <td className="border-r"></td>
                                <td className="border-r"></td>
                                <td className="border-r"></td>
                                <td className="border-r"></td>
                              </tr>
                              <tr className="my-10 border-b">
                                <th className="border-r">TOTAL</th>
                                <td className="border-r"></td>
                                <td className="border-r"></td>
                                <td className="border-r"></td>
                                <td className="border-r"></td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h5 className="my-10 text-center font-bold">
                    I. DETAILS OF TAX DEDUCTED AND DEPOSITED IN THE CENTRAL
                  </h5>
                  <h5 className="font-bold">
                    GOVERNMENT ACCOUNT THROUGH BOOK ADJUSTMENT (the deductor to
                    provide payment wise details of tax deducted and deposited
                    with respect to the deductee){' '}
                  </h5>
                  <div class="flex flex-col">
                    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div class="overflow-hidden">
                          <table class="min-w-full border-collapse border text-center">
                            <thead>
                              <tr className="border" my-10>
                                <th className="border-r">Sl. No.</th>
                                <th className="border-r">
                                  Tax Deposited in respect of the deductee (Rs.
                                  )
                                </th>
                                <th
                                  colSpan={4}
                                  className="border-r text-center"
                                >
                                  Challan Identification Number (CIN)
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border" my-10>
                                <td></td>
                                <td className="border-r"></td>
                                <td className="border-r">
                                  Receipt numbers of Form No.24G{' '}
                                </td>

                                <td className="border-r">
                                  DDO serial number in Form No. 24G{' '}
                                </td>

                                <td className="border-r">
                                  Date of transfer voucher dd/mm/yyyy{' '}
                                </td>

                                <td className="border-r">
                                  Status of matching with Form No. 24G
                                </td>
                              </tr>
                              <tr className="border" my-10>
                                <td className="border-r"></td>
                                <td className="border-r"></td>
                                <td className="border-r"></td>
                                <td className="border-r"></td>
                                <td className="border-r"></td>
                                <td className="border-r"></td>
                              </tr>
                              <tr className="border" my-10>
                                <th className="border-r">TOTAL</th>
                                <td className="border-r"></td>
                                <td className="border-r"></td>
                                <td className="border-r"></td>
                                <td className="border-r"></td>
                                <td className="border-r"></td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h5 className="font-bold text-center my-10">
                    II. DETAILS OF TAX DEDUCTED AND DEPOSITED IN THE CENTRAL
                    GOVERNMENT ACCOUNT THROUGH CHALLAN
                  </h5>
                  <h5 className="font-bold text-center">
                    (The deductor to provide payment wise details of tax
                    deductedand deposited with respect to the deductee){' '}
                  </h5>
                  <div class="flex flex-col">
                    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div class="overflow-hidden">
                          <table class="min-w-full border-collapse border text-center">
                            <thead>
                              <tr className="border" my-10>
                                <th className="border-r">Sl. No.</th>
                                <th className="border-r">
                                  Tax Deposited in respect of the deductee (Rs.
                                  )
                                </th>
                                <th
                                  colSpan={4}
                                  className="border-r text-center"
                                >
                                  Challan Identification Number (CIN)
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border" my-10>
                                <td className="border-r"></td>
                                <td className="border-r"></td>
                                <td className="border-r">
                                  BSR Code of the Bank Branch
                                </td>
                                <td className="border-r">
                                  Date on which tax deposited (dd/mm/yyyy)
                                </td>
                                <td className="border-r">
                                  Challan Serial Number
                                </td>
                                <td className="border-r">
                                  Status of matching with OLTAS
                                </td>
                              </tr>
                              <tr className="border" my-10>
                                <td className="border-r"></td>
                                <td className="border-r"></td>
                                <td className="border-r"></td>
                                <td className="border-r"></td>
                                <td className="border-r"></td>
                                <td className="border-r"></td>
                              </tr>
                              <tr className="border" my-10>
                                <th className="border-r">TOTAL</th>
                                <td className="border-r"></td>
                                <td className="border-r"></td>
                                <td className="border-r"></td>
                                <td className="border-r"></td>
                                <td className="border-r"></td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h5 className="text-center font-bold mt-10">Verification</h5>
                  <div class="flex flex-row">
                    <div class="basis-1/4">
                      <div className="flex flex-row">
                        <h6 className="text-lg mt-4 mx-2">I,</h6>
                        <input
                          type="text"
                          class="
                                                    form-control
                                                    block
                                                    w-full
                                                    px-3
                                                    py-1.5
                                                    text-base
                                                    font-normal
                                                    text-gray-700
                                                    bg-white bg-clip-padding
                                                    border-b border-solid border-gray-300
                                                    rounded
                                                    transition
                                                    ease-in-out
                                                    m-0
                                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                                "
                          id="exampleText0"
                        />
                      </div>
                    </div>
                    <div class="basis-1/4">
                      <div className="flex flex-row">
                        <h6 className="text mt-4 mx-2 ">,son/daughter of</h6>
                        <input
                          type="text"
                          class="
                                                    form-control
                                                    block
                                                    w-6/12
                                                    px-3
                                                    py-1.5
                                                    text-base
                                                    font-normal
                                                    text-gray-700
                                                    bg-white bg-clip-padding
                                                    border-b border-solid border-gray-300
                                                    rounded
                                                    transition
                                                    ease-in-out
                                                    m-0
                                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                                "
                          id="exampleText0"
                        />
                      </div>
                    </div>
                    <div class="basis-2/4">
                      <div className="flex flex-row">
                        <h6 className="text mt-4  ">
                          working in the capacity of
                        </h6>
                        <input
                          type="text"
                          class="
                                                    form-control
                                                    block
                                                    w-6/12
                                                    px-3
                                                    py-1.5
                                                    text-base
                                                    font-normal
                                                    text-gray-700
                                                    bg-white bg-clip-padding
                                                    border-b border-solid border-gray-300
                                                    rounded
                                                    transition
                                                    ease-in-out
                                                    m-0
                                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                                "
                          id="exampleText0"
                        />
                      </div>
                    </div>
                    <h6 className="text mt-4  ">(designation) do</h6>
                  </div>
                  <div className="flex flex-row">
                    <div className="basis-1/5">hereby</div>
                    <div className="basis-1/5">certify</div>
                    <div className="basis-1/5">that</div>
                    <div className="basis-1/5">a</div>
                    <div className="basis-1/5">sum</div>
                    <div className="basis-1/5">of</div>
                  </div>
                  <div class="flex flex-row">
                    <div class="basis-1/4">
                      <div className="flex flex-row">
                        <h6 className="text-lg mt-4 mx-2">Rs</h6>
                        <input
                          type="text"
                          class="
                                                    form-control
                                                    block
                                                    w-full
                                                    px-3
                                                    py-1.5
                                                    text-base
                                                    font-normal
                                                    text-gray-700
                                                    bg-white bg-clip-padding
                                                    border-b border-solid border-gray-300
                                                    rounded
                                                    transition
                                                    ease-in-out
                                                    m-0
                                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                                "
                          id="exampleText0"
                        />
                      </div>
                    </div>
                    <div class="basis-3/4">
                      <div className="flex flex-row">
                        <h6 className="text-lg mt-4 mx-2">[Rs</h6>
                        <input
                          type="text"
                          class="
                                                    form-control
                                                    block
                                                    w-full
                                                    px-3
                                                    py-1.5
                                                    text-base
                                                    font-normal
                                                    text-gray-700
                                                    bg-white bg-clip-padding
                                                    border-b border-solid border-gray-300
                                                    rounded
                                                    transition
                                                    ease-in-out
                                                    m-0
                                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                                "
                          id="exampleText0"
                        />
                      </div>
                    </div>
                  </div>
                  <h6>
                    (in words)] has been deducted and deposited to the credit of
                    the Central Government. I further certify that the
                    information given above is true, complete and correct and is
                    based on the books of account, documents, TDS statements,
                    TDS deposited and other available records.{' '}
                  </h6>
                  <div className="flex flex-row my-5">
                    <div class="basis-2/4">
                      <div className="flex flex-row">
                        <div class="basis-4/4">
                          <div className="flex flex-row">
                            <h6 className="text-lg mt-4 mx-2">Place</h6>
                            <input
                              type="text"
                              class="
                                                    form-control
                                                    block
                                                    w-full
                                                    px-3
                                                    py-1.5
                                                    text-base
                                                    font-normal
                                                    text-gray-700
                                                    bg-white bg-clip-padding
                                                    border-b border-solid border-gray-300
                                                    rounded
                                                    transition
                                                    ease-in-out
                                                    m-0
                                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                                "
                              id="exampleText0"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="basis-2/4">
                      <div class="text-end">
                        (Signature of person responsible for deduction of tax)
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row ">
                    <div class="basis-2/4">
                      <div className="flex flex-row">
                        <div class="basis-4/4">
                          <div className="flex flex-row">
                            <h6 className="text-lg mt-4 mx-2">Date</h6>
                            <input
                              type="text"
                              class="
                                                    form-control
                                                    block
                                                    w-full
                                                    px-3
                                                    py-1.5
                                                    text-base
                                                    font-normal
                                                    text-gray-700
                                                    bg-white bg-clip-padding
                                                    border-b border-solid border-gray-300
                                                    rounded
                                                    transition
                                                    ease-in-out
                                                    m-0
                                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                                "
                              id="exampleText0"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row my-5">
                    <div class="basis-2/4">
                      <div className="flex flex-row">
                        <div class="basis-4/4">
                          <div className="flex flex-row">
                            <h6 className="text-lg mt-4 mx-2">Designation</h6>
                            <input
                              type="text"
                              class="
                                                    form-control
                                                    block
                                                    w-full
                                                    px-3
                                                    py-1.5
                                                    text-base
                                                    font-normal
                                                    text-gray-700
                                                    bg-white bg-clip-padding
                                                    border-b border-solid border-gray-300
                                                    rounded
                                                    transition
                                                    ease-in-out
                                                    m-0
                                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                                "
                              id="exampleText0"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="basis-2/4">
                      <div className="flex flex-row ">
                        <div class="basis-4/4 ">
                          <div className="flex flex-row ">
                            <h6 className="text-lg mt-4 mx-2">Full Name</h6>
                            <input
                              type="text"
                              class="
                                                    form-control
                                                    block
                                                    w-6/12
                                                    px-3
                                                    py-1.5
                                                    text-base
                                                    font-normal
                                                    text-gray-700
                                                    bg-white bg-clip-padding
                                                    border-b border-solid border-gray-300
                                                    rounded
                                                    transition
                                                    ease-in-out
                                                    m-0
                                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                                "
                              id="exampleText0"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h6 className="text-end font-bold">PART B (Annexure-I)</h6>
                  <h6 className="font-bold">
                    In relation to employees for tax deduction under section 192
                  </h6>
                  <table class="min-w-full border-collapse border text-center">
                    <thead>
                      <tr className="my-10 border-b">
                        <th colSpan={5} scope="col " className="text-center">
                          Details of Salary Paid and any other income and tax
                          deducted
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="my-10 border-b">
                        <th className="border-r">1.</th>
                        <td colSpan={4}>Gross Salary</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">(a)</th>
                        <td className="border-r">
                          Whether opting for taxation u/s 115BAC?
                        </td>
                        <td colSpan={3} className="border-r">
                          Yes/No
                        </td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">(A)</th>
                        <td className="border-r">
                          Salary as per provisions contained in section 17(1)
                        </td>
                        <td className="border-r"></td>
                        <td className="border-r">Rs....</td>
                        <td className="border-r"></td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">(B)</th>
                        <td className="border-r">
                          Value of perquisites under section 17(2).(as per Form
                          No. 12BA, wherever applicable)
                        </td>
                        <td className="border-r"></td>
                        <td className="border-r">Rs....</td>
                        <td className="border-r"></td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">(C)</th>
                        <td className="border-r">
                          Profits in lieu of salary under section 17(3) (as per
                          Form No. 12BA, whereverpplicable){' '}
                        </td>
                        <td className="border-r"></td>
                        <td className="border-r">Rs....</td>
                        <td className="border-r"></td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">(D)</th>
                        <td className="border-r">Total</td>
                        <td className="border-r"></td>
                        <td className="border-r"></td>
                        <td className="border-r">Rs....</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">(E)</th>
                        <td className="border-r">
                          Reported total amount of salary received from other
                          employer(s)
                        </td>
                        <td className="border-r"></td>
                        <td className="border-r"></td>
                        <td className="border-r">Rs....</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">2.</th>
                        <td colSpan={4}>
                          Less: Allowances to the extent exempt under section 10
                        </td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">(A)</th>
                        <td className="border-r">
                          {' '}
                          Travel concession or assistance under section 10(5)
                        </td>
                        <td className="border-r"></td>
                        <td className="border-r">Rs....</td>
                        <td className="border-r"></td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">(B)</th>
                        <td className="border-r">
                          Death-cum-retirement gratuity under section 10(10)
                        </td>
                        <td className="border-r"></td>
                        <td className="border-r">Rs....</td>
                        <td className="border-r"></td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">(C)</th>
                        <td className="border-r">
                          Commuted value of pension under section 10(10A){' '}
                        </td>
                        <td className="border-r"></td>
                        <td className="border-r">Rs....</td>
                        <td className="border-r"></td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">(D)</th>
                        <td className="border-r">
                          Cash equivalent of leave salary encashment under
                          section 10(10AA)
                        </td>
                        <td className="border-r"></td>
                        <td className="border-r">Rs....</td>
                        <td className="border-r"></td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">(E)</th>
                        <td className="border-r">
                          House rent allowance under section 10(13A){' '}
                        </td>
                        <td className="border-r"></td>
                        <td className="border-r">Rs....</td>
                        <td className="border-r"></td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">(F)</th>
                        <td className="border-r">
                          Amount of any other exemption under section 10{' '}
                        </td>
                        <td className="border-r"></td>
                        <td className="border-r"></td>
                        <td className="border-r"></td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r"></th>
                        <td className="border-r">clause...</td>
                        <td className="border-r">Rs....</td>
                        <td className="border-r"></td>
                        <td className="border-r"></td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r"></th>
                        <td className="border-r">clause…</td>
                        <td className="border-r">Rs....</td>
                        <td className="border-r"></td>
                        <td className="border-r"></td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r"></th>
                        <td className="border-r">clause…</td>
                        <td className="border-r">Rs....</td>
                        <td className="border-r"></td>
                        <td className="border-r"></td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r"></th>
                        <td className="border-r">clause…</td>
                        <td className="border-r">Rs....</td>
                        <td className="border-r"></td>
                        <td className="border-r"></td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r"></th>
                        <td className="border-r">clause…</td>
                        <td className="border-r">Rs....</td>
                        <td className="border-r"></td>
                        <td className="border-r"></td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r"></th>
                        <td className="border-r">...</td>
                        <td className="border-r">Rs....</td>
                        <td className="border-r"></td>
                        <td className="border-r"></td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">(G)</th>
                        <td className="border-r">
                          Total amount of any other exemption under section 10{' '}
                        </td>
                        <td className="border-r"></td>
                        <td className="border-r">Rs....</td>
                        <td className="border-r"></td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">(H)</th>
                        <td className="border-r">
                          Total amount of exemption claimed under section 10
                          [2(a)+2(b)+2(c)+2(d)+2(e)+2(g)]{' '}
                        </td>
                        <td className="border-r"></td>
                        <td className="border-r"></td>
                        <td className="border-r">Rs....</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">3</th>
                        <td className="border-r">
                          Total amount of salary received from current employer
                          [1(d)-2(h)]{' '}
                        </td>
                        <td className="border-r"></td>
                        <td className="border-r"></td>
                        <td className="border-r">Rs....</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">4</th>
                        <td colSpan={4}>Less: Deductions under section 16 </td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">(A)</th>
                        <td className="border-r">
                          Standard deduction under section 16(ia){' '}
                        </td>
                        <td className="border-r"></td>
                        <td className="border-r">Rs....</td>
                        <td className="border-r"></td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">(B)</th>
                        <td className="border-r">
                          Entertainment allowance under section 16(ii){' '}
                        </td>
                        <td className="border-r"></td>
                        <td className="border-r">Rs....</td>
                        <td className="border-r"></td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">(C)</th>
                        <td className="border-r">
                          Tax on employment under section 16(iii){' '}
                        </td>
                        <td className="border-r"></td>
                        <td className="border-r">Rs....</td>
                        <td className="border-r"></td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">5</th>
                        <td className="border-r">
                          Total amount of deductions under section 16
                          [4(a)+4(b)+4(c)]{' '}
                        </td>
                        <td className="border-r"></td>
                        <td className="border-r"></td>
                        <td className="border-r">Rs....</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">6</th>
                        <td className="border-r">
                          Income chargeable under the head &quot;Salaries&quot;
                          [(3+1(e)-5]{' '}
                        </td>
                        <td className="border-r"></td>
                        <td className="border-r"></td>
                        <td className="border-r">Rs....</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">7</th>
                        <td colSpan={4}>
                          Add: Any other income reported by the employee under
                          as per section 192 (2B){' '}
                        </td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">a</th>
                        <td className="border-r">
                          Income (or admissible loss) from house property
                          reported by employee offered for TDS{' '}
                        </td>
                        <td className="border-r"></td>
                        <td className="border-r">Rs....</td>
                        <td className="border-r"></td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">b</th>
                        <td className="border-r">
                          Income under the head Other Sources offered for TDS{' '}
                        </td>
                        <td className="border-r"></td>
                        <td className="border-r">Rs....</td>
                        <td className="border-r"></td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">8</th>
                        <td className="border-r">
                          Total amount of other income reported by the employee
                          [7(a)+7(b)]{' '}
                        </td>
                        <td className="border-r"></td>
                        <td className="border-r"></td>
                        <td className="border-r">Rs....</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">(C)</th>
                        <td className="border-r">
                          Tax on employment under section 16(iii){' '}
                        </td>
                        <td className="border-r"></td>
                        <td className="border-r">Rs....</td>
                        <td className="border-r"></td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">9</th>
                        <td className="border-r">Gross total income (6+8) </td>
                        <td className="border-r"></td>
                        <td className="border-r">Rs....</td>
                        <td className="border-r"></td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">10</th>
                        <td colSpan={4}>Deductions under Chapter VI-A</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th colSpan={3}></th>
                        <th className="border-r">Gross Amount </th>
                        <th className="border-r">Deductible Amount </th>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">(B)</th>
                        <td className="border-r">
                          Deduction in respect of contribution to certain
                          pension funds under section 80CCC
                        </td>
                        <td className="border-r"></td>
                        <td className="border-r">Rs. ...</td>
                        <td className="border-r">Rs. ...</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">(C)</th>
                        <td className="border-r">
                          Deduction in respect of contribution by taxpayer to
                          pension scheme under section 80CCD (1){' '}
                        </td>
                        <td className="border-r"></td>
                        <td className="border-r">Rs. ...</td>
                        <td className="border-r">Rs. ...</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">(D)</th>
                        <td className="border-r">
                          Total deduction under section 80C, 80CCC and 80CCD(1){' '}
                        </td>
                        <td className="border-r"></td>
                        <td className="border-r">Rs. ...</td>
                        <td className="border-r">Rs. ...</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">(E)</th>
                        <td className="border-r">
                          Deductions in respect of amount paid/deposited to
                          notified pension scheme under section 80CCD (1B)
                        </td>
                        <td className="border-r"></td>
                        <td className="border-r">Rs. ...</td>
                        <td className="border-r">Rs. ...</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">(F)</th>
                        <td className="border-r">
                          Deduction in respect of contribution by Employer to
                          pension scheme under section 80CCD (2){' '}
                        </td>
                        <td className="border-r"></td>
                        <td className="border-r">Rs. ...</td>
                        <td className="border-r">Rs. ...</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">(G)</th>
                        <td className="border-r">
                          Deduction in respect of health insurance premia under
                          section 80D
                        </td>
                        <td className="border-r"></td>
                        <td className="border-r">Rs. ...</td>
                        <td className="border-r">Rs. ...</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">(H)</th>
                        <td className="border-r">
                          Deduction in respect of interest on loan taken for
                          higher education under section 80E{' '}
                        </td>
                        <td className="border-r"></td>
                        <td className="border-r">Rs. ...</td>
                        <td className="border-r">Rs. ...</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <td colSpan={2}></td>
                        <td className="border-r">Gross Amount</td>
                        <td className="border-r">Qualifying Amount</td>
                        <td className="border-r">Deductible Amount</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">(I)</th>
                        <td className="border-r">
                          Total Deduction in respect of donations to certain
                          funds, charitable institutions, etc. under section 80G{' '}
                        </td>
                        <td className="border-r">Rs. ...</td>
                        <td className="border-r">Rs. ...</td>
                        <td className="border-r">Rs. ...</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">(J)</th>
                        <td className="border-r">
                          Deduction in respect of interest on deposits in
                          savings account under section 80TTA{' '}
                        </td>
                        <td className="border-r">Rs. ...</td>
                        <td className="border-r">Rs. ...</td>
                        <td className="border-r">Rs. ...</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">(K)</th>
                        <th colSpan={4}>
                          Amount deductible under any other provision(s) of
                          Chapter VI-A
                        </th>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r"></th>
                        <td className="border-r">section …</td>
                        <td className="border-r">Rs. ...</td>
                        <td className="border-r">Rs. ...</td>
                        <td className="border-r">Rs. ...</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r"></th>
                        <td className="border-r">section …</td>
                        <td className="border-r">Rs. ...</td>
                        <td className="border-r">Rs. ...</td>
                        <td className="border-r">Rs. ...</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r"></th>
                        <td className="border-r">section …</td>
                        <td className="border-r">Rs. ...</td>
                        <td className="border-r">Rs. ...</td>
                        <td className="border-r">Rs. ...</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r"></th>
                        <td className="border-r">section …</td>
                        <td className="border-r">Rs. ...</td>
                        <td className="border-r">Rs. ...</td>
                        <td className="border-r">Rs. ...</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r"></th>
                        <td className="border-r">section …</td>
                        <td className="border-r">Rs. ...</td>
                        <td className="border-r">Rs. ...</td>
                        <td className="border-r">Rs. ...</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r"></th>
                        <td className="border-r">section …</td>
                        <td className="border-r">Rs. ...</td>
                        <td className="border-r">Rs. ...</td>
                        <td className="border-r">Rs. ...</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r"></th>
                        <td className="border-r">…</td>
                        <td className="border-r">Rs. ...</td>
                        <td className="border-r">Rs. ...</td>
                        <td className="border-r">Rs. ...</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">(L)</th>
                        <td className="border-r">
                          Total of amount deductible under any other
                          provision(s) of Chapter VI-A{' '}
                        </td>
                        <td className="border-r">Rs. ...</td>
                        <td className="border-r">Rs. ...</td>
                        <td className="border-r">Rs. ...</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">11</th>
                        <td className="border-r">
                          Aggregate of deductible amount under Chapter VI-A
                          [10(a)+10(b)+10(c)+10(d)+10(e)+10(f)+10(g)+10(h)+10(i)
                          10(j)+10(l)]{' '}
                        </td>
                        <td className="border-r"></td>
                        <td className="border-r"></td>
                        <td className="border-r">Rs. ...</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">12</th>
                        <td className="border-r">
                          Total taxable income (9-11){' '}
                        </td>
                        <td className="border-r"></td>
                        <td className="border-r"></td>
                        <td className="border-r">Rs. ...</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">13</th>
                        <td className="border-r">Tax on total income </td>
                        <td className="border-r"></td>
                        <td className="border-r"></td>
                        <td className="border-r">Rs. ...</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">14</th>
                        <td className="border-r">
                          Rebate under section 87A, if applicable{' '}
                        </td>
                        <td className="border-r"></td>
                        <td className="border-r"></td>
                        <td className="border-r">Rs. ...</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">15</th>
                        <td className="border-r">
                          Surcharge, wherever applicable{' '}
                        </td>
                        <td className="border-r"></td>
                        <td className="border-r"></td>
                        <td className="border-r">Rs. ...</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">16</th>
                        <td className="border-r">Health and education cess </td>
                        <td className="border-r"></td>
                        <td className="border-r"></td>
                        <td className="border-r">Rs. ...</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">17</th>
                        <td className="border-r">Tax payable (13+15+16-14) </td>
                        <td className="border-r"></td>
                        <td className="border-r"></td>
                        <td className="border-r">Rs. ...</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">18</th>
                        <td className="border-r">
                          Less: Relief under section 89 (attach details){' '}
                        </td>
                        <td className="border-r"></td>
                        <td className="border-r"></td>
                        <td className="border-r">Rs. ...</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">19</th>
                        <td className="border-r">Net tax payable (17-18) </td>
                        <td className="border-r"></td>
                        <td className="border-r"></td>
                        <td className="border-r">Rs. ...</td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="flex flex-row">
                    <div class="basis-1/4">
                      <div className="flex flex-row">
                        <h6 className="text-lg mt-4 mx-2">I,</h6>
                        <input
                          type="text"
                          class="
                                                    form-control
                                                    block
                                                    w-full
                                                    px-3
                                                    py-1.5
                                                    text-base
                                                    font-normal
                                                    text-gray-700
                                                    bg-white bg-clip-padding
                                                    border-b border-solid border-gray-300
                                                    rounded
                                                    transition
                                                    ease-in-out
                                                    m-0
                                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                                "
                          id="exampleText0"
                        />
                      </div>
                    </div>
                    <div class="basis-1/4">
                      <div className="flex flex-row">
                        <h6 className="text mt-4 mx-2 ">,son/daughter of</h6>
                        <input
                          type="text"
                          class="
                                                    form-control
                                                    block
                                                    w-6/12
                                                    px-3
                                                    py-1.5
                                                    text-base
                                                    font-normal
                                                    text-gray-700
                                                    bg-white bg-clip-padding
                                                    border-b border-solid border-gray-300
                                                    rounded
                                                    transition
                                                    ease-in-out
                                                    m-0
                                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                                "
                          id="exampleText0"
                        />
                      </div>
                    </div>
                    <div class="basis-2/4">
                      <div className="flex flex-row">
                        <h6 className="text mt-4  ">
                          working in the capacity of
                        </h6>
                        <input
                          type="text"
                          class="
                                                    form-control
                                                    block
                                                    w-6/12
                                                    px-3
                                                    py-1.5
                                                    text-base
                                                    font-normal
                                                    text-gray-700
                                                    bg-white bg-clip-padding
                                                    border-b border-solid border-gray-300
                                                    rounded
                                                    transition
                                                    ease-in-out
                                                    m-0
                                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                                "
                          id="exampleText0"
                        />
                      </div>
                    </div>
                  </div>
                  (designation) do hereby certify that the information given
                  above is true, complete and correct and is based on the books
                  of account, documents, TDS statements, and other available
                  records.
                  <div className="flex flex-row my-5">
                    <div class="basis-2/4">
                      <div className="flex flex-row">
                        <div class="basis-4/4">
                          <div className="flex flex-row">
                            <h6 className="text-lg mt-4 mx-2">Place</h6>
                            <input
                              type="text"
                              class="
                                                    form-control
                                                    block
                                                    w-full
                                                    px-3
                                                    py-1.5
                                                    text-base
                                                    font-normal
                                                    text-gray-700
                                                    bg-white bg-clip-padding
                                                    border-b border-solid border-gray-300
                                                    rounded
                                                    transition
                                                    ease-in-out
                                                    m-0
                                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                                "
                              id="exampleText0"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="basis-2/4">
                      <div class="text-end">
                        (Signature of person responsible for deduction of tax)
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row my-5">
                    <div class="basis-2/4">
                      <div className="flex flex-row">
                        <div class="basis-4/4">
                          <div className="flex flex-row">
                            <h6 className="text-lg mt-4 mx-2">Date</h6>
                            <input
                              type="text"
                              class="
                                                    form-control
                                                    block
                                                    w-full
                                                    px-3
                                                    py-1.5
                                                    text-base
                                                    font-normal
                                                    text-gray-700
                                                    bg-white bg-clip-padding
                                                    border-b border-solid border-gray-300
                                                    rounded
                                                    transition
                                                    ease-in-out
                                                    m-0
                                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                                "
                              id="exampleText0"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="basis-2/4">
                      <div className="flex flex-row">
                        <div class="basis-4/4">
                          <div className="flex flex-row">
                            <h6 className="text-lg mt-4 mx-2">Full Name</h6>
                            <input
                              type="text"
                              class="
                                                    form-control
                                                    block
                                                    w-6/12
                                                    px-3
                                                    py-1.5
                                                    text-base
                                                    font-normal
                                                    text-gray-700
                                                    bg-white bg-clip-padding
                                                    border-b border-solid border-gray-300
                                                    rounded
                                                    transition
                                                    ease-in-out
                                                    m-0
                                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                                "
                              id="exampleText0"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h6 className="text-end font-bold mx-2">Annexure II </h6>
                  <h6 className=" font-bold mx-2">
                    In relation to specified senior citizen for tax deduction
                    under section 194P{' '}
                  </h6>
                  <table class="min-w-full border-collapse border text-center mt-10">
                    <tbody>
                      <tr className="my-10 border-b">
                        <th colSpan={3} className="border-r">
                          Whether opting for taxation u/s 115BAC?{' '}
                        </th>
                        <td>[YES/NO]</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">1.</th>
                        <td colSpan={4}>Gross Salary</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">(a)</th>
                        <td className="border-r">
                          Pension as per provisions contained in clause (ii) of
                          section 17(1)
                        </td>
                        <td className="border-r"></td>
                        <td className="border-r">Rs....</td>
                        <td className="border-r"></td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">2</th>
                        <td className="border-r">
                          Total amount of salary received{' '}
                        </td>
                        <td className="border-r"></td>
                        <td className="border-r"></td>
                        <td className="border-r">Rs....</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">3</th>
                        <td className="border-r">
                          Less: Deductions under section 16
                        </td>
                        <td className="border-r"></td>
                        <td className="border-r"></td>
                        <td className="border-r"></td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">(b)</th>
                        <td className="border-r">
                          Tax on employment undersection 16(iii){' '}
                        </td>
                        <td className="border-r"></td>
                        <td className="border-r">Rs....</td>
                        <td className="border-r"></td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">4</th>
                        <td className="border-r">
                          Total amount of deductions under section 16
                          [3(a)+3(b)]{' '}
                        </td>
                        <td className="border-r"></td>
                        <td className="border-r"></td>
                        <td className="border-r">Rs....</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">5</th>
                        <td className="border-r">
                          Income chargeable under the head &quot;Salaries&quot;
                          [(2-4]{' '}
                        </td>
                        <td className="border-r"></td>
                        <td className="border-r"></td>
                        <td className="border-r">Rs....</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">6</th>
                        <th className="border-r">
                          Interest Income under the head Other Sources paid by
                          the specified bank
                        </th>
                        <th className="border-r"></th>
                        <th className="border-r">Rs....</th>
                        <th className="border-r"></th>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">7</th>
                        <td className="border-r"> Gross total income (5+6) </td>
                        <td className="border-r"></td>
                        <td className="border-r"></td>
                        <td className="border-r">Rs....</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">8</th>
                        <td colSpan={4} className="border-r">
                          Deductions under Chapter VI-A
                        </td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th colSpan={3} className="border-r"></th>

                        <td className="border-r">Gross Amount</td>
                        <td className="border-r">Deductible Amount</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">(a)</th>
                        <td className="border-r">
                          Deduction in respect of life insurance premia,
                          contributions to provident fund etc. under section 80C
                        </td>
                        <td className="border-r"></td>
                        <td className="border-r">Rs....</td>
                        <td className="border-r">Rs....</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">(b)</th>
                        <td className="border-r">
                          Deduction in respect of contribution to certain
                          pension funds under section 80CCC{' '}
                        </td>
                        <td className="border-r"></td>
                        <td className="border-r">Rs....</td>
                        <td className="border-r">Rs....</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">(c)</th>
                        <td className="border-r">
                          Deduction in respect of contribution by taxpayer to
                          pension scheme under section 80CCD(1)
                        </td>
                        <td className="border-r"></td>
                        <td className="border-r">Rs....</td>
                        <td className="border-r">Rs....</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">(d)</th>
                        <td className="border-r">
                          Total deduction under section 80C, 80CCC and 80CCD (1){' '}
                        </td>
                        <td className="border-r"></td>
                        <td className="border-r">Rs....</td>
                        <td className="border-r">Rs....</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">(e) </th>
                        <td className="border-r">
                          Deductions in respect of amount paid/deposited to
                          notified pension scheme under section 80CCD (1B)
                        </td>
                        <td className="border-r"></td>
                        <td className="border-r">Rs....</td>
                        <td className="border-r">Rs....</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">(b)</th>
                        <td className="border-r">
                          Deduction in respect of health insurance premia under
                          section 80D
                        </td>
                        <td className="border-r"></td>
                        <td className="border-r">Rs....</td>
                        <td className="border-r">Rs....</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">(e)</th>
                        <td className="border-r">
                          Deduction in respect of interest on loan taken for
                          higher education under section 80E
                        </td>
                        <td className="border-r"></td>
                        <td className="border-r">Rs....</td>
                        <td className="border-r">Rs....</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th colSpan={2} className="border-r"></th>
                        <td className="border-r">Gross Amount</td>
                        <td className="border-r">Qualifiying Amount</td>
                        <td className="border-r">Dedctible</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">(f)</th>
                        <td className="border-r">
                          Total Deduction in respect of donations to certain
                          funds, charitable institutions, etc. under section 80G
                        </td>
                        <td className="border-r">Rs....</td>
                        <td className="border-r">Rs....</td>
                        <td className="border-r">Rs....</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">(g)</th>
                        <td className="border-r">
                          Deduction in respect of interest on deposits in
                          savings account under section 80TTB
                        </td>
                        <td className="border-r">Rs....</td>
                        <td className="border-r">Rs....</td>
                        <td className="border-r">Rs....</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">(h)</th>
                        <td colSpan={4} className="border-r">
                          Amount deductible under any other provision(s) of
                          Chapter VI_A{' '}
                        </td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r"></th>
                        <td className="border-r">section … </td>
                        <td className="border-r">Rs....</td>
                        <td className="border-r">Rs....</td>
                        <td className="border-r">Rs....</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r"></th>
                        <td className="border-r">section … </td>
                        <td className="border-r">Rs....</td>
                        <td className="border-r">Rs....</td>
                        <td className="border-r">Rs....</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r"></th>
                        <td className="border-r">section … </td>
                        <td className="border-r">Rs....</td>
                        <td className="border-r">Rs....</td>
                        <td className="border-r">Rs....</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r"></th>
                        <td className="border-r">section … </td>
                        <td className="border-r">Rs....</td>
                        <td className="border-r">Rs....</td>
                        <td className="border-r">Rs....</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r"></th>
                        <td className="border-r">section … </td>
                        <td className="border-r">Rs....</td>
                        <td className="border-r">Rs....</td>
                        <td className="border-r">Rs....</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r"></th>
                        <td className="border-r">section … </td>
                        <td className="border-r">Rs....</td>
                        <td className="border-r">Rs....</td>
                        <td className="border-r">Rs....</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r"></th>
                        <td className="border-r"> … </td>
                        <td className="border-r">Rs....</td>
                        <td className="border-r">Rs....</td>
                        <td className="border-r">Rs....</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r"> (i) </th>
                        <td className="border-r">
                          Total of amount deductible under any other
                          provision(s) of Chapter VI_A{' '}
                        </td>
                        <td className="border-r">Rs....</td>
                        <td className="border-r">Rs....</td>
                        <td className="border-r">Rs....</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">9</th>
                        <td className="border-r">
                          Aggregate of deductible amount under Chapter VI-A
                          [8(a)+8(b)+8(c)+8(d)+8(e)+8(f)+8(g)+8(h)+8(i)]{' '}
                        </td>
                        <td className="border-r"></td>
                        <td className="border-r"></td>
                        <td className="border-r">Rs....</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">10</th>
                        <td className="border-r">Total taxable income (7-9)</td>
                        <td className="border-r"></td>
                        <td className="border-r"></td>
                        <td className="border-r">Rs....</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">11</th>
                        <td className="border-r">Tax on total income </td>
                        <td className="border-r"></td>
                        <td className="border-r"></td>
                        <td className="border-r">Rs....</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">12</th>
                        <td className="border-r">
                          Rebate under section 87A, if applicable
                        </td>
                        <td className="border-r"></td>
                        <td className="border-r"></td>
                        <td className="border-r">Rs....</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">13</th>
                        <td className="border-r">
                          Surcharge, wherever applicable{' '}
                        </td>
                        <td className="border-r"></td>
                        <td className="border-r"></td>
                        <td className="border-r">Rs....</td>
                      </tr>

                      <tr className="my-10 border-b">
                        <th className="border-r">14</th>
                        <td className="border-r">Health and education cess </td>
                        <td className="border-r"></td>
                        <td className="border-r"></td>
                        <td className="border-r">Rs....</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">15</th>
                        <td className="border-r">Tax payable (11+13+14-12) </td>
                        <td className="border-r"></td>
                        <td className="border-r"></td>
                        <td className="border-r">Rs....</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">16</th>
                        <td className="border-r">
                          Less: Relief under section 89 (attach details){' '}
                        </td>
                        <td className="border-r"></td>
                        <td className="border-r"></td>
                        <td className="border-r">Rs....</td>
                      </tr>
                      <tr className="my-10 border-b">
                        <th className="border-r">17</th>
                        <td className="border-r">Net tax payable (16-17) </td>
                        <td className="border-r"></td>
                        <td className="border-r"></td>
                        <td className="border-r">Rs....</td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="flex flex-col">
                    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div class="overflow-hidden">
                          <table class="min-w-full border-collapse border text-center">
                            <tbody>
                              <tr className="my-10 border-b">
                                <th
                                  colSpan={2}
                                  scope="col"
                                  class="text-sm font-medium text-center  px-6 py-4 border-r"
                                >
                                  Verification
                                </th>
                              </tr>
                              <tr className="my-10 border-b">
                                <td colSpan={2} className="border-r">
                                  <div class="flex flex-row">
                                    <div class="basis-1/4">
                                      <div className="flex flex-row">
                                        <h6 className="text-lg mt-4 mx-2">
                                          I,
                                        </h6>
                                        <input
                                          type="text"
                                          class="
                                                    form-control
                                                    block
                                                    w-full
                                                    px-3
                                                    py-1.5
                                                    text-base
                                                    font-normal
                                                    text-gray-700
                                                    bg-white bg-clip-padding
                                                    border-b border-solid border-gray-300
                                                    rounded
                                                    transition
                                                    ease-in-out
                                                    m-0
                                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                                "
                                          id="exampleText0"
                                        />
                                      </div>
                                    </div>
                                    <div class="basis-1/4">
                                      <div className="flex flex-row">
                                        <h6 className="text mt-4 mx-2 ">
                                          ,son/daughter of
                                        </h6>
                                        <input
                                          type="text"
                                          class="
                                                    form-control
                                                    block
                                                    w-6/12
                                                    px-3
                                                    py-1.5
                                                    text-base
                                                    font-normal
                                                    text-gray-700
                                                    bg-white bg-clip-padding
                                                    border-b border-solid border-gray-300
                                                    rounded
                                                    transition
                                                    ease-in-out
                                                    m-0
                                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                                "
                                          id="exampleText0"
                                        />
                                      </div>
                                    </div>
                                    <div class="basis-2/4">
                                      <div className="flex flex-row">
                                        <h6 className="text mt-4  ">
                                          working in the capacity of
                                        </h6>
                                        <input
                                          type="text"
                                          class="
                                                    form-control
                                                    block
                                                    w-6/12
                                                    px-3
                                                    py-1.5
                                                    text-base
                                                    font-normal
                                                    text-gray-700
                                                    bg-white bg-clip-padding
                                                    border-b border-solid border-gray-300
                                                    rounded
                                                    transition
                                                    ease-in-out
                                                    m-0
                                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                                "
                                          id="exampleText0"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <h6 className="text mt-4  ">
                                    (designation) do do hereby certify that the
                                    information given above is true, complete
                                    and correct and is based on the books of
                                    account, documents, TDS statements, and
                                    other available records.
                                  </h6>
                                </td>
                              </tr>
                              <tr className="my-10 border-b">
                                <td className="border-r">
                                  <div className="flex flex-row">
                                    <div class="basis-4/4">
                                      <div className="flex flex-row">
                                        <h6 className="text-lg mt-4 mx-2">
                                          Place
                                        </h6>
                                        <input
                                          type="text"
                                          class="
                                                    form-control
                                                    block
                                                    w-full
                                                    px-3
                                                    py-1.5
                                                    text-base
                                                    font-normal
                                                    text-gray-700
                                                    bg-white bg-clip-padding
                                                    border-b border-solid border-gray-300
                                                    rounded
                                                    transition
                                                    ease-in-out
                                                    m-0
                                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                                "
                                          id="exampleText0"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="border-r">
                                  (Signature of person responsible for deduction
                                  of tax)
                                </td>
                              </tr>
                              <tr className="my-10 border-b">
                                <td className="border-r">
                                  {' '}
                                  <div className="flex flex-row">
                                    <div class="basis-4/4">
                                      <div className="flex flex-row">
                                        <h6 className="text-lg mt-4 mx-2">
                                          Date
                                        </h6>
                                        <input
                                          type="text"
                                          class="
                                                    form-control
                                                    block
                                                    w-full
                                                    px-3
                                                    py-1.5
                                                    text-base
                                                    font-normal
                                                    text-gray-700
                                                    bg-white bg-clip-padding
                                                    border-b border-solid border-gray-300
                                                    rounded
                                                    transition
                                                    ease-in-out
                                                    m-0
                                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                                "
                                          id="exampleText0"
                                        />
                                      </div>
                                    </div>
                                  </div>{' '}
                                </td>
                                <td className="border-r">
                                  {' '}
                                  <div className="flex flex-row">
                                    <div class="basis-4/4">
                                      <div className="flex flex-row">
                                        <h6 className="text-lg mt-4 mx-2">
                                          Full Name :
                                        </h6>
                                        <input
                                          type="text"
                                          class="
                                                    form-control
                                                    block
                                                    w-full
                                                    px-3
                                                    py-1.5
                                                    text-base
                                                    font-normal
                                                    text-gray-700
                                                    bg-white bg-clip-padding
                                                    border-b border-solid border-gray-300
                                                    rounded
                                                    transition
                                                    ease-in-out
                                                    m-0
                                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                                "
                                          id="exampleText0"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form16;
