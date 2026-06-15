'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { Icon } from '@iconify/react';
import userbackAxios from '@/lib/userbackAxios';
import { DashPage, StatCard, StatusPill, Panel } from '@/components/dashboard/ui';
import Loader from '@/components/partials/loading/Loader';

const DURATIONS = ['Past 3 Months', 'Past 6 Months', 'Past Year', 'All Time'];

const durationMs = {
  'Past 3 Months': 3 * 30 * 24 * 60 * 60 * 1000,
  'Past 6 Months': 6 * 30 * 24 * 60 * 60 * 1000,
  'Past Year': 12 * 30 * 24 * 60 * 60 * 1000,
};

const money = (n) => `₹${Number(n || 0).toLocaleString('en-IN')}`;

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

function itemsOf(t) {
  return [
    ...(t.services || []).map((s) => ({ title: s.title, amount: s.price, type: 'Service' })),
    ...(t.registrationServices || []).map((s) => ({
      title: s.title,
      amount: s.price,
      type: 'Registration Service',
    })),
    ...(t.registrationStartup || []).map((s) => ({
      title: s.title,
      amount: s.priceWithGst ?? s.price,
      type: 'Startup Registration',
    })),
  ];
}

const TransactionHistory = () => {
  const [all, setAll] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [search, setSearch] = useState('');
  const [duration, setDuration] = useState('Past 3 Months');
  const [selectedId, setSelectedId] = useState(null);

  const fetchAll = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const { data } = await userbackAxios.get('/apis/subscription-user');
      const list = Array.isArray(data?.data)
        ? data.data.filter((t) => t.status === 'success')
        : [];
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
        if (now - new Date(t.createdAt).getTime() > durationMs[duration]) return false;
      }
      if (q) {
        const items = itemsOf(t).map((i) => i.title).join(' ');
        const hay = `${t.id} ${t.note || ''} ${items}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [all, search, duration]);

  const totalSpent = useMemo(
    () => all.reduce((s, t) => s + (Number(t.amountForServices) || 0), 0),
    [all],
  );

  const selected = all.find((t) => t.id === selectedId) || null;

  // ---------------- DETAIL (full page) ----------------
  if (selected) {
    const items = itemsOf(selected);
    const Row = ({ label, value }) => (
      <div className="flex items-start justify-between gap-4 py-2.5">
        <span className="text-sm text-slate-500">{label}</span>
        <span className="break-all text-right text-sm font-medium text-slate-800">
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
                Amount Paid
              </p>
              <p className="mt-1 text-3xl font-bold text-slate-800">
                {money(selected.amountForServices)}
              </p>
              <div className="mt-3 flex justify-center">
                <StatusPill status={selected.status} />
              </div>
            </div>
            <div className="mt-5 divide-y divide-slate-100 border-t border-slate-100 pt-2">
              <Row label="Date" value={formatDate(selected.createdAt)} />
              <Row label="Transaction ID" value={selected.id} />
              {selected.txnid && <Row label="Txn ID" value={selected.txnid} />}
              {selected.pid && <Row label="Payment ID" value={selected.pid} />}
              {selected.note && <Row label="Note" value={selected.note} />}
              <Row label="Payment Method" value="Online Payment" />
            </div>
          </Panel>

          {/* Items */}
          <div className="space-y-6 lg:col-span-2">
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
                      className="flex items-center justify-between gap-3 py-3"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-slate-800">
                          {it.title}
                        </p>
                        <p className="text-xs text-slate-400">{it.type}</p>
                      </div>
                      <span className="shrink-0 text-sm font-semibold text-slate-700">
                        {money(it.amount)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="text-sm font-semibold text-slate-600">
                  Total Paid
                </span>
                <span className="text-lg font-bold text-slate-900">
                  {money(selected.amountForServices)}
                </span>
              </div>
            </Panel>
          </div>
        </div>
      </DashPage>
    );
  }

  // ---------------- LIST ----------------
  return (
    <DashPage
      title="Transaction History"
      subtitle="Your successful payments"
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
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Total Transactions" value={all.length} icon="ph:receipt" />
        <StatCard
          label="Total Spent"
          value={money(totalSpent)}
          icon="ph:currency-inr"
          tone="emerald"
        />
        <StatCard
          label="Showing"
          value={filtered.length}
          sub={duration}
          icon="ph:funnel"
          tone="violet"
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
            placeholder="Search by transaction id, note, or item"
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
      </div>

      {/* Table */}
      <Panel bodyClassName="">
        {isLoading ? (
          <div className="flex justify-center py-16">
            <Loader />
          </div>
        ) : isError ? (
          <div className="py-14 text-center text-rose-600">
            Failed to load transactions.
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center">
            <Icon
              icon="ph:receipt"
              className="mx-auto mb-3 h-10 w-10 text-slate-300"
            />
            <p className="text-slate-500">
              {search
                ? 'No transactions match your search.'
                : 'No transactions in this period.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-left text-slate-500">
                  <th className="px-4 py-3 font-medium">Items</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium text-right">Amount</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((t) => {
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
                        <p className="max-w-xs truncate font-medium text-slate-800">
                          {label}
                        </p>
                        <p className="font-mono text-xs text-slate-400">#{t.id}</p>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-slate-500">
                        {formatDate(t.createdAt)}
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-slate-800">
                        {money(t.amountForServices)}
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

export default TransactionHistory;
