"use client";
import { GstinProvider } from "@/contexts/GstinContext";

export default function Providers({ children }) {
  return <GstinProvider>{children}</GstinProvider>;
}
