'use client';
import { Icon } from '@iconify/react';

/**
 * Standard dashboard page shell: light slate canvas + a consistent header
 * (icon, title, subtitle, right-aligned actions). Used by every dashboard view
 * so the whole dashboard looks the same.
 */
export default function DashPage({ title, subtitle, icon, actions, children }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-6">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-100 bg-blue-50">
                <Icon icon={icon} className="h-6 w-6 text-blue-600" />
              </div>
            )}
            <div>
              <h1 className="text-xl font-bold text-slate-800 sm:text-2xl">
                {title}
              </h1>
              {subtitle && (
                <p className="text-sm text-slate-500">{subtitle}</p>
              )}
            </div>
          </div>
          {actions && (
            <div className="flex items-center gap-2">{actions}</div>
          )}
        </div>

        {children}
      </div>
    </div>
  );
}
