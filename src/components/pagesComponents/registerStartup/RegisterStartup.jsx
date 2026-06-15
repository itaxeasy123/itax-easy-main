'use client';

import { TopNavigation } from './TopNavigation';
import { data, REGISTER_STARTUP_CATEGORIES } from './staticData';
import Image from 'next/image';
import Link from 'next/link';

export default function RegisterStartup({ params = {} }) {
  const category = params?.category || null;

  const filteredData = category
    ? data.filter((item) => item.category === category)
    : data;

  return (
    <div className="mt-2 mb-24 bg-slate-50 min-h-screen">
      {/* TOP NAV */}
      <TopNavigation selectedCategory={category} />

      <div className="p-6">
        {/* HEADING */}
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-slate-900">
            {category
              ? REGISTER_STARTUP_CATEGORIES[category]
              : 'All Startup Services'}
          </h2>
          <div className="h-1 w-10 bg-blue-500 rounded-full mx-auto mt-3"></div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:max-w-[1400px] lg:grid-cols-4 gap-8 justify-items-center mx-auto">
          {Array.isArray(filteredData) && filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div
                key={item.id}
                className="group w-72 h-72 p-6 flex flex-col justify-between
                rounded-2xl border border-slate-200 bg-white shadow-sm
                hover:border-slate-300 hover:shadow-md hover:-translate-y-1 transition"
              >
                {/* IMAGE TILE */}
                <div className="flex justify-center items-center h-20">
                  <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-blue-50">
                    <Image
                      src={item.img || '/logo.svg'}
                      alt={item.title || 'Service'}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* TITLE */}
                <h3 className="text-lg font-bold text-center text-slate-900 mt-2 group-hover:text-blue-600 transition">
                  {item.title}
                </h3>

                {/* DESC (Optional future use) */}
                <p className="text-sm text-slate-500 text-center line-clamp-2 px-2">
                  {item.description || 'Professional service with fast processing'}
                </p>

                {/* BUTTON */}
                <div>
                  {item.link ? (
                    <Link
                      href={`/register-startup/${item.category}/${item.link}`}
                      className="block text-center text-sm font-semibold
                      text-white bg-blue-600 py-2 rounded-xl
                      hover:bg-blue-700 transition"
                    >
                      View Details →
                    </Link>
                  ) : item.externalLink ? (
                    <a
                      href={item.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center text-sm font-semibold
                      text-white bg-blue-600 py-2 rounded-xl
                      hover:bg-blue-700 transition"
                    >
                      Visit ↗
                    </a>
                  ) : (
                    <button
                      disabled
                      className="block w-full text-center text-sm font-semibold
                      text-slate-500 bg-slate-100 py-2 rounded-xl cursor-not-allowed"
                    >
                      Coming Soon
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-slate-500">
              No Services Found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}