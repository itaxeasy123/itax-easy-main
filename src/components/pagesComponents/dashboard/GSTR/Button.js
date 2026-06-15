import React from "react";

export default function ActionBtn({ children, variant = "primary", onClick }) {
  const base = "rounded px-2 py-1 font-semibold focus:outline-none text-sm";
  const styles =
    variant === "primary"
      ? "bg-blue-600 text-white hover:bg-blue-700"
      : "border border-blue-600 text-blue-600 hover:bg-blue-100";
  return (
    <button className={`${base} ${styles}`} onClick={onClick}>
      {children}
    </button>
  );
}
