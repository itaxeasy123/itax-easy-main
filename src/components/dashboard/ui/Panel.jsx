/** Clean white card section with an optional title + right-aligned slot. */
export default function Panel({
  title,
  right,
  className = '',
  bodyClassName = 'p-4',
  children,
}) {
  return (
    <section
      className={`rounded-xl border border-slate-200 bg-white shadow-sm ${className}`}
    >
      {(title || right) && (
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
          <h2 className="text-sm font-semibold text-slate-700">{title}</h2>
          {right}
        </div>
      )}
      <div className={bodyClassName}>{children}</div>
    </section>
  );
}
