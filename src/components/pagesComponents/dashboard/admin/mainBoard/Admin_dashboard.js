'use client';
import CardOverview from './items/CardOverview';
import DataState from './items/DataState';
import { DashPage, Panel } from '@/components/dashboard/ui';

export default function Admin_Dashboard() {
  const year = new Date().getFullYear();
  const yearRight = (
    <span className="text-xs text-slate-400">Year {year}</span>
  );

  return (
    <DashPage
      title="Admin Dashboard"
      subtitle="Accounts overview & insights"
      icon="ph:user-gear"
    >
      <div className="mb-6">
        <CardOverview className="" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Income & Expense" right={yearRight}>
          <DataState />
        </Panel>
        <Panel title="Account Balance" right={yearRight}>
          <DataState />
        </Panel>
        <Panel title="Cashflow" right={yearRight}>
          <DataState />
        </Panel>
        <Panel title="Income vs Expense" right={yearRight}>
          <DataState />
        </Panel>
      </div>
    </DashPage>
  );
}
