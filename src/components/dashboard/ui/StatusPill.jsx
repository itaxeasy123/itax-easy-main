const STYLES = {
  pending: 'bg-amber-100 text-amber-700',
  approved: 'bg-blue-100 text-blue-700',
  rejected: 'bg-rose-100 text-rose-700',
  paid: 'bg-emerald-100 text-emerald-700',
  success: 'bg-emerald-100 text-emerald-700',
  failure: 'bg-rose-100 text-rose-700',
  usercancelled: 'bg-slate-100 text-slate-600',
  initiated: 'bg-slate-100 text-slate-600',
};

/** Consistent status badge. `extra` appends e.g. an amount. */
export default function StatusPill({ status, extra }) {
  const key = String(status || '').toLowerCase();
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${STYLES[key] || 'bg-slate-100 text-slate-600'}`}
    >
      {status || 'unknown'}
      {extra ? ` · ${extra}` : ''}
    </span>
  );
}
