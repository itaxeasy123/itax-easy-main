"use client";

import Link from "next/link";
import Image from "next/image";

export default function InsuranceCta({ cta = {} }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-white via-blue-50 to-indigo-50 border border-white/60 shadow-2xl shadow-blue-900/10">
        
        {/* Background Decorative Elements */}
        <div className="absolute -top-20 -right-20 h-80 w-80 bg-blue-400/10 rounded-full blur-[80px]"></div>
        <div className="absolute -bottom-20 -left-20 h-80 w-80 bg-indigo-400/10 rounded-full blur-[80px]"></div>
        
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-16 p-8 md:p-16 lg:p-20">
          
          {/* Text Content Area */}
          <div className="w-full md:w-3/5 order-2 md:order-1 text-center md:text-left z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-xs font-bold tracking-widest text-blue-700 uppercase bg-blue-100/50 backdrop-blur-md rounded-full border border-blue-200/50">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              Top Rated Security
            </div>
            
            <h4 className="font-semibold text-slate-800 text-lg md:text-xl mb-2">
              Choose your right policy
            </h4>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-[1.1] tracking-tight">
              Protecting your future, <br className="hidden lg:block" /> 
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                One policy at a time.
              </span>
            </h2>
            
            <p className="mt-6 text-slate-600 text-base md:text-xl leading-relaxed max-w-xl mx-auto md:mx-0">
              Find the perfect coverage tailored to your needs and ensure peace of mind for you and your family.
            </p>

            <div className="pt-2">
              <Link
                href="/dashboard/easy-investment/insurance"
            className="inline-block px-6 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Image Area - Responsive Height/Width */}
          <div className="w-full md:w-2/5 order-1 md:order-2 flex justify-center items-center">
            <div className="relative w-full max-w-[320px] sm:max-w-[400px] md:max-w-none">
              <div className="absolute inset-0 bg-blue-200/20 rounded-full blur-3xl scale-75 animate-pulse"></div>
              <Image
                src="https://img.freepik.com/free-vector/father-shaking-hands-with-insurance-agent_74855-4412.jpg"
                alt="insurance"
                width={600}
                height={400} 
                priority
                className="relative z-10 w-full h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-700 group-hover:rotate-1"
                style={{ 
                  maxHeight: '340px', // Mobile se desktop tak image balance rahegi
                  objectFit: 'contain'
                }}
              />
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}