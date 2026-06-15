"use client";
import Image from "next/image";

export default function CorporatePartners({ partners = [] }) {
  if (!Array.isArray(partners) || partners.length === 0) return null;

  return (
    <section className="my-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Corporate Partners</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 items-center">
          {partners.map((p, i) => (
            <div key={i} className="flex items-center justify-center">
              {/* <img src={p.logo || p.img || '/images/partners.png'} alt={p.name || `partner-${i}`} className="max-h-12" /> */}
             <Image src={logo} alt="Corporate partner" width={120} height={60} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
