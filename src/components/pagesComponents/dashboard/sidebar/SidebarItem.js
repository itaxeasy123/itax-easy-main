'use client';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SubSidebarItem from './SubSidebarItem';

export default function SideBarItem(props) {
  const [subActiveItem, setSubActiveItem] = useState(-1);
  const {
    upcoming,
    title,
    iconName,
    linkTo,
    subMenu,
    subMenuItems,
    handleActive,
    activeItem,
    index,
    setIsNavigating,
    isSidebarOpen,
  } = props;

  const router = useRouter();

  const subHandleActive = (e) => {
    if (subActiveItem == e) {
      return setSubActiveItem(null);
    }
    setSubActiveItem(e);
  };

  const handleNavigation = async () => {
    if (upcoming || !linkTo) return;
    setIsNavigating(true);
    router.push(linkTo);
  };

  // Warm the route (code + data) the moment the user hovers/focuses the item,
  // so the actual click navigates almost instantly instead of fetching cold.
  const prefetchRoute = () => {
    if (upcoming || !linkTo) return;
    router.prefetch(linkTo);
  };

  useEffect(() => {
    if (!isSidebarOpen && activeItem === index) {
      handleActive(null);
    }
  }, [isSidebarOpen, activeItem, handleActive, index]);

  const isActive = activeItem === index;

  if (subMenu) {
    return (
      <li>
        <button
          onClick={() => handleActive(index)}
          disabled={upcoming}
          className={`
            w-full flex items-center px-4 py-3 text-left transition-all duration-200
            ${upcoming ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-50'}
            ${isActive ? 'bg-slate-100 border-r-4 border-blue-600' : ''}
          `}
        >
          <Icon
            icon={iconName}
            className="w-5 h-5 min-w-[1.25rem] text-blue-600"
          />
          {isSidebarOpen && (
            <>
              <span className="ml-3 text-sm font-medium text-gray-700 truncate">
                {title}
              </span>
              <Icon
                icon={isActive ? 'ep:arrow-up-bold' : 'ep:arrow-down-bold'}
                className="ml-auto w-4 h-4 text-gray-500"
              />
            </>
          )}
        </button>
        
        {/* Submenu */}
        {isSidebarOpen && isActive && (
          <div className="bg-slate-50 border-l-2 border-slate-200 ml-4">
            {subMenuItems.map((item, i) => (
              <SubSidebarItem
                key={i}
                index={i}
                {...item}
                subHandleActive={subHandleActive}
                subActiveItem={subActiveItem}
                setIsNavigating={setIsNavigating}
              />
            ))}
          </div>
        )}
      </li>
    );
  }

  return (
    <li>
      <button
        onClick={handleNavigation}
        onMouseEnter={prefetchRoute}
        onFocus={prefetchRoute}
        disabled={upcoming}
        className={`
          w-full flex items-center px-4 py-3 text-left transition-all duration-200
          ${upcoming ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-50'}
          ${isActive ? 'bg-slate-100 border-r-4 border-blue-600' : ''}
        `}
      >
        <Icon
          icon={iconName}
          className="w-5 h-5 min-w-[1.25rem] text-blue-600"
        />
        {isSidebarOpen && (
          <span className="ml-3 text-sm font-medium text-gray-700 truncate">
            {title}
          </span>
        )}
      </button>
    </li>
  );
}
