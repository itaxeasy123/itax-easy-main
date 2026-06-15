'use client';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import SubSubSubmenu from './SubSubSidebarItem';

export default function SubSideBarItem(props) {
  const router = useRouter();

  const handleNavigation = async () => {
    if (upcoming || !linkTo) return;
    setIsNavigating(true);
    router.push(linkTo);
  };

  // Warm the route on hover/focus so the click navigates instantly.
  const prefetchRoute = () => {
    if (upcoming || !linkTo) return;
    router.prefetch(linkTo);
  };

  const {
    upcoming,
    title,
    iconName,
    linkTo,
    subMenu,
    subMenuItems,
    subHandleActive,
    subActiveItem,
    index,
    setIsNavigating,
  } = props;

  const isActive = subActiveItem === index;

  if (subMenu) {
    return (
      <div>
        <button
          onClick={() => subHandleActive(index)}
          disabled={upcoming}
          className={`
            w-full flex items-center px-6 py-2 text-left transition-all duration-200
            ${upcoming ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-100'}
            ${isActive ? 'bg-slate-100' : ''}
          `}
        >
          <Icon
            icon={iconName}
            className="w-4 h-4 min-w-[1rem] text-blue-600"
          />
          <span className="ml-3 text-sm font-medium text-gray-700 truncate">
            {title}
          </span>
          <Icon
            icon={isActive ? 'ep:arrow-up-bold' : 'ep:arrow-down-bold'}
            className="ml-auto w-3 h-3 text-gray-500"
          />
        </button>
        
        {/* Sub-submenu */}
        {isActive && (
          <div className="bg-white border-l-2 border-slate-200 ml-6">
            {subMenuItems.map((item, i) => (
              <SubSubSubmenu 
                key={i} 
                {...item}
                setIsNavigating={setIsNavigating}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={handleNavigation}
        onMouseEnter={prefetchRoute}
        onFocus={prefetchRoute}
        disabled={upcoming}
        className={`
          w-full flex items-center px-6 py-2 text-left transition-all duration-200
          ${upcoming ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-100'}
        `}
      >
        <Icon
          icon={iconName}
          className="w-4 h-4 min-w-[1rem] text-blue-600"
        />
        <span className="ml-3 text-sm font-medium text-gray-700 truncate">
          {title}
        </span>
      </button>
    </div>
  );
}
