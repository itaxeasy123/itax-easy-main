import Image from 'next/image';

/**
 * iTaxEasy branded logo loader (server-component friendly).
 * Used app-wide (Suspense fallbacks, route/section loading states).
 * Animation CSS lives in globals.css (.itax-loader-*).
 * Pass `fullScreen` to render a centered full-viewport overlay.
 */
export default function Loader({ fullScreen = false }) {
  return (
    <div
      className={
        fullScreen
          ? 'fixed inset-0 z-[9999] flex items-center justify-center bg-white/85 backdrop-blur-sm'
          : 'flex w-full items-center justify-center py-10'
      }
      role="status"
      aria-label="Loading"
    >
      <div className="itax-loader">
        <div className="itax-loader-mark">
          <span className="itax-loader-glow" aria-hidden="true" />
          <Image
            src="/logo.svg"
            alt="iTaxEasy"
            width={150}
            height={64}
            priority
            className="itax-loader-logo"
          />
          <span className="itax-loader-sheen" aria-hidden="true" />
        </div>
        <span className="itax-loader-line" aria-hidden="true" />
      </div>
    </div>
  );
}
