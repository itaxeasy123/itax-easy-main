'use client';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import SideBarItem from './SidebarItem';

export default function SideBar({
  data,
  setIsNavigating,
  topOffset = '3.6rem',
  isSidebarOpen,
  handleSidebar,
}) {
  // 🔥 REQUIRED FOR SidebarItem
  const [activeItem, setActiveItem] = useState(null);

  const handleActive = (index) => {
    setActiveItem((prev) => (prev === index ? null : index));
  };

  return (
    <>
      {/* ===== Desktop Sidebar ===== */}
      <aside
  className={`
    hidden lg:block fixed left-0 z-40
    bg-white text-gray-700
    shadow-lg border-r border-gray-200
    overflow-hidden
    transition-all duration-300 ease-in-out
    ${isSidebarOpen ? 'w-64' : 'w-16'}
  `}
  style={{ top: topOffset, bottom: 0 }}
>

        {/* Toggle */}
        <div className="h-12 flex items-center px-3 border-b border-gray-200">
          <button
            type="button"
            onClick={handleSidebar}
            className="p-1 rounded hover:bg-blue-100 transition"
            aria-label="Toggle Sidebar"
          >
            <Icon
              icon={isSidebarOpen ? 'mdi:chevron-right' : 'mdi:chevron-left'}
              className="text-xl text-blue-600"
            />
          </button>
        </div>

        <nav className="h-full overflow-y-auto overflow-x-hidden">
          <ul className="py-2">
            {data?.map((item, i) => (
              <SideBarItem
                key={i}
                index={i}
                {...item}
                handleActive={handleActive}
                activeItem={activeItem}
                setIsNavigating={setIsNavigating}
                isSidebarOpen={isSidebarOpen}
              />
            ))}
          </ul>
        </nav>
      </aside>

      {/* ===== Mobile Sidebar ===== */}
      
<aside
  className={`
    lg:hidden fixed left-0 z-50 w-64 max-w-[80vw]
    bg-white shadow-lg overflow-y-auto overflow-x-hidden
    transition-transform duration-300
    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
  `}
  style={{ top: topOffset, bottom: 0 }}
>

        <div className="h-12 flex items-center px-3 border-b border-gray-200">
          <button
            type="button"
            onClick={handleSidebar}
            className="p-1 rounded hover:bg-blue-100 transition"
            aria-label="Close Sidebar"
          >
            <Icon icon="mdi:chevron-left" className="text-xl text-blue-600" />
          </button>
        </div>

        <nav className="h-full overflow-y-auto overflow-x-hidden">
          <ul className="py-2">
            {data?.map((item, i) => (
              <SideBarItem
                key={i}
                index={i}
                {...item}
                handleActive={handleActive}
                activeItem={activeItem}
                setIsNavigating={setIsNavigating}
                isSidebarOpen={true} // mobile me text always visible
              />
            ))}
          </ul>
        </nav>
      </aside>

      {/* ===== Mobile Overlay ===== */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black/30"
          onClick={handleSidebar}
        />
      )}
    </>
  );
}
