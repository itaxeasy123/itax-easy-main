'use client';

import { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  FileText,
  Shield,
  Search,
  Building,
  Eye,
  CheckCircle,
  CreditCard,
  Hash,
  UserCheck,
  MapPin,
  User,
  BadgeCheck,
} from 'lucide-react';

export default function AuditInfoPage() {
  const [open, setOpen] = useState(null);

  const toggle = (id) => {
    setOpen(open === id ? null : id);
  };

  const auditTypes = [
    {
      id: 'statutory',
      title: 'Statutory Audit',
      subtitle: 'Mandatory Annual Audit',
      icon: <Building className="h-5 w-5" />,
      desc: 'Statutory audit is a mandatory annual audit required for companies and certain other entities as per the Companies Act, 2013. It ensures compliance with accounting standards and legal requirements, providing assurance to stakeholders about the accuracy of financial statements.',
      due: 'Within 30 days of AGM (AGM within 6 months of financial year end)',
      applies:
        'All companies, LLPs above threshold, trusts, and specified entities',
      points: [
        'Mandatory for all companies irrespective of turnover',
        'Conducted by qualified Chartered Accountants',
        'Annual requirement with specific timelines',
        'Covers financial statements, books of accounts, and internal controls',
        'Results in audit report expressing opinion on true and fair view',
        'Non-compliance attracts penalties and legal consequences',
      ],
    },
    {
      id: 'tax',
      title: 'Tax Audit',
      subtitle: 'Income Tax Compliance Audit',
      icon: <Shield className="h-5 w-5" />,
      desc: 'Tax audit under Section 44AB of the Income Tax Act is mandatory for businesses and professionals whose turnover/gross receipts exceed specified limits. It ensures proper maintenance of books of accounts and compliance with tax provisions.)',
      due: '31st October of the assessment year',
      applies:
        'Businesses with turnover > ₹1 crore, Professionals with receipts > ₹50 lakhs',
      points: [
        'Mandatory when business turnover exceeds ₹1 crore',
        'Professional gross receipts threshold: ₹50 lakhs',
        'Conducted by qualified Chartered Accountants',
        'Form 3CA/3CB audit report required',
        'Covers compliance with tax provisions and accounting standards',
        'Late filing attracts penalty of ₹1,50,000',
      ],
    },
    {
      id: 'gst',
      title: 'GST Audit',
      subtitle: 'Goods and Services Tax Audit',
      icon: <Search className="h-5 w-5" />,
      desc: 'GST audit is required for registered taxpayers with annual turnover exceeding ₹2 crores. It involves examination of records, returns filed, and compliance with GST provisions to ensure accuracy and completeness of GST compliance.',
      due: '31st December of following financial year',
      applies: 'GST registered taxpayers with turnover > ₹2 crores',
      points: [
        'Mandatory for turnover exceeding ₹2 crores',
        'Self-certification by qualified Chartered Accountant or Cost Accountant',
        'Annual audit covering GST compliance',
        'Form GSTR-9C audit report required',
        'Reconciliation of annual return with audited financial statements',
        'Due date: 31st December following financial year',
      ],
    },
    {
      id: 'internal',
      title: 'Internal Audit',
      subtitle: 'Risk Management & Control Assessment',
      icon: <Eye className="h-5 w-5" />,
      desc: "Internal audit is an independent assessment of an organization's risk management, control, and governance processes. It helps organizations accomplish objectives by bringing systematic approach to evaluate and improve effectiveness of operations.",
      due: 'Ongoing process as per Board approval',
      applies: 'Large companies meeting specified thresholds',
      points: [
        'Mandatory for companies with paid-up capital ≥ ₹50 crores or turnover ≥ ₹200 crores',
        'Independent evaluation of internal controls',
        'Risk-based approach to audit planning',
        'Continuous monitoring and improvement process',
        'Reports to Audit Committee of Board',
        'Helps in fraud prevention and operational efficiency',
      ],
    },
    {
      id: 'cost',
      title: 'Cost Audit',
      subtitle: 'Cost Accounting Standards Compliance',
      icon: <Building className="h-5 w-5" />,
      desc: 'Cost audit is mandatory for companies in specified industries to ensure compliance with cost accounting standards and proper maintenance of cost records. It helps in cost optimization and pricing decisions.',
      due: '1180 days from closure of financial year',
      applies: 'Companies in specified industries above turnover thresholds',
      points: [
        'Applicable to companies in specified sectors',
        'Turnover threshold: ₹35 crores for manufacturing, ₹100 crores for others',
        'Conducted by qualified Cost Accountants',
        'Form CRA-1 cost audit report required',
        'Covers cost accounting records and cost accounting standards',
        'Helps in cost control and pricing strategies',
      ],
    },

    {
      id: 'Concurrent',
      title: 'Concurrent Audit',
      subtitle: 'Real-time Transaction Monitoring',
      icon: <Shield className="h-5 w-5" />,
      desc: 'Concurrent audit involves examination of transactions simultaneously or immediately after their occurrence. It provides real-time feedback on compliance and helps in early detection of irregularities and frauds.',
      due: 'Ongoing process throughout the year',
      applies: 'Banks, NBFCs, and financial institutions',
      points: [
        'Real-time or near real-time audit process',
        'Mainly applicable to banks and financial institutions',
        'Continuous monitoring of transactions',
        'Early detection of frauds and irregularities',
        'Immediate feedback and corrective action',
        'Regulatory requirement for banking sector',
      ],
    },
  ];

  const easyServices = [
    {
      title: 'Easy ITR Status',
      icon: <CheckCircle className="h-5 w-5" />,
      desc: 'Check the processing status of your Income Tax Return filing instantly online.',
    },
    {
      title: 'Easy E-PAN',
      icon: <User className="h-5 w-5" />,
      desc: 'Apply for new PAN card or make corrections in existing PAN details electronically.',
    },
    {
      title: 'Easy E-verify Return',
      icon: <Shield className="h-5 w-5" />,
      desc: 'Electronically verify your filed income tax return using various authentication methods.',
    },
    {
      title: 'Easy E-pay Tax',
      icon: <CreditCard className="h-5 w-5" />,
      desc: 'Pay income tax, advance tax, self-assessment tax, and other dues online.',
    },
    {
      title: 'Easy Know TAN Details',
      icon: <Hash className="h-5 w-5" />,
      desc: 'Retrieve TAN (Tax Deduction Account Number) details and verify TAN information.',
    },
    {
      title: 'Easy Verify Your PAN',
      icon: <UserCheck className="h-5 w-5" />,
      desc: 'Verify PAN details, check PAN validity, and ensure PAN-Aadhaar linking status.',
    },
    {
      title: 'Easy Know Your AO',
      icon: <MapPin className="h-5 w-5" />,
      desc: 'Find your Assessing Officer details, jurisdiction, and contact information.',
    },
    {
      title: 'Easy PAN Details',
      icon: <FileText className="h-5 w-5" />,
      desc: 'Access comprehensive PAN information, download PAN card, and manage PAN services.',
    },
    {
      title: 'Easy E-PAN Application',
      icon: <CreditCard className="h-5 w-5" />,
      desc: 'Streamlined online PAN application process with digital document submission.',
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* ================= HEADER ================= */}
      <section className="py-16 text-center">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-semibold">
            Audit Services & Compliance
          </h1>
          <p className="mt-4 text-white/70 max-w-3xl mx-auto">
            Comprehensive guide to different types of audits, compliance
            requirements, and easy-to-use tax services for businesses and
            individuals in India.
          </p>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="max-w-5xl mx-auto px-4 pb-24 space-y-6">
        <GlassCard>
          <h2 className="text-2xl font-bold text-white mb-4">
            Understanding Audit Requirements
          </h2>
          Audit is a systematic examination of books of accounts, records, and
          documents to verify accuracy, compliance, and adherence to applicable
          laws and standards. Different types of audits serve various purposes
          ranging from statutory compliance to operational efficiency.
          <p>
            In India, various audit requirements are mandated by different laws
            including Companies Act, Income Tax Act, GST Act, and
            sector-specific regulations. Understanding these requirements is
            crucial for maintaining compliance and avoiding penalties.
          </p>
        </GlassCard>

        {/* AUDIT ACCORDIONS */}
        {auditTypes.map((item, i) => (
          <div
            key={item.id}
            className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur"
          >
            <button
              onClick={() => toggle(item.id)}
              className="w-full flex justify-between items-center px-6 py-5"
            >
              <div className="flex gap-4 items-center">
                <div className="h-10 w-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                  {item.icon}
                </div>
                <div className="text-left">
                  <h2 className="text-lg font-semibold">
                    {i + 1}. {item.title}
                  </h2>
                  <p className="text-white/60 text-sm">{item.subtitle}</p>
                </div>
              </div>
              {open === item.id ? (
                <ChevronUp className="h-5 w-5 text-white/60" />
              ) : (
                <ChevronDown className="h-5 w-5 text-white/60" />
              )}
            </button>

            {open === item.id && (
              <div className="px-6 pb-6 space-y-4 text-white/80">
                <p>{item.desc}</p>

                <div className="grid sm:grid-cols-2 gap-4">
                  <InfoCard title="Due Date" value={item.due} />
                  <InfoCard title="Applicable To" value={item.applies} />
                </div>

                <ul className="space-y-2">
                  {item.points.map((p, idx) => (
                    <li key={idx} className="flex gap-2 items-start">
                      <BadgeCheck className="h-4 w-4 text-green-400 mt-1" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}

        {/* EASY SERVICES */}
        <GlassCard>
          <h3 className="text-xl font-semibold mb-4">Easy Tax Services</h3>
          <p className="mb-6 text-sm text-white/70">
            Simplify your tax compliance with our comprehensive suite of
            easy-to-use online services designed for individuals and businesses.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {easyServices.map((s, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/10 bg-white/5 p-4 flex gap-4"
              >
                {/* Icon */}
                <div className="h-10 w-10 shrink-0 rounded-lg bg-white/10 flex items-center justify-center text-blue-400">
                  {s.icon}
                </div>

                {/* Content */}
                <div>
                  <h4 className="text-sm font-semibold mb-1">{s.title}</h4>
                  <p className="text-xs text-white/70 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* FOOTER NOTE */}

        <GlassHighlight className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl p-8">
          <h4 className="text-white text-xl font-semibold mb-6">
            Important Compliance Guidelines
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-white">
            {/* Left Column */}
            <div>
              <h5 className="font-semibold text-lg mb-4">
                Audit Compliance
              </h5>
              <ul className="space-y-2 text-sm text-blue-100 list-disc list-inside">
                <li>
                  Maintain proper books of accounts as per applicable standards
                </li>
                <li>Appoint qualified auditors within prescribed timelines</li>
                <li> File audit reports within due dates to avoid penalties</li>
                <li>Ensure proper documentation and supporting evidence</li>
              </ul>
            </div>

            {/* Right Column */}
            <div>
              <h5 className="font-semibold text-lg mb-4">Best Practices</h5>
              <ul className="space-y-2 text-sm text-blue-100 list-disc list-inside">
                <li>
                  Maintain proper books of accounts and supporting documents
                </li>
                <li>Regular internal reviews and reconciliations</li>
                <li> Maintain digital records for easy access and audit</li>
                <li> Stay updated with changing compliance requirements</li>
                <li>Engage professional help for complex compliance matters</li>
              </ul>
            </div>
          </div>
        </GlassHighlight>
      </section>
    </main>
  );
}

/* ================= UI COMPONENTS ================= */

const GlassCard = ({ children }) => (
  <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur">
    {children}
  </div>
);

const GlassHighlight = ({ children }) => (
  <div className="rounded-2xl border border-white/20 bg-white/10 p-5 text-sm">
    {children}
  </div>
);

const InfoCard = ({ title, value }) => (
  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
    <p className="text-xs text-white/60">{title}</p>
    <p className="font-semibold">{value}</p>
  </div>
);
