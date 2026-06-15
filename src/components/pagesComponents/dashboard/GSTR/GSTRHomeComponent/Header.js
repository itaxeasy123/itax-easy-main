"use client";
import React from "react";
import PropTypes from "prop-types";
import { useBusiness } from "@/context/BusinessContext";

/* ------------------ Utils ------------------ */
function getFinancialYear() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const startYear = month >= 4 ? year : year - 1;
  const endYear = startYear + 1;
  return `${startYear}-${String(endYear).slice(-2)}`;
}

function getMonthName() {
  return new Date().toLocaleString("default", { month: "short" });
}

/* ------------------ Text ------------------ */
function TextComponent({ children, className }) {
  return (
    <p className={`text-sm md:text-base font-semibold text-white tracking-wide ${className}`}>
      {children}
    </p>
  );
}

TextComponent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

TextComponent.defaultProps = {
  className: "",
};

/* ------------------ Container ------------------ */
function ColorComponent({ children }) {
  return (
    <div
      className="
        relative
        flex flex-col md:flex-row md:items-center
        justify-between gap-3 md:gap-5
        w-full max-w-[1400px] mx-auto
        px-6 md:px-8 lg:px-10
        py-2 md:py-2.5
        rounded-md
        bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]
        shadow-lg shadow-blue-900/30
        border border-white/10
        backdrop-blur-md
      "
    >
      {children}
    </div>
  );
}

/* ------------------ Header ------------------ */
export default function Header() {
  const { selectedBusiness } = useBusiness();
  const business = selectedBusiness;

  const financialYear = getFinancialYear();
  const month = getMonthName();

  const businessName = business?.businessName || "";
  const panMasked = business?.pan ? `${business.pan.slice(0, 5)}••` : null;
  const companyName = business?.legalName || "";

  return (
    <header className="w-full">
      <ColorComponent>
        {/* LEFT: Business Name */}
        <div className="flex flex-col">
          <TextComponent className="text-lg font-bold truncate">
            {businessName || "—"}
            {panMasked && <span className="opacity-70 ml-2">({panMasked})</span>}
          </TextComponent>
        </div>

        {/* CENTER: Company */}
        <TextComponent className="text-center md:text-left">
          {companyName || "—"}
        </TextComponent>

        {/* RIGHT: FY */}
        <div className="flex justify-start md:justify-end">
          <div className="px-4 py-2 rounded-md bg-gradient-to-r from-emerald-400 to-teal-500 text-xs md:text-sm font-bold text-gray-900 shadow-md">
            F.Y {financialYear} • {month}
          </div>
        </div>
      </ColorComponent>
    </header>
  );
}
