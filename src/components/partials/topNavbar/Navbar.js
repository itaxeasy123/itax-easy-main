
'use client';
import Link from 'next/link.js';
import Image from 'next/image.js';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { MdOutlineLocalGroceryStore } from 'react-icons/md';
import { useAuth } from '@/context/AuthContext';

import UserInfo from './topNavbarComponents/UserInfo';
import { nodeAxios } from '@/lib/axios';
import { StyledLink } from '@/app/styles/globalStyles';

const MENUS = {
  ourProducts: [
    {
      url: '/dashboard/itr-filing',
      menu: 'Easy ITR',
      upcoming: false,
    },
  ],

  ourServices: [
    {
      menu: 'Easy GST Links',
      subMenu: [
        { url: '/easyservice/searchbygstin', menu: 'Search by GSTIN' },
        { url: '/easyservice/searchbypan', menu: 'Search by PAN' },
        { url: '/easyservice/trackgstreturn', menu: 'Track GST Return' },
      ],
    },
    {
      menu: 'Easy IncomeTax Links',
      subMenu: [
        { url: '/easyservice/verifypandetails', menu: 'Verify Pan Details' },
        {
          url: '/easyservice/checkpanaadhaarstatus',
          menu: 'Check Pan Aadhaar Status',
        },
        { url: '/easyservice/searchtan', menu: 'Search Tan' },
      ],
    },
    {
      menu: 'Easy Bank Links',
      subMenu: [
        { url: '/easyservice/ifscdetails', menu: 'IFSC Code' },
        { url: '/easyservice/verifybankdetails', menu: 'Verify Bank Account' },
      ],
    },
    {
      menu: 'Easy MCA',
      subMenu: [
        { url: '/easyservice/companydetails', menu: 'Company Details' },
        {
          url: '/easyservice/companydirectordetails',
          menu: 'Company Director Details',
        },
      ],
    },
    {
      menu: 'Easy Aadhaar Links',
      subMenu: [
        {
          url: '/easyservice/aadhaar-verify',
          menu: 'Easy Aadhaar Verification',
          upcoming: false,
        },
        {
          url: '/easyservice/aadhaar-link-status',
          menu: 'Easy Link Aadhaar Status',
          upcoming: false,
        },
      ],
    },
    {
      menu: 'Easy Converter',
      subMenu: [{ url: '/easyservice/merge-pdf', menu: 'PDF Toolkit' }],
    },
    {
      menu: 'Post Office',
      subMenu: [
        { url: '/easyservice/pincodeinfo', menu: 'Pincode Information' },
        { url: '/easyservice/pincodebycity', menu: 'Pin by City' },
      ],
    },
  ],

  financialCalculator: [
    {
      menu: 'Bank Calculators',
      subMenu: [
        { url: '/financialcal/sical', menu: 'Simple Interest Calculator' },
        { url: '/financialcal/cical', menu: 'Compound Interest' },
      ],
    },
    {
      menu: 'Income Tax Calculators',
      subMenu: [
        { url: '/financialcal/hracal', menu: 'HRA Calculator' },
        { url: '/financialcal/depCalc', menu: 'Depreciation Calculator' },
        {
          url: '/financialcal/advanceTaxCal',
          menu: 'Advance Tax Calculator (Old-Regime)',
        },
        { url: '/financialcal/taxcalculator/new', menu: 'Tax Calculator' },
        {
          url: '/financialcal/capitalGainCalc',
          menu: 'Capital Gain Calculator',
        },
      ],
    },
    {
      menu: 'GST Calculators',
      subMenu: [{ url: '/financialcal/gstcal', menu: 'GST Calculator' }],
    },
    {
      menu: 'Investment Calculators',
      subMenu: [
        { url: '/financialcal/miscal', menu: 'Post Office MIS' },
        { url: '/financialcal/cagr', menu: 'CAGR Calculator' },
        { url: '/financialcal/rdcal', menu: 'RD Calculator' },
        { url: '/financialcal/fdcal', menu: 'FD Calculator' },
        { url: '/financialcal/lumpsumpcal', menu: 'Lump Sum Calculator' },
        { url: '/financialcal/sipcal', menu: 'SIP Calculator' },
      ],
    },
    {
      menu: 'Loan Calculators',
      subMenu: [
        {
          url: '/financialcal/businesscal',
          menu: 'Business Loan Calculator',
        },
        { url: '/financialcal/carloancal', menu: 'Car Loan Calculator' },
        {
          url: '/financialcal/loanagainstcal',
          menu: 'Loan Against Property',
        },
        { url: '/financialcal/homeloancal', menu: 'Home Loan Calculator' },
        {
          url: '/financialcal/personalloancal',
          menu: 'Personal Loan Calculator',
        },
      ],
    },
    {
      menu: 'Insurance Calculators',
      subMenu: [{ url: '/financialcal/npscal', menu: 'NPS Calculator' }],
    },
  ],
};

const NAV_LINKS = [
  { href: '/register-startup/registration', label: 'Register a Startup' },
  { href: '/apis/all_apis', label: 'APIs' },
  { href: '/downloads', label: 'Downloads' },
];

const CART_REFRESH_INTERVAL = 15000;

const ArrowIcon = ({ direction }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-5 h-5 mr-1"
  >
    <path
      fillRule="evenodd"
      d={
        direction === 'down'
          ? 'M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z'
          : 'M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z'
      }
      clipRule="evenodd"
    />
  </svg>
);

function DropdownMenu({
  title,
  items,
  hasSubMenu = false,
  onNavigate,
  onPrefetch,
}) {
  return (
    <li
      className="mx-2 cursor-pointer text-slate-700 hover:text-blue-600 group relative"
      onMouseEnter={() => onPrefetch?.(title)}
    >
      <div className="flex items-center py-5">
        <span className="group-hover:hidden">
          <ArrowIcon direction="down" />
        </span>
        <span className="hidden group-hover:block">
          <ArrowIcon direction="right" />
        </span>
        {title}
      </div>

      <ul className="absolute hidden group-hover:flex flex-col bg-white shadow-md rounded-md p-3 border z-[1000]">
        {items.map((item, idx) =>
          hasSubMenu ? (
            <li
              key={`${title}-${idx}`}
              className="py-3 px-5 w-56 font-bold text-slate-700 hover:text-blue-600 group-one relative"
            >
              <span>{item.menu}</span>

              <ul className="absolute hidden left-56 top-0 group-one-hover:flex flex-col bg-white shadow-md rounded-md border py-3 z-[1000]">
                {item.subMenu.map((sub) => (
                  <button
                    type="button"
                    key={sub.url}
                    onClick={() => onNavigate(sub.url)}
                    className="py-3 mx-2 w-56 font-bold text-slate-700 hover:text-blue-600 flex items-center justify-between text-left"
                    onMouseEnter={() => sub?.url && onPrefetch?.(sub.url)}
                  >
                    <span>{sub.menu}</span>
                    {sub.upcoming && (
                      <span className="text-xs px-2 py-0.5 rounded-full text-green-600 bg-green-50">
                        UPCOMING
                      </span>
                    )}
                  </button>
                ))}
              </ul>
            </li>
          ) : (
            <button
              type="button"
              key={item.url}
              onClick={() => !item.upcoming && onNavigate(item.url)}
              className={`py-3 mx-2 w-56 font-bold text-slate-700 hover:text-blue-600 flex items-center justify-between text-left ${
                item.upcoming
                  ? 'opacity-60 cursor-not-allowed pointer-events-none'
                  : ''
              }`}
              onMouseEnter={() => item?.url && onPrefetch?.(item.url)}
            >
              <span>{item.menu}</span>
              {item.upcoming && (
                <span className="text-xs px-2 py-0.5 rounded-full text-green-600 bg-green-50">
                  UPCOMING
                </span>
              )}
            </button>
          ),
        )}
      </ul>
    </li>
  );
}

function MobileMenuItem({ type, item, openMap, setOpenMap, onNavigate }) {
  const toggle = (key) => {
    setOpenMap((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (type === 'simple') {
    return (
      <li>
        <button
          type="button"
          onClick={() => onNavigate(item.href)}
          className="flex py-2 text-sm font-bold text-slate-800 w-full text-left"
        >
          {item.label}
        </button>
      </li>
    );
  }

  if (type === 'products') {
    const key = 'ourProducts';
    return (
      <li className="my-1">
        <button
          type="button"
          onClick={() => toggle(key)}
          className="flex py-2 text-sm font-bold text-slate-800 w-full text-left"
        >
          <ArrowIcon direction="right" />
          Our Products
        </button>

        {openMap[key] && (
          <ul className="flex flex-col">
            {item.map((p) => (
              <button
                type="button"
                key={p.url}
                onClick={() => onNavigate(p.url)}
                className="py-2 pl-8 w-full font-semibold text-sm text-slate-700 hover:text-blue-600 text-left"
              >
                {p.menu}
              </button>
            ))}
          </ul>
        )}
      </li>
    );
  }

  const mainKey = item.id;

  return (
    <li className="my-1">
      <button
        type="button"
        onClick={() => toggle(mainKey)}
        className="flex py-2 text-sm font-bold text-slate-800 w-full text-left"
      >
        <ArrowIcon direction="right" />
        {item.title}
      </button>

      {openMap[mainKey] && (
        <ul className="flex flex-col">
          {item.items.map((group) => {
            const groupKey = `${mainKey}-${group.menu}`;
            return (
              <li key={groupKey} className="py-2 pl-5">
                <button
                  type="button"
                  onClick={() => toggle(groupKey)}
                  className="w-full text-left font-semibold text-sm text-slate-700 hover:text-blue-600"
                >
                  <span className="flex items-center">
                    <ArrowIcon direction="right" />
                    {group.menu}
                  </span>
                </button>

                {openMap[groupKey] && (
                  <ul className="flex flex-col my-1">
                    {group.subMenu.map((sub) => (
                      <button
                        type="button"
                        key={sub.url}
                        onClick={() => onNavigate(sub.url)}
                        className="py-2 pl-8 w-full font-semibold text-sm text-slate-700 hover:text-blue-600 text-left flex items-center justify-between"
                      >
                        <span>{sub.menu}</span>
                        {sub.upcoming && (
                          <span className="text-xs px-2 py-0.5 rounded-full text-green-600 bg-green-50">
                            UPCOMING
                          </span>
                        )}
                      </button>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
}

export default function Navbar({ className = '' }) {
  const { token, currentUser, authInitialized } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [hamburger, setHamburger] = useState(false);
  const [openMap, setOpenMap] = useState({});
  const [cartCount, setCartCount] = useState(0);

  const cartLock = useRef(false);
  const cartLastFetchedAt = useRef(0);

  const isLoggedIn = !!token && !!currentUser;

  const handleNavigation = useCallback(
    (path) => {
      if (!path) return;
      setHamburger(false);
      router.push(path);
    },
    [router],
  );

  const prefetch = useCallback(
    (keyOrPath) => {
      if (!keyOrPath) return;

      if (keyOrPath === 'Easy Services') {
        router.prefetch('/easyservice/searchbygstin');
        router.prefetch('/easyservice/searchbypan');
        return;
      }

      if (keyOrPath === 'Financial Calculators') {
        router.prefetch('/financialcal/taxcalculator/new');
        router.prefetch('/financialcal/gstcal');
        return;
      }

      if (keyOrPath === 'Our Products') {
        router.prefetch('/dashboard/itr-filing');
        return;
      }

      if (typeof keyOrPath === 'string' && keyOrPath.startsWith('/')) {
        router.prefetch(keyOrPath);
      }
    },
    [router],
  );

  const shouldSkipCart = useMemo(() => {
    if (!token) return true;

    if (pathname?.startsWith('/login')) return true;
    if (pathname?.startsWith('/signup')) return true;
    if (pathname?.startsWith('/verify-otp')) return true;
    if (pathname?.startsWith('/reset-password')) return true;

    return false;
  }, [pathname, token]);

  const fetchCart = useCallback(
    async (force = false) => {
      if (!token) {
        setCartCount(0);
        return;
      }

      if (shouldSkipCart) return;
      if (cartLock.current) return;

      const now = Date.now();
      if (!force && now - cartLastFetchedAt.current < CART_REFRESH_INTERVAL) {
        return;
      }

      cartLock.current = true;

      try {
        const [cartRes, startupRes] = await Promise.all([
          nodeAxios.get('/cart').catch(() => ({ data: { services: [] } })),
          nodeAxios.get('/cartStartup').catch(() => ({ data: [] })),
        ]);

        const serviceCount = Array.isArray(cartRes?.data?.services)
          ? cartRes.data.services.length
          : 0;

        const startupCount = Array.isArray(startupRes?.data)
          ? startupRes.data.length
          : 0;

        setCartCount(serviceCount + startupCount);
        cartLastFetchedAt.current = Date.now();
      } catch (err) {
        if (err?.response?.status !== 401) {
          console.error('Navbar cart error:', err);
        }
      } finally {
        cartLock.current = false;
      }
    },
    [token, shouldSkipCart],
  );

  useEffect(() => {
    if (!authInitialized) return;

    if (!token) {
      setCartCount(0);
      return;
    }

    fetchCart(true);
  }, [authInitialized, token, fetchCart]);

  useEffect(() => {
    if (!authInitialized || !token) return;

    const shouldForceRefresh =
      pathname === '/cart' ||
      pathname === '/register-startup/registration';

    if (shouldForceRefresh) {
      fetchCart(true);
    }
  }, [authInitialized, token, pathname, fetchCart]);

  const mobileMenuItems = useMemo(
    () => [
      { type: 'products', item: MENUS.ourProducts },
      {
        type: 'dropdown',
        item: {
          id: 'ourServicesMenu',
          title: 'Easy Services',
          items: MENUS.ourServices,
        },
      },
      {
        type: 'dropdown',
        item: {
          id: 'financialCalculatorMenu',
          title: 'Financial Calculators',
          items: MENUS.financialCalculator,
        },
      },
      ...NAV_LINKS.map((l) => ({ type: 'simple', item: l })),
    ],
    [],
  );

  return (
    <div
      className={`sticky top-0 left-0 right-0 z-[1000] bg-white border-b border-gray-200 ${className}`}
    >
      <nav className="max-w-7xl m-auto text-xs min-h-10 py-1 px-5 flex items-center flex-wrap">
        <div>
          <Link
            href="/"
            className="flex flex-shrink-0 justify-between items-center mx-auto hover:scale-105 transition-transform"
          >
            <Image
              width={56}
              height={60}
              src="/logo.svg"
              alt="logo"
              className="object-contain w-14"
              priority
            />
          </Link>
        </div>

        <ul className="h-12 ml-auto hidden lg:flex items-center justify-between font-bold text-xs">
          <DropdownMenu
            title="Our Products"
            items={MENUS.ourProducts}
            onNavigate={handleNavigation}
            onPrefetch={prefetch}
          />
          <DropdownMenu
            title="Easy Services"
            items={MENUS.ourServices}
            hasSubMenu
            onNavigate={handleNavigation}
            onPrefetch={prefetch}
          />
          <DropdownMenu
            title="Financial Calculators"
            items={MENUS.financialCalculator}
            hasSubMenu
            onNavigate={handleNavigation}
            onPrefetch={prefetch}
          />

          {NAV_LINKS.map((link) => (
            <li
              key={link.href}
              className="mx-2 cursor-pointer text-slate-700 hover:text-blue-600 transition-colors"
            >
              <button
                type="button"
                onMouseEnter={() => prefetch(link.href)}
                onClick={() => handleNavigation(link.href)}
                className="p-2 -m-2"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-3">
          {!authInitialized ? (
            <div className="w-20 h-9 bg-gray-200 rounded" />
          ) : isLoggedIn ? (
            <>
              <StyledLink
                href="/cart"
                className="relative flex items-center justify-center w-11 h-11 bg-primary text-white rounded-full"
              >
                <MdOutlineLocalGroceryStore size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </StyledLink>

              <UserInfo />
            </>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Login
            </Link>
          )}
        </div>

        <button
          onClick={() => setHamburger((p) => !p)}
          className="lg:hidden w-8 h-8 p-1 hover:scale-110 transition-transform"
          aria-label="Toggle menu"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-full h-full"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </nav>

      {hamburger && (
        <div className="lg:hidden fixed top-16 left-0 w-full bg-black/50 min-h-screen h-full z-[1000] overflow-y-scroll">
          <ul className="flex flex-col w-full bg-white shadow-md rounded-b-2xl px-5 pt-2 pb-5 mb-40">
            {mobileMenuItems.map((menuItem, index) => (
              <MobileMenuItem
                key={index}
                type={menuItem.type}
                item={menuItem.item}
                openMap={openMap}
                setOpenMap={setOpenMap}
                onNavigate={handleNavigation}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}