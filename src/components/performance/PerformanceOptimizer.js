'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useAutoPrefetch, useUserBehaviorPrefetch } from '@/utils/prefetchStrategies';

export default function PerformanceOptimizer() {
  const pathname = usePathname();
  
  // Determine if we're on the homepage to adjust prefetching strategy
  const isHomePage = pathname === '/';
  
  // Configure auto prefetching based on current page
  useAutoPrefetch({
    initialDelay: isHomePage ? 2000 : 1000, // Longer delay on homepage to prioritize initial render
    prefetchAll: !isHomePage, // Only prefetch all routes when not on homepage
  });
  
  // Enable user behavior-based prefetching
  useUserBehaviorPrefetch();
  
  // Apply additional performance optimizations
  useEffect(() => {
    // Mark navigation transitions
    const handleNavigationStart = () => {
      document.documentElement.classList.add('page-transition-ready');
    };
    
    const handleNavigationEnd = () => {
      document.documentElement.classList.remove('page-transition-ready');
    };
    
    // Listen for navigation events
    window.addEventListener('beforeunload', handleNavigationStart);
    window.addEventListener('load', handleNavigationEnd);
    
    // Resource hint optimization for key resources
    const createResourceHint = (rel, href, as) => {
      const link = document.createElement('link');
      link.rel = rel;
      link.href = href;
      if (as) link.as = as;
      document.head.appendChild(link);
      return link;
    };
    
    // Preconnect to key domains
    const preconnects = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://ebz-static.s3.ap-south-1.amazonaws.com'
    ];
    
    const linkElements = preconnects.map(url => createResourceHint('preconnect', url));
    
    // Clean up
    return () => {
      window.removeEventListener('beforeunload', handleNavigationStart);
      window.removeEventListener('load', handleNavigationEnd);
      linkElements.forEach(link => {
        if (link && link.parentNode) {
          link.parentNode.removeChild(link);
        }
      });
    };
  }, []);
  
  return null;
}
