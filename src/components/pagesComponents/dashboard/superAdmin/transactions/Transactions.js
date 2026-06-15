'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { Icon } from '@iconify/react';
import userbackAxios from '@/lib/userbackAxios';
import { DashPage, StatCard, StatusPill, Panel } from '@/components/dashboard/ui';

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  } catch {
    return '';
  }
}

const DURATIONS = ['Past 3 Months', 'Past 6 Months', 'Past Year', 'All Time'];
const STATUSES = ['All Status', 'success', 'pending', 'failure'];

const durationMs = {
  'Past 3 Months': 3 * 30 * 24 * 60 * 60 * 1000,
  'Past 6 Months': 6 * 30 * 24 * 60 * 60 * 1000,
  'Past Year': 12 * 30 * 24 * 60 * 60 * 1000,
};

function itemsOf(txn) {
  return [
    ...(txn.services || []),
    ...(txn.registrationServices || []),
    ...(txn.registrationStartup || []),
  ];
}

const SuperAdminTransactionHistory = () => {
  const [all, setAll] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [search, setSearch] = useState('');
  const [duration, setDuration] = useState('All Time');
  const [status, setStatus] = useState('All Status');
  const [selectedId, setSelectedId] = useState(null);

  const fetchAll = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const { data } = await userbackAxios.get('/apis/get-all-subscriptions');
      const list = Array.isArray(data?.subscriptions) ? data.subscriptions : [];
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setAll(list);
    } catch (err) {
      console.error('Error fetching transactions:', err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const filtered = useMemo(() => {
    const now = Date.now();
    const q = search.trim().toLowerCase();
    return all.filter((t) => {
      if (duration !== 'All Time') {
        const within = now - new Date(t.createdAt).getTime() <= durationMs[duration];
        if (!within) return false;
      }
      if (status !== 'All Status' && t.status !== status) return false;
      if (q) {
        const u = t.user || {};
        const hay = `${u.firstName || ''} ${u.lastName || ''} ${u.email || ''} ${u.phone || ''} ${t.note || ''} ${t.txnid || ''}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [all, search, duration, status]);

  const stats = useMemo(() => {
    const revenue = filtered.reduce(
      (s, t) => s + (Number(t.amountForServices) || 0),
      0,
    );
    const success = filtered.filter((t) => t.status === 'success').length;
    return {
      count: filtered.length,
      revenue,
      success,
      pending: filtered.length - success,
    };
  }, [filtered]);

  const selected = all.find((t) => t.id === selectedId) || null;

  // ---------------- DETAIL (full page) ----------------
  if (selected) {
    const u = selected.user || {};
    const items = itemsOf(selected);
    const Row = ({ label, value }) => (
      <div className="flex items-start justify-between gap-4 py-2.5">
        <span className="text-sm text-slate-500">{label}</span>
        <span className="text-sm font-medium text-slate-800 text-right">
          {value || '—'}
        </span>
      </div>
    );
    return (
      <DashPage
        title="Transaction Detail"
        subtitle={`Transaction #${selected.id}`}
        icon="ph:receipt"
        actions={
          <button
            onClick={() => setSelectedId(null)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <Icon icon="lucide:arrow-left" className="h-4 w-4" /> Back
          </button>
        }
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Summary */}
          <Panel className="lg:col-span-1" bodyClassName="p-5">
            <div className="text-center">
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Amount
              </p>
              <p className="mt-1 text-3xl font-bold text-slate-800">
                ₹{Number(selected.amountForServices || 0).toLocaleString('en-IN')}
              </p>
              <div className="mt-3 flex justify-center">
                <StatusPill status={selected.status} />
              </div>
            </div>
            <div className="mt-5 divide-y divide-slate-100 border-t border-slate-100 pt-2">
              <Row label="Date" value={formatDate(selected.createdAt)} />
              <Row label="Txn ID" value={selected.txnid} />
              <Row label="Payment ID" value={selected.pid} />
              {selected.note && <Row label="Note" value={selected.note} />}
            </div>
          </Panel>

          {/* Customer + items */}
          <div className="space-y-6 lg:col-span-2">
            <Panel title="Customer" bodyClassName="p-5">
              <div className="divide-y divide-slate-100">
                <Row
                  label="Name"
                  value={`${u.firstName || ''} ${u.lastName || ''}`.trim()}
                />
                <Row label="Email" value={u.email} />
                <Row label="Phone" value={u.phone} />
              </div>
              <div className="mt-4 flex gap-2">
                {u.phone && (
                  <a
                    href={`tel:${u.phone}`}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    <Icon icon="lucide:phone" className="h-4 w-4" /> Call
                  </a>
                )}
                {u.email && (
                  <a
                    href={`mailto:${u.email}`}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    <Icon icon="lucide:mail" className="h-4 w-4" /> Email
                  </a>
                )}
              </div>
            </Panel>

            <Panel title={`Items (${items.length})`} bodyClassName="p-5">
              {items.length === 0 ? (
                <p className="text-sm text-slate-500">
                  {selected.note || 'No itemised services for this payment.'}
                </p>
              ) : (
                <ul className="divide-y divide-slate-100">
                  {items.map((it, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-between py-2.5"
                    >
                      <span className="text-sm text-slate-700">{it.title}</span>
                      <span className="text-sm font-medium text-slate-800">
                        ₹{Number(it.price || it.priceWithGst || 0).toLocaleString('en-IN')}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </Panel>
          </div>
        </div>
      </DashPage>
    );
  }

  // ---------------- LIST ----------------
  return (
    <DashPage
      title="Transactions"
      subtitle="All payments across the platform"
      icon="ph:receipt"
      actions={
        <button
          onClick={fetchAll}
          disabled={isLoading}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-60"
        >
          <Icon
            icon="lucide:refresh-cw"
            className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`}
          />
          Refresh
        </button>
      }
    >
      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Transactions" value={stats.count} icon="ph:receipt" />
        <StatCard
          label="Revenue"
          value={`₹${stats.revenue.toLocaleString('en-IN')}`}
          icon="ph:currency-inr"
          tone="emerald"
        />
        <StatCard
          label="Successful"
          value={stats.success}
          icon="ph:check-circle"
          tone="emerald"
        />
        <StatCard
          label="Pending"
          value={stats.pending}
          icon="ph:clock"
          tone="amber"
        />
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Icon
            icon="lucide:search"
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by customer, note, or txn id"
            className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-400"
          />
        </div>
        <select
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400"
        >
          {DURATIONS.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm capitalize outline-none focus:border-blue-400"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s} className="capitalize">
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <Panel bodyClassName="">
        {isLoading ? (
          <div className="flex justify-center py-16">
            <span className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-blue-500 border-b-transparent" />
          </div>
        ) : isError ? (
          <div className="py-14 text-center text-rose-600">
            Failed to load transactions.
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-14 text-center text-slate-500">
            No transactions found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-left text-slate-500">
                  <th className="px-4 py-3 font-medium">Customer</th>
                  <th className="px-4 py-3 font-medium">Details</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium text-right">Amount</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((t) => {
                  const u = t.user || {};
                  const items = itemsOf(t);
                  const label =
                    items.map((i) => i.title).join(', ') || t.note || 'Payment';
                  return (
                    <tr
                      key={t.id}
                      onClick={() => setSelectedId(t.id)}
                      className="cursor-pointer border-b border-slate-50 last:border-0 hover:bg-blue-50/40"
                    >
                      <td className="px-4 py-3">
                        <p className="font-semibold text-slate-800">
                          {`${u.firstName || ''} ${u.lastName || ''}`.trim() ||
                            'Unknown'}
                        </p>
                        <p className="text-xs text-slate-400">{u.email}</p>
                      </td>
                      <td className="max-w-xs truncate px-4 py-3 text-slate-600">
                        {label}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-slate-500">
                        {formatDate(t.createdAt)}
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-slate-800">
                        ₹{Number(t.amountForServices || 0).toLocaleString('en-IN')}
                      </td>
                      <td className="px-4 py-3">
                        <StatusPill status={t.status} />
                      </td>
                      <td className="px-4 py-3 text-right text-slate-300">
                        <Icon
                          icon="lucide:chevron-right"
                          className="inline-block h-4 w-4"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Panel>
    </DashPage>
  );
};

export default SuperAdminTransactionHistory;
