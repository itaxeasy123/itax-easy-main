import { Icon } from '@iconify/react';

const TONES = {
  blue: 'bg-blue-50 text-blue-600',
  emerald: 'bg-emerald-50 text-emerald-600',
  amber: 'bg-amber-50 text-amber-600',
  violet: 'bg-violet-50 text-violet-600',
  rose: 'bg-rose-50 text-rose-600',
  slate: 'bg-slate-100 text-slate-600',
};

/** Compact metric card used across the dashboards. */
export default function StatCard({ label, value, icon, sub, tone = 'blue' }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-xs font-medium text-slate-500">{label}</p>
          <h3 className="mt-1 text-2xl font-bold leading-none text-slate-800">
            {value}
          </h3>
          {sub && <p className="mt-2 text-xs text-slate-400">{sub}</p>}
        </div>
        {icon && (
          <div
            className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl ${TONES[tone] || TONES.blue}`}
          >
            <Icon icon={icon} className="h-5 w-5" />
          </div>
        )}
      </div>
    </div>
  );
}
