'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useStrategicPrefetch } from '@/utils/prefetchStrategies';


export default function ProfilePrefetch() {
  const router = useRouter();
  const pathname = usePathname();
  const { prefetchRoute } = useStrategicPrefetch();
  
  const isProfilePage = pathname === '/profile';
  
  // Function to prefetch profile page
  const handlePrefetchProfile = useCallback(() => {
    if (!isProfilePage) {
      prefetchRoute('/profile');
    }
  }, [isProfilePage, prefetchRoute]);
  
  useEffect(() => {

    if (isProfilePage) return;
    
    const isMounted = { current: true };
    
    const profileLinks = document.querySelectorAll('a[href*="profile"], button[data-navigate="profile"]');
    const userAvatars = document.querySelectorAll('.user-avatar, .profile-icon');
    
    const elementsToWatch = [...profileLinks, ...userAvatars];
    
    const handleHover = () => {
     
      if (isMounted.current) {
        handlePrefetchProfile();
      }
    };
    
    elementsToWatch.forEach(el => {
      el.addEventListener('mouseover', handleHover, { once: true });
      el.addEventListener('focus', handleHover, { once: true });
    });
    
    // Clean up event listeners
    return () => {
      isMounted.current = false;
      
      elementsToWatch.forEach(el => {
        try {
          el.removeEventListener('mouseover', handleHover);
          el.removeEventListener('focus', handleHover);
        } catch (err) {
          // Safely ignore any cleanup errors
        }
      });
    };
  }, [isProfilePage, handlePrefetchProfile]);
  
  // This is a client component but doesn't render anything visible
  return null;
}
