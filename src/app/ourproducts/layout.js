'use client';

import { useEffect } from 'react';

export default function OurProductsLayout({ children }) {
  // Optimize Products page rendering
  useEffect(() => {
    // Mark this page type for performance optimization
    window._isSpecialPage = true;
    window._pageType = 'products';
    
    // Optimize performance by temporarily disabling non-critical animations
    document.documentElement.classList.add('optimize-performance');
    document.documentElement.classList.add('products-page');
    
    return () => {
      // Clean up when navigating away
      document.documentElement.classList.remove('optimize-performance');
      document.documentElement.classList.remove('products-page');
      window._isSpecialPage = false;
      window._pageType = '';
    };
  }, []);

  return (
    <div className="products-container">
      {children}
    </div>
  );
}
