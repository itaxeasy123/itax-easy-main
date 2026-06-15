export default function SearchResult_section(props) {
  const { title, subtitle, children } = props;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 border-l-4 border-blue-500 pl-4">
          <h2 className="text-xl font-bold capitalize leading-tight text-slate-800 sm:text-2xl">
            {title}
          </h2>
          {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
        </div>
        <ul className="grid grid-cols-1 gap-4 lg:grid-cols-3 [&>li:nth-child(even)]:max-h-screen [&>li:nth-child(even)]:overflow-y-auto">
          {children}
        </ul>
      </div>
    </div>
  );
}
