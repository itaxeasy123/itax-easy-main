

"use client";
import { createContext, useContext, useEffect, useState } from "react";

 const BusinessContext = createContext(undefined);

  export function BusinessProvider({ children }) {
  const [selectedBusiness, setSelectedBusinessState] = useState(null);

  /* ---------------------------------
     NORMALIZE BUSINESS DATA
  ---------------------------------- */
  
  const normalizeBusiness = (data) => {
    if (!data) return null;

    return {
     businessName: data.businessName || data.tradeNam || "",
    legalName: data.legalName || data.lgnm || data.businessName || "",

    pan: data.pan || "",
    gstin: data.gstin || "",
    status: data.status || "",
    ctb: data.ctb || "",
    statecode: data.statecode || data.stcd || "",
    };
  };

  /* ---------------------------------
     LOAD FROM localStorage (ON APP LOAD)
  ---------------------------------- */
  useEffect(() => {
    const stored = localStorage.getItem("selectedBusiness");
    if (stored) {
      setSelectedBusinessState(normalizeBusiness(JSON.parse(stored)));
    }
  }, []);

  /* ---------------------------------
     SET + PERSIST (NORMALIZED)
  ---------------------------------- */
  const setSelectedBusiness = (business) => {
    const normalized = normalizeBusiness(business);
    setSelectedBusinessState(normalized);

    if (normalized) {
      localStorage.setItem(
        "selectedBusiness",
        JSON.stringify(normalized)
      );
    } else {
      localStorage.removeItem("selectedBusiness");
    }
  };

  return (
    <BusinessContext.Provider
      value={{ selectedBusiness, setSelectedBusiness }}
    >
      {children}
    </BusinessContext.Provider>
  );
}

export function useBusiness() {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error("useBusiness must be used inside BusinessProvider");
  }
  return context;
}
