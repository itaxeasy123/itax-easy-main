
"use client";

import React, { useEffect, useState } from "react";
import ReactTable from "../ui/ReactTable";
import ExportPDF from "./ExportPDF";
import { countryCodeTableHeaders } from "./staticData";
import { nodeAxios as api } from "@/lib/axios";

/* ======================================================
MASTER DATA
====================================================== */

const MASTER_COUNTRY_CODES = [
  { countryCode: "IND", countryName: "India" },
  { countryCode: "USA", countryName: "United States" },
  { countryCode: "GBR", countryName: "United Kingdom" },
  { countryCode: "CAN", countryName: "Canada" },
  { countryCode: "AUS", countryName: "Australia" },
  { countryCode: "DEU", countryName: "Germany" },
  { countryCode: "FRA", countryName: "France" },
  { countryCode: "ITA", countryName: "Italy" },
  { countryCode: "ESP", countryName: "Spain" },
  { countryCode: "NLD", countryName: "Netherlands" },
  { countryCode: "CHE", countryName: "Switzerland" },
  { countryCode: "SGP", countryName: "Singapore" },
  { countryCode: "ARE", countryName: "United Arab Emirates" },
  { countryCode: "SAU", countryName: "Saudi Arabia" },
  { countryCode: "CHN", countryName: "China" },
  { countryCode: "JPN", countryName: "Japan" },
  { countryCode: "KOR", countryName: "South Korea" },
  { countryCode: "BRA", countryName: "Brazil" },
  { countryCode: "ZAF", countryName: "South Africa" },
  { countryCode: "RUS", countryName: "Russia" },
  { countryCode: "NZL", countryName: "New Zealand" },
  { countryCode: "MYS", countryName: "Malaysia" },
  { countryCode: "THA", countryName: "Thailand" },
  { countryCode: "IDN", countryName: "Indonesia" },
  { countryCode: "PHL", countryName: "Philippines" },
  { countryCode: "EGY", countryName: "Egypt" },
  { countryCode: "NGA", countryName: "Nigeria" },
  { countryCode: "KEN", countryName: "Kenya" },
  { countryCode: "PAK", countryName: "Pakistan" },
  { countryCode: "BGD", countryName: "Bangladesh" },
  { countryCode: "LKA", countryName: "Sri Lanka" },
  { countryCode: "NPL", countryName: "Nepal" }
];

export default function Countrycode() {

  const [data, setData] = useState({
    assessYear: "2024-2025",
    countryCodes: MASTER_COUNTRY_CODES
  });

  const [filteredData, setFilteredData] = useState(MASTER_COUNTRY_CODES);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  /* ======================================================
  API FETCH
  ====================================================== */

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(
          `/api/downloads/country-code-list?assessYear=2024-2025`
        );

        if (res?.data?.data?.countryCodes?.length > 0) {
          setData(res.data.data);
          setFilteredData(res.data.data.countryCodes);
        }

      } catch (error) {
        console.log("Using fallback master data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* ======================================================
  SEARCH FILTER
  ====================================================== */

  useEffect(() => {

    const filtered = data.countryCodes.filter((item) => {

      const value = search.toLowerCase();

      return (
        item.countryCode.toLowerCase().includes(value) ||
        item.countryName.toLowerCase().includes(value)
      );
    });

    setFilteredData(filtered);

  }, [search, data]);

  return (

    <div className="bg-slate-50 min-h-screen">

      <div className="max-w-[1200px] mx-auto px-4 py-4">

        {/* HEADER */}

        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg p-2 shadow flex flex-col md:flex-row md:items-center md:justify-between gap-3">

          {/* LEFT TITLE */}
          <h1 className="text-lg font-semibold text-center md:text-left">
            Country Codes (ISO / Income Tax Standard)
          </h1>

          {/* CENTER SEARCH */}
          <div className="w-full md:w-[350px]">
            <input
              type="text"
              placeholder="Search country code or name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 rounded-md text-black outline-none border border-gray-300 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* RIGHT PDF */}
          <ExportPDF id="#countryTable" name="Country_Code_List" />

        </div>

        {/* LOADING */}
        {loading && (
          <div className="text-center py-6 text-gray-500">
            Loading country codes...
          </div>
        )}

        {/* TABLE */}
        <div className="mt-4 bg-white rounded-lg shadow border">

          <h2 className="text-center text-sm font-semibold py-3 text-gray-700">
            Applicable From Assessment Year {data.assessYear}
          </h2>

          <div className="overflow-x-auto">

            <ReactTable
              id="countryTable"
              columns={countryCodeTableHeaders}
              data={filteredData}
            />

          </div>

        </div>

        {/* FOOTNOTE */}
        <p className="text-center text-sm text-gray-600 mt-4">
          [As per ISO 3166-1 Alpha-3 and Income Tax reporting standards]
        </p>

      </div>

    </div>
  );
}