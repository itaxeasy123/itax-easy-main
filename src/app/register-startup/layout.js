'use client';

import { useEffect } from 'react';

export default function RegisterStartupLayout({ children }) {
  // Optimize Register Startup page rendering
  useEffect(() => {
    // Mark this page type for performance optimization
    window._isSpecialPage = true;
    window._pageType = 'register-startup';
    
    // Optimize performance by temporarily disabling non-critical animations
    document.documentElement.classList.add('optimize-performance');
    document.documentElement.classList.add('register-startup-page');
    
    return () => {
      // Clean up when navigating away
      document.documentElement.classList.remove('optimize-performance');
      document.documentElement.classList.remove('register-startup-page');
      window._isSpecialPage = false;
      window._pageType = '';
    };
  }, []);

  return (
    <div className="register-startup-container">
      {children}
    </div>
  );
}
