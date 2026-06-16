'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Icon } from '@iconify/react';
import { nodeAxios } from '@/lib/axios';

const Typewriter = dynamic(() => import('typewriter-effect'), { ssr: false });

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICES = [
  { icon: 'mdi:file-document-edit-outline', title: 'ITR Filing',           desc: 'File ITR-1 to ITR-7 with CA support.',               link: '/dashboard/itr-filing',                      color: 'bg-blue-100 text-blue-600',    hot: true },
  { icon: 'mdi:receipt-text-outline',        title: 'GST Services',         desc: 'GST registration, GSTR filing & reconciliation.',     link: '/dashboard/gst',                      color: 'bg-violet-100 text-violet-600'         },
  { icon: 'mdi:bank-transfer',               title: 'TDS Filing',           desc: 'TDS returns, corrections & certificates on time.',    link: '/dashboard/tds',                      color: 'bg-orange-100 text-orange-600'         },
  { icon: 'mdi:calculator-variant-outline',  title: 'Tax Calculators',      desc: 'Income tax, advance tax, HRA & 10+ calculators.',     link: '/dashboard/financial-calculators',    color: 'bg-teal-100 text-teal-600'             },
  { icon: 'mdi:shield-check-outline',        title: 'Insurance',            desc: 'Compare & buy life, health, vehicle plans.',          link: '/dashboard/easy-investment/insurance',color: 'bg-green-100 text-green-600'           },
  { icon: 'mdi:briefcase-account-outline',   title: 'Business Reg.',        desc: 'MSME, Trademark, FSSAI & Professional Tax.',          link: '/dashboard',                          color: 'bg-pink-100 text-pink-600'             },
  { icon: 'mdi:book-open-variant',           title: 'Accounting',           desc: 'Bookkeeping, P&L, balance sheets & audit.',           link: '/dashboard/accounting',               color: 'bg-amber-100 text-amber-600'           },
  { icon: 'mdi:trending-up',                 title: 'Investments',          desc: 'SIP, mutual funds & 80C tax-saving options.',         link: '/dashboard/easy-investment',          color: 'bg-emerald-100 text-emerald-600'       },
];

const STEPS = [
  { n: '1', icon: 'mdi:account-plus-outline',   label: 'Register Free',    desc: 'Create your account in under a minute, no card needed.' },
  { n: '2', icon: 'mdi:card-search-outline',     label: 'Pick a Service',   desc: 'Choose ITR, GST, TDS or any other service from the dashboard.' },
  { n: '3', icon: 'mdi:cloud-upload-outline',    label: 'Upload Documents', desc: 'Upload Form 16, AIS or bank statements securely.' },
  { n: '4', icon: 'mdi:check-decagram-outline',  label: 'File & Done',      desc: 'Our experts review, validate and e-file your return instantly.' },
];

const ITR_FORMS = [
  { form: 'ITR-1', tag: 'SAHAJ',  icon: 'mdi:account-tie-outline',      who: 'Salaried Individuals',   detail: 'Salary + 1 house + other sources',   limit: 'Up to ₹50 Lakh' },
  { form: 'ITR-2', tag: '',        icon: 'mdi:chart-areaspline',          who: 'Capital Gains / HNIs',   detail: 'Multiple props, foreign assets',       limit: 'Any amount'     },
  { form: 'ITR-3', tag: '',        icon: 'mdi:store-outline',             who: 'Business Professionals', detail: 'Business income, PGBP, proprietorship',limit: 'Any amount'     },
  { form: 'ITR-4', tag: 'SUGAM',  icon: 'mdi:calculator-variant',        who: 'Presumptive Business',   detail: 'Sec 44AD, 44ADA, 44AE taxpayers',    limit: 'Up to ₹75 Lakh' },
  { form: 'ITR-5', tag: '',        icon: 'mdi:handshake-outline',         who: 'Firms & LLPs',           detail: 'Partnership, AOP, BOI, LLP',          limit: 'Any amount'     },
  { form: 'ITR-6', tag: '',        icon: 'mdi:office-building-outline',   who: 'Companies',              detail: 'Companies (non Sec-11 exempt)',        limit: 'Any amount'     },
];

const WHY = [
  { icon: 'mdi:shield-lock-outline',  title: '256-bit Encryption',   desc: 'Bank-grade security for all your financial data.' },
  { icon: 'mdi:clock-fast',           title: 'File in 30 Minutes',   desc: 'Smart auto-fill from Form 16 and AIS saves hours.' },
  { icon: 'mdi:headset',              title: 'CA / CS Support',      desc: 'Qualified experts on chat, call and email.' },
  { icon: 'mdi:currency-inr',         title: 'Starts Free',          desc: 'Transparent pricing. No hidden charges, ever.' },
];

// ─── Component ─────────────────────────────────────────────────────────────────

export default function Home() {
  const router = useRouter();
  const [visitors, setVisitors] = useState(0);
  const [allUsers, setAllUsers] = useState({});

  useEffect(() => {
    (async () => {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/visitorCount/create`, { method: 'POST' });
        const vRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/visitorCount/getAll`).then(r => r.json()).catch(() => ({}));
        const uRes = await nodeAxios.get('/cms/stats').then(r => r.data?.data || {}).catch(() => ({}));
        setVisitors(vRes?.count || 0);
        setAllUsers(uRes || {});
      } catch {}
    })();
    const t = setInterval(async () => {
      try {
        const v = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/visitorCount/getAll`).then(r => r.json()).catch(() => ({}));
        setVisitors(v?.count || 0);
      } catch {}
    }, 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="overflow-x-hidden bg-white text-slate-800">

      {/* ══ HERO ════════════════════════════════════════════════════════════ */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 lg:py-20">
          <div className="grid md:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-center">

            {/* Left */}
            <div className="text-center md:text-left order-2 md:order-1">
              <span className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-600 text-xs font-semibold px-4 py-1.5 rounded-full mb-5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute h-full w-full rounded-full bg-blue-400 opacity-75" />
                  <span className="relative h-2 w-2 rounded-full bg-blue-500" />
                </span>
                FY 2025-26 Filing Open
              </span>

              <h1 className="text-[2rem] sm:text-5xl md:text-[2.6rem] lg:text-[3.2rem] font-black text-slate-900 leading-[1.1] tracking-tight">
                File Your ITR<br />
                <span className="text-blue-600">Online.</span> Simple.<br />
                Stress-Free.
              </h1>

              <div className="mt-4 text-slate-500 text-base font-medium h-7">
                <Typewriter
                  options={{
                    strings: [
                      'Salaried? File ITR-1 in minutes.',
                      'Freelancer? ITR-4 made simple.',
                      'Business owner? ITR-3 with CA help.',
                      'Expert review before every submission.',
                    ],
                    autoStart: true,
                    loop: true,
                    deleteSpeed: 25,
                    delay: 55,
                  }}
                />
              </div>

              <p className="mt-5 text-slate-500 text-sm leading-relaxed max-w-md mx-auto md:mx-0">
                iTaxEasy helps individuals, freelancers and businesses manage all their tax compliance — ITR, GST, TDS — from one secure dashboard.
              </p>

              <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <button
                  onClick={() => router.push('/dashboard/itr-filing')}
                  className="bg-blue-600 text-white font-bold px-7 py-3 rounded-xl text-sm shadow-lg shadow-blue-200 hover:bg-blue-700 hover:-translate-y-0.5 transition-all flex items-center gap-2 justify-center"
                >
                  <Icon icon="mdi:file-document-edit-outline" className="text-lg" />
                  File ITR — It's Free
                </button>
                <button
                  onClick={() => router.push('/dashboard')}
                  className="border border-slate-300 text-slate-700 font-semibold px-7 py-3 rounded-xl text-sm hover:border-slate-400 hover:bg-slate-50 transition-all flex items-center gap-2 justify-center"
                >
                  <Icon icon="mdi:view-dashboard-outline" className="text-lg" />
                  Go to Dashboard
                </button>
              </div>

              <div className="mt-6 flex flex-wrap gap-x-3 gap-y-2 justify-center md:justify-start">
                {['100% Secure', 'CA Verified', 'No Hidden Fees', 'Instant e-Ack'].map(t => (
                  <span key={t} className="flex items-center gap-1 text-slate-500 text-xs">
                    <Icon icon="mdi:check-circle" className="text-green-500 text-sm" />
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — hidden on mobile, shown from tablet up */}
            <div className="order-1 md:order-2 hidden md:flex justify-center">
              <Image
                src="/Hero-ITR.gif"
                alt="iTaxEasy ITR Filing"
                width={480}
                height={380}
                priority
                unoptimized
                className="w-full max-w-[300px] sm:max-w-[380px] md:max-w-[420px] lg:max-w-[440px] h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══ STATS ════════════════════════════════════════════════════════════ */}
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-200">
          {[
            { label: 'Visitors',   value: `${visitors || '10,000'}+`,               icon: 'mdi:eye-outline'                   },
            { label: 'Users',      value: `${allUsers?.totalUsers  || '50,000'}+`,   icon: 'mdi:account-group-outline'         },
            { label: 'ITRs Filed', value: '25,000+',                                 icon: 'mdi:file-check-outline'            },
            { label: 'Cities',     value: '150+',                                    icon: 'mdi:map-marker-multiple-outline'   },
          ].map(s => (
            <div key={s.label} className="flex flex-col items-center text-center px-4 py-2">
              <Icon icon={s.icon} className="text-slate-400 text-2xl mb-1.5" />
              <div className="text-2xl font-black text-slate-900">{s.value}</div>
              <div className="text-slate-500 text-xs mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ SERVICES ════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Our Services</h2>
            <p className="mt-2 text-slate-500 text-sm">Everything you need for tax and financial compliance, in one place.</p>
            <div className="mt-4 h-1 w-10 bg-blue-500 rounded-full mx-auto" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICES.map(s => (
              <Link
                key={s.title}
                href={s.link}
                className="group relative bg-white rounded-2xl border border-slate-200 p-5 hover:border-slate-300 hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col"
              >
                {s.hot && (
                  <span className="absolute top-3 right-3 bg-blue-600 text-white text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full">
                    Popular
                  </span>
                )}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>
                  <Icon icon={s.icon} className="text-xl" />
                </div>
                <h3 className="font-bold text-slate-800 text-sm mb-1">{s.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed flex-1">{s.desc}</p>
                <div className="mt-3 flex items-center gap-1 text-slate-400 text-xs font-medium group-hover:text-blue-600 group-hover:gap-2 transition-all">
                  Open <Icon icon="mdi:arrow-right" className="text-base" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ════════════════════════════════════════════════════ */}
      <section className="py-16 bg-slate-50 border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">How It Works</h2>
            <p className="mt-2 text-slate-500 text-sm">File your ITR in 4 simple steps.</p>
            <div className="mt-4 h-1 w-10 bg-blue-500 rounded-full mx-auto" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
            {STEPS.map((step, i) => (
              <div key={step.label} className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <div className="w-14 h-14 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center shadow-sm">
                    <Icon icon={step.icon} className="text-2xl text-slate-600" />
                  </div>
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-black flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-bold text-slate-800 text-sm mb-1">{step.label}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => router.push('/dashboard/itr-filing')}
              className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold px-7 py-3 rounded-xl text-sm shadow-lg shadow-blue-200 hover:bg-blue-700 hover:-translate-y-0.5 transition-all"
            >
              <Icon icon="mdi:rocket-launch-outline" />
              Start Filing Now — It's Free
            </button>
          </div>
        </div>
      </section>

      {/* ══ ITR FORMS ════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Which ITR Form is Right for You?</h2>
            <p className="mt-2 text-slate-500 text-sm">Select the correct form based on your income type.</p>
            <div className="mt-4 h-1 w-10 bg-blue-500 rounded-full mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ITR_FORMS.map(itr => (
              <Link
                key={itr.form}
                href="/dashboard/itr-filing"
                className="group bg-white border border-slate-200 rounded-2xl p-5 hover:border-blue-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex items-start gap-4"
              >
                {/* Icon box */}
                <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                  <Icon icon={itr.icon} className="text-xl text-slate-600 group-hover:text-blue-600 transition-colors" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-black text-slate-900 text-sm">{itr.form}</span>
                    {itr.tag && (
                      <span className="text-[9px] font-bold bg-blue-50 text-blue-600 border border-blue-200 px-2 py-0.5 rounded-full uppercase tracking-wide">
                        {itr.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-slate-600 font-semibold text-xs mt-0.5">{itr.who}</p>
                  <p className="text-slate-400 text-xs mt-1 leading-relaxed">{itr.detail}</p>
                  <div className="mt-2 flex items-center gap-1 text-slate-400 text-[11px]">
                    <Icon icon="mdi:currency-inr" className="text-sm" />
                    {itr.limit}
                  </div>
                </div>

                <Icon icon="mdi:chevron-right" className="text-slate-300 text-xl mt-0.5 flex-shrink-0 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHY US ══════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-slate-50 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Why iTaxEasy?</h2>
            <div className="mt-4 h-1 w-10 bg-blue-500 rounded-full mx-auto" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {WHY.map(w => (
              <div key={w.title} className="bg-white rounded-2xl border border-slate-200 p-5 text-center hover:border-slate-300 hover:shadow-sm transition-all">
                <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center mx-auto mb-3">
                  <Icon icon={w.icon} className="text-xl text-slate-600" />
                </div>
                <h3 className="font-bold text-slate-800 text-sm mb-1">{w.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ═════════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-100 mb-5">
            <Icon icon="mdi:file-document-check-outline" className="text-3xl text-blue-600" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Ready to File Your ITR?
          </h2>
          <p className="mt-3 text-slate-500 text-sm leading-relaxed">
            Join thousands of Indians who trust iTaxEasy. Start free — no credit card required.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => router.push('/dashboard/itr-filing')}
              className="inline-flex items-center gap-2 justify-center bg-blue-600 text-white font-bold px-7 py-3 rounded-xl text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
            >
              <Icon icon="mdi:rocket-launch-outline" className="text-lg" />
              File My ITR Free
            </button>
            <button
              onClick={() => router.push('/dashboard')}
              className="inline-flex items-center gap-2 justify-center border border-slate-300 text-slate-700 font-semibold px-7 py-3 rounded-xl text-sm hover:bg-white hover:border-slate-400 transition-all"
            >
              <Icon icon="mdi:view-dashboard-outline" className="text-lg" />
              Explore Dashboard
            </button>
          </div>
          <p className="mt-6 text-slate-400 text-xs">
            Trusted by 50,000+ taxpayers · FY 2025-26 Filing Open
          </p>
        </div>
      </section>

    </div>
  );
}
