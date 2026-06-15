"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const GstinCtx = createContext(null);

export function GstinProvider({ children }) {
  const [gstin, setGstinState] = useState("");

  // Load once from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("GSTIN") || "";
      if (saved) setGstinState(saved.toUpperCase());
    } catch {}
  }, []);

  // Cross-tab sync via 'storage' events
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "GSTIN") {
        setGstinState((e.newValue || "").toUpperCase());
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const setGstin = (val) => {
    const up = (val || "").toUpperCase();
    setGstinState(up);
    try {
      localStorage.setItem("GSTIN", up);
    } catch {}
    // Local tab broadcast (optional)
    try {
      window.dispatchEvent(new CustomEvent("gstin:update", { detail: up }));
    } catch {}
  };

  const clearGstin = () => {
    setGstinState("");
    try {
      localStorage.removeItem("GSTIN");
    } catch {}
    try {
      window.dispatchEvent(new CustomEvent("gstin:update", { detail: "" }));
    } catch {}
  };

  return (
    <GstinCtx.Provider value={{ gstin, setGstin, clearGstin }}>
      {children}
    </GstinCtx.Provider>
  );
}

export function useGstin() {
  const ctx = useContext(GstinCtx);
  if (!ctx) throw new Error("useGstin must be used inside <GstinProvider>");
  return ctx;
}
