"use client";

import React, { useMemo, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

/* ======================================================
✅ ACTUAL DEPRECIATION DATA (Income Tax Rules – Appendix I)
Latest applicable till date
====================================================== */

const DEPRECIATION_DATA = [
  { block: "Residential Buildings", rate: "5%" },
  { block: "Buildings (Other than Residential)", rate: "10%" },
  { block: "Temporary Wooden Structures", rate: "40%" },
  { block: "Furniture & Fittings", rate: "10%" },
  { block: "Plant & Machinery (General)", rate: "15%" },
  { block: "Computers & Computer Software", rate: "40%" },
  { block: "Motor Cars (Not used in hire business)", rate: "15%" },
  { block: "Motor Cars (Used in hire business)", rate: "30%" },
  { block: "Airplanes / Aero Engines", rate: "40%" },
  { block: "Ships", rate: "20%" },
  { block: "Intangible Assets (Goodwill, Patent, Trademark)", rate: "25%" }
];

/* ======================================================
COMPONENT
====================================================== */

export default function DepreciationTable() {

  const [search, setSearch] = useState("");

  /* ======================================================
  FILTER
  ====================================================== */

  const filteredData = useMemo(() => {

    return DEPRECIATION_DATA.filter((item) =>
      item.block.toLowerCase().includes(search.toLowerCase())
    );

  }, [search]);

  /* ======================================================
  PDF EXPORT
  ====================================================== */

  const exportPDF = () => {

    const doc = new jsPDF({
      orientation: "landscape",
      unit: "pt",
      format: "a4",
    });

    doc.text("Depreciation Table (AY 2025-26)", 40, 40);

    autoTable(doc, {
      startY: 60,
      head: [["Block of Assets", "Rate (%)"]],
      body: filteredData.map((row) => [
        row.block,
        row.rate,
      ]),
      theme: "grid",
      headStyles: {
        fillColor: [37, 99, 235],
      },
      styles: {
        fontSize: 10,
      },
    });

    doc.save("Depreciation_Table.pdf");
  };

  return (

    <div className="bg-slate-50">

      <div className="max-w-7xl mx-auto px-4 py-5">

        {/* HEADER */}

        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg p-2 shadow flex flex-col md:flex-row md:items-center md:justify-between gap-3">

          {/* TITLE */}
          <h1 className="text-lg font-semibold text-center md:text-left">
            Depreciation Table (AY 2025-26)
          </h1>

          {/* SEARCH */}
          <div className="w-full md:w-[350px]">
            <input
              type="text"
              placeholder="Search asset..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 rounded-md text-black outline-none border border-gray-300 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* PDF */}
          <button
            onClick={exportPDF}
            className="bg-white text-blue-600 px-3 py-1.5 rounded text-sm font-medium hover:bg-blue-50"
          >
            Download PDF
          </button>

        </div>

        {/* TABLE */}

        <div className="mt-4 bg-white rounded-lg shadow border overflow-hidden">

          <div className="overflow-x-auto">

            <table className="min-w-full text-sm">

              <thead className="bg-blue-100 text-blue-900">

                <tr>
                  <th className="border px-3 py-2 text-left">Block of Assets</th>
                  <th className="border px-3 py-2 text-center">Depreciation Rate</th>
                </tr>

              </thead>

              <tbody>

                {filteredData.map((row, index) => (

                  <tr key={index} className={index % 2 ? "bg-blue-50" : ""}>

                    <td className="border px-3 py-2">{row.block}</td>

                    <td className="border px-3 py-2 text-center">
                      {row.rate}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

        {/* NOTES */}

        <div className="mt-4 bg-white border rounded-lg p-4 text-sm text-gray-700">

          <p className="font-semibold mb-2">Notes</p>

          <ul className="list-disc list-inside space-y-1">

            <li>Rates as per Income Tax Rules, Appendix I.</li>

            <li>Depreciation is calculated using Written Down Value (WDV) method.</li>

            <li>Half rate applicable if asset used for less than 180 days.</li>

            <li>Goodwill depreciation is not allowed (as per latest amendments).</li>

          </ul>

        </div>

        {/* FOOTNOTE */}

        <p className="text-center text-gray-600 text-sm mt-4">
          [As applicable for AY 2025-26 | Latest Income Tax Rules]
        </p>

      </div>

    </div>
  );
}