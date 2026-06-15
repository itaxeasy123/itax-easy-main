'use client';

import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { toast } from 'react-toastify';
import userbackAxios from '@/lib/userbackAxios';
import { initializeRazorpay } from '@/utils/razorpay';
import { DashPage, Panel, StatusPill } from '@/components/dashboard/ui';

export default function ItrFilingInquiry() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    aadhaarNumber: '',
    description: '',
  });
  const [files, setFiles] = useState({ aadhaar: null, pan: null, otherDoc: null });
  const [submitting, setSubmitting] = useState(false);
  const [inquiries, setInquiries] = useState([]);
  const [payingId, setPayingId] = useState(null);

  const loadInquiries = async () => {
    try {
      const { data } = await userbackAxios.get('/itrinquiry/my');
      if (Array.isArray(data?.data)) setInquiries(data.data);
    } catch (err) {
      console.error('Failed to load inquiries', err);
    }
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast.error('Name and phone are required');
      return;
    }
    if (!files.aadhaar || !files.pan) {
      toast.error('Please attach the Aadhaar and PAN photos');
      return;
    }

    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('name', form.name);
      fd.append('phone', form.phone);
      fd.append('aadhaarNumber', form.aadhaarNumber);
      fd.append('description', form.description);
      fd.append('aadhaar', files.aadhaar);
      fd.append('pan', files.pan);
      if (files.otherDoc) fd.append('otherDoc', files.otherDoc);

      await userbackAxios.post('/itrinquiry/submit', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Inquiry sent. Our team will contact you shortly.');
      setForm({ name: '', phone: '', aadhaarNumber: '', description: '' });
      setFiles({ aadhaar: null, pan: null, otherDoc: null });
      e.target.reset();
      loadInquiries();
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || 'Failed to send inquiry');
    } finally {
      setSubmitting(false);
    }
  };

  const handlePay = async (inquiry) => {
    setPayingId(inquiry.id);
    try {
      const { data } = await userbackAxios.post(`/itrinquiry/${inquiry.id}/pay`);
      const order = data?.order;
      if (!order?.id) throw new Error('Order not created');

      const ok = await initializeRazorpay();
      if (!ok || !window.Razorpay) {
        toast.error('Payment SDK failed to load');
        return;
      }

      const rzp = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency || 'INR',
        name: 'iTaxEasy',
        description: `ITR Filing — ${inquiry.name}`,
        order_id: order.id,
        prefill: { name: inquiry.name, contact: inquiry.phone },
        theme: { color: '#2563EB' },
        handler: async () => {
          try {
            await userbackAxios.post(`/itrinquiry/${inquiry.id}/paid`);
            toast.success('Payment successful');
            loadInquiries();
          } catch {
            toast.info('Payment received; updating status shortly.');
            loadInquiries();
          }
        },
      });
      rzp.open();
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || 'Could not start payment');
    } finally {
      setPayingId(null);
    }
  };

  const fileLabel = (f) => (f ? f.name : 'Choose file');

  return (
    <DashPage
      title="File Your ITR"
      subtitle="Share your details & documents — our team reviews, shares the fee, and files it for you"
      icon="mdi:file-account-outline"
    >
      <div className="grid gap-6 lg:grid-cols-3">
      {/* Inquiry form */}
      <Panel title="New Filing Request" className="lg:col-span-2" bodyClassName="p-5">
        <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-slate-700">Name *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-blue-500"
              placeholder="Full name"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Phone *</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-blue-500"
              placeholder="Mobile number"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-sm font-medium text-slate-700">
              Aadhaar Number
            </label>
            <input
              type="text"
              value={form.aadhaarNumber}
              onChange={(e) =>
                setForm({ ...form, aadhaarNumber: e.target.value })
              }
              className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-blue-500"
              placeholder="12-digit Aadhaar number"
            />
          </div>

          {[
            { key: 'aadhaar', label: 'Aadhaar Photo *', accept: 'image/*,application/pdf' },
            { key: 'pan', label: 'PAN Card Photo *', accept: 'image/*,application/pdf' },
            { key: 'otherDoc', label: 'Other Document (optional)', accept: 'image/*,application/pdf' },
          ].map((f) => (
            <div key={f.key}>
              <label className="text-sm font-medium text-slate-700">{f.label}</label>
              <label className="flex items-center gap-2 mt-1 px-3 py-2 border border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-blue-400 text-sm text-slate-600">
                <Icon icon="lucide:upload" className="w-4 h-4 text-blue-500" />
                <span className="truncate">{fileLabel(files[f.key])}</span>
                <input
                  type="file"
                  accept={f.accept}
                  className="hidden"
                  onChange={(e) =>
                    setFiles({ ...files, [f.key]: e.target.files?.[0] || null })
                  }
                />
              </label>
            </div>
          ))}

          <div className="sm:col-span-2">
            <label className="text-sm font-medium text-slate-700">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-blue-500"
              placeholder="Tell us about your filing requirement"
            />
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg disabled:opacity-60"
            >
              {submitting ? (
                <span className="inline-block w-4 h-4 border-2 border-white border-b-transparent rounded-full animate-spin" />
              ) : (
                <Icon icon="lucide:send" className="w-4 h-4" />
              )}
              Send
            </button>
          </div>
        </form>
      </Panel>

      {/* My inquiries */}
      <Panel title="My ITR Requests" bodyClassName="p-5">
        {inquiries.length === 0 ? (
          <p className="text-sm text-slate-500 py-6 text-center">
            You haven&apos;t submitted any ITR filing requests yet.
          </p>
        ) : (
          <div className="space-y-3">
            {inquiries.map((inq) => (
              <div
                key={inq.id}
                className="flex flex-wrap items-center gap-3 p-3 border border-slate-200 rounded-lg"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800">{inq.name}</p>
                  <p className="text-xs text-slate-500">
                    {inq.description || 'ITR filing request'}
                  </p>
                </div>
                {inq.amount ? (
                  <span className="text-sm font-semibold text-slate-700">
                    ₹{Number(inq.amount).toLocaleString('en-IN')}
                  </span>
                ) : null}
                <StatusPill status={inq.status} />
                {inq.status === 'approved' && (
                  <button
                    onClick={() => handlePay(inq)}
                    disabled={payingId === inq.id}
                    className="inline-flex items-center gap-1 px-4 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg disabled:opacity-60"
                  >
                    <Icon icon="lucide:credit-card" className="w-4 h-4" />
                    Pay Now
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </Panel>
      </div>
    </DashPage>
  );
}
