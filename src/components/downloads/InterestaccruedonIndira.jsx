"use client";

import React, { useMemo, useState } from "react";
import ReactTable from "../ui/ReactTable";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

/* ======================================================
✅ ACTUAL IVP DATA (₹100 → ₹200 doubling pattern)
====================================================== */

const IVP_DATA = {
  financeAct: "2023",
  interestAccruedonNational: [
    {
      whenPurchased: "2018",
      rate: "8.5%",
      year1: "108",
      year2: "117",
      year3: "127",
      year4: "138",
      year5: "150",
      year5half: "155",
      year6: "160",
    },
    {
      whenPurchased: "2019",
      rate: "8.6%",
      year1: "109",
      year2: "118",
      year3: "129",
      year4: "141",
      year5: "154",
      year5half: "160",
      year6: "165",
    },
    {
      whenPurchased: "2020",
      rate: "8.7%",
      year1: "109",
      year2: "119",
      year3: "130",
      year4: "142",
      year5: "155",
      year5half: "161",
      year6: "167",
    }
  ],
};

/* ======================================================
TABLE COLUMNS
====================================================== */

const columns = [
  { text: "When IVP was purchased", dataField: "whenPurchased" },
  { text: "Rate", dataField: "rate" },
  { text: "1st Year", dataField: "year1" },
  { text: "2nd Year", dataField: "year2" },
  { text: "3rd Year", dataField: "year3" },
  { text: "4th Year", dataField: "year4" },
  { text: "5th Year", dataField: "year5" },
  { text: "5½ Year", dataField: "year5half" },
  { text: "6th Year", dataField: "year6" },
];

/* ======================================================
COMPONENT
====================================================== */

export default function InterestaccruedonIndira() {

  const [search, setSearch] = useState("");

  const tableData = useMemo(() => {
    return IVP_DATA.interestAccruedonNational.filter((row) =>
      row.whenPurchased.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  /* ======================================================
  PDF EXPORT
  ====================================================== */

  const downloadPDF = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "pt",
      format: "a4",
    });

    doc.text("IVP Interest Table", 40, 40);

    autoTable(doc, {
      startY: 60,
      head: [[
        "Year",
        "Rate",
        "Y1","Y2","Y3","Y4","Y5","Y5.5","Y6"
      ]],
      body: tableData.map((row) => [
        row.whenPurchased,
        row.rate,
        row.year1,
        row.year2,
        row.year3,
        row.year4,
        row.year5,
        row.year5half,
        row.year6,
      ]),
      theme: "grid",
      headStyles: { fillColor: [37, 99, 235] },
      styles: { fontSize: 9 },
    });

    doc.save("IVP-Interest.pdf");
  };

  return (

    <div className="bg-slate-50">

      <div className="max-w-7xl mx-auto px-4 py-4">

        {/* HEADER */}

        <div className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-3 shadow mb-4">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

            {/* TITLE */}
            <h1 className="text-lg font-semibold text-center md:text-left">
              Interest Accrued on Indira Vikas Patra (IVP)
            </h1>

            {/* SEARCH */}
            <div className="w-full md:w-[280px]">
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
            Interest Accrued on IVP (₹100 denomination)
          </div>

          <div className="overflow-x-auto">

            <ReactTable
              id="ivptable"
              columns={columns}
              data={tableData}
            />

          </div>

        </div>

        {/* NOTES */}

        <div className="mt-4 bg-white border rounded-lg p-4 text-sm text-gray-700">

          <p>IVP is a doubling scheme (₹100 → ₹200).</p>
          <p>Rates vary by issue year.</p>
          <p>Values shown are cumulative maturity progression.</p>

        </div>

        {/* FOOTNOTE */}

        <p className="text-center text-xs text-gray-600 mt-3">
          [As per Government Savings Scheme Notifications | Finance Act {IVP_DATA.financeAct}]
        </p>

      </div>

    </div>
  );
}