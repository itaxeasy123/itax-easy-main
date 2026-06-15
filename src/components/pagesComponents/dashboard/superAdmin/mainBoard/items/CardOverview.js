'use client';

import { Icon } from '@iconify/react';
import { useMemo } from 'react';
import { useRouter } from 'next/navigation';

const formatGrowthText = (growth, period = 'last month') => {
  const absGrowth = Math.abs(Number(growth || 0));
  const direction = Number(growth || 0) >= 0 ? '+' : '-';
  return `${direction}${absGrowth.toFixed(1)}% since ${period}`;
};

const getGrowthColor = (growth) => {
  if (growth > 0) return 'text-green-600';
  if (growth < 0) return 'text-red-600';
  return 'text-gray-600';
};

const getGrowthIcon = (growth) => {
  if (growth > 0) return 'ph:arrow-up';
  if (growth < 0) return 'ph:arrow-down';
  return 'ph:minus';
};

export default function CardOverview({
  className,
  setIsNavigating,
  dashboardMetrics,
  quickStats,
}) {
  const router = useRouter();

  const dashboardData = useMemo(() => {
    const totalRevenue = Number(dashboardMetrics?.totalRevenue || 0);
    const totalUsers = Number(dashboardMetrics?.totalUsers || 0);
    const totalTransactions = Number(dashboardMetrics?.totalTransactions || 0);
    const totalVisitors = Number(dashboardMetrics?.totalVisitors || 0);

    const totalAdmins = Number(quickStats?.totalAdmins || 0);
    const totalInvoices = Number(quickStats?.totalInvoices || 0);

    const userGrowth = Number(dashboardMetrics?.userGrowth || 0);
    const transactionGrowth = Number(dashboardMetrics?.transactionGrowth || 0);
    const visitorGrowth = Number(dashboardMetrics?.visitorGrowth || 0);
    const revenueGrowth = Number(dashboardMetrics?.revenueGrowth || 0);

    const adminGrowth = Number(quickStats?.adminGrowth || 0);
    const invoiceGrowth = Number(quickStats?.invoiceGrowth || 0);

    return [
      {
        title: 'Users',
        overview: totalUsers.toLocaleString(),
        time: formatGrowthText(userGrowth, 'last month'),
        growth: userGrowth,
        linkTo: '/dashboard/all-users',
        iconName: 'material-symbols:account-circle-outline',
        cssClass:
          'p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-green-100 dark:bg-green-500',
      },
      {
        title: 'Admin',
        overview: totalAdmins.toLocaleString(),
        time: formatGrowthText(adminGrowth, 'last month'),
        growth: adminGrowth,
        linkTo: '/dashboard/all-admin',
        iconName: 'entypo:user',
        cssClass:
          'p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500',
      },
      {
        title: 'Transactions',
        overview: totalTransactions.toLocaleString(),
        time: formatGrowthText(transactionGrowth, 'last month'),
        growth: transactionGrowth,
        linkTo: '/dashboard/transactions',
        iconName: 'bitcoin-icons:transactions-filled',
        cssClass:
          'p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500',
      },
      {
        title: 'Project Reports',
        overview: 'View',
        time: 'All user reports',
        growth: 0,
        linkTo: '/dashboard/project-reports',
        iconName: 'mdi:file-document-outline',
        cssClass:
          'p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500',
      },
      {
        title: 'Site Visitors',
        overview: totalVisitors.toLocaleString(),
        time: formatGrowthText(visitorGrowth, 'baseline'),
        growth: visitorGrowth,
        linkTo: '/dashboard/analytics/visitors',
        iconName: 'mdi:account-group-outline',
        cssClass:
          'p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-purple-100 dark:bg-purple-500',
      },
    ];
  }, [dashboardMetrics, quickStats]);

  const handleClick = (linkTo) => {
    if (!linkTo) return;
    setIsNavigating?.(true);
    router.push(linkTo);
  };

  return (
    <div className={`${className} mx-auto mt-2 p-4`}>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-[repeat(auto-fill,_minmax(330px,_1fr))]">
        {dashboardData.map((el, key) => (
          <button
            type="button"
            key={key}
            onClick={() => handleClick(el.linkTo)}
            className="text-left cursor-pointer transform transition-all duration-200 hover:scale-105"
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`rounded-xl ${el.cssClass}`}>
                    <Icon icon={el.iconName} className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      {el.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {el.overview}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={`flex items-center space-x-1 ${getGrowthColor(el.growth)}`}
                  >
                    <Icon icon={getGrowthIcon(el.growth)} className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {Math.abs(Number(el.growth || 0)).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <p className={`text-xs ${getGrowthColor(el.growth)}`}>
                  {el.time}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}