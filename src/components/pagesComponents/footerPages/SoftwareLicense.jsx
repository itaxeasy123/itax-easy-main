"use client";

import {
  Book,
  FileCheck,
  AlertTriangle,
  Shield,
  Scale,
  Clock,
  Zap,
  Globe,
  FileText,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";

export default function SoftwareLicense() {
  const [open, setOpen] = useState(null);

  const toggle = (id) => {
    setOpen(open === id ? null : id);
  };

  const sections = [
    {
      id: "license",
      title: "License Grant",
      icon: <FileCheck className="h-5 w-5" />,
      content:
        "License: Subject to the provisions of this EULA, the Licensor grants to the End User a non-transferable, non-sub-licensable, and non-exclusive license to use, solely in the Field and solely in object code form, the Software.",
    },
    {
      id: "restrictions",
      title: "Usage Restrictions",
      icon: <AlertTriangle className="h-5 w-5" />,
      content:
        "You may not copy, modify, reverse engineer, resell, sublicense, or make the software available to any third party without written permission.",
    },
    {
      id: "payment",
      title: "Payment Terms",
      icon: <Scale className="h-5 w-5" />,
      content:
        "Fees are payable in advance. All payments are non-refundable. Applicable taxes shall be paid by the customer as per prevailing law.",
    },
    {
      id: "confidential",
      title: "Confidentiality",
      icon: <Shield className="h-5 w-5" />,
      content:
        "All confidential information shared shall be protected and used strictly for permitted purposes. Obligations survive termination.",
    },
    {
      id: "warranty",
      title: "Warranties Disclaimer",
      icon: <FileText className="h-5 w-5" />,
      content:
        "The software is provided 'as is' without warranties of any kind including merchantability or fitness for a particular purpose.",
    },
    {
      id: "liability",
      title: "Limitation of Liability",
      icon: <AlertTriangle className="h-5 w-5" />,
      content:
        "Licensor’s total liability shall not exceed the license fee received under this agreement.",
    },
    {
      id: "termination",
      title: "Term & Termination",
      icon: <Clock className="h-5 w-5" />,
      content:
        "This agreement remains effective for 3 years unless terminated earlier due to breach or non-payment.",
    },
    {
      id: "force",
      title: "Force Majeure",
      icon: <Zap className="h-5 w-5" />,
      content:
        "Neither party shall be liable for failure due to events beyond reasonable control including natural disasters, government actions, or outages.",
    },
    {
      id: "law",
      title: "Governing Law",
      icon: <Globe className="h-5 w-5" />,
      content:
        "This agreement shall be governed by Indian law. Courts at Gwalior shall have exclusive jurisdiction.",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">

      {/* ================= HEADER ================= */}
      <section className="py-10 text-center">
        <div className="max-w-4xl mx-auto px-4">
          {/* <div className="flex justify-center mb-2">
            <div className="rounded-2xl bg-white/10 p-2 border border-white/20">
              <Book className="h-8 w-8" />
            </div>
          </div> */}
          <h1 className="text-3xl md:text-4xl font-semibold">
            End User License Agreement
          </h1>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="max-w-5xl mx-auto px-4 pb-24 space-y-6">

        {/* INTRO CARD */}
        <GlassCard>
          <p className="text-white/80 leading-relaxed text-sm md:text-base">
           <strong>This End-User License Agreement (&quot;EULA&quot;)</strong> is a legal agreement between <strong> ITAX EASY PRIVATE LIMITED</strong> h having its registered office at G-41, Gandhi Nagar, Padav, Gwalior Madhya Pradesh, India and Corporate Office at Logix Zest, Sat 1, Flat 811, Sector 143, Noida, Uttar Pradesh bearing Corporate Identification No. U74999MP2019PTC050453
          </p>
        </GlassCard>

        {/* ACCORDION SECTIONS */}
        {sections.map((section, index) => (
          <div
            key={section.id}
            className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur transition-all"
          >
            <button
              onClick={() => toggle(section.id)}
              className="w-full flex items-center justify-between px-6 py-5"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                  {section.icon}
                </div>
                <h2 className="text-lg md:text-xl font-semibold">
                  {index + 1}. {section.title}
                </h2>
              </div>
              {open === section.id ? (
                <ChevronUp className="h-5 w-5 text-white/70" />
              ) : (
                <ChevronDown className="h-5 w-5 text-white/70" />
              )}
            </button>

            {open === section.id && (
              <div className="px-6 pb-6 text-sm md:text-base text-white/80 leading-relaxed">
                {section.content}
              </div>
            )}
          </div>
        ))}

        {/* ACCEPTANCE */}
        <GlassHighlight>
          <h4 className="font-semibold mb-2 text-green-400">
            Agreement Acceptance
          </h4>
          By using iTaxEasy software, you confirm that you have read, understood,
          and agreed to this End User License Agreement.
        </GlassHighlight>
      </section>
    </main>
  );
}

/* ================= REUSABLE UI ================= */

const GlassCard = ({ children }) => (
  <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur">
    {children}
  </div>
);

const GlassHighlight = ({ children }) => (
  <div className="rounded-2xl border border-white/20 bg-white/10 p-5 text-sm text-white/90">
    {children}
  </div>
);
