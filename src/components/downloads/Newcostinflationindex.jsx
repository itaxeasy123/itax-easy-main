"use client";

import React, { useMemo, useState } from "react";
import ReactTable from "@/components/ui/ReactTable";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

/* ======================================================
LATEST OFFICIAL COST INFLATION INDEX (CBDT)
Base Year = 2001-02 (CII = 100)
====================================================== */

const MASTER_DATA = {
  financeAct: "2024",
  costInflationIndex: [
    { financialYear: "2001-02", costInflationIndex: 100 },
    { financialYear: "2002-03", costInflationIndex: 105 },
    { financialYear: "2003-04", costInflationIndex: 109 },
    { financialYear: "2004-05", costInflationIndex: 113 },
    { financialYear: "2005-06", costInflationIndex: 117 },
    { financialYear: "2006-07", costInflationIndex: 122 },
    { financialYear: "2007-08", costInflationIndex: 129 },
    { financialYear: "2008-09", costInflationIndex: 137 },
    { financialYear: "2009-10", costInflationIndex: 148 },
    { financialYear: "2010-11", costInflationIndex: 167 },
    { financialYear: "2011-12", costInflationIndex: 184 },
    { financialYear: "2012-13", costInflationIndex: 200 },
    { financialYear: "2013-14", costInflationIndex: 220 },
    { financialYear: "2014-15", costInflationIndex: 240 },
    { financialYear: "2015-16", costInflationIndex: 254 },
    { financialYear: "2016-17", costInflationIndex: 264 },
    { financialYear: "2017-18", costInflationIndex: 272 },
    { financialYear: "2018-19", costInflationIndex: 280 },
    { financialYear: "2019-20", costInflationIndex: 289 },
    { financialYear: "2020-21", costInflationIndex: 301 },
    { financialYear: "2021-22", costInflationIndex: 317 },
    { financialYear: "2022-23", costInflationIndex: 331 },
    { financialYear: "2023-24", costInflationIndex: 348 },
    { financialYear: "2024-25", costInflationIndex: 363 } // ✅ latest
  ],
};

/* ======================================================
COMPONENT
====================================================== */

export default function CostInflationIndexPage() {

  const [search, setSearch] = useState("");

  const columns = [
    { text: "ID", dataField: "id" },
    { text: "Financial Year", dataField: "financialYear" },
    { text: "Cost Inflation Index", dataField: "costInflationIndex" },
  ];

  const tableData = useMemo(() => {

    return MASTER_DATA.costInflationIndex
      .filter((item) => {

        const value = search.toLowerCase();

        return (
          item.financialYear.toLowerCase().includes(value) ||
          String(item.costInflationIndex).includes(value)
        );
      })
      .map((item, index) => ({
        id: index + 1,
        ...item,
      }));

  }, [search]);

  const latest = MASTER_DATA.costInflationIndex.slice(-1)[0];

  /* ======================================================
  PDF
  ====================================================== */

  const downloadPDF = () => {

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    doc.text("Cost Inflation Index Table", 40, 40);

    autoTable(doc, {
      startY: 60,
      head: [["Financial Year", "Cost Inflation Index"]],
      body: MASTER_DATA.costInflationIndex.map((row) => [
        row.financialYear,
        row.costInflationIndex,
      ]),
      theme: "grid",
      headStyles: { fillColor: [37, 99, 235] },
    });

    doc.save("Cost-Inflation-Index.pdf");
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
                Cost Inflation Index (CII)
              </h1>
            </div>

            {/* SEARCH */}
            <div className="w-full md:w-[250px]">
              <input
                type="text"
                placeholder="Search FY / Index..."
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

          <div className="bg-white rounded-xl p-4 shadow border">
            <p className="text-xs text-gray-500 uppercase">Total Years</p>
            <h3 className="text-xl font-bold">
              {MASTER_DATA.costInflationIndex.length}
            </h3>
          </div>

          <div className="bg-white rounded-xl p-4 shadow border">
            <p className="text-xs text-gray-500 uppercase">Latest Year</p>
            <h3 className="text-xl font-bold">
              {latest.financialYear}
            </h3>
          </div>

          <div className="bg-white rounded-xl p-4 shadow border">
            <p className="text-xs text-gray-500 uppercase">Latest Index</p>
            <h3 className="text-xl font-bold">
              {latest.costInflationIndex}
            </h3>
          </div>

          <div className="bg-white rounded-xl p-4 shadow border">
            <p className="text-xs text-gray-500 uppercase">Finance Act</p>
            <h3 className="text-xl font-bold">
              {MASTER_DATA.financeAct}
            </h3>
          </div>

        </div>

        {/* TABLE */}

        <div className="bg-white rounded-2xl shadow border overflow-hidden">

          <div className="border-b p-4 flex justify-between items-center">

            <h2 className="font-semibold text-lg">
              Cost Inflation Index Table
            </h2>

            <span className="text-sm text-gray-500">
              CBDT Notified Data
            </span>

          </div>

          <div className="overflow-x-auto">

            <ReactTable
              id="costinflation"
              columns={columns}
              data={tableData}
            />

          </div>

        </div>

        {/* FOOTNOTE */}

        <p className="text-center text-gray-600 text-sm mt-6">
          [As per CBDT Notification | Finance Act {MASTER_DATA.financeAct}]
        </p>

      </div>

    </div>
  );
}