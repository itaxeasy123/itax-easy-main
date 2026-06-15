'use client';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';


export default function SubSubSubmenu(props) {
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

  const { upcoming, title, iconName, linkTo, subMenu, subMenuItems, setIsNavigating } = props;

  if (subMenu) {
    return (
      <div className="px-8 py-1">
        <button className="w-full text-left text-xs font-medium text-gray-600 hover:text-gray-800 transition-colors duration-200">
          {title}
        </button>
        <div className="ml-4 mt-1">
          <button className="text-xs text-gray-500 hover:text-gray-700 transition-colors duration-200">
            SubSubSubmenu title
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-8 py-1">
      <button
        onClick={handleNavigation}
        onMouseEnter={prefetchRoute}
        onFocus={prefetchRoute}
        disabled={upcoming}
        className={`
          w-full flex items-center text-left transition-all duration-200
          ${upcoming ? 'opacity-50 cursor-not-allowed' : 'hover:text-white'}
        `}
      >
        <Icon
          icon={iconName}
          className="w-3 h-3 min-w-[0.75rem] text-blue-600"
        />
        <span className={`ml-2 text-xs font-medium transition-colors duration-200 ${
          title === 'Super Admin' 
            ? 'text-orange-600 font-semibold' 
            : 'text-gray-700 hover:text-gray-900'
        }`}>
          {title}
        </span>
      </button>
    </div>
  );
}
