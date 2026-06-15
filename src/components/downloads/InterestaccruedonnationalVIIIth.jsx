"use client";

import React, { useMemo, useState } from "react";
import ReactTable from "../ui/ReactTable";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

/* ======================================================
CORRECT NSC VIII DATA
====================================================== */

const NSC_DATA = {
  financeAct: "2023",
  interestAccruedonNational: [
    {
      whenPurchased: "2018",
      rate: "8.50%",
      firstYear: "8.50",
      secondYear: "9.22",
      thirdYear: "10.02",
      fourthYear: "10.88",
      fifthYear: "11.80",
    },
    {
      whenPurchased: "2019",
      rate: "8.60%",
      firstYear: "8.60",
      secondYear: "9.34",
      thirdYear: "10.14",
      fourthYear: "11.02",
      fifthYear: "11.97",
    },
    {
      whenPurchased: "2020",
      rate: "6.80%",
      firstYear: "6.80",
      secondYear: "7.26",
      thirdYear: "7.76",
      fourthYear: "8.29",
      fifthYear: "8.85",
    }
  ],
};

/* ======================================================
COLUMNS
====================================================== */

const columns = [
  { text: "Year", dataField: "whenPurchased" },
  { text: "Rate", dataField: "rate" },
  { text: "Year 1", dataField: "firstYear" },
  { text: "Year 2", dataField: "secondYear" },
  { text: "Year 3", dataField: "thirdYear" },
  { text: "Year 4", dataField: "fourthYear" },
  { text: "Year 5", dataField: "fifthYear" },
];

/* ======================================================
COMPONENT
====================================================== */

export default function InterestaccruedonnationalVIIIth() {

  const [search, setSearch] = useState("");

  const tableData = useMemo(() => {
    return NSC_DATA.interestAccruedonNational.filter((row) =>
      row.whenPurchased.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  /* ======================================================
  PDF
  ====================================================== */

  const downloadPDF = () => {

    const doc = new jsPDF({
      orientation: "landscape",
      unit: "pt",
      format: "a4",
    });

    doc.text("NSC VIII Interest Table", 40, 40);

    autoTable(doc, {
      startY: 60,
      head: [["Year","Rate","Y1","Y2","Y3","Y4","Y5"]],
      body: tableData.map((row) => [
        row.whenPurchased,
        row.rate,
        row.firstYear,
        row.secondYear,
        row.thirdYear,
        row.fourthYear,
        row.fifthYear,
      ]),
      theme: "grid",
      headStyles: { fillColor: [37, 99, 235] },
    });

    doc.save("NSC-VIII.pdf");
  };

  return (

    <div className="bg-slate-50">

      <div className="max-w-7xl mx-auto px-4 py-4">

        {/* HEADER */}

        <div className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-3 shadow mb-4">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

            {/* TITLE */}
            <h1 className="text-lg font-semibold text-center md:text-left">
              Interest Accrued on NSC (VIII Issue - 5 Years)
            </h1>

            {/* SEARCH */}
            <div className="w-full md:w-[250px]">
              <input
                type="text"
                placeholder="Search year..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-3 py-2 rounded text-black border outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* PDF */}
            <button
              onClick={downloadPDF}
              className="bg-white text-blue-600 px-3 py-1.5 rounded text-sm font-medium hover:bg-blue-50"
            >
              Download PDF
            </button>

          </div>

        </div>

        {/* TABLE */}

        <div className="bg-white rounded-xl shadow border overflow-hidden">

          <div className="border-b p-3 text-center font-semibold text-sm">
            Interest Accrued on ₹100 (Year-wise)
          </div>

          <div className="overflow-x-auto">

            <ReactTable
              id="nscinterest"
              columns={columns}
              data={tableData}
            />

          </div>

        </div>

        {/* NOTES */}

        <div className="mt-4 bg-white rounded-lg border p-4 text-sm text-gray-700">

          <p>NSC VIII maturity period: 5 years</p>
          <p>Interest compounded annually</p>
          <p>Interest taxable every year</p>

        </div>

        {/* FOOTNOTE */}

        <p className="text-center text-xs text-gray-600 mt-3">
          [As per Government NSC Notifications | Finance Act {NSC_DATA.financeAct}]
        </p>

      </div>

    </div>
  );
}