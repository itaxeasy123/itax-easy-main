'use client';

import { useEffect } from 'react';

export default function ApisLayout({ children }) {
  // Optimize APIs page rendering
  useEffect(() => {
    // Mark this page type for performance optimization
    window._isSpecialPage = true;
    window._pageType = 'apis';
    
    // Optimize performance by temporarily disabling non-critical animations
    document.documentElement.classList.add('optimize-performance');
    document.documentElement.classList.add('apis-page');
    
    return () => {
      // Clean up when navigating away
      document.documentElement.classList.remove('optimize-performance');
      document.documentElement.classList.remove('apis-page');
      window._isSpecialPage = false;
      window._pageType = '';
    };
  }, []);

  return (
    <div className="apis-container">
      {children}
    </div>
  );
}
