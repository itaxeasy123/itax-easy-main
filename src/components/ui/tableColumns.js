export const userTableColumns = [
  {
    dataField: 'id',
    text: 'ID'
  },
  {
    dataField: 'firstName',
    text: 'First Name'
  },
  {
    dataField: 'lastName',
    text: 'Last Name'
  },
  {
    dataField: 'email',
    text: 'Email'
  },
  {
    dataField: 'phone',
    text: 'Phone'
  },
  {
    dataField: 'aadhaar',
    text: 'Aadhaar'
  },
  {
    dataField: 'pan',
    text: 'PAN'
  },
  {
    dataField: 'createdAt',
    text: 'Created'
  },
  {
    dataField: 'userType',
    text: 'Role'
  }
];

// Columns for All Admin page
export const adminTableColumns = [
  {
    dataField: 'id',
    text: 'ID'
  },
  {
    dataField: 'firstName',
    text: 'First Name'
  },
  {
    dataField: 'lastName',
    text: 'Last Name'
  },
  {
    dataField: 'email',
    text: 'Email'
  },
  {
    dataField: 'phone',
    text: 'Phone'
  },
  {
    dataField: 'aadhaar',
    text: 'Aadhaar'
  },
  {
    dataField: 'pan',
    text: 'PAN'
  },
  {
    dataField: 'createdAt',
    text: 'Created'
  },
  {
    dataField: 'userType',
    text: 'Role'
  },
  {
    dataField: 'pin',
    text: 'PIN'
  },
  {
    dataField: 'actions',
    text: 'Actions'
  }
];

// Get admin table columns with custom actions
export const getAdminTableColumnsWithActions = (onEditClick) => [
  {
    dataField: 'id',
    text: 'ID'
  },
  {
    dataField: 'firstName',
    text: 'First Name'
  },
  {
    dataField: 'lastName',
    text: 'Last Name'
  },
  {
    dataField: 'email',
    text: 'Email'
  },
  {
    dataField: 'phone',
    text: 'Phone'
  },
  {
    dataField: 'aadhaar',
    text: 'Aadhaar'
  },
  {
    dataField: 'pan',
    text: 'PAN'
  },
  {
    dataField: 'createdAt',
    text: 'Created'
  },
  {
    dataField: 'userType',
    text: 'Role'
  },
  {
    dataField: 'pin',
    text: 'PIN'
  },
  {
    dataField: 'actions',
    text: 'Actions',
    formatter: (data, row) => onEditClick ? onEditClick(row) : null
  }
];

// Alternative column configuration with custom formatters if needed
export const userTableColumnsWithFormatters = [
  {
    dataField: 'id',
    text: 'ID',
    formatter: (data) => (
      <div className="flex items-center">
        <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded-full">
          #{data || 'N/A'}
        </span>
      </div>
    )
  },
  {
    dataField: 'firstName',
    text: 'First Name',
    formatter: (data, row) => (
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center border border-blue-100">
            <span className="text-blue-500 font-semibold text-sm">
              {data?.charAt(0)?.toUpperCase() || row.email?.charAt(0)?.toUpperCase() || '?'}
            </span>
          </div>
        </div>
        <div>
          <div className="text-sm font-medium text-gray-800">
            {data || 'N/A'}
          </div>
          <div className="text-xs text-gray-500">
            User
          </div>
        </div>
      </div>
    )
  },
  {
    dataField: 'lastName',
    text: 'Last Name',
    formatter: (data) => (
      <span className="text-sm font-medium text-gray-900">{data || 'N/A'}</span>
    )
  },
  {
    dataField: 'email',
    text: 'Email',
    formatter: (data) => (
      <span className="text-sm text-blue-500 hover:text-blue-600 cursor-pointer">
        {data || 'N/A'}
      </span>
    )
  },
  {
    dataField: 'phone',
    text: 'Phone',
    formatter: (data) => (
      <span className="text-sm font-mono text-gray-700 bg-gray-50 px-2 py-1 rounded">
        {data || 'N/A'}
      </span>
    )
  },
  {
    dataField: 'aadhaar',
    text: 'Aadhaar',
    formatter: (data) => (
      <span className="text-sm font-mono text-gray-700">
        {data ? `****-****-${data.slice(-4)}` : 'N/A'}
      </span>
    )
  },
  {
    dataField: 'pan',
    text: 'PAN',
    formatter: (data) => (
      <span className="text-sm font-mono bg-yellow-50 text-yellow-700 px-2 py-1 rounded border border-yellow-100">
        {data || 'N/A'}
      </span>
    )
  },
  {
    dataField: 'createdAt',
    text: 'Created',
    formatter: (data) => (
      <div>
        <div className="text-sm text-gray-900">
          {data ? new Date(data).toLocaleDateString() : 'N/A'}
        </div>
        <div className="text-xs text-gray-500">
          {data ? new Date(data).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
          }) : ''}
        </div>
      </div>
    )
  },
  {
    dataField: 'userType',
    text: 'Role',
    formatter: (data, row, getRoleBadge, formatRole) => (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRoleBadge ? getRoleBadge(data) : 'bg-gray-50 text-gray-600 border-gray-100'}`}>
        {formatRole ? formatRole(data) : (data || 'Unknown')}
      </span>
    )
  }
];
