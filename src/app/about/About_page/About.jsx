'use client';
import Image from "next/image";
import React from "react";

const stats = [
  { label: "Years of Experience", value: "5+" },
  { label: "Customer First Approach", value: "100%" },
  { label: "Support Channels", value: "Web • App • Office" },
];

export default function About() {
  return (
    <main className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* ===== HERO / ABOUT ===== */}
      <section className="container mx-auto px-4 py-10">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-semibold">About Us</h1>
          <p className="text-lg text-white/70 mt-2">Know Who We Are</p>
          
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mt-8">
          <div className="tilt">
            <div className="tilt-inner rounded-3xl overflow-hidden border border-white/10">
              <Image
                src="/images/aboutt.jpg"
                width={700}
                height={700}
                alt="about_image"
                className="object-cover"
              />
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">
              <span className="text-blue-400">5+</span> Years of Experience
            </h2>

            <p className="text-white/80 text-justify">
              We are a company that makes it easy to manage your taxes and other daily needs.
              We started this journey in the year 2019 with a simple idea: people don&apos;t
              have the knowledge or time to manage their own accounts, so we&apos;re here to help!
              We&apos;ve made it possible for you to do what you need, when you need it.
              Our products are available online, on your phone, and even in person at our offices!
            </p>

            <div className="flex flex-wrap gap-3">
              <Tag text="GST" />
              <Tag text="ITR" />
              <Tag text="Compliance" />
              <Tag text="Trusted Since 2019" />
            </div>
          </div>
        </div>
      </section>

      
      {/* ===== COMPANY STORY ===== */}
 <section className="container mx-auto px-4 py-10 max-w-6xl">
        <SectionHeader title="Company Story" subtitle="Learn About Our Journey" />
        <Timeline items={timeline} />
      </section>

      {/* ===== OUR MISSION ===== */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-center text-4xl font-semibold">Our Mission</h2>
        <p className="text-center text-white/70 mt-2">Learn About Our Mission</p>

        <div className="grid md:grid-cols-2 gap-12 items-center mt-10 bg-white/5 border border-white/10 rounded-3xl p-10">
          <p className="text-white/80 text-justify">
            A mission statement is typically longer and more detailed than a vision statement
            and should be specific, measurable and most importantly actionable.For example,
            a finance company&apos;s mission statement may be to &apos;provide accessible and
            affordable financial services to underserved communities, while maintaining the
            highest standards of integrity and customer service.&apos;
            This mission statement communicates the company&apos;s commitment to serving
            specific customer groups and its emphasis on ethical behavior.
          </p>

          <div className="tilt">
            <div className="tilt-inner rounded-3xl overflow-hidden border border-white/10">
              <Image
                src="/images/about.jpg"
                alt="Mission illustration"
                width={600}
                height={400}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== OUR VISION ===== */}
      <section className="container mx-auto px-4 py-10">
        <h2 className="text-center text-4xl font-semibold">Our Vision</h2>
        <p className="text-center text-white/70 mt-2">Learn About Our Vision</p>

        <div className="grid md:grid-cols-2 gap-12 items-center mt-10 bg-white/5 border border-white/10 rounded-3xl p-10">
          <div className="tilt">
            <div className="tilt-inner rounded-3xl overflow-hidden border border-white/10">
              <Image
                src="/images/grow.png"
                alt="our vision"
                width={500}
                height={500}
                className="object-cover"
              />
            </div>
          </div>

          <p className="text-white/80 text-justify">
            A mission statement is typically longer and more detailed than a vision statement
            and should be specific, measurable and most importantly actionable.For example,
            a finance company&apos;s mission statement may be to &quot;provide accessible and
            affordable financial services to underserved communities, while maintaining the
            highest standards of integrity and customer service.&quot;
            This mission statement communicates the company&apos;s commitment to serving
            specific customer groups and its emphasis on ethical behavior.
          </p>
        </div>
      </section>

      {/* ===== 3D + MOTION ===== */}
      <style jsx>{`
        .tilt {
          perspective: 1200px;
        }
        .tilt-inner {
          transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .tilt:hover .tilt-inner {
          transform: rotateX(6deg) rotateY(-8deg) scale(1.02);
        }
      `}</style>
    </main>
  );
}

/* ===== HELPERS ===== */

function Tag({ text }) {
  return (
    <span className="px-3 py-1 text-xs rounded-full bg-white/10 border border-white/10">
      {text}
    </span>
  );
}

/* ===== DATA ===== */

const timeline = [
  {
    year: "2018",
    title: "The Beginning",
    body:
      "The founder develops an idea, registers the company with the government, obtains the necessary legal documents and licenses, and obtains any necessary approvals or clearances from both state and central government agencies.",
    side: "left",
  },
  {
    year: "2019",
    title: "In 2019",
    body:
      "In December 2019, Itax Easy Private Limited began development of the company's web and app development. We prepared everything needed to develop our company and idea. Our team is dedicated, professional, honest and hardworking, always ensuring work is done on time.",
    side: "right",
  },
  {
    year: "2020",
    title: "In 2020",
    body:
      "In the year 2020, the company started meeting people and took Lic of india as well as star health and started doing business In the year 2020, the company started meeting people and took Lic of india as well as star health and started doing business",
    side: "left",
  },
  {
    year: "2021",
    title: "In 2021",
    body:
      "The founder develops an idea, registers the company with the government, obtains the necessary legal documents and licenses, and obtains any necessary approvals or clearances from both state and central government agencies.",
    side: "right",
  },
  {
    year: "2022",
    title: "In 2022",
    body:
      "Itaxeasy Pvt Ltd, a company that provides online tax filing and compliance services, announced a partnership with Yes Bank in 2022. As part of the partnership, Yes Bank will offer Itaxeasy's services to its customers, making it easier for them to file their taxes online. Itaxeasy will benefit by expanding its reach in the market.",
    side: "left",
  },
  {
    year: "2023",
    title: "In 2023",
    body:
      "At Itax Easy Private Limited, we believe everyone deserves access to the financial services they need. We created 'ITAXEASY', a mobile application that makes it easy to manage finances and file taxes in one place—simple, guided, and supported by experts when needed.",
    side: "right",
  },
];

function SectionHeader({ title, subtitle }) {
  return (
    <div className="text-center mb-10">
      <h2 className="text-3xl font-semibold text-white">
        {title}
      </h2>
      <p className="text-sm text-white/70 mt-1">
        {subtitle}
      </p>
      <div className="mt-4 flex justify-center">
        <span className="h-[2px] w-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500" />
      </div>
    </div>
  );
}

function Timeline({ items }) {
  return (
    <div className="mt-12 space-y-6">
      {items.map((item) => (
        <div key={item.year} className="rounded-2xl bg-white/5 border border-white/10 p-6">
          <span className="text-purple-300 text-sm">{item.year}</span>
          <h4 className="font-semibold mt-1">{item.title}</h4>
          <p className="text-white/70 text-sm mt-2 text-justify">{item.body}</p>
        </div>
      ))}
    </div>
  );
}
