import Link from 'next/link';
import { REGISTER_STARTUP_CATEGORIES } from './staticData';

export const TopNavigation = ({ selectedCategory }) => {
  return (
    <div className="my-5 z-10 px-3">
      <div
        className="mx-auto p-3 md:max-w-7xl grid gap-2"
        style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        }}
      >
        {Object.keys(REGISTER_STARTUP_CATEGORIES).map((item) => (
          <Link
            href={`/register-startup/${item}`}
            key={item}
            className={`${
              selectedCategory === item
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            } items-center justify-center w-full py-1 sm:py-3 font-semibold text-center cursor-pointer transition rounded-xl`}
          >
            {REGISTER_STARTUP_CATEGORIES[item]}
          </Link>
        ))}
      </div>
    </div>
  );
};
