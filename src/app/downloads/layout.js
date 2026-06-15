'use client';

import { useEffect } from 'react';

export default function DownloadsLayout({ children }) {
  // Optimize Downloads page rendering
  useEffect(() => {
    // Mark this page type for performance optimization
    window._isSpecialPage = true;
    window._pageType = 'downloads';
    
    // Optimize performance by temporarily disabling non-critical animations
    document.documentElement.classList.add('optimize-performance');
    document.documentElement.classList.add('downloads-page');
    
    return () => {
      // Clean up when navigating away
      document.documentElement.classList.remove('optimize-performance');
      document.documentElement.classList.remove('downloads-page');
      window._isSpecialPage = false;
      window._pageType = '';
    };
  }, []);

  return (
    <div className="downloads-container">
      {children}
    </div>
  );
}
