
"use client";
import Image from "next/image";

export default function AppPromo({ promo = {} }) {

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-0 pb-10 mt-0 md:-mt-8 relative z-20">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-white via-slate-50 to-blue-50 border border-white shadow-2xl shadow-blue-900/10"> 
        
        {/* Background Decorative Elements */}
        <div className="absolute -bottom-24 -right-24 h-80 w-80 bg-blue-400/10 rounded-full blur-[80px]"></div>
        <div className="absolute -top-24 -left-24 h-80 w-80 bg-indigo-400/10 rounded-full blur-[80px]"></div>

        <div className="relative flex flex-col md:flex-row items-center justify-between gap-10 p-8 md:p-12 lg:p-12">
          
          {/* Image Section */}
          <div className="w-full md:w-1/2 flex justify-center items-center order-2 md:order-1">
            <div className="relative group w-full max-w-[450px]">
              {/* Image Glow */}
              <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-3xl scale-75 group-hover:scale-90 transition-transform duration-700"></div>
              
              {/* Image Container with fixed Aspect Ratio for better visibility */}
              <div className="relative z-10 w-full aspect-[4/3] md:aspect-square lg:h-[400px]">
                <Image
                 src="/images/home/app.png"
                  alt="mobile app"
                  fill
                  priority
                  className="object-contain drop-shadow-2xl transition-all duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>

          {/* Text Content Section */}
          <div className="w-full md:w-1/2 text-center md:text-left order-1 md:order-2 z-10">
            <h4 className="font-semibold text-slate-800 text-lg md:text-xl mb-2">
              Visit here
            </h4>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight tracking-tight">
              File Your ITR  <span className="text-blue-600 font-bold">  In One Go.
              </span>
              
            </h2>
            
            <p className="mt-4 text-slate-800 text-base md:text-lg leading-relaxed max-w-md mx-auto md:mx-0 font-medium">
              Download <span className="text-blue-600 font-bold"> ItaxEasy App </span> For Better Tax Experience 
            </p>

            <div className="mt-10 flex flex-col items-center md:items-start gap-4">
              <a 
                href="#" 
                className="group transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
              >
                <div className="relative overflow-hidden rounded-xl shadow-md border border-slate-200 bg-white p-1">
                  <Image
                    src="/icons/home/google-play-badge.png"
                    alt="google-play-badge"
                    width={100} 
                    height={40}
                    className="h-auto w-auto"
                  />
                </div>
              </a>
              
              <div className="flex items-center gap-2 mt-2">
                <p className="text-slate-500 text-sm font-bold flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  Being Serviced Live
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
