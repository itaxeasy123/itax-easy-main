'use client';

import { useEffect } from 'react';

export default function BlogsLayout({ children }) {
  // Optimize Blogs rendering
  useEffect(() => {
    // Mark this page type for performance optimization
    window._isSpecialPage = true;
    window._pageType = 'blogs';
    
    // Optimize performance by temporarily disabling non-critical animations
    document.documentElement.classList.add('optimize-performance');
    document.documentElement.classList.add('blog-page');
    
    return () => {
      // Clean up when navigating away
      document.documentElement.classList.remove('optimize-performance');
      document.documentElement.classList.remove('blog-page');
      window._isSpecialPage = false;
      window._pageType = '';
    };
  }, []);

  return (
    <div className="blog-container">
      {children}
    </div>
  );
}
