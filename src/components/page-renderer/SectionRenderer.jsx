"use client";

import dynamic from "next/dynamic";

const registry = {
  hero: dynamic(() => import("@/components/home/Hero"), { ssr: false }),
  services: dynamic(() => import("@/components/home/OurServices"), { ssr: false }),
  ongoingProjects: dynamic(
    () => import("@/components/home/OngoingProjects"),
    { ssr: false }
  ),
  corporatePartners: dynamic(
    () => import("@/components/home/CorporatePartners"),
    { ssr: false }
  ),
  userStats: dynamic(
    () => import("@/components/home/UserStats"),
    { ssr: false }
  ),
  insuranceCta: dynamic(
    () => import("@/components/home/InsuranceCta"),
    { ssr: false }
  ),
  appPromo: dynamic(
    () => import("@/components/home/AppPromo"),
    { ssr: false }
  ),
  incomeTaxInfo: dynamic(
    () => import("@/components/home/IncomeTaxInfo"),
    { ssr: false }
  ),
};

export default function SectionRenderer({ section }) {
  if (!section || typeof section !== "object") return null;
  const { type, props } = section;
  if (!type) return null;

  const Component = registry[type];
  if (!Component) return null;

  return <Component {...(props || {})} />;
}
