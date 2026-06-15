export default function DashSection({
  title,
  titleRight,
  children,
  className = "",
}) {
  return (
    <section
      className={`
        w-full
        bg-white
        border border-gray-200
        rounded-md
        ${className}
      `}
    >
      <div className="flex items-center justify-between px-2 py-1 border-b">
        
        <h2 className="text-xs sm:text-sm font-medium text-gray-700 truncate">
          {title}
        </h2>

        {titleRight && (
          <span className="text-[10px] sm:text-xs text-gray-500">
            {titleRight}
          </span>
        )}

      </div>

      <div className="p-1.5">
        {children}
      </div>
    </section>
  );
}