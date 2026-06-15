'use client';
import { Icon } from '@iconify/react';
import SearchResult_section from '@/components/pagesComponents/pageLayout/SearchResult_section.js';

/**
 * ServiceToolShell — the single shared chrome for every Easy Services tool.
 *
 * Each tool keeps its own state / validation / API logic; it just passes its
 * input fields (children), the result node, and the standard handlers. The
 * shell renders the themed form card + result card (landing theme: white/slate
 * cards, blue primary button) and the loading / empty / error states.
 *
 * Props:
 *   title          page title (shown in the section header)
 *   formTitle/formSubtitle/icon   form card heading
 *   children       the input fields
 *   onSearch()     submit handler (form onSubmit, preventDefault handled here)
 *   onClear()      reset handler
 *   onDownload()   optional — shows a PDF/Download button when canDownload
 *   loading        bool
 *   canDownload    bool (show download button)
 *   searchLabel    button label (default "Search")
 *   result         result node (truthy → rendered in the result card)
 *   empty          custom empty-state node (optional)
 *   error          string | node (optional)
 *   resultRef      ref forwarded to the result card (for react-to-print)
 */
export default function ServiceToolShell({
  title,
  formTitle,
  formSubtitle,
  icon = 'ph:magnifying-glass',
  children,
  onSearch,
  onClear,
  onDownload,
  loading = false,
  canDownload = false,
  searchLabel = 'Search',
  result,
  empty,
  error,
  resultRef,
}) {
  return (
    <SearchResult_section title={title}>
      {/* FORM CARD */}
      <li className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2.5 border-b border-slate-100 pb-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <Icon icon={icon} className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-sm font-bold text-slate-800">
              {formTitle || title}
            </h3>
            {formSubtitle && (
              <p className="text-xs text-slate-500">{formSubtitle}</p>
            )}
          </div>
        </div>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            onSearch?.(e);
          }}
        >
          {children}

          <div className="flex flex-wrap gap-2 pt-1">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-b-transparent" />
              ) : (
                <Icon icon="lucide:search" className="h-4 w-4" />
              )}
              {loading ? 'Searching…' : searchLabel}
            </button>
            <button
              type="button"
              onClick={onClear}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
            >
              <Icon icon="lucide:rotate-ccw" className="h-4 w-4" /> Clear
            </button>
            {onDownload && canDownload && (
              <button
                type="button"
                onClick={onDownload}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
              >
                <Icon icon="lucide:download" className="h-4 w-4" /> PDF
              </button>
            )}
          </div>
        </form>
      </li>

      {/* RESULT CARD */}
      <li className="lg:col-span-2">
        <div
          ref={resultRef}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
        >
          {loading ? (
            <div className="flex flex-col items-center justify-center py-14 text-center">
              <span className="mb-3 h-9 w-9 animate-spin rounded-full border-2 border-blue-500 border-b-transparent" />
              <p className="text-sm text-slate-500">Fetching details…</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-14 text-center">
              <Icon
                icon="ph:warning-circle"
                className="mb-3 h-10 w-10 text-rose-400"
              />
              <p className="text-sm font-medium text-rose-600">
                {typeof error === 'string' ? error : 'Something went wrong.'}
              </p>
            </div>
          ) : result ? (
            result
          ) : (
            empty || (
              <div className="flex flex-col items-center justify-center py-14 text-center">
                <Icon icon={icon} className="mb-3 h-10 w-10 text-slate-300" />
                <p className="text-sm text-slate-500">
                  Enter details and search to see results here.
                </p>
              </div>
            )
          )}
        </div>
      </li>
    </SearchResult_section>
  );
}

/** A labelled text input themed for the tool form. */
export function ToolInput({ label, hint, error, ...props }) {
  return (
    <div>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <input
        {...props}
        className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${
          error ? 'border-rose-400 bg-rose-50' : 'border-slate-300'
        } ${props.className || ''}`}
      />
      {error ? (
        <p className="mt-1 text-xs text-rose-600">{error}</p>
      ) : hint ? (
        <p className="mt-1 text-xs text-slate-400">{hint}</p>
      ) : null}
    </div>
  );
}

/** Result heading inside the result card. */
export function ResultHeader({ title, subtitle }) {
  return (
    <div className="mb-4 border-b border-slate-100 pb-3">
      <h2 className="text-base font-bold text-slate-800">{title}</h2>
      {subtitle && <p className="mt-0.5 text-sm text-slate-500">{subtitle}</p>}
    </div>
  );
}

/** Consistent label/value grid for detail results. items: [{label,value}] */
export function DetailGrid({ items = [] }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {items.map((d, i) => (
        <div
          key={i}
          className="rounded-lg border border-slate-200 bg-slate-50 p-3"
        >
          <p className="text-xs uppercase tracking-wide text-slate-400">
            {d.label}
          </p>
          <p className="mt-0.5 break-words text-sm font-semibold text-slate-800">
            {d.value ?? 'Not Available'}
          </p>
        </div>
      ))}
    </div>
  );
}
