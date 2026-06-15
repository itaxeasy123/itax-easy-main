'use client';

import userbackAxios from '@/lib/userbackAxios';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Icon } from '@iconify/react';
import { FaEdit } from 'react-icons/fa';
import Pagination from '@/components/navigation/Pagination';
import Button, { BTN_SIZES } from '@/components/ui/Button';
import CreateAdmin from './CreateAdmin';
import Modal from '@/components/ui/Modal';
import AdminUserTable from '@/components/ui/AdminUserTable';
import { getAdminTableColumnsWithActions } from '@/components/ui/tableColumns';
import { DashPage, StatCard, Panel } from '@/components/dashboard/ui';

const Alladmin = () => {
  const [modal, setModal] = useState(false);
  const [admin, setAdmin] = useState([]);
  const [currentRow, setCurrentRow] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalUser, setTotalUser] = useState({ userCount: 0, pageCount: 0 });

  const getAllUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data, status } = await userbackAxios.get(
        `/user/get-all-admins?page=${currentPage}&order=desc`,
      );
      if (status === 200 && data?.data?.users) {
        const adminUsers = data.data.users.filter((u) => u.userType === 'admin');
        setAdmin(adminUsers);
        setTotalUser({
          userCount: adminUsers.length,
          pageCount: data.data.totalPages,
        });
      }
    } catch (error) {
      console.log('getAllUsers error:', error);
      toast.error('Error getting admins');
    } finally {
      setIsLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    getAllUsers();
  }, [currentPage, getAllUsers]);

  const filteredAdmin = admin.filter((user) => {
    const s = searchTerm.toLowerCase();
    return (
      user.userType === 'admin' &&
      (user.firstName?.toLowerCase().includes(s) ||
        user.lastName?.toLowerCase().includes(s) ||
        user.email?.toLowerCase().includes(s) ||
        user.phone?.includes(searchTerm))
    );
  });

  const closeModal = () => {
    setCurrentRow(null);
    setModal(false);
  };

  return (
    <DashPage
      title="Admin Management"
      subtitle="Manage system administrators"
      icon="ph:user-gear"
      actions={
        <>
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
          <button
            onClick={() => setModal(true)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <Icon icon="lucide:plus" className="h-4 w-4" /> Add Admin
          </button>
        </>
      }
    >
      <div className="mb-6 grid grid-cols-2 gap-4">
        <StatCard
          label="Total Admins"
          value={totalUser.userCount || 0}
          icon="ph:user-gear"
          sub="System administrators"
        />
        <StatCard
          label="Active Admins"
          value={admin.length}
          icon="ph:check-circle"
          tone="emerald"
          sub="Currently active"
        />
      </div>

      <div className="mb-4 relative max-w-md">
        <Icon
          icon="lucide:search"
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
        />
        <input
          type="text"
          placeholder="Search admins by name, email, or phone"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-400"
        />
      </div>

      <Modal
        className={'md:max-w-[950px]'}
        title={
          <span className="text-xl font-semibold text-slate-700">
            {currentRow ? 'Update Admin' : 'Add New Admin'}
          </span>
        }
        onClose={closeModal}
        isOpen={modal}
      >
        <CreateAdmin
          currentRow={currentRow}
          onRefresh={getAllUsers}
          onClose={closeModal}
        />
      </Modal>

      <Panel bodyClassName="p-0">
        <AdminUserTable
          data={filteredAdmin}
          columns={getAdminTableColumnsWithActions((row) => (
            <Button
              className={`${BTN_SIZES['sm']} bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 flex items-center gap-1`}
              onClick={() => {
                setCurrentRow(row);
                setModal(true);
              }}
            >
              <FaEdit className="w-3 h-3" />
              <span className="hidden sm:inline">Edit</span>
            </Button>
          ))}
          isLoading={isLoading}
          isError={false}
          tableTitle="Admin List"
          emptyMessage="No admins found matching your criteria."
          loadingMessage="Loading admins..."
          errorMessage="Error loading admins. Please try again."
          getRoleBadge={() => 'bg-blue-50 text-blue-600 border-blue-100'}
          formatRole={() => 'Administrator'}
          tableType="admin"
        />
      </Panel>

      <div className="mt-4 flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-sm text-slate-500">
          Showing {Math.min(currentPage * 10 + 1, totalUser.userCount)}–
          {Math.min((currentPage + 1) * 10, totalUser.userCount)} of{' '}
          {totalUser.userCount}
        </p>
        <Pagination
          currentPage={currentPage + 1}
          setCurrentPage={setCurrentPage}
          totalPages={totalUser.pageCount}
        />
      </div>
    </DashPage>
  );
};

export default Alladmin;
