'use client';

import { useEffect } from 'react';

export default function EasyServiceLayout({ children }) {
  // Optimize Easy Service rendering
  useEffect(() => {
    // Mark this page as an Easy Service page for performance monitoring
    window._isEasyServicePage = true;
    
    // Optimize performance by temporarily disabling non-critical animations
    document.documentElement.classList.add('optimize-performance');
    document.documentElement.classList.add('easy-service-page');
    
    return () => {
      // Clean up when navigating away
      document.documentElement.classList.remove('optimize-performance');
      document.documentElement.classList.remove('easy-service-page');
      window._isEasyServicePage = false;
    };
  }, []);

  return (
    <div className="easy-service-container">
      {children}
    </div>
  );
}
