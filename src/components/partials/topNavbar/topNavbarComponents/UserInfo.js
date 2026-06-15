
'use client';
import Link from 'next/link.js';
import Image from 'next/image.js';
import { I } from '@/components/iconify/I.js';
import { useState, useEffect } from 'react';
const userMenuData = [
  {
    linkTo: '/dashboard',
    title: 'Dashboard',
    iconName: 'material-symbols:dashboard',
  },
  {
    linkTo: '/profile',
    title: 'Profile',
    iconName: 'dashicons:businessperson',
  },
];

function UserInfoDashBoard__index(prop) {
  const { active, index, handleActive, linkTo, setIsNavigating } = prop;
  return (
    <li>
      <Link href={linkTo} prefetch={true}>
        <button
          onClick={() => {
            if (setIsNavigating) {
              // Show loading immediately for better UX
              setIsNavigating(true);

              // Add failsafe cursor resets
              setTimeout(() => {
                if (document.body) document.body.style.cursor = 'default';
              }, 1000);

              setTimeout(() => {
                if (document.body) document.body.style.cursor = 'default';
              }, 2000);
            }
            handleActive(index);
          }}
          className={` ${
            index == active ? 'bg-blue-600_light ' : ''
          } w-full flex items-center p-2 text-blue-600 rounded-lg hover:bg-blue-800 hover:text-neutral-50`}
        >
          <I icon={prop.iconName} className="text-2xl" />
          <span className="ml-3 font-semibold">{prop.title}</span>
          {prop.subMenu ? (
            <I icon="ep:arrow-down-bold" className=" ml-auto " />
          ) : (
            ''
          )}
        </button>
      </Link>
    </li>
  );
}
function UserMenu(prop) {
  const { className, dataItem, logout, setIsNavigating, onClose, setLocalUser } = prop;
  const [active, setActive] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const handleActive = (e) => {
    setActive(e);
    setIsOpen((prev) => !prev);
    if (onClose) onClose();
  };
  return (
    <ul
      className={` flex gap-1 flex-col z-50 dir-col bg-white shadow-md rounded-md p-3 border absolute left-auto right-[1.5rem] top-[3.7rem] ${className} `}
    >
      <li className=" mx-auto">
        <Link
          href="/"
          className=" flex flex-shrink-0 justify-between items-center mx-auto pb-4"
        >
          <Image
            width={280}
            height={280}
            src="/logo.svg"
            alt="logo"
            className="object-contain w-14"
          />
        </Link>
      </li>
      {dataItem.map((element, index) => (
        <UserInfoDashBoard__index
          {...element}
          active={active}
          handleActive={handleActive}
          index={index}
          key={index}
          isOpen={isOpen}
          setIsNavigating={setIsNavigating}
        />
      ))}
      <li>
        <button
          onClick={() => {
            // Reset cursor to default before any navigation
            if (typeof window !== 'undefined') {
              document.body.style.cursor = 'default';
            }
            
            // Close dropdown menu
            if (onClose) {
              onClose();
            }
            
            // Update local state if available
            if (typeof setLocalUser === 'function') {
              setLocalUser(null);
            }
            
            // Create and dispatch logout event
            if (typeof window !== 'undefined') {
              const logoutEvent = new CustomEvent('auth-state-changed', { 
                detail: { token: null, user: null, loggedIn: false, logout: true }
              });
              window.dispatchEvent(logoutEvent);
            }
            
            // Then perform logout
            logout();
          }}
          className=" hover:bg-neutral-500 hover:text-neutral-50 rounded py-2 w-full font-semibold text-neutral-800 flex items-center justify-center gap-1"
        >
          <I icon="ph:sign-out-bold" className="text-2xl" />
          Logout
        </button>
      </li>
    </ul>
  );
}
import { useAuth } from '@/context/AuthContext';
import Button, { BTN_SIZES } from '@/components/ui/Button';
export default function UserInfo({ setIsNavigating }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { handleLogOut, currentUser } = useAuth();
  const [localUser, setLocalUser] = useState(currentUser || {});
  
  // Handle authentication state changes
  useEffect(() => {
    // Update local state whenever the auth user changes
    setLocalUser(currentUser);
    
    // Listen for auth state changes from other components
    const handleAuthChange = (event) => {
      // Handle logout events
      if (event.detail && event.detail.logout === true) {
        setLocalUser(null);
        return;
      }
      
      // Handle login events
      if (event.detail?.user) {
        setLocalUser(event.detail.user);
      }
    };
    
    window.addEventListener('auth-state-changed', handleAuthChange);
    
    // Also listen for storage changes (cross-tab)
    const handleStorageChange = (e) => {
      if (e.key === 'auth_timestamp') {
        // Force re-check the auth state
        const userCookie = document.cookie
          .split('; ')
          .find(row => row.startsWith('currentUser='));
          
        if (userCookie) {
          try {
            const userJson = decodeURIComponent(userCookie.split('=')[1]);
            setLocalUser(JSON.parse(userJson));
          } catch (e) {
            console.error('Error parsing user cookie:', e);
          }
        }
      } else if (e.key === 'auth_logout') {
        // Handle logout from other tabs
        setLocalUser(null);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('auth-state-changed', handleAuthChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [currentUser]);
  
  // Pre-fetch dashboard data when the menu is opened
  useEffect(() => {
    if (isMenuOpen) {
      // Prefetch the dashboard route
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = '/dashboard';
      document.head.appendChild(link);
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [isMenuOpen]);

  // Global cursor reset effect for UserInfo component
  useEffect(() => {
    // Reset cursor when component mounts or when menu closes
    const resetCursor = () => {
      if (document.body) {
        document.body.style.cursor = 'default';
      }
    };

    // Reset cursor on mount
    resetCursor();

    // Reset cursor when menu closes
    if (!isMenuOpen) {
      resetCursor();
    }

    // Emergency cursor reset interval
    const cursorInterval = setInterval(resetCursor, 3000);

    return () => {
      clearInterval(cursorInterval);
      resetCursor();
    };
  }, [isMenuOpen]);

  return (
    <>
      <div
        className="text-gray-700 rounded-full"
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        {(localUser || currentUser) && (localUser?.avatar || currentUser?.avatar) ? (
          <Button className={`${BTN_SIZES['sm']} rounded-full p-0`}>
            <Image
              width={50}
              height={50}
              alt="User Profile"
              className="rounded-full cursor-pointer w-[45px] h-[45px]"
              src={localUser?.avatar || currentUser.avatar}
            />
          </Button>
        ) : (
          <I
            className="w-[45px] h-[45px] cursor-pointer"
            icon="mingcute:user-4-fill"
          />
        )}
      </div>
      <UserMenu
        dataItem={userMenuData}
        logout={handleLogOut}
        className={`${
          isMenuOpen ? '' : 'hidden'
        } dark:-bg--clr-neutral-900 z-50`}
        setIsNavigating={setIsNavigating}
        onClose={() => setIsMenuOpen(false)}
        setLocalUser={setLocalUser}
      />
      <div
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className={isMenuOpen ? 'fixed inset-0 -z-50' : ''}
      ></div>
    </>
  );
}