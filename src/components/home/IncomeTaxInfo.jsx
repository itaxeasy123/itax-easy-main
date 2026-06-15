"use client";
import Link from "next/link";
import Image from "next/image";

export default function IncomeTaxInfo() {
  return (
    
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8 mt-6 md:mt-0 relative z-20">
  <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-white via-slate-100 to-blue-200 border border-white shadow-2xl shadow-blue-900/10">
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 grid md:grid-cols-2 gap-6 items-center">
      
      {/* Image Section */}
      <div className="flex justify-center">
        <Image
          src="/images/home/income-text.png"
          alt="Income tax picture"
          width={420}
          height={420}
          className="rounded-lg object-contain"
        />
      </div>

      {/* Content Section */}
      <div className="space-y-4">
        <h4 className="font-extrabold text-2xl md:text-3xl text-slate-800">
          Income Tax
        </h4>

        <div className="text-sm md:text-base text-gray-600 space-y-3 text-justify">
          <p>
            <strong className="text-gray-700">
              Determine Your Taxable Income:
            </strong>{" "}
            Your taxable income includes all earnings in a financial year.
            After subtracting eligible deductions and exemptions, you arrive
            at the taxable amount.
          </p>

          <p>
            <strong className="text-gray-700">
              Calculate Your Tax Liability:
            </strong>{" "}
            Use tax slabs or calculators to estimate payable tax based on
            income level and filing status. This helps in accurate tax
            planning.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/about"
            className="inline-block px-6 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
          >
            Read more
          </Link>
        </div>
      </div>

    </div>
    </div>
</div>
  );
}
