// Browser-storage backed history for Project Reports.
// Frontend-only: persists each generated report (metadata + the PDF as a data URI)
// in localStorage so the user can see and re-download their past reports.
// NOTE: cross-user / super-admin visibility requires backend persistence (node API).

const STORAGE_KEY = 'projectReportHistory';
const MAX_REPORTS = 30; // keep newest N to stay within the localStorage quota

export function getProjectReports() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

export function addProjectReport({ businessName, fileName, pdfDataUri }) {
  if (typeof window === 'undefined') return null;

  const entry = {
    id:
      (window.crypto?.randomUUID && window.crypto.randomUUID()) ||
      `pr_${Date.now()}_${Math.floor(Math.random() * 1e6)}`,
    businessName: businessName || 'Untitled',
    fileName: fileName || 'Project_Report.pdf',
    pdfDataUri: pdfDataUri || '',
    createdAt: new Date().toISOString(),
  };

  const next = [entry, ...getProjectReports()].slice(0, MAX_REPORTS);
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Quota likely exceeded — drop oldest entries until it fits.
    let trimmed = next;
    while (trimmed.length > 1) {
      trimmed = trimmed.slice(0, trimmed.length - 1);
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
        break;
      } catch {
        /* keep trimming */
      }
    }
  }
  return entry;
}

export function deleteProjectReport(id) {
  if (typeof window === 'undefined') return;
  const next = getProjectReports().filter((r) => r.id !== id);
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
}

export function downloadProjectReport(report) {
  if (typeof window === 'undefined' || !report?.pdfDataUri) return;
  const link = document.createElement('a');
  link.href = report.pdfDataUri;
  link.download = report.fileName || 'Project_Report.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
