'use client';

import { useEffect } from 'react';

export default function FinancialCalLayout({ children }) {
  // Optimize calculator rendering
  useEffect(() => {
    // Mark this page as a calculator page for performance monitoring
    window._isCalculatorPage = true;
    
    // Optimize performance by temporarily disabling non-critical animations
    document.documentElement.classList.add('optimize-performance');
    
    // Preload essential calculator components
    const preloadComponents = () => {
      // Create preload links for critical calculator assets
      ['common.js', 'chart.js', 'calculator-styles.css'].forEach(resource => {
        // This is just a performance hint - these files should match your actual resources
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = `/assets/${resource}`;
        link.as = resource.endsWith('.js') ? 'script' : 'style';
        document.head.appendChild(link);
      });
    };
    
    if (document.readyState === 'complete') {
      preloadComponents();
    } else {
      window.addEventListener('load', preloadComponents);
    }
    
    return () => {
      // Clean up when navigating away
      document.documentElement.classList.remove('optimize-performance');
      window._isCalculatorPage = false;
      window.removeEventListener('load', preloadComponents);
    };
  }, []);

  return (
    <div className="calculator-container">
      {children}
    </div>
  );
}
