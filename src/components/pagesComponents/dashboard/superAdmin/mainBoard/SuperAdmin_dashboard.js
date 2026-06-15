// 'use client';

// import CardOverview from './items/CardOverview';
// import DashSection from '@/components/pagesComponents/pageLayout/DashSection';
// import { useEffect, useState, useCallback } from 'react';
// import { Icon } from '@iconify/react';
// import Link from 'next/link';
// import Loader from '@/components/partials/loading/Loader.js';
// import { usePathname } from 'next/navigation';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   Cell,
// } from 'recharts';

// import userbackAxios from '@/lib/userbackAxios';

// const tableClassName = {
//   headTH:
//     'px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider bg-gray-50 border-b border-gray-200',
//   bodyTD:
//     'px-4 py-3 text-sm text-gray-900 border-b border-gray-100',
// };

// const CHART_COLORS = {
//   revenueLine: '#3B82F6',
//   revenueDot: '#60A5FA',
//   success: '#60A5FA',
//   pending: '#93C5FD',
//   barFill: '#93C5FD',
//   grid: '#E5E7EB',
//   tooltipBg: '#F9FAFB',
// };

// const MONTH_ORDER = [
//   'Jan',
//   'Feb',
//   'Mar',
//   'Apr',
//   'May',
//   'Jun',
//   'Jul',
//   'Aug',
//   'Sep',
//   'Oct',
//   'Nov',
//   'Dec',
// ];

// const EMPTY_METRICS = {
//   totalRevenue: 0,
//   totalUsers: 0,
//   totalTransactions: 0,
//   totalVisitors: 0,
//   revenueGrowth: 0,
//   userGrowth: 0,
//   transactionGrowth: 0,
//   visitorGrowth: 0,
// };

// const EMPTY_QUICK_STATS = {
//   totalAdmins: 0,
//   totalInvoices: 0,
//   adminGrowth: 0,
//   invoiceGrowth: 0,
// };

// const getSafeMonthYear = (value) => {
//   const date = new Date(value);
//   if (Number.isNaN(date.getTime())) return null;
//   return {
//     month: date.getMonth(),
//     year: date.getFullYear(),
//   };
// };

// const countItemsByMonth = (items = [], key, month, year) =>
//   items.filter((item) => {
//     const parsed = getSafeMonthYear(item?.[key]);
//     return parsed && parsed.month === month && parsed.year === year;
//   }).length;

// const calculateGrowthPercentage = (current, previous) => {
//   if (previous === 0) return current > 0 ? 100 : 0;
//   return ((current - previous) / previous) * 100;
// };

// const normalizeVisitorPayload = (payload) => {
//   if (Array.isArray(payload) && payload.length > 0) {
//     if (
//       payload[0]?.day &&
//       typeof payload[0]?.visitors !== 'undefined'
//     ) {
//       const weekly = payload.map((item) => ({
//         day: item.day,
//         visitors: Number(item.visitors) || 0,
//       }));

//       return {
//         totalVisitors: weekly.reduce((sum, item) => sum + item.visitors, 0),
//         weeklyVisitors: weekly,
//       };
//     }
//   }

//   const count = Number(payload?.count) || 0;
//   const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

//   return {
//     totalVisitors: count,
//     weeklyVisitors: days.map((day, index) => ({
//       day,
//       visitors: Math.floor(count * (0.1 + 0.05 * index)),
//     })),
//   };
// };

// export default function SuperAdmin_Dashboard() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [isError, setIsError] = useState(false);
//   const [users, setUsers] = useState([]);
//   const [transactions, setTransactions] = useState([]);
//   const [dashboardMetrics, setDashboardMetrics] = useState(EMPTY_METRICS);
//   const [quickStats, setQuickStats] = useState(EMPTY_QUICK_STATS);
//   const [revenueData, setRevenueData] = useState([]);
//   const [transactionStatusData, setTransactionStatusData] = useState([
//     { name: 'Success', value: 0, color: CHART_COLORS.success },
//     { name: 'Pending', value: 0, color: CHART_COLORS.pending },
//   ]);
//   const [visitorData, setVisitorData] = useState([]);
//   const [isNavigating, setIsNavigating] = useState(false);

//   const pathname = usePathname();

//   useEffect(() => {
//     setIsNavigating(false);
//   }, [pathname]);

//   const generateFallbackRevenueTrend = useCallback(() => {
//     return [
//       { month: 'Jan', revenue: 45000 },
//       { month: 'Feb', revenue: 52000 },
//       { month: 'Mar', revenue: 48000 },
//       { month: 'Apr', revenue: 61000 },
//       { month: 'May', revenue: 58000 },
//       { month: 'Jun', revenue: 67000 },
//     ];
//   }, []);

//   const generateRevenueTrend = useCallback(
//     (transactionList) => {
//       if (!Array.isArray(transactionList) || transactionList.length === 0) {
//         setRevenueData(generateFallbackRevenueTrend());
//         return;
//       }

//       const monthlyRevenue = {};

//       transactionList.forEach((txn) => {
//         const txnDate =
//           txn?.date instanceof Date ? txn.date : new Date(txn?.date);

//         if (Number.isNaN(txnDate.getTime())) return;

//         const month = txnDate.toLocaleString('default', { month: 'short' });
//         const amount = Number(txn?.amount) || 0;

//         if (!monthlyRevenue[month]) {
//           monthlyRevenue[month] = 0;
//         }

//         monthlyRevenue[month] += amount;
//       });

//       const revenueArray = Object.keys(monthlyRevenue)
//         .map((month) => ({
//           month,
//           revenue: monthlyRevenue[month],
//         }))
//         .sort(
//           (a, b) =>
//             MONTH_ORDER.indexOf(a.month) - MONTH_ORDER.indexOf(b.month),
//         );

//       setRevenueData(
//         revenueArray.length > 0 ? revenueArray : generateFallbackRevenueTrend(),
//       );
//     },
//     [generateFallbackRevenueTrend],
//   );

//   const resetDashboardState = useCallback(() => {
//     setUsers([]);
//     setTransactions([]);
//     setVisitorData([]);
//     setDashboardMetrics(EMPTY_METRICS);
//     setQuickStats(EMPTY_QUICK_STATS);
//     setRevenueData(generateFallbackRevenueTrend());
//     setTransactionStatusData([
//       { name: 'Success', value: 0, color: CHART_COLORS.success },
//       { name: 'Pending', value: 0, color: CHART_COLORS.pending },
//     ]);
//   }, [generateFallbackRevenueTrend]);

//   const fetchAllDashboardData = useCallback(async () => {
//     setIsLoading(true);
//     setIsError(false);

//     try {
//       const [
//         usersRes,
//         adminsRes,
//         subscriptionsRes,
//         invoicesRes,
//         visitorsRes,
//       ] = await Promise.all([
//         userbackAxios.get('/user/get-all-users'),
//         userbackAxios.get('/user/get-all-admins'),
//         userbackAxios.get('/apis/get-all-subscriptions'),
//         userbackAxios.get('/invoice/invoices'),
//         userbackAxios.get('/visitorCount/getAll'),
//       ]);

//       const usersList = usersRes?.data?.data?.users || [];
//       const totalUsers =
//         usersRes?.data?.data?.totalusers || usersList.length || 0;

//       const adminsList = Array.isArray(adminsRes?.data?.data?.admins)
//         ? adminsRes.data.data.admins
//         : Array.isArray(adminsRes?.data?.data)
//           ? adminsRes.data.data
//           : [];

//       const subscriptions = Array.isArray(
//         subscriptionsRes?.data?.subscriptions,
//       )
//         ? subscriptionsRes.data.subscriptions
//         : [];

//       const invoicesList = Array.isArray(invoicesRes?.data?.invoices)
//         ? invoicesRes.data.invoices
//         : Array.isArray(invoicesRes?.data?.data)
//           ? invoicesRes.data.data
//           : Array.isArray(invoicesRes?.data)
//             ? invoicesRes.data
//             : [];

//       const { totalVisitors, weeklyVisitors } = normalizeVisitorPayload(
//         visitorsRes?.data,
//       );

//       const parsedTransactions = subscriptions.map((txn) => {
//         const createdAt = new Date(txn?.createdAt);
//         const safeDate = Number.isNaN(createdAt.getTime())
//           ? new Date()
//           : createdAt;

//         const normalizedStatus =
//           String(txn?.status || '').toLowerCase() === 'success'
//             ? 'success'
//             : 'pending';

//         return {
//           transactionLabel: txn?.user?.email
//             ? `Payment from ${txn.user.email}`
//             : 'Payment',
//           dateTime: safeDate.toLocaleString('en-IN', {
//             dateStyle: 'medium',
//             timeStyle: 'short',
//           }),
//           amount: Number(txn?.amountForServices) || 0,
//           status: normalizedStatus,
//           id: txn?.txnid || 'N/A',
//           date: safeDate,
//         };
//       });

//       const totalRevenue = subscriptions.reduce(
//         (sum, txn) => sum + (Number(txn?.amountForServices) || 0),
//         0,
//       );

//       const successCount = subscriptions.filter(
//         (txn) => String(txn?.status || '').toLowerCase() === 'success',
//       ).length;

//       const pendingCount = subscriptions.length - successCount;

//       const currentDate = new Date();
//       const currentMonth = currentDate.getMonth();
//       const currentYear = currentDate.getFullYear();
//       const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
//       const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

//       const currentMonthUsers = countItemsByMonth(
//         usersList,
//         'createdAt',
//         currentMonth,
//         currentYear,
//       );
//       const lastMonthUsers = countItemsByMonth(
//         usersList,
//         'createdAt',
//         lastMonth,
//         lastMonthYear,
//       );

//       const currentMonthAdmins = countItemsByMonth(
//         adminsList,
//         'createdAt',
//         currentMonth,
//         currentYear,
//       );
//       const lastMonthAdmins = countItemsByMonth(
//         adminsList,
//         'createdAt',
//         lastMonth,
//         lastMonthYear,
//       );

//       const currentMonthTransactions = countItemsByMonth(
//         subscriptions,
//         'createdAt',
//         currentMonth,
//         currentYear,
//       );
//       const lastMonthTransactions = countItemsByMonth(
//         subscriptions,
//         'createdAt',
//         lastMonth,
//         lastMonthYear,
//       );

//       const currentMonthInvoices = countItemsByMonth(
//         invoicesList,
//         'createdAt',
//         currentMonth,
//         currentYear,
//       );
//       const lastMonthInvoices = countItemsByMonth(
//         invoicesList,
//         'createdAt',
//         lastMonth,
//         lastMonthYear,
//       );

//       const baselineVisitors = Math.floor(totalVisitors * 0.85);

//       const userGrowth = calculateGrowthPercentage(
//         currentMonthUsers,
//         lastMonthUsers,
//       );
//       const adminGrowth = calculateGrowthPercentage(
//         currentMonthAdmins,
//         lastMonthAdmins,
//       );
//       const transactionGrowth = calculateGrowthPercentage(
//         currentMonthTransactions,
//         lastMonthTransactions,
//       );
//       const invoiceGrowth = calculateGrowthPercentage(
//         currentMonthInvoices,
//         lastMonthInvoices,
//       );
//       const visitorGrowth = calculateGrowthPercentage(
//         totalVisitors,
//         baselineVisitors,
//       );

//       setUsers(usersList);
//       setTransactions(parsedTransactions);
//       setVisitorData(weeklyVisitors);

//       setDashboardMetrics({
//         totalRevenue,
//         totalUsers,
//         totalTransactions: subscriptions.length,
//         totalVisitors,
//         revenueGrowth: 0,
//         userGrowth,
//         transactionGrowth,
//         visitorGrowth,
//       });

//       setQuickStats({
//         totalAdmins: adminsList.length,
//         totalInvoices: invoicesList.length,
//         adminGrowth,
//         invoiceGrowth,
//       });

//       setTransactionStatusData([
//         {
//           name: 'Success',
//           value: successCount,
//           color: CHART_COLORS.success,
//         },
//         {
//           name: 'Pending',
//           value: pendingCount,
//           color: CHART_COLORS.pending,
//         },
//       ]);

//       generateRevenueTrend(parsedTransactions);
//     } catch (error) {
//       console.error('Error loading dashboard data:', error);
//       setIsError(true);
//       resetDashboardState();
//     } finally {
//       setIsLoading(false);
//     }
//   }, [generateRevenueTrend, resetDashboardState]);

//   useEffect(() => {
//     fetchAllDashboardData();
//   }, [fetchAllDashboardData]);

//   const MetricCard = ({
//     title,
//     value,
//     growth,
//     icon,
//     color,
//     prefix = '',
//   }) => (
//     <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center space-x-3">
//           <div className={`p-3 rounded-lg ${color}`}>
//             <Icon icon={icon} className="w-6 h-6 text-white" />
//           </div>
//           <div>
//             <p className="text-sm font-medium text-gray-600">{title}</p>
//             <p className="text-2xl font-bold text-gray-900">
//               {prefix}
//               {Number(value || 0).toLocaleString()}
//             </p>
//           </div>
//         </div>
//         <div
//           className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
//             growth >= 0
//               ? 'bg-green-100 text-green-800'
//               : 'bg-red-100 text-red-800'
//           }`}
//         >
//           <Icon
//             icon={growth >= 0 ? 'ph:arrow-up' : 'ph:arrow-down'}
//             className="w-3 h-3"
//           />
//           <span>{Math.abs(Number(growth || 0)).toFixed(1)}%</span>
//         </div>
//       </div>
//     </div>
//   );

//   const EmptyState = ({ title, actionButton }) => (
//     <div className="py-12 flex flex-col items-center gap-6 justify-center">
//       <div className="text-center">
//         <Icon
//           className="w-20 h-20 text-gray-300 mx-auto mb-4"
//           icon="ph:files-light"
//         />
//         <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
//         <p className="text-sm text-gray-500">
//           No records found at the moment
//         </p>
//       </div>
//       {actionButton}
//     </div>
//   );

//   const LoadingState = () => (
//     <div className="py-12 flex items-center justify-center">
//       <div className="flex items-center gap-2 text-gray-600">
//         <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
//         <span className="text-sm">Loading...</span>
//       </div>
//     </div>
//   );

//   const ErrorState = () => (
//     <div className="py-12 flex flex-col items-center gap-4 justify-center">
//       <Icon
//         className="w-16 h-16 text-red-400 mx-auto"
//         icon="ph:warning-circle-light"
//       />
//       <div className="text-center">
//         <h3 className="text-lg font-medium text-gray-900 mb-2">
//           Error Loading Data
//         </h3>
//         <p className="text-sm text-gray-500">
//           Something went wrong. Please try again.
//         </p>
//       </div>
//       <button
//         onClick={fetchAllDashboardData}
//         className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
//       >
//         <Icon icon="ph:arrows-clockwise" className="w-4 h-4 mr-2" />
//         Retry
//       </button>
//     </div>
//   );

//   const CustomRevenueTooltip = ({ active, payload, label }) => {
//     if (active && payload && payload.length) {
//       return (
//         <div className="bg-white p-4 border border-gray-200 shadow-lg rounded-lg">
//           <p className="font-semibold text-gray-800">{label}</p>
//           {payload.map((entry, index) => (
//             <p key={index} className="text-sm" style={{ color: entry.color }}>
//               Revenue:{' '}
//               <span className="font-medium">
//                 ₹{Number(entry.value || 0).toLocaleString('en-IN')}
//               </span>
//             </p>
//           ))}
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <div className="px-4 grid gap-8 bg-gray-50 min-h-screen">
//       {isNavigating && (
//         <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
//           <Loader />
//         </div>
//       )}

//       <DashSection title={'Dashboard Overview'}>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <MetricCard
//             title="Total Revenue"
//             value={dashboardMetrics.totalRevenue}
//             growth={dashboardMetrics.revenueGrowth}
//             icon="ph:currency-dollar"
//             color="bg-gradient-to-r from-blue-500 to-blue-600"
//             prefix="₹"
//           />
//           <MetricCard
//             title="Total Users"
//             value={dashboardMetrics.totalUsers}
//             growth={dashboardMetrics.userGrowth}
//             icon="ph:users"
//             color="bg-gradient-to-r from-cyan-500 to-cyan-600"
//           />
//           <MetricCard
//             title="Transactions"
//             value={dashboardMetrics.totalTransactions}
//             growth={dashboardMetrics.transactionGrowth}
//             icon="ph:receipt"
//             color="bg-gradient-to-r from-sky-500 to-sky-600"
//           />
//           <MetricCard
//             title="Site Visitors"
//             value={dashboardMetrics.totalVisitors}
//             growth={dashboardMetrics.visitorGrowth}
//             icon="ph:chart-line-up"
//             color="bg-gradient-to-r from-indigo-500 to-indigo-600"
//           />
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">
//               Revenue Trend
//             </h3>
//             <ResponsiveContainer width="100%" height={300}>
//               <LineChart data={revenueData}>
//                 <CartesianGrid
//                   strokeDasharray="3 3"
//                   stroke={CHART_COLORS.grid}
//                 />
//                 <XAxis
//                   dataKey="month"
//                   stroke="#6B7280"
//                   tick={{ fill: '#4B5563', fontSize: 12 }}
//                 />
//                 <YAxis
//                   stroke="#6B7280"
//                   tick={{ fill: '#4B5563', fontSize: 12 }}
//                   tickFormatter={(value) => `₹${value / 1000}k`}
//                 />
//                 <Tooltip content={<CustomRevenueTooltip />} />
//                 <Line
//                   type="monotone"
//                   dataKey="revenue"
//                   stroke={CHART_COLORS.revenueLine}
//                   strokeWidth={3}
//                   dot={{
//                     fill: CHART_COLORS.revenueDot,
//                     strokeWidth: 2,
//                     r: 5,
//                     stroke: CHART_COLORS.revenueLine,
//                   }}
//                   activeDot={{
//                     r: 8,
//                     fill: CHART_COLORS.revenueDot,
//                     stroke: CHART_COLORS.revenueLine,
//                   }}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>

//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">
//               Transaction Status
//             </h3>
//             <div className="flex flex-col items-center">
//               <ResponsiveContainer width="100%" height={300}>
//                 <PieChart>
//                   <Pie
//                     data={transactionStatusData}
//                     cx="50%"
//                     cy="50%"
//                     outerRadius={80}
//                     innerRadius={60}
//                     dataKey="value"
//                     label={({ name, percent }) =>
//                       `${name}: ${(percent * 100).toFixed(0)}%`
//                     }
//                     labelLine={false}
//                   >
//                     {transactionStatusData.map((entry, index) => (
//                       <Cell
//                         key={`cell-${index}`}
//                         fill={entry.color}
//                         stroke="#fff"
//                         strokeWidth={2}
//                       />
//                     ))}
//                   </Pie>
//                   <Tooltip
//                     formatter={(value, name) => [
//                       Number(value || 0).toLocaleString(),
//                       name,
//                     ]}
//                     contentStyle={{
//                       backgroundColor: CHART_COLORS.tooltipBg,
//                       border: `1px solid ${CHART_COLORS.grid}`,
//                       borderRadius: '0.5rem',
//                     }}
//                   />
//                 </PieChart>
//               </ResponsiveContainer>

//               <div className="flex justify-center gap-4 mt-4">
//                 {transactionStatusData.map((status, index) => (
//                   <div key={index} className="flex items-center">
//                     <div
//                       className="w-3 h-3 rounded-full mr-2"
//                       style={{ backgroundColor: status.color }}
//                     ></div>
//                     <span className="text-sm text-gray-700">
//                       {status.name} ({Number(status.value || 0)})
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
//           <h3 className="text-lg font-semibold text-gray-900 mb-4">
//             Weekly Visitor Analytics
//           </h3>
//           {visitorData.length > 0 ? (
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={visitorData}>
//                 <CartesianGrid
//                   strokeDasharray="3 3"
//                   stroke={CHART_COLORS.grid}
//                 />
//                 <XAxis
//                   dataKey="day"
//                   stroke="#6B7280"
//                   tick={{ fill: '#4B5563', fontSize: 12 }}
//                 />
//                 <YAxis
//                   stroke="#6B7280"
//                   tick={{ fill: '#4B5563', fontSize: 12 }}
//                 />
//                 <Tooltip
//                   contentStyle={{
//                     backgroundColor: CHART_COLORS.tooltipBg,
//                     border: `1px solid ${CHART_COLORS.grid}`,
//                     borderRadius: '0.5rem',
//                   }}
//                   formatter={(value) => [value, 'Visitors']}
//                 />
//                 <Bar
//                   dataKey="visitors"
//                   fill={CHART_COLORS.barFill}
//                   radius={[4, 4, 0, 0]}
//                 />
//               </BarChart>
//             </ResponsiveContainer>
//           ) : (
//             <div className="h-60 flex items-center justify-center text-gray-500">
//               {isLoading ? (
//                 <div className="flex items-center">
//                   <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500 mr-2"></div>
//                   Loading visitor data...
//                 </div>
//               ) : (
//                 'No visitor data available'
//               )}
//             </div>
//           )}
//         </div>
//       </DashSection>

//       <DashSection title={'Quick Actions'}>
//         <CardOverview
//           setIsNavigating={setIsNavigating}
//           className="col-span-12 xl:col-span-7"
//           dashboardMetrics={dashboardMetrics}
//           quickStats={quickStats}
//         />
//       </DashSection>

//       <DashSection
//         title={'Recent Users'}
//         titleRight={
//           <Link href={'/dashboard/all-users'}>
//             <button className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
//               <Icon icon="ph:users" className="w-4 h-4 mr-2" />
//               View All Users
//             </button>
//           </Link>
//         }
//       >
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//           {isLoading ? (
//             <LoadingState />
//           ) : isError ? (
//             <ErrorState />
//           ) : users.length > 0 ? (
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead>
//                   <tr>
//                     <th scope="col" className={tableClassName.headTH}>
//                       Full Name
//                     </th>
//                     <th scope="col" className={tableClassName.headTH}>
//                       Email Address
//                     </th>
//                     <th scope="col" className={tableClassName.headTH}>
//                       Mobile Number
//                     </th>
//                     <th scope="col" className={tableClassName.headTH}>
//                       PAN Number
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-100">
//                   {users.map((user, index) => (
//                     <tr
//                       key={user?.email || user?._id || index}
//                       className="hover:bg-gray-50 transition-colors duration-150"
//                     >
//                       <td className={tableClassName.bodyTD}>
//                         <div className="flex items-center">
//                           <div className="flex-shrink-0 h-8 w-8 mr-3">
//                             <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
//                               <Icon
//                                 icon="ph:user"
//                                 className="w-4 h-4 text-blue-600"
//                               />
//                             </div>
//                           </div>
//                           <div className="font-medium text-gray-900">
//                             {user?.firstName && user?.lastName
//                               ? `${user.firstName} ${user.lastName}`
//                               : user?.firstName ||
//                                 user?.lastName ||
//                                 'N/A'}
//                           </div>
//                         </div>
//                       </td>
//                       <td className={tableClassName.bodyTD}>
//                         <div className="text-gray-900">
//                           {user?.email || 'N/A'}
//                         </div>
//                       </td>
//                       <td className={tableClassName.bodyTD}>
//                         <div className="text-gray-900">
//                           {user?.phone || 'N/A'}
//                         </div>
//                       </td>
//                       <td className={tableClassName.bodyTD}>
//                         <div className="text-gray-900 font-mono text-xs">
//                           {user?.pan || 'N/A'}
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             <EmptyState
//               title="No Users Found"
//               actionButton={
//                 <Link href={'/dashboard/all-users'}>
//                   <button className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
//                     <Icon icon="ph:users" className="w-4 h-4 mr-2" />
//                     View Users
//                   </button>
//                 </Link>
//               }
//             />
//           )}
//         </div>
//       </DashSection>

//       <DashSection
//         title={'Recent Transactions'}
//         titleRight={
//           <Link href={'/dashboard/transactions'}>
//             <button className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
//               <Icon icon="ph:receipt" className="w-4 h-4 mr-2" />
//               View All Transactions
//             </button>
//           </Link>
//         }
//       >
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//           {isLoading ? (
//             <LoadingState />
//           ) : isError ? (
//             <ErrorState />
//           ) : transactions.length > 0 ? (
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead>
//                   <tr>
//                     <th scope="col" className={tableClassName.headTH}>
//                       Transaction Details
//                     </th>
//                     <th scope="col" className={tableClassName.headTH}>
//                       Transaction ID
//                     </th>
//                     <th scope="col" className={tableClassName.headTH}>
//                       Date & Time
//                     </th>
//                     <th scope="col" className={tableClassName.headTH}>
//                       Amount
//                     </th>
//                     <th scope="col" className={tableClassName.headTH}>
//                       Status
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-100">
//                   {transactions.map((txn, index) => (
//                     <tr
//                       key={txn?.id || index}
//                       className="hover:bg-gray-50 transition-colors duration-150"
//                     >
//                       <td className={tableClassName.bodyTD}>
//                         <div className="flex items-center">
//                           <div className="flex-shrink-0 h-8 w-8 mr-3">
//                             <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
//                               <Icon
//                                 icon="ph:arrow-down"
//                                 className="w-4 h-4 text-blue-600"
//                               />
//                             </div>
//                           </div>
//                           <div className="font-medium text-gray-900">
//                             {txn?.transactionLabel || 'Payment'}
//                           </div>
//                         </div>
//                       </td>
//                       <td className={tableClassName.bodyTD}>
//                         <div className="text-gray-900 font-mono text-xs">
//                           {txn?.id || 'N/A'}
//                         </div>
//                       </td>
//                       <td className={tableClassName.bodyTD}>
//                         <div className="text-gray-900 text-sm">
//                           {txn?.dateTime || 'N/A'}
//                         </div>
//                       </td>
//                       <td className={tableClassName.bodyTD}>
//                         <div className="text-gray-900 font-semibold">
//                           ₹{Number(txn?.amount || 0).toLocaleString('en-IN')}
//                         </div>
//                       </td>
//                       <td className={tableClassName.bodyTD}>
//                         <span
//                           className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                             txn?.status === 'success'
//                               ? 'bg-blue-100 text-blue-800'
//                               : 'bg-yellow-100 text-yellow-800'
//                           }`}
//                         >
//                           <span
//                             className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
//                               txn?.status === 'success'
//                                 ? 'bg-blue-400'
//                                 : 'bg-yellow-400'
//                             }`}
//                           />
//                           {txn?.status
//                             ? txn.status.charAt(0).toUpperCase() +
//                               txn.status.slice(1)
//                             : 'Pending'}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             <EmptyState title="No Transactions Found" />
//           )}
//         </div>
//       </DashSection>
//     </div>
//   );
// }


'use client';
import CardOverview from './items/CardOverview';
import DashSection from '@/components/pagesComponents/pageLayout/DashSection';
import { useEffect, useState, useCallback } from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import Loader from '@/components/partials/loading/Loader.js';
import { usePathname } from 'next/navigation';
import { StatCard } from '@/components/dashboard/ui';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

import userbackAxios from '@/lib/userbackAxios';

const tableClassName = {
  headTH:
    'px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider bg-gray-50 border-b border-gray-200',
  bodyTD:
    'px-4 py-3 text-sm text-gray-900 border-b border-gray-100',
};

const CHART_COLORS = {
  revenueLine: '#3B82F6',
  revenueDot: '#60A5FA',
  success: '#60A5FA',
  pending: '#93C5FD',
  barFill: '#93C5FD',
  grid: '#E5E7EB',
  tooltipBg: '#F9FAFB',
};

const MONTH_ORDER = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const EMPTY_METRICS = {
  totalRevenue: 0,
  totalUsers: 0,
  totalTransactions: 0,
  totalVisitors: 0,
  revenueGrowth: 0,
  userGrowth: 0,
  transactionGrowth: 0,
  visitorGrowth: 0,
};

const EMPTY_QUICK_STATS = {
  totalAdmins: 0,
  totalInvoices: 0,
  adminGrowth: 0,
  invoiceGrowth: 0,
};

const getSafeMonthYear = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return {
    month: date.getMonth(),
    year: date.getFullYear(),
  };
};

const countItemsByMonth = (items = [], key, month, year) =>
  items.filter((item) => {
    const parsed = getSafeMonthYear(item?.[key]);
    return parsed && parsed.month === month && parsed.year === year;
  }).length;

const calculateGrowthPercentage = (current, previous) => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
};

const normalizeVisitorPayload = (payload) => {
  if (Array.isArray(payload) && payload.length > 0) {
    if (
      payload[0]?.day &&
      typeof payload[0]?.visitors !== 'undefined'
    ) {
      const weekly = payload.map((item) => ({
        day: item.day,
        visitors: Number(item.visitors) || 0,
      }));

      return {
        totalVisitors: weekly.reduce((sum, item) => sum + item.visitors, 0),
        weeklyVisitors: weekly,
      };
    }
  }

  const count = Number(payload?.count) || 0;
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return {
    totalVisitors: count,
    weeklyVisitors: days.map((day, index) => ({
      day,
      visitors: Math.floor(count * (0.1 + 0.05 * index)),
    })),
  };
};

export default function SuperAdmin_Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [dashboardMetrics, setDashboardMetrics] = useState(EMPTY_METRICS);
  const [quickStats, setQuickStats] = useState(EMPTY_QUICK_STATS);
  const [revenueData, setRevenueData] = useState([]);
  const [transactionStatusData, setTransactionStatusData] = useState([
    { name: 'Success', value: 0, color: CHART_COLORS.success },
    { name: 'Pending', value: 0, color: CHART_COLORS.pending },
  ]);
  const [visitorData, setVisitorData] = useState([]);
  const [isNavigating, setIsNavigating] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    setIsNavigating(false);
  }, [pathname]);

  // The trailing 6 calendar months, zero revenue as the baseline.
  const buildLastSixMonths = useCallback(() => {
    const now = new Date();
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({
        key: `${d.getFullYear()}-${d.getMonth()}`,
        month: d.toLocaleString('default', { month: 'short' }),
        revenue: 0,
      });
    }
    return months;
  }, []);

  // Real revenue trend: sum successful payments into the trailing 6 months.
  // No fake/demo data — shows ₹0 until real paid transactions exist.
  const generateRevenueTrend = useCallback(
    (transactionList) => {
      const months = buildLastSixMonths();
      const indexByKey = {};
      months.forEach((m, i) => {
        indexByKey[m.key] = i;
      });

      (Array.isArray(transactionList) ? transactionList : []).forEach((txn) => {
        const txnDate =
          txn?.date instanceof Date ? txn.date : new Date(txn?.date);
        if (Number.isNaN(txnDate.getTime())) return;
        // Count only completed payments as revenue.
        if (txn?.status && txn.status !== 'success') return;

        const key = `${txnDate.getFullYear()}-${txnDate.getMonth()}`;
        if (key in indexByKey) {
          months[indexByKey[key]].revenue += Number(txn?.amount) || 0;
        }
      });

      setRevenueData(months.map(({ month, revenue }) => ({ month, revenue })));
    },
    [buildLastSixMonths],
  );

  const resetDashboardState = useCallback(() => {
    setUsers([]);
    setTransactions([]);
    setVisitorData([]);
    setDashboardMetrics(EMPTY_METRICS);
    setQuickStats(EMPTY_QUICK_STATS);
    setRevenueData(buildLastSixMonths());
    setTransactionStatusData([
      { name: 'Success', value: 0, color: CHART_COLORS.success },
      { name: 'Pending', value: 0, color: CHART_COLORS.pending },
    ]);
  }, [buildLastSixMonths]);

  const fetchAllDashboardData = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const [
        usersRes,
        adminsRes,
        subscriptionsRes,
        invoicesRes,
        visitorsRes,
      ] = await Promise.all([
        userbackAxios.get('/user/get-all-users'),
        userbackAxios.get('/user/get-all-admins'),
        userbackAxios.get('/apis/get-all-subscriptions'),
        userbackAxios.get('/invoice/invoices'),
        userbackAxios.get('/visitorCount/getAll'),
      ]);

      const usersList = usersRes?.data?.data?.users || [];
      const totalUsers =
        usersRes?.data?.data?.totalusers || usersList.length || 0;

      const adminsList = Array.isArray(adminsRes?.data?.data?.admins)
        ? adminsRes.data.data.admins
        : Array.isArray(adminsRes?.data?.data)
          ? adminsRes.data.data
          : [];

      const subscriptions = Array.isArray(
        subscriptionsRes?.data?.subscriptions,
      )
        ? subscriptionsRes.data.subscriptions
        : [];

      const invoicesList = Array.isArray(invoicesRes?.data?.invoices)
        ? invoicesRes.data.invoices
        : Array.isArray(invoicesRes?.data?.data)
          ? invoicesRes.data.data
          : Array.isArray(invoicesRes?.data)
            ? invoicesRes.data
            : [];

      const { totalVisitors, weeklyVisitors } = normalizeVisitorPayload(
        visitorsRes?.data,
      );

      const parsedTransactions = subscriptions.map((txn) => {
        const createdAt = new Date(txn?.createdAt);
        const safeDate = Number.isNaN(createdAt.getTime())
          ? new Date()
          : createdAt;

        const normalizedStatus =
          String(txn?.status || '').toLowerCase() === 'success'
            ? 'success'
            : 'pending';

        return {
          transactionLabel: txn?.user?.email
            ? `Payment from ${txn.user.email}`
            : 'Payment',
          dateTime: safeDate.toLocaleString('en-IN', {
            dateStyle: 'medium',
            timeStyle: 'short',
          }),
          amount: Number(txn?.amountForServices) || 0,
          status: normalizedStatus,
          id: txn?.txnid || 'N/A',
          date: safeDate,
        };
      });

      const totalRevenue = subscriptions.reduce(
        (sum, txn) => sum + (Number(txn?.amountForServices) || 0),
        0,
      );

      const successCount = subscriptions.filter(
        (txn) => String(txn?.status || '').toLowerCase() === 'success',
      ).length;

      const pendingCount = subscriptions.length - successCount;

      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

      const currentMonthUsers = countItemsByMonth(
        usersList,
        'createdAt',
        currentMonth,
        currentYear,
      );
      const lastMonthUsers = countItemsByMonth(
        usersList,
        'createdAt',
        lastMonth,
        lastMonthYear,
      );

      const currentMonthAdmins = countItemsByMonth(
        adminsList,
        'createdAt',
        currentMonth,
        currentYear,
      );
      const lastMonthAdmins = countItemsByMonth(
        adminsList,
        'createdAt',
        lastMonth,
        lastMonthYear,
      );

      const currentMonthTransactions = countItemsByMonth(
        subscriptions,
        'createdAt',
        currentMonth,
        currentYear,
      );
      const lastMonthTransactions = countItemsByMonth(
        subscriptions,
        'createdAt',
        lastMonth,
        lastMonthYear,
      );

      const currentMonthInvoices = countItemsByMonth(
        invoicesList,
        'createdAt',
        currentMonth,
        currentYear,
      );
      const lastMonthInvoices = countItemsByMonth(
        invoicesList,
        'createdAt',
        lastMonth,
        lastMonthYear,
      );

      const baselineVisitors = Math.floor(totalVisitors * 0.85);

      const userGrowth = calculateGrowthPercentage(
        currentMonthUsers,
        lastMonthUsers,
      );
      const adminGrowth = calculateGrowthPercentage(
        currentMonthAdmins,
        lastMonthAdmins,
      );
      const transactionGrowth = calculateGrowthPercentage(
        currentMonthTransactions,
        lastMonthTransactions,
      );
      const invoiceGrowth = calculateGrowthPercentage(
        currentMonthInvoices,
        lastMonthInvoices,
      );
      const visitorGrowth = calculateGrowthPercentage(
        totalVisitors,
        baselineVisitors,
      );

      setUsers(usersList);
      setTransactions(parsedTransactions);
      setVisitorData(weeklyVisitors);

      setDashboardMetrics({
        totalRevenue,
        totalUsers,
        totalTransactions: subscriptions.length,
        totalVisitors,
        revenueGrowth: 0,
        userGrowth,
        transactionGrowth,
        visitorGrowth,
      });

      setQuickStats({
        totalAdmins: adminsList.length,
        totalInvoices: invoicesList.length,
        adminGrowth,
        invoiceGrowth,
      });

      setTransactionStatusData([
        {
          name: 'Success',
          value: successCount,
          color: CHART_COLORS.success,
        },
        {
          name: 'Pending',
          value: pendingCount,
          color: CHART_COLORS.pending,
        },
      ]);

      generateRevenueTrend(parsedTransactions);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      setIsError(true);
      resetDashboardState();
    } finally {
      setIsLoading(false);
    }
  }, [generateRevenueTrend, resetDashboardState]);

  useEffect(() => {
    fetchAllDashboardData();
  }, [fetchAllDashboardData]);

    const MetricCard = ({
  title,
  value,
  growth,
  icon,
  color,
  prefix = '',
}) => (
  <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 p-4 min-w-0">
    
    <div className="flex items-start justify-between gap-2">

      <div className="flex items-center gap-3 min-w-0 flex-1">
        
        <div
          className={`w-12 h-12 flex-shrink-0 rounded-xl flex items-center justify-center ${color}`}
        >
          <Icon icon={icon} className="w-5 h-5 text-white" />
        </div>

        <div className="min-w-0">
          <p className="text-xs md:text-sm text-gray-500 truncate">
            {title}
          </p>

          <h2 className="text-xl md:text-2xl font-bold text-gray-900 truncate">
            {prefix}
            {Number(value || 0).toLocaleString()}
          </h2>
        </div>

      </div>

      <div
        className={`flex items-center gap-1 px-2 py-1 rounded-full text-[11px] md:text-xs font-medium whitespace-nowrap flex-shrink-0 ${
          growth >= 0
            ? 'bg-green-100 text-green-700'
            : 'bg-red-100 text-red-700'
        }`}
      >
        <Icon
          icon={growth >= 0 ? 'ph:arrow-up' : 'ph:arrow-down'}
          className="w-3 h-3"
        />
        {Math.abs(Number(growth || 0)).toFixed(1)}%
      </div>

    </div>
  </div>
);

  const EmptyState = ({ title, actionButton }) => (
    <div className="py-12 flex flex-col items-center gap-6 justify-center">
      <div className="text-center">
        <Icon
          className="w-20 h-20 text-gray-300 mx-auto mb-4"
          icon="ph:files-light"
        />
        <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-500">
          No records found at the moment
        </p>
      </div>
      {actionButton}
    </div>
  );

  const LoadingState = () => (
    <div className="py-12 flex items-center justify-center">
      <Loader />
    </div>
  );

  const ErrorState = () => (
    <div className="py-12 flex flex-col items-center gap-4 justify-center">
      <Icon
        className="w-16 h-16 text-red-400 mx-auto"
        icon="ph:warning-circle-light"
      />
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Error Loading Data
        </h3>
        <p className="text-sm text-gray-500">
          Something went wrong. Please try again.
        </p>
      </div>
      <button
        onClick={fetchAllDashboardData}
        className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
      >
        <Icon icon="ph:arrows-clockwise" className="w-4 h-4 mr-2" />
        Retry
      </button>
    </div>
  );

  const CustomRevenueTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 shadow-lg rounded-lg">
          <p className="font-semibold text-gray-800">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              Revenue:{' '}
              <span className="font-medium">
                ₹{Number(entry.value || 0).toLocaleString('en-IN')}
              </span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {isNavigating && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <Loader />
        </div>
      )}

      <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-6 sm:px-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-100 bg-blue-50">
            <Icon icon="mdi:shield-crown-outline" className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800 sm:text-2xl">
              Super Admin Dashboard
            </h1>
            <p className="text-sm text-slate-500">
              Platform overview &amp; management
            </p>
          </div>
        </div>

        <DashSection title={'Dashboard Overview'}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Total Revenue"
            value={`₹${Number(dashboardMetrics.totalRevenue || 0).toLocaleString('en-IN')}`}
            icon="ph:currency-inr"
            tone="emerald"
          />
          <StatCard
            label="Total Users"
            value={Number(dashboardMetrics.totalUsers || 0).toLocaleString()}
            icon="ph:users"
            tone="blue"
          />
          <StatCard
            label="Transactions"
            value={Number(dashboardMetrics.totalTransactions || 0).toLocaleString()}
            icon="ph:receipt"
            tone="violet"
          />
          <StatCard
            label="Site Visitors"
            value={Number(dashboardMetrics.totalVisitors || 0).toLocaleString()}
            icon="ph:chart-line-up"
            tone="amber"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Revenue Trend
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={CHART_COLORS.grid}
                />
                <XAxis
                  dataKey="month"
                  stroke="#6B7280"
                  tick={{ fill: '#4B5563', fontSize: 12 }}
                />
                <YAxis
                  stroke="#6B7280"
                  tick={{ fill: '#4B5563', fontSize: 12 }}
                  tickFormatter={(value) => `₹${value / 1000}k`}
                />
                <Tooltip content={<CustomRevenueTooltip />} />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke={CHART_COLORS.revenueLine}
                  strokeWidth={3}
                  dot={{
                    fill: CHART_COLORS.revenueDot,
                    strokeWidth: 2,
                    r: 5,
                    stroke: CHART_COLORS.revenueLine,
                  }}
                  activeDot={{
                    r: 8,
                    fill: CHART_COLORS.revenueDot,
                    stroke: CHART_COLORS.revenueLine,
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Transaction Status
            </h3>
            <div className="flex flex-col items-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={transactionStatusData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={60}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    labelLine={false}
                  >
                    {transactionStatusData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        stroke="#fff"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name) => [
                      Number(value || 0).toLocaleString(),
                      name,
                    ]}
                    contentStyle={{
                      backgroundColor: CHART_COLORS.tooltipBg,
                      border: `1px solid ${CHART_COLORS.grid}`,
                      borderRadius: '0.5rem',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>

              <div className="flex justify-center gap-4 mt-4">
                {transactionStatusData.map((status, index) => (
                  <div key={index} className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: status.color }}
                    ></div>
                    <span className="text-sm text-gray-700">
                      {status.name} ({Number(status.value || 0)})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Weekly Visitor Analytics
          </h3>
          {visitorData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={visitorData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={CHART_COLORS.grid}
                />
                <XAxis
                  dataKey="day"
                  stroke="#6B7280"
                  tick={{ fill: '#4B5563', fontSize: 12 }}
                />
                <YAxis
                  stroke="#6B7280"
                  tick={{ fill: '#4B5563', fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: CHART_COLORS.tooltipBg,
                    border: `1px solid ${CHART_COLORS.grid}`,
                    borderRadius: '0.5rem',
                  }}
                  formatter={(value) => [value, 'Visitors']}
                />
                <Bar
                  dataKey="visitors"
                  fill={CHART_COLORS.barFill}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-60 flex items-center justify-center text-gray-500">
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500 mr-2"></div>
                  Loading visitor data...
                </div>
              ) : (
                'No visitor data available'
              )}
            </div>
          )}
        </div>
      </DashSection>

      <DashSection title={'Quick Actions'}>
        <CardOverview
          setIsNavigating={setIsNavigating}
          className="col-span-12 xl:col-span-7"
          dashboardMetrics={dashboardMetrics}
          quickStats={quickStats}
        />
      </DashSection>

      <DashSection
        title={'Recent Users'}
        titleRight={
          <Link href={'/dashboard/all-users'}>
            <button className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              <Icon icon="ph:users" className="w-4 h-4 mr-2" />
              View All Users
            </button>
          </Link>
        }
      >
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {isLoading ? (
            <LoadingState />
          ) : isError ? (
            <ErrorState />
          ) : users.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th scope="col" className={tableClassName.headTH}>
                      Full Name
                    </th>
                    <th scope="col" className={tableClassName.headTH}>
                      Email Address
                    </th>
                    <th scope="col" className={tableClassName.headTH}>
                      Mobile Number
                    </th>
                    <th scope="col" className={tableClassName.headTH}>
                      PAN Number
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {users.map((user, index) => (
                    <tr
                      key={user?.email || user?._id || index}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className={tableClassName.bodyTD}>
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 mr-3">
                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                              <Icon
                                icon="ph:user"
                                className="w-4 h-4 text-blue-600"
                              />
                            </div>
                          </div>
                          <div className="font-medium text-gray-900">
                            {user?.firstName && user?.lastName
                              ? `${user.firstName} ${user.lastName}`
                              : user?.firstName ||
                                user?.lastName ||
                                'N/A'}
                          </div>
                        </div>
                      </td>
                      <td className={tableClassName.bodyTD}>
                        <div className="text-gray-900">
                          {user?.email || 'N/A'}
                        </div>
                      </td>
                      <td className={tableClassName.bodyTD}>
                        <div className="text-gray-900">
                          {user?.phone || 'N/A'}
                        </div>
                      </td>
                      <td className={tableClassName.bodyTD}>
                        <div className="text-gray-900 font-mono text-xs">
                          {user?.pan || 'N/A'}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState
              title="No Users Found"
              actionButton={
                <Link href={'/dashboard/all-users'}>
                  <button className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    <Icon icon="ph:users" className="w-4 h-4 mr-2" />
                    View Users
                  </button>
                </Link>
              }
            />
          )}
        </div>
      </DashSection>

      <DashSection
        title={'Recent Transactions'}
        titleRight={
          <Link href={'/dashboard/transactions'}>
            <button className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              <Icon icon="ph:receipt" className="w-4 h-4 mr-2" />
              View All Transactions
            </button>
          </Link>
        }
      >
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {isLoading ? (
            <LoadingState />
          ) : isError ? (
            <ErrorState />
          ) : transactions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th scope="col" className={tableClassName.headTH}>
                      Transaction Details
                    </th>
                    <th scope="col" className={tableClassName.headTH}>
                      Transaction ID
                    </th>
                    <th scope="col" className={tableClassName.headTH}>
                      Date & Time
                    </th>
                    <th scope="col" className={tableClassName.headTH}>
                      Amount
                    </th>
                    <th scope="col" className={tableClassName.headTH}>
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {transactions.map((txn, index) => (
                    <tr
                      key={txn?.id || index}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className={tableClassName.bodyTD}>
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 mr-3">
                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                              <Icon
                                icon="ph:arrow-down"
                                className="w-4 h-4 text-blue-600"
                              />
                            </div>
                          </div>
                          <div className="font-medium text-gray-900">
                            {txn?.transactionLabel || 'Payment'}
                          </div>
                        </div>
                      </td>
                      <td className={tableClassName.bodyTD}>
                        <div className="text-gray-900 font-mono text-xs">
                          {txn?.id || 'N/A'}
                        </div>
                      </td>
                      <td className={tableClassName.bodyTD}>
                        <div className="text-gray-900 text-sm">
                          {txn?.dateTime || 'N/A'}
                        </div>
                      </td>
                      <td className={tableClassName.bodyTD}>
                        <div className="text-gray-900 font-semibold">
                          ₹{Number(txn?.amount || 0).toLocaleString('en-IN')}
                        </div>
                      </td>
                      <td className={tableClassName.bodyTD}>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            txn?.status === 'success'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                              txn?.status === 'success'
                                ? 'bg-blue-400'
                                : 'bg-yellow-400'
                            }`}
                          />
                          {txn?.status
                            ? txn.status.charAt(0).toUpperCase() +
                              txn.status.slice(1)
                            : 'Pending'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState title="No Transactions Found" />
          )}
        </div>
      </DashSection>
      </div>
    </div>
  );
}

