'use client';
import userbackAxios from '@/lib/userbackAxios';
import { useCallback, useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { toast } from 'react-toastify';
import AdminUserTable from '@/components/ui/AdminUserTable';
import { userTableColumns } from '@/components/ui/tableColumns';
import { DashPage, StatCard, Panel } from '@/components/dashboard/ui';

const ROLE_BADGE = {
  superadmin: 'bg-violet-50 text-violet-600 border-violet-100',
  admin: 'bg-blue-50 text-blue-600 border-blue-100',
  normal: 'bg-emerald-50 text-emerald-600 border-emerald-100',
};
const ROLE_LABEL = {
  superadmin: 'Super Admin',
  admin: 'Administrator',
  normal: 'User',
};

const Allusers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalUser, setTotalUser] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const getAllUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const resp = await userbackAxios.get(`/user/get-all-users?page=${currentPage}`);
      if (resp.data?.data) {
        setTotalUser(resp.data.data.totalusers || 0);
        setUsers(resp.data.data.users || []);
        setTotalPages(resp.data.data.totalPages || 1);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setIsError(true);
      toast.error('Error getting users');
    } finally {
      setIsLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    getAllUsers();
  }, [currentPage, getAllUsers]);

  const filteredUsers = users.filter((user) => {
    const s = searchTerm.toLowerCase();
    const matchesSearch =
      user.firstName?.toLowerCase().includes(s) ||
      user.lastName?.toLowerCase().includes(s) ||
      user.email?.toLowerCase().includes(s) ||
      user.phone?.includes(searchTerm);
    const role = user.userType?.toLowerCase();
    const matchesRole = filterRole === 'all' || role === filterRole.toLowerCase();
    return matchesSearch && matchesRole;
  });

  const countBy = (r) =>
    users.filter((u) => u.userType?.toLowerCase() === r).length;

  return (
    <DashPage
      title="User Management"
      subtitle="Manage all system users and their roles"
      icon="mdi:account-group-outline"
      actions={
        <button
          onClick={getAllUsers}
          disabled={isLoading}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-60"
        >
          <Icon
            icon="lucide:refresh-cw"
            className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`}
          />
          Refresh
        </button>
      }
    >
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total Users" value={totalUser || 0} icon="ph:users" sub="All system users" />
        <StatCard label="Super Admins" value={countBy('superadmin')} icon="mdi:shield-crown-outline" tone="violet" />
        <StatCard label="Admins" value={countBy('admin')} icon="ph:user-gear" tone="blue" />
        <StatCard label="Regular Users" value={countBy('normal')} icon="ph:user" tone="emerald" />
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Icon
            icon="lucide:search"
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search users by name, email, or phone"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-400"
          />
        </div>
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400"
        >
          <option value="all">All Roles</option>
          <option value="superadmin">Super Admin</option>
          <option value="admin">Administrator</option>
          <option value="normal">Regular User</option>
        </select>
      </div>

      <Panel bodyClassName="p-0">
        <AdminUserTable
          data={filteredUsers}
          columns={userTableColumns}
          isLoading={isLoading}
          isError={isError}
          tableTitle="User List"
          emptyMessage="No users found matching your criteria."
          loadingMessage="Loading users..."
          errorMessage="Error loading users. Please try again."
          getRoleBadge={(t) => ROLE_BADGE[t?.toLowerCase()] || 'bg-slate-50 text-slate-600 border-slate-100'}
          formatRole={(t) => ROLE_LABEL[t?.toLowerCase()] || t || 'Unknown'}
          tableType="user"
        />
      </Panel>

      <div className="mt-4 flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-sm text-slate-500">
          Showing {Math.min(currentPage * 10 + 1, totalUser)}–
          {Math.min((currentPage + 1) * 10, totalUser)} of {totalUser}
        </p>
        <Pagination page={currentPage} setPage={setCurrentPage} totalPages={totalPages} />
      </div>
    </DashPage>
  );
};

function Pagination({ page, setPage, totalPages }) {
  return (
    <div className="inline-flex items-center gap-1">
      <button
        disabled={+page === 0}
        onClick={() => setPage((p) => +p - 1)}
        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-40"
      >
        <Icon icon="lucide:chevron-left" className="h-4 w-4" /> Prev
      </button>
      <span className="px-3 text-sm font-medium text-slate-600">
        {+page + 1} / {Math.max(totalPages, 1)}
      </span>
      <button
        disabled={+totalPages === +page + 1 || totalPages === 0}
        onClick={() => setPage((p) => +p + 1)}
        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-40"
      >
        Next <Icon icon="lucide:chevron-right" className="h-4 w-4" />
      </button>
    </div>
  );
}

export default Allusers;
