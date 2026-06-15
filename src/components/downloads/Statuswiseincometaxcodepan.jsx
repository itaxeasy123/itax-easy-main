"use client";

import React, { useMemo, useState } from "react";
import ReactTable from "../ui/ReactTable";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

/* ======================================================
CORRECT PAN MASTER DATA
====================================================== */

const MASTER_DATA = {
  financialYear: "2025",
  PanAndITCodeByStatus: [
    { status: "Individual", incomeTaxCode: "01", panCode: "P" },
    { status: "Company", incomeTaxCode: "02", panCode: "C" },
    { status: "Partnership Firm", incomeTaxCode: "03", panCode: "F" },
    { status: "Trust", incomeTaxCode: "04", panCode: "T" },
    { status: "HUF", incomeTaxCode: "05", panCode: "H" },
    { status: "Association of Persons (AOP)", incomeTaxCode: "06", panCode: "A" },
    { status: "Body of Individuals (BOI)", incomeTaxCode: "07", panCode: "B" },
    { status: "Local Authority", incomeTaxCode: "08", panCode: "L" },
    { status: "Artificial Juridical Person", incomeTaxCode: "09", panCode: "J" },
    { status: "Government", incomeTaxCode: "10", panCode: "G" }
  ],
};

/* ======================================================
COMPONENT
====================================================== */

export default function Statuswiseincometaxcodepan() {

  const [search, setSearch] = useState("");

  const tableColumns = [
    { text: "Status", dataField: "status" },
    { text: "Income Tax Code", dataField: "incomeTaxCode" },
    { text: "PAN Code (4th digit)", dataField: "panCode" },
  ];

  const tableData = useMemo(() => {

    return MASTER_DATA.PanAndITCodeByStatus
      .filter((item) => {

        const value = search.toLowerCase();

        return (
          item.status.toLowerCase().includes(value) ||
          item.panCode.toLowerCase().includes(value) ||
          item.incomeTaxCode.includes(value)
        );
      })
      .map((item, index) => ({
        id: index + 1,
        ...item,
      }));

  }, [search]);

  /* ======================================================
  PDF
  ====================================================== */

  const downloadPDF = () => {

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    doc.text("PAN Status Code Table", 40, 40);

    autoTable(doc, {
      startY: 60,
      head: [["Status","Income Tax Code","PAN Code"]],
      body: tableData.map((row) => [
        row.status,
        row.incomeTaxCode,
        row.panCode
      ]),
      theme: "grid",
      headStyles: { fillColor: [37, 99, 235] },
    });

    doc.save("PAN-Status-Code.pdf");
  };

  return (

    <div className="min-h-screen bg-slate-50">

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* HEADER */}

        <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-2 shadow-lg mb-4">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            {/* TITLE */}
            <div>
              <h1 className="text-xl font-bold">
                Status wise Income Tax Code & PAN Code
              </h1>
            </div>

            {/* SEARCH */}
            <div className="w-full md:w-[250px]">
              <input
                type="text"
                placeholder="Search status / code..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-3 py-2 rounded text-black border outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* PDF */}
            <button
              onClick={downloadPDF}
              className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-50"
            >
              Download PDF
            </button>

          </div>

        </div>

        {/* STATS */}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">

          <div className="bg-white rounded-xl p-4 shadow border">
            <p className="text-xs text-gray-500 uppercase">
              Total Status Types
            </p>
            <h3 className="text-xl font-bold">
              {tableData.length}
            </h3>
          </div>

          <div className="bg-white rounded-xl p-4 shadow border">
            <p className="text-xs text-gray-500 uppercase">
              Financial Year
            </p>
            <h3 className="text-xl font-bold">
              {MASTER_DATA.financialYear}
            </h3>
          </div>

          <div className="bg-white rounded-xl p-4 shadow border">
            <p className="text-xs text-gray-500 uppercase">
              PAN Structure
            </p>
            <h3 className="text-xl font-bold">
              4th Digit
            </h3>
          </div>

        </div>

        {/* TABLE */}

        <div className="bg-white rounded-2xl shadow border overflow-hidden">

          <div className="border-b p-4 flex justify-between items-center">

            <h2 className="font-semibold text-lg">
              Status Code Reference Table
            </h2>

            <span className="text-sm text-gray-500">
              Income Tax Department
            </span>

          </div>

          <div className="overflow-x-auto">

            <ReactTable
              id="statuswisepan"
              columns={tableColumns}
              data={tableData}
            />

          </div>

        </div>

        {/* FOOTNOTE */}

        <p className="text-center text-gray-600 text-sm mt-6">
          [As per PAN Structure Rules | Financial Year {MASTER_DATA.financialYear}]
        </p>

      </div>

    </div>
  );
}