'use client';

import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import { Panel } from '@/components/dashboard/ui';
import userbackAxios from '@/lib/userbackAxios';
import {
  getProjectReports,
  deleteProjectReport,
  downloadProjectReport,
} from '@/lib/projectReportHistory';

function formatDate(iso) {
  try {
    return new Date(iso)
      .toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
      })
      .toUpperCase();
  } catch {
    return '';
  }
}

export default function ProjectReportHistory({ className }) {
  const router = useRouter();
  const [reports, setReports] = useState([]);
  const [source, setSource] = useState('local'); // 'backend' | 'local'

  const loadLocal = () => {
    const local = getProjectReports().map((r) => ({
      id: r.id,
      businessName: r.businessName,
      createdAt: r.createdAt,
      pdfUrl: null,
      _local: r,
    }));
    setReports(local);
    setSource('local');
  };

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const { data } = await userbackAxios.get('/projectreport/my');
        const list = data?.data;
        if (active && Array.isArray(list) && list.length > 0) {
          setReports(
            list.map((r) => ({
              id: r.id,
              businessName: r.businessName,
              createdAt: r.createdAt,
              pdfUrl: r.pdfUrl,
            })),
          );
          setSource('backend');
          return;
        }
        if (active) loadLocal();
      } catch {
        if (active) loadLocal();
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const handleDownload = (report) => {
    if (report.pdfUrl) {
      window.open(report.pdfUrl, '_blank', 'noopener,noreferrer');
    } else if (report._local) {
      downloadProjectReport(report._local);
    }
  };

  const handleDelete = (report) => {
    // Deletion is local-only; backend rows are managed by the super admin.
    if (report._local) {
      deleteProjectReport(report.id);
      loadLocal();
    }
  };

  return (
    <Panel
      className={className || ''}
      title="Project Report History"
      bodyClassName=""
      right={
        <button
          type="button"
          onClick={() => router.push('/dashboard/reports/project-report')}
          className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          <Icon icon="lucide:plus" className="w-4 h-4" />
          New Report
        </button>
      }
    >
      <div className="p-4">
        {reports.length === 0 ? (
          <div className="text-center py-10">
            <div className="inline-flex flex-col items-center px-6 py-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200/50 dark:border-blue-700/50">
              <Icon
                icon="lucide:file-text"
                className="w-10 h-10 text-blue-400 dark:text-blue-500 mb-3"
              />
              <span className="text-blue-600 dark:text-blue-400 font-medium">
                No project reports yet
              </span>
              <span className="text-sm text-blue-500 dark:text-blue-500 mt-1">
                Generate a project report and it will appear here
              </span>
              <button
                type="button"
                onClick={() =>
                  router.push('/dashboard/reports/project-report')
                }
                className="mt-4 inline-flex items-center gap-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg"
              >
                <Icon icon="lucide:plus" className="w-4 h-4" />
                Create Project Report
              </button>
            </div>
          </div>
        ) : (
          <div className="max-h-[460px] overflow-y-auto pr-2">
            <div className="space-y-3">
              {reports.map((report) => (
                <div
                  key={`${source}-${report.id}`}
                  className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50/40 hover:shadow-sm transition-all duration-200"
                >
                  <div className="w-10 h-10 flex-shrink-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                    <Icon icon="ph:file-pdf" className="w-5 h-5 text-white" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">
                      {report.businessName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {formatDate(report.createdAt)}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDownload(report)}
                    title="Download PDF"
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-blue-600 hover:text-white hover:bg-blue-600 border border-blue-200 rounded-md transition-colors"
                  >
                    <Icon icon="lucide:download" className="w-4 h-4" />
                    Download
                  </button>

                  {report._local && (
                    <button
                      type="button"
                      onClick={() => handleDelete(report)}
                      title="Delete from history"
                      className="inline-flex items-center justify-center w-8 h-8 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    >
                      <Icon icon="lucide:trash-2" className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Panel>
  );
}
