export const DashboardSidebarItemsData = {

  normal: [
    {
      upcoming: false,
      title: 'Dashboard',
      linkTo: '/dashboard',
      iconName: 'material-symbols:dashboard',
      subMenu: false,
    },

    {
      upcoming: false,
      title: 'ITR',
      iconName: 'fa6-solid:percent',
      linkTo: '/dashboard/itr-filing',
      subMenu: false,
    },

    {
      upcoming: false,
      title: 'Transactions',
      iconName: 'clarity:two-way-arrows-line',
      linkTo: '/dashboard/transactions',
      subMenu: false,
    },
    {
      upcoming: false,
      title: 'Order History',
      iconName: 'clarity:two-way-arrows-line',
      linkTo: '/dashboard/order-history',
      subMenu: false,
    },
    {
      upcoming: false,
      title: 'Reports',
      iconName: 'tabler:report',
      subMenu: true,
      subMenuItems: [
        {
          title: 'Project Report',
          iconName: 'lets-icons:subttasks-alt-fill',
          upcoming: false,
          linkTo: '/dashboard/reports/project-report',
        },
      ],
    },
    {
      upcoming: false,
      title: 'Settings',
      iconName: 'material-symbols:settings',
      subMenu: true,
      subMenuItems: [
        {
          title: 'User Account',
          iconName: 'lets-icons:subttasks-alt-fill',
          upcoming: false,
          linkTo: '/profile',
        },
        {
          title: 'Business profile',
          iconName: 'lets-icons:subttasks-alt-fill',
          linkTo: '/profile',
        },
      ],
    },
  ],

  admin: [
    {
      upcoming: false,
      title: 'Dashboard',
      linkTo: '/dashboard',
      iconName: 'material-symbols:dashboard',
      subMenu: false,
    },
    {
      upcoming: false,
      title: 'My Network',
      iconName: 'mdi:user',
      subMenu: true,
      subMenuItems: [
        {
          upcoming: false,
          linkTo: '/dashboard/my-network/agents',
          title: 'Agents',
          iconName: 'lets-icons:subttasks-alt-fill',
        },
        {
          upcoming: false,
          linkTo: '/dashboard/my-network/clients',
          title: 'Clients',
          iconName: 'lets-icons:subttasks-alt-fill',
        },
      ],
    },
    
    {
      upcoming: false,
      title: 'Transactions',
      iconName: 'clarity:two-way-arrows-line',
      linkTo: '/dashboard/transactions',
      subMenu: false,
    },
    
  ],
  

  superAdmin: [
    {
      upcoming: false,
      title: 'Dashboard',
       linkTo: '/dashboard/superadmin',
      iconName: 'material-symbols:dashboard',
      subMenu: false,
    },

    {
      upcoming: false,
      title: 'users/admins',
      iconName: 'mdi:user',
      subMenu: true,
      subMenuItems: [
        {
          upcoming: false,
          linkTo: '/dashboard/all-users',
          title: ' Users',
          iconName: 'lets-icons:subttasks-alt-fill',
        },
        {
          upcoming: false,
          linkTo: '/dashboard/all-admin',
          title: ' Admins',
          iconName: 'lets-icons:subttasks-alt-fill',
        },
      ],
    },
    

    {
      upcoming: false,
      title: 'Transactions',
      iconName: 'clarity:two-way-arrows-line',
      linkTo: '/dashboard/transactions',
      subMenu: false,
    },
    {
      upcoming: false,
      title: 'Project Reports',
      iconName: 'mdi:file-document-outline',
      linkTo: '/dashboard/project-reports',
      subMenu: false,
    },
    {
      upcoming: false,
      title: 'ITR Requests',
      iconName: 'mdi:file-account-outline',
      linkTo: '/dashboard/itr-inquiries',
      subMenu: false,
    },

  ],
};