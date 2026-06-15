'use client';

import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

export default function InternCard({ title, skills }) {
  const router = useRouter();

  return (
    <div className="relative bg-gray-50 rounded-2xl p-6 border border-gray-200 
                    hover:shadow-lg transition duration-300 group">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>

      <p className="text-sm text-gray-500 mb-10">{skills}</p>

      <button
        onClick={() => router.push('/internship/apply')}
        className="absolute bottom-4 right-4 flex items-center gap-1 
                   text-blue-600 font-medium text-sm hover:text-blue-800 transition"
      >
        Apply
        <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
      </button>
    </div>
  );
}
