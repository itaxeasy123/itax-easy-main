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
    return new Date(iso).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return '';
  }
}

function itemsOf(o) {
  return [
    ...(o.services || []).map((s) => ({ title: s.title, amount: s.price, type: 'Service' })),
    ...(o.registrationServices || []).map((s) => ({
      title: s.title,
      amount: s.price,
      type: 'Registration Service',
    })),
    ...(o.registrationStartup || []).map((s) => ({
      title: s.title,
      amount: s.priceWithGst ?? s.price,
      type: 'Startup Registration',
    })),
  ];
}

const OrderHistory = () => {
  const [all, setAll] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [search, setSearch] = useState('');
  const [duration, setDuration] = useState('Past 3 Months');
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const fetchAll = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const { data } = await userbackAxios.get('/apis/subscription-user');
      const list = Array.isArray(data?.data) ? [...data.data] : [];
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setAll(list);
    } catch (err) {
      console.error('Error fetching order data:', err);
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
    return all.filter((o) => {
      if (duration !== 'All Time') {
        if (now - new Date(o.createdAt).getTime() > durationMs[duration]) return false;
      }
      if (q) {
        const items = itemsOf(o).map((i) => i.title).join(' ');
        const hay = `${o.id} ${o.note || ''} ${items}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [all, search, duration]);

  const totalValue = useMemo(
    () => all.reduce((s, o) => s + (Number(o.amountForServices) || 0), 0),
    [all],
  );

  const selectedOrder = all.find((o) => o.id === selectedOrderId) || null;

  if (selectedOrder) {
    return (
      <Invoice
        order={selectedOrder}
        onBack={() => setSelectedOrderId(null)}
      />
    );
  }

  // ---------------- LIST ----------------
  return (
    <DashPage
      title="Order History"
      subtitle="All your orders and invoices"
      icon="ph:bag"
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
        <StatCard label="Total Orders" value={all.length} icon="ph:bag" />
        <StatCard
          label="Total Value"
          value={money(totalValue)}
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
            placeholder="Search by order id, note, or item"
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
            Failed to load orders.
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center">
            <Icon icon="ph:bag" className="mx-auto mb-3 h-10 w-10 text-slate-300" />
            <p className="text-slate-500">
              {search
                ? 'No orders match your search.'
                : 'No orders in this period.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-left text-slate-500">
                  <th className="px-4 py-3 font-medium">Order</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium text-right">Amount</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((o) => {
                  const items = itemsOf(o);
                  const label =
                    items.map((i) => i.title).join(', ') || o.note || 'Order';
                  return (
                    <tr
                      key={o.id}
                      onClick={() => setSelectedOrderId(o.id)}
                      className="cursor-pointer border-b border-slate-50 last:border-0 hover:bg-blue-50/40"
                    >
                      <td className="px-4 py-3">
                        <p className="max-w-xs truncate font-medium text-slate-800">
                          {label}
                        </p>
                        <p className="font-mono text-xs text-slate-400">#{o.id}</p>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-slate-500">
                        {formatDate(o.createdAt)}
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-slate-800">
                        {money(o.amountForServices)}
                      </td>
                      <td className="px-4 py-3">
                        <StatusPill status={o.status} />
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

// ---------------- DETAIL (full invoice page) ----------------
// Accepts either a resolved `order` object (Order History list) or an
// `orderId` + `responseData` pair (user dashboard overview) — resolves both.
export const Invoice = ({ order: orderProp, orderId, responseData, onBack }) => {
  const order =
    orderProp || responseData?.data?.find((o) => o.id === orderId) || null;

  if (!order) {
    return (
      <DashPage title="Invoice" icon="ph:receipt">
        <Panel bodyClassName="p-6 md:p-10 text-center">
          <p className="text-slate-500">Order not found.</p>
          <button
            onClick={onBack}
            className="mt-4 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Back to Orders
          </button>
        </Panel>
      </DashPage>
    );
  }

  const { id, createdAt, status, amountForServices } = order;
  const items = itemsOf(order);

  const handlePrint = () => {
    const node = document.getElementById('tobeprint');
    if (!node) return;
    const printContent = node.innerHTML;
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  const handleDownload = () => {
    const node = document.getElementById('tobeprint');
    if (!node) return;
    const printContent = node.outerHTML;
    const styles = Array.from(document.styleSheets)
      .map((styleSheet) => {
        try {
          return Array.from(styleSheet.cssRules)
            .map((rule) => rule.cssText)
            .join('\n');
        } catch {
          return '';
        }
      })
      .join('\n');

    const fullDocument = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Invoice ${id}</title><style>${styles}</style></head><body>${printContent}</body></html>`;

    const file = new Blob([fullDocument], { type: 'text/html' });
    const element = document.createElement('a');
    element.href = URL.createObjectURL(file);
    element.download = `invoice-${id}.html`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <DashPage
      title="Invoice"
      subtitle={`Order #${id}`}
      icon="ph:receipt"
      actions={
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <Icon icon="lucide:arrow-left" className="h-4 w-4" /> Back
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <Icon icon="lucide:printer" className="h-4 w-4" /> Print
          </button>
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <Icon icon="lucide:download" className="h-4 w-4" /> Download
          </button>
        </div>
      }
    >
      <div
        id="tobeprint"
        className="mx-auto max-w-3xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
      >
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">INVOICE</h2>
            <p className="mt-1 text-sm text-slate-500">iTaxEasy</p>
          </div>
          <div className="text-right">
            <StatusPill status={status} />
            <p className="mt-2 text-xs text-slate-400">
              Generated on {formatDate(createdAt)}
            </p>
          </div>
        </div>

        {/* Meta */}
        <div className="grid gap-4 py-6 sm:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Order ID
            </p>
            <p className="mt-1 break-all font-mono text-sm text-slate-700">{id}</p>
          </div>
          <div className="sm:text-right">
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Order Date
            </p>
            <p className="mt-1 text-sm text-slate-700">{formatDate(createdAt)}</p>
          </div>
        </div>

        {/* Items */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-y border-slate-200 text-left text-slate-500">
                <th className="py-3 pr-4 font-medium">Description</th>
                <th className="px-4 py-3 text-center font-medium">Qty</th>
                <th className="py-3 pl-4 text-right font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-6 text-center text-slate-400">
                    {order.note || 'No itemised services for this order.'}
                  </td>
                </tr>
              ) : (
                items.map((it, i) => (
                  <tr key={i} className="border-b border-slate-100">
                    <td className="py-3 pr-4">
                      <p className="font-medium text-slate-800">{it.title}</p>
                      <p className="text-xs text-slate-400">{it.type}</p>
                    </td>
                    <td className="px-4 py-3 text-center text-slate-600">1</td>
                    <td className="py-3 pl-4 text-right font-medium text-slate-800">
                      {money(it.amount)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="mt-6 flex justify-end">
          <div className="w-full max-w-xs space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Subtotal (incl. GST)</span>
              <span className="font-medium text-slate-700">
                {money(amountForServices)}
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-slate-200 pt-3">
              <span className="text-base font-bold text-slate-800">Total</span>
              <span className="text-xl font-bold text-blue-600">
                {money(amountForServices)}
              </span>
            </div>
          </div>
        </div>

        <p className="mt-8 border-t border-slate-100 pt-6 text-center text-sm text-slate-400">
          Thank you for your business!
        </p>
      </div>
    </DashPage>
  );
};

export default OrderHistory;
