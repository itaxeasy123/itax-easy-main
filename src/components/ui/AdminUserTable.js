import React from 'react';
import Loader from '@/components/partials/loading/Loader';

/**
 * AdminUserTable is a reusable table component for displaying admin and user data
 *
 * @param {Object} props - Component props
 * @param {Array} props.data - Array of user/admin objects to display
 * @param {Array} props.columns - Array of column definitions
 * @param {boolean} props.isLoading - Loading state
 * @param {boolean} props.isError - Error state
 * @param {string} props.emptyMessage - Message to show when no data
 * @param {string} props.loadingMessage - Message to show when loading
 * @param {string} props.errorMessage - Message to show on error
 * @param {string} props.tableTitle - Title for the table section
 * @param {Function} props.getRoleBadge - Function to get role badge styling
 * @param {Function} props.formatRole - Function to format role display name
 * @param {ReactNode} props.actions - Optional actions component for each row
 * @param {string} props.tableType - Type of table ('admin' or 'user') for styling
 */
const AdminUserTable = ({
  data = [],
  columns = [],
  isLoading = false,
  isError = false,
  emptyMessage = "No data found matching your criteria.",
  loadingMessage = "Loading...",
  errorMessage = "Error loading data. Please try again.",
  tableTitle = "Data List",
  getRoleBadge,
  formatRole,
  actions,
  tableType = 'user'
}) => {
  
  // Helper function to render cell content
  const renderCellContent = (column, user, index) => {
    if (column.formatter) {
      return column.formatter(user[column.dataField], user, index);
    }

    switch (column.dataField) {
      case 'id':
        return (
          <div className="flex items-center">
            <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded-full">
              #{user.id || 'N/A'}
            </span>
          </div>
        );

      case 'firstName':
        return (
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center border border-blue-100">
                <span className="text-blue-500 font-semibold text-sm">
                  {user.firstName?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || '?'}
                </span>
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-800">
                {user.firstName || 'N/A'}
              </div>
              <div className="text-xs text-gray-500">
                {tableType === 'admin' ? 'Admin' : 'User'}
              </div>
            </div>
          </div>
        );

      case 'lastName':
        return (
          <span className="text-sm font-medium text-gray-900">
            {user.lastName || 'N/A'}
          </span>
        );

      case 'email':
        return (
          <span className="text-sm text-blue-500 hover:text-blue-600 cursor-pointer">
            {user.email || 'N/A'}
          </span>
        );

      case 'phone':
        return (
          <span className="text-sm font-mono text-gray-700 bg-gray-50 px-2 py-1 rounded">
            {user.phone || 'N/A'}
          </span>
        );

      case 'aadhaar':
        return (
          <span className="text-sm font-mono text-gray-700">
            {user.aadhaar ? `****-****-${user.aadhaar.slice(-4)}` : 'N/A'}
          </span>
        );

      case 'pan':
        return (
          <span className="text-sm font-mono bg-yellow-50 text-yellow-700 px-2 py-1 rounded border border-yellow-100">
            {user.pan || 'N/A'}
          </span>
        );

      case 'createdAt':
        return (
          <div>
            <div className="text-sm text-gray-900">
              {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
            </div>
            <div className="text-xs text-gray-500">
              {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                year: 'numeric'
              }) : ''}
            </div>
          </div>
        );

      case 'userType':
      case 'role':
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRoleBadge ? getRoleBadge(user.userType) : 'bg-gray-50 text-gray-600 border-gray-100'}`}>
            {formatRole ? formatRole(user.userType) : (user.userType || 'Unknown')}
          </span>
        );

      case 'pin':
        return (
          <span className="text-sm font-mono text-gray-600">
            {user.pin ? '****' : 'N/A'}
          </span>
        );

      case 'actions':
        return actions ? actions(user, index) : (column.formatter ? column.formatter(user[column.dataField], user, index) : null);

      default:
        return (
          <span className="text-sm text-gray-900">
            {user[column.dataField] || 'N/A'}
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      {/* Table Header */}
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-700">{tableTitle}</h3>
        </div>
      </div>
      
      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 border-collapse">
          <thead className="text-xs text-white bg-blue-600">
            <tr>
              {columns.map((column, index) => (
                <th key={index} className="px-4 py-2 font-semibold">
                  {column.text}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr 
                  key={item.email || item.id || index} 
                  className={`${index % 2 === 0 ? "bg-white" : "bg-blue-50"} border-b hover:bg-gray-50 transition-colors`}
                >
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className="px-4 py-2">
                      {renderCellContent(column, item, index)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-gray-500">
                  {isLoading ? (
                    <Loader />
                  ) : isError ? (
                    <div className="text-red-500">
                      <span>{errorMessage}</span>
                    </div>
                  ) : (
                    <div>
                      <span>{emptyMessage}</span>
                    </div>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUserTable;
