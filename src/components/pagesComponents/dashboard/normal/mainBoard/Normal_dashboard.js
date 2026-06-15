'use client';
import { useEffect, useState } from 'react';
import TransactionOverview from './items/TransactionOverview';
import ProjectReportHistory from './items/ProjectReportHistory';
import { Invoice } from '../../order-history-component/OrderHistory.Component';
import { DashPage, StatCard } from '@/components/dashboard/ui';
import userbackAxios from '@/lib/userbackAxios';

export default function Normal_dashboard() {
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [invoiceData, setInvoiceData] = useState(null);
  const [stats, setStats] = useState({ reports: 0, txns: 0, spent: 0, itr: 0 });

  useEffect(() => {
    let active = true;
    (async () => {
      const [rep, sub, itr] = await Promise.all([
        userbackAxios.get('/projectreport/my').catch(() => null),
        userbackAxios.get('/apis/subscription-user').catch(() => null),
        userbackAxios.get('/itrinquiry/my').catch(() => null),
      ]);
      if (!active) return;
      const reports = Array.isArray(rep?.data?.data) ? rep.data.data.length : 0;
      const subs = Array.isArray(sub?.data?.data) ? sub.data.data : [];
      const spent = subs
        .filter((s) => s.status === 'success')
        .reduce((a, s) => a + (Number(s.amountForServices) || 0), 0);
      const itrs = Array.isArray(itr?.data?.data) ? itr.data.data.length : 0;
      setStats({ reports, txns: subs.length, spent, itr: itrs });
    })();
    return () => {
      active = false;
    };
  }, []);

  // A transaction opens its full detail on its own full page.
  if (selectedOrderId) {
    return (
      <Invoice
        orderId={selectedOrderId}
        responseData={invoiceData}
        onBack={() => setSelectedOrderId(null)}
      />
    );
  }

  return (
    <DashPage
      title="My Dashboard"
      subtitle="Your reports, payments and recent activity"
      icon="ph:squares-four"
    >
      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Project Reports"
          value={stats.reports}
          icon="mdi:file-document-outline"
        />
        <StatCard
          label="Transactions"
          value={stats.txns}
          icon="ph:receipt"
          tone="violet"
        />
        <StatCard
          label="Total Spent"
          value={`₹${stats.spent.toLocaleString('en-IN')}`}
          icon="ph:currency-inr"
          tone="emerald"
        />
        <StatCard
          label="ITR Requests"
          value={stats.itr}
          icon="mdi:file-account-outline"
          tone="amber"
        />
      </div>

      {/* Reports + recent transactions */}
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <ProjectReportHistory />
        </div>
        <div className="lg:col-span-2">
          <TransactionOverview
            onSelectInvoice={(id, data) => {
              setSelectedOrderId(id);
              setInvoiceData(data);
            }}
          />
        </div>
      </div>
    </DashPage>
  );
}
