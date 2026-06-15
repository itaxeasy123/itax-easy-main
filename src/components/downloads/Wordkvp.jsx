"use client";

import React, { useEffect, useState } from "react";
import ReactTable from "../ui/ReactTable";
import ExportPDF from "./ExportPDF";
import { KVP } from "./staticData";
import Loader from "@/components/partials/loading/Loader";

export default function Wordkvp() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchData = async () => {

      try {

        const res = await fetch(
          "/api/downloads/interest-accruedon-national?type=ikvp-1&year=2022"
        );

        const result = await res.json();

        setData(result?.interestAccruedonNational || []);

      } catch (error) {

        console.error("KVP API Error:", error);

      } finally {

        setLoading(false);

      }

    };

    fetchData();

  }, []);

  return (

    <div className="bg-slate-50">

      <div className="max-w-[1400px] mx-auto px-4 py-4">

        {/* HEADER */}

        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg p-2 shadow flex flex-col md:flex-row md:items-center md:justify-between gap-3">

          <h1 className="text-lg font-semibold text-center md:text-left">
            Interest on Kisan Vikas Patra
          </h1>

          <ExportPDF name="InterestOnKVP" id="#mytable9" />

        </div>

        {/* TABLE */}

        <div className="mt-4 bg-white rounded-lg shadow border">

          <div className="overflow-x-auto">

            {loading ? (

              <div className="flex justify-center items-center py-12 text-gray-500">
                <Loader />
              </div>

            ) : (

              <ReactTable
                id="mytable9"
                columns={KVP}
                data={data}
              />

            )}

          </div>

        </div>

        <p className="text-center text-sm text-gray-600 mt-3">
          [As amended by Finance Act, 2022]
        </p>

      </div>

    </div>

  );
}