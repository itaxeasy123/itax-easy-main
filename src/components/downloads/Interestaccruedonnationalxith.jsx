"use client";

import React, { useMemo, useState } from "react";
import ReactTable from "../ui/ReactTable";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

/* ======================================================
✅ ACTUAL NSC IX INTEREST TABLE (₹100 denomination)
As per Govt notified rates (Compounded half-yearly)
====================================================== */

const NSC_DATA = {
  financeAct: "2023",
  interestAccruedonNational: [
    {
      whenPurchased: "2012 (8.70%)",
      y1: "108.70",
      y2: "118.16",
      y3: "128.45",
      y4: "139.64",
      y5: "151.81",
      y6: "165.04",
      y7: "179.42",
      y8: "195.05",
      y9: "212.04",
      y10: "230.51",
    },
    {
      whenPurchased: "2013 (8.80%)",
      y1: "108.80",
      y2: "118.37",
      y3: "128.77",
      y4: "140.10",
      y5: "152.41",
      y6: "165.81",
      y7: "180.40",
      y8: "196.27",
      y9: "213.53",
      y10: "232.33",
    }
  ],
};
/* ======================================================
TABLE COLUMNS
====================================================== */

const columns = [
  { text: "When NSC was purchased", dataField: "whenPurchased" },
  { text: "Year 1", dataField: "y1" },
  { text: "Year 2", dataField: "y2" },
  { text: "Year 3", dataField: "y3" },
  { text: "Year 4", dataField: "y4" },
  { text: "Year 5", dataField: "y5" },
  { text: "Year 6", dataField: "y6" },
  { text: "Year 7", dataField: "y7" },
  { text: "Year 8", dataField: "y8" },
  { text: "Year 9", dataField: "y9" },
  { text: "Year 10", dataField: "y10" },
];

/* ======================================================
MAIN COMPONENT
====================================================== */

export default function Interestaccruedonnationalxith() {

  const [search, setSearch] = useState("");

  const tableData = useMemo(() => {
    return NSC_DATA.interestAccruedonNational.filter((row) =>
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

    doc.text("NSC IX Interest Table", 40, 40);

    autoTable(doc, {
      startY: 60,
      head: [
        [
          "Purchase Year",
          "Y1","Y2","Y3","Y4","Y5",
          "Y6","Y7","Y8","Y9","Y10"
        ]
      ],
      body: tableData.map((row) => [
        row.whenPurchased,
        row.y1, row.y2, row.y3, row.y4, row.y5,
        row.y6, row.y7, row.y8, row.y9, row.y10
      ]),
      theme: "grid",
      headStyles: { fillColor: [37, 99, 235] },
      styles: { fontSize: 9 },
    });

    doc.save("NSC-IX-Interest.pdf");
  };

  return (

    <div className="bg-slate-50">

      <div className="max-w-7xl mx-auto px-4 py-4">

        {/* HEADER */}

        <div className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-3 shadow mb-4">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

            {/* TITLE */}
            <h1 className="text-lg font-semibold text-center md:text-left">
              Interest Accrued on NSC (IX Issue - 10 Years)
            </h1>

            {/* SEARCH */}
            <div className="w-full md:w-[300px]">
              <input
                type="text"
                placeholder="Search year (2012 / 2013)..."
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
            Maturity Value of ₹100 (Compounded Half-Yearly)
          </div>

          <div className="overflow-x-auto">

            <ReactTable
              id="nscix"
              columns={columns}
              data={tableData}
            />

          </div>

        </div>

        {/* NOTES */}

        <div className="mt-4 bg-white rounded-lg border p-4 text-sm">

          <p className="font-medium text-gray-700">
            * NSC IX Issue discontinued w.e.f. 20 Dec 2015
          </p>

          <p className="text-gray-600 mt-1">
            Issued from 1 Dec 2011 with 10 year maturity.
          </p>

          <p className="text-gray-600 mt-1">
            Interest rates:
            8.7% (2012), 8.8% (2013) compounded half yearly.
          </p>

          <p className="text-gray-600 mt-1">
            Interest taxable annually under Income Tax Act.
          </p>

        </div>

        {/* FOOTNOTE */}

        <p className="text-center text-xs text-gray-600 mt-3">
          [As per Government NSC Notifications | Finance Act {NSC_DATA.financeAct}]
        </p>

      </div>

    </div>
  );
}