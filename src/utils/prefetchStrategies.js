/**
 * Strategic route prefetching utility
 * This utility helps optimize navigation by prefetching routes strategically
 * based on priority and user behavior.
 */

import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';

// Define route priorities
const ROUTE_PRIORITIES = {
  // High priority routes - prefetch immediately
  HIGH: [
    '/dashboard',
    '/financialcal',
    '/easyservice',
    '/profile', // Added profile as high priority
  ],
  
  // Medium priority routes - prefetch after high priority
  MEDIUM: [
    '/ourproducts',
    '/blogs',
    '/apis',
  ],
  
  // Low priority routes - prefetch only on specific user actions
  LOW: [
    '/downloads',
    '/register-startup',
    '/contactus',
    '/about',
  ]
};

// Utility function to prefetch routes strategically
export function useStrategicPrefetch() {
  const router = useRouter();
  
  // Prefetch a specific route
  const prefetchRoute = useCallback((route) => {
    try {
      // Check if router is available and route is valid
      if (router && route && typeof route === 'string') {
        router.prefetch(route);
      }
    } catch (error) {
      // Only log non-abort errors to keep console clean
      if (error.name !== 'AbortError') {
        console.debug(`Prefetch info (${route}):`, error);
      }
    }
  }, [router]);
  
  // Prefetch routes by priority
  const prefetchByPriority = useCallback((priority) => {
    const routes = ROUTE_PRIORITIES[priority] || [];
    routes.forEach(route => {
      prefetchRoute(route);
    });
  }, [prefetchRoute]);
  
  // Prefetch a specific set of routes
  const prefetchRoutes = useCallback((routes) => {
    if (!Array.isArray(routes)) return;
    routes.forEach(route => {
      prefetchRoute(route);
    });
  }, [prefetchRoute]);

  return {
    prefetchRoute,
    prefetchByPriority,
    prefetchRoutes,
    PRIORITIES: Object.keys(ROUTE_PRIORITIES)
  };
}

// Hook for automatic prefetching based on page load
export function useAutoPrefetch(options = {}) {
  const { 
    initialDelay = 1500, 
    highPriorityDelay = 500,
    mediumPriorityDelay = 3000,
    lowPriorityDelay = 5000,
    prefetchAll = false
  } = options;
  
  const { prefetchByPriority } = useStrategicPrefetch();
  
  useEffect(() => {
    // Create a mounted ref to prevent operations after unmount
    const isMounted = { current: true };
    
    // Create safe prefetch function to prevent abort errors
    const safePrefetch = (priority) => {
      if (isMounted.current) {
        try {
          prefetchByPriority(priority);
        } catch (err) {
          console.debug(`Prefetch error (${priority}):`, err);
        }
      }
    };
    
    // Always prefetch high priority routes after a small delay
    const highPriorityTimer = setTimeout(() => {
      safePrefetch('HIGH');
    }, initialDelay + highPriorityDelay);
    
    // Prefetch medium priority routes after user is likely settled on the page
    const mediumPriorityTimer = setTimeout(() => {
      safePrefetch('MEDIUM');
    }, initialDelay + mediumPriorityDelay);
    
    // Only prefetch low priority routes if explicitly requested
    let lowPriorityTimer;
    if (prefetchAll) {
      lowPriorityTimer = setTimeout(() => {
        safePrefetch('LOW');
      }, initialDelay + lowPriorityDelay);
    }
    
    // Clean up timers
    return () => {
      // Mark as unmounted to prevent further operations
      isMounted.current = false;
      
      // Clear all timers
      clearTimeout(highPriorityTimer);
      clearTimeout(mediumPriorityTimer);
      if (lowPriorityTimer) clearTimeout(lowPriorityTimer);
    };
  }, [prefetchByPriority, initialDelay, highPriorityDelay, mediumPriorityDelay, lowPriorityDelay, prefetchAll]);
}

// Hook to track user behavior and prefetch accordingly
export function useUserBehaviorPrefetch() {
  const { prefetchRoute } = useStrategicPrefetch();
  
  useEffect(() => {
    // Use a ref to track if the component is still mounted
    const isMounted = { current: true };
    
    // Throttle function to prevent excessive prefetching
    let lastPrefetchTime = 0;
    const throttlePrefetch = (route, delay = 2000) => {
      const now = Date.now();
      if (now - lastPrefetchTime > delay && isMounted.current) {
        lastPrefetchTime = now;
        prefetchRoute(route);
      }
    };
    
    // Track user mouse movement to predict navigation intentions
    const handleMouseMove = (e) => {
      // If user is moving cursor toward top navigation area
      if (e.clientY < 100) {
        // Prefetch dashboard as it's a commonly accessed area
        throttlePrefetch('/dashboard');
      }
    };
    
    // Track scroll behavior
    const handleScroll = () => {
      try {
        const scrollPosition = window.scrollY;
        const pageHeight = document.body.scrollHeight;
        const viewportHeight = window.innerHeight;
        
        // Prevent division by zero
        if (pageHeight <= viewportHeight) return;
        
        const scrollPercentage = (scrollPosition / (pageHeight - viewportHeight)) * 100;
        
        // If user has scrolled more than 70% of the page
        if (scrollPercentage > 70) {
          // They might be interested in more content, prefetch blogs
          throttlePrefetch('/blogs');
        }
      } catch (err) {
        // Silently handle scroll calculation errors
      }
    };
    
    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Clean up
    return () => {
      // Mark component as unmounted to prevent further operations
      isMounted.current = false;
      
      try {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('scroll', handleScroll);
      } catch (err) {
        // Safely ignore any cleanup errors
      }
    };
  }, [prefetchRoute]);
}
