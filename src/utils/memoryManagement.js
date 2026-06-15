/**
 * Memory management utilities to optimize performance
 * 
 * These utilities help manage memory usage in the browser to prevent memory leaks
 * and improve navigation performance between pages.
 */

'use client';
import { useEffect } from 'react';

/**
 * Garbage collection helper that attempts to free up browser memory
 * This can help reduce memory consumption during navigation
 */
export function cleanupMemory() {
  // Clear any image cache we might have created
  if (window.imageCache) {
    window.imageCache = {};
  }
  
  // Clear any stored event listeners in custom globals
  if (window._eventListeners) {
    window._eventListeners = {};
  }
  
  // Run garbage collection hint (though browsers will decide when to actually run it)
  if (window.gc) {
    try {
      window.gc();
    } catch (e) {
      console.debug('Manual GC not available');
    }
  }
}

/**
 * Cleanup non-essential resources when navigating away from a page
 * @param {string} resourceType - The type of resource to cleanup
 */
export function cleanupResources(resourceType) {
  // Create a global tracker for resource references if it doesn't exist
  if (!window._resourceRefs) {
    window._resourceRefs = {};
  }
  
  // Get references for this resource type
  const refs = window._resourceRefs[resourceType] || [];
  
  // Clear references
  refs.forEach(ref => {
    if (ref && typeof ref.dispose === 'function') {
      ref.dispose();
    }
  });
  
  // Reset references for this type
  window._resourceRefs[resourceType] = [];
}

/**
 * Register a resource reference for later cleanup
 * @param {string} resourceType - The type of resource
 * @param {any} ref - The resource reference to track
 */
export function registerResource(resourceType, ref) {
  // Create a global tracker for resource references if it doesn't exist
  if (!window._resourceRefs) {
    window._resourceRefs = {};
  }
  
  // Initialize array for this resource type if needed
  if (!window._resourceRefs[resourceType]) {
    window._resourceRefs[resourceType] = [];
  }
  
  // Add reference
  window._resourceRefs[resourceType].push(ref);
  
  // Return a function to remove this specific reference
  return () => {
    const index = window._resourceRefs[resourceType].indexOf(ref);
    if (index !== -1) {
      window._resourceRefs[resourceType].splice(index, 1);
    }
  };
}

/**
 * Hook to register component cleanup on unmount
 * @param {Function} cleanupFn - The cleanup function to run
 */
export function usePageCleanup(cleanupFn) {
  useEffect(() => {
    return () => {
      // Run the provided cleanup function
      if (typeof cleanupFn === 'function') {
        cleanupFn();
      }
      
      // Also run our general memory cleanup
      cleanupMemory();
    };
  }, [cleanupFn]);
}
