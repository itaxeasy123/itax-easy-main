'use client';
import { useMemo, useState } from 'react';
import { Icon } from '@iconify/react';

/**
 * CalculatorShell — the single, shared layout for EVERY financial calculator.
 *
 * A calculator becomes a tiny config: a list of input `fields` + a pure
 * `compute(values)` function that returns what to show. The shell owns all
 * styling (landing-page theme: white/slate canvas, blue accents) and state,
 * so all calculators look and behave identically.
 *
 * compute(values) returns:
 *   {
 *     highlight: { label, value, format },        // big primary result (optional)
 *     rows:      [{ label, value, format, strong }],
 *     table:     { columns: [...], rows: [[...]] }, // optional schedule/breakdown
 *     note:      'string',                          // optional footnote
 *   }
 *
 * Field: { name, label, type:'number'|'select'|'checkbox'|'text',
 *          prefix, suffix, options:[{label,value}], default, min, max, step,
 *          placeholder, hint, show:(values)=>bool }
 *
 * format: 'currency' | 'currency2' | 'percent' | 'number' | undefined(raw)
 */

const inr = (v) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(v) || 0);

const inr2 = (v) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(v) || 0);

export const formatValue = (value, format) => {
  switch (format) {
    case 'currency':
      return inr(value);
    case 'currency2':
      return inr2(value);
    case 'percent':
      return `${Number(value) || 0}%`;
    case 'number':
      return new Intl.NumberFormat('en-IN').format(Number(value) || 0);
    default:
      return value === undefined || value === null || value === '' ? '—' : value;
  }
};

function buildDefaults(fields) {
  const o = {};
  for (const f of fields) {
    o[f.name] = f.default ?? (f.type === 'checkbox' ? false : '');
  }
  return o;
}

function Field({ field, value, onChange }) {
  const base =
    'w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100';

  if (field.type === 'select') {
    return (
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">
          {field.label}
        </label>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={base}
        >
          {(field.options || []).map((o) => (
            <option key={String(o.value)} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        {field.hint && <p className="mt-1 text-xs text-slate-400">{field.hint}</p>}
      </div>
    );
  }

  if (field.type === 'checkbox') {
    return (
      <label className="flex cursor-pointer items-center gap-2.5">
        <input
          type="checkbox"
          checked={!!value}
          onChange={(e) => onChange(e.target.checked)}
          className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
        />
        <span className="text-sm font-medium text-slate-700">{field.label}</span>
      </label>
    );
  }

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700">
        {field.label}
      </label>
      <div className="flex items-stretch">
        {field.prefix && (
          <span className="inline-flex items-center rounded-l-lg border border-r-0 border-slate-300 bg-slate-50 px-3 text-sm font-medium text-slate-500">
            {field.prefix}
          </span>
        )}
        <input
          type={field.type === 'text' ? 'text' : 'number'}
          inputMode={field.type === 'text' ? undefined : 'decimal'}
          value={value}
          placeholder={field.placeholder ?? ''}
          min={field.min}
          max={field.max}
          step={field.step}
          onChange={(e) => onChange(e.target.value)}
          className={`${base} ${field.prefix ? 'rounded-l-none' : ''} ${
            field.suffix ? 'rounded-r-none' : ''
          }`}
        />
        {field.suffix && (
          <span className="inline-flex items-center rounded-r-lg border border-l-0 border-slate-300 bg-slate-50 px-3 text-sm font-medium text-slate-500">
            {field.suffix}
          </span>
        )}
      </div>
      {field.hint && <p className="mt-1 text-xs text-slate-400">{field.hint}</p>}
    </div>
  );
}

export default function CalculatorShell({
  title,
  subtitle,
  icon = 'ph:calculator',
  fields = [],
  compute,
}) {
  const [values, setValues] = useState(() => buildDefaults(fields));
  const set = (name, v) => setValues((p) => ({ ...p, [name]: v }));

  const out = useMemo(() => {
    try {
      return compute ? compute(values) || {} : {};
    } catch {
      return {};
    }
  }, [values, compute]);

  const visibleFields = fields.filter((f) => (f.show ? f.show(values) : true));
  const rows = out.rows || [];
  const { highlight, table } = out;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto w-full max-w-5xl">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-100 bg-blue-50">
            <Icon icon={icon} className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
              {title}
            </h1>
            {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Inputs */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-400">
              Enter details
            </h2>
            <div className="space-y-4">
              {visibleFields.map((f) => (
                <Field
                  key={f.name}
                  field={f}
                  value={values[f.name]}
                  onChange={(v) => set(f.name, v)}
                />
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-400">
              Results
            </h2>

            {highlight && (
              <div className="mb-4 rounded-xl bg-blue-600 px-5 py-4 text-white">
                <p className="text-xs font-medium uppercase tracking-wide text-blue-100">
                  {highlight.label}
                </p>
                <p className="mt-1 text-2xl font-bold">
                  {formatValue(highlight.value, highlight.format)}
                </p>
              </div>
            )}

            <div className="divide-y divide-slate-100">
              {rows.map((r, i) => (
                <div key={i} className="flex items-center justify-between py-2.5">
                  <span className="text-sm text-slate-500">{r.label}</span>
                  <span
                    className={`text-sm font-semibold ${
                      r.strong ? 'text-blue-600' : 'text-slate-800'
                    }`}
                  >
                    {formatValue(r.value, r.format)}
                  </span>
                </div>
              ))}
            </div>

            {out.note && (
              <p className="mt-4 text-xs text-slate-400">{out.note}</p>
            )}

            {table && (
              <div className="mt-5 overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-left text-slate-500">
                      {table.columns.map((c, i) => (
                        <th key={i} className="px-3 py-2 font-medium">
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {table.rows.map((row, ri) => (
                      <tr
                        key={ri}
                        className="border-b border-slate-100 last:border-0"
                      >
                        {row.map((cell, ci) => (
                          <td key={ci} className="px-3 py-2 text-slate-700">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
