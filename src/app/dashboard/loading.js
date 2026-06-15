import Loader from '@/components/partials/loading/Loader';

/**
 * Route-level loading boundary for the entire /dashboard segment.
 *
 * Next.js shows this INSTANTLY whenever you navigate between dashboard pages.
 * The dashboard layout (sidebar) stays mounted and only this content area
 * swaps, so every click gives immediate feedback instead of freezing on the
 * previous page while the next one's code + data load. Covers ALL entry points
 * (sidebar, Back button, cards, tabs, in-page links) — not just the sidebar.
 */
export default function DashboardLoading() {
  return (
    <div className="flex min-h-[70vh] w-full items-center justify-center">
      <Loader />
    </div>
  );
}
