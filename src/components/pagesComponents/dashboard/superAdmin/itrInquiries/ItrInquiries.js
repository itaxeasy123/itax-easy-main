'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Icon } from '@iconify/react';
import { toast } from 'react-toastify';
import userbackAxios from '@/lib/userbackAxios';
import { DashPage, StatCard, StatusPill, Panel } from '@/components/dashboard/ui';

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return '';
  }
}

const SuperAdminItrInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [amountInput, setAmountInput] = useState('');
  const [busy, setBusy] = useState(false);

  const load = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const { data } = await userbackAxios.get('/itrinquiry/all');
      setInquiries(Array.isArray(data?.data) ? data.data : []);
    } catch (err) {
      console.error('Failed to load ITR inquiries', err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const stats = useMemo(() => {
    const by = (s) => inquiries.filter((i) => i.status === s).length;
    return {
      total: inquiries.length,
      pending: by('pending'),
      approved: by('approved'),
      paid: by('paid'),
    };
  }, [inquiries]);

  const selected = inquiries.find((i) => i.id === selectedId) || null;

  const openDetail = (inq) => {
    setSelectedId(inq.id);
    setAmountInput(inq.amount ? String(inq.amount) : '');
  };

  const approve = async () => {
    const amount = Number(amountInput);
    if (!Number.isFinite(amount) || amount <= 0) {
      toast.error('Enter a valid amount first');
      return;
    }
    setBusy(true);
    try {
      await userbackAxios.post(`/itrinquiry/${selectedId}/approve`, { amount });
      toast.success('Approved — amount sent to the user');
      await load();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Approve failed');
    } finally {
      setBusy(false);
    }
  };

  const reject = async () => {
    setBusy(true);
    try {
      await userbackAxios.post(`/itrinquiry/${selectedId}/reject`);
      toast.success('Request declined');
      await load();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Decline failed');
    } finally {
      setBusy(false);
    }
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return inquiries;
    return inquiries.filter((inq) => {
      const u = inq.user || {};
      return (
        inq.name?.toLowerCase().includes(q) ||
        inq.phone?.toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q) ||
        inq.aadhaarNumber?.toLowerCase().includes(q)
      );
    });
  }, [inquiries, search]);

  // ---------------- DETAIL (full page) ----------------
  if (selected) {
    const u = selected.user || {};
    const DocCard = ({ url, label }) => (
      <div className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
        <span className="text-sm font-medium text-slate-700">{label}</span>
        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-md border border-blue-200 px-3 py-1.5 text-xs font-medium text-blue-600 transition-colors hover:bg-blue-600 hover:text-white"
          >
            <Icon icon="lucide:eye" className="h-4 w-4" /> View
          </a>
        ) : (
          <span className="text-xs text-slate-400">Not provided</span>
        )}
      </div>
    );
    const Field = ({ label, value }) => (
      <div>
        <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
        <p className="mt-0.5 text-sm text-slate-800">{value || '—'}</p>
      </div>
    );

    return (
      <DashPage
        title="ITR Request Detail"
        subtitle={`Request #${selected.id} · ${formatDate(selected.createdAt)}`}
        icon="mdi:file-account-outline"
        actions={
          <button
            onClick={() => setSelectedId(null)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <Icon icon="lucide:arrow-left" className="h-4 w-4" /> Back
          </button>
        }
      >
        <div className="mx-auto max-w-3xl space-y-6">
          <Panel bodyClassName="p-5">
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4">
              <h2 className="text-lg font-bold text-slate-800">{selected.name}</h2>
              <StatusPill
                status={selected.status}
                extra={
                  selected.amount
                    ? `₹${Number(selected.amount).toLocaleString('en-IN')}`
                    : ''
                }
              />
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="Phone" value={selected.phone} />
              <Field label="Email" value={u.email} />
              <Field label="Aadhaar Number" value={selected.aadhaarNumber} />
              <Field label="Submitted" value={formatDate(selected.createdAt)} />
              <div className="sm:col-span-2">
                <Field label="Description" value={selected.description} />
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href={`tel:${selected.phone}`}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
              >
                <Icon icon="lucide:phone" className="h-4 w-4" /> Call
              </a>
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

          <Panel title="Documents" bodyClassName="p-5">
            <div className="grid gap-3 sm:grid-cols-3">
              <DocCard url={selected.aadhaarUrl} label="Aadhaar" />
              <DocCard url={selected.panUrl} label="PAN Card" />
              <DocCard url={selected.otherDocUrl} label="Other Doc" />
            </div>
          </Panel>

          {(selected.status === 'pending' || selected.status === 'approved') && (
            <Panel title="Set fee & decision" bodyClassName="p-5">
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    ₹
                  </span>
                  <input
                    type="number"
                    min="1"
                    placeholder="Amount"
                    value={amountInput}
                    onChange={(e) => setAmountInput(e.target.value)}
                    className="w-36 rounded-lg border border-slate-300 py-2 pl-6 pr-2 text-sm outline-none focus:border-blue-500"
                  />
                </div>
                <button
                  onClick={approve}
                  disabled={busy}
                  className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
                >
                  <Icon icon="lucide:check" className="h-4 w-4" />
                  {selected.status === 'approved' ? 'Update Amount' : 'Approve'}
                </button>
                <button
                  onClick={reject}
                  disabled={busy}
                  className="inline-flex items-center gap-1 rounded-lg border border-rose-200 bg-white px-4 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50 disabled:opacity-60"
                >
                  <Icon icon="lucide:x" className="h-4 w-4" /> Decline
                </button>
              </div>
            </Panel>
          )}
        </div>
      </DashPage>
    );
  }

  // ---------------- LIST ----------------
  return (
    <DashPage
      title="ITR Filing Requests"
      subtitle="Review requests, contact users, approve or decline"
      icon="mdi:file-account-outline"
    >
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total" value={stats.total} icon="mdi:file-account-outline" />
        <StatCard label="Pending" value={stats.pending} icon="ph:clock" tone="amber" />
        <StatCard label="Approved" value={stats.approved} icon="ph:check-circle" tone="blue" />
        <StatCard label="Paid" value={stats.paid} icon="ph:currency-inr" tone="emerald" />
      </div>

      <div className="mb-4 relative max-w-md">
        <Icon
          icon="lucide:search"
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
        />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, phone, email, Aadhaar"
          className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-400"
        />
      </div>

      <Panel bodyClassName="">
        {isLoading ? (
          <div className="flex justify-center py-16">
            <span className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-blue-500 border-b-transparent" />
          </div>
        ) : isError ? (
          <div className="py-14 text-center text-rose-600">
            Failed to load requests.
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-14 text-center text-slate-500">No requests found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-left text-slate-500">
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Phone</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((inq) => (
                  <tr
                    key={inq.id}
                    onClick={() => openDetail(inq)}
                    className="cursor-pointer border-b border-slate-50 last:border-0 hover:bg-blue-50/40"
                  >
                    <td className="px-4 py-3 font-semibold text-slate-800">
                      {inq.name}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{inq.phone}</td>
                    <td className="px-4 py-3 text-slate-600">
                      {inq.user?.email || '—'}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-slate-500">
                      {formatDate(inq.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <StatusPill
                        status={inq.status}
                        extra={
                          inq.amount
                            ? `₹${Number(inq.amount).toLocaleString('en-IN')}`
                            : ''
                        }
                      />
                    </td>
                    <td className="px-4 py-3 text-right text-slate-300">
                      <Icon icon="lucide:chevron-right" className="inline-block h-4 w-4" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>
    </DashPage>
  );
};

export default SuperAdminItrInquiries;
