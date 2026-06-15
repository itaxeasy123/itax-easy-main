"use client";

export default function UserStats({ stats = [] }) {
  if (!Array.isArray(stats) || stats.length === 0) return null;

  return (
    <section className="my-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
