import { useEffect, useState } from 'react';
import Button from '../../common/Button';
import AppLayout from '../../layout/AppLayout';
import PageLayout from '../../layout/PageLayout';
import { appAxios } from '../../api/axios';
import { sendCatchFeedback } from '../../functions/feedback';
import AddModal from '../../components/admins/AddModal';
import ViewModal from '../../components/admins/ViewModal';
import { AddIcon } from '../../components/icons';
import { AdminType, RoleType } from '../../types/data';
import EditModal from '../../components/admins/EditModal';
import DeleteModal from '../../components/admins/DeleteModal';
import AssignRole from '../../components/admins/AssignRole';
import usePermissions from '../../hooks/usePermissions';
import { PERMISSIONS } from '../../hooks/data';
import Pagination from '../../common/Pagination';

function Admins() {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addModal, setAddModal] = useState(false);
  const [assignModal, setAssignModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selected, setSelected] = useState<AdminType | undefined>(undefined);
  const [allRoles, setAllRoles] = useState<RoleType[] | undefined>(undefined);
  const [filter, setFilter] = useState('all');
  const { hasPermission } = usePermissions();
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);

  const getData = async () => {
    try {
      setLoading(true);

      const response = await appAxios.post(`/admin-mgmt/get`, {
        ...(filter &&
          filter !== 'all' && {
            populate: { path: 'roles', select: 'name' },
            roles: filter,
          }),
        page,
      });
      setAllData(response.data?.data);
      setTotalResults(response.data?.count);
    } catch (error) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    hasPermission(PERMISSIONS.view_admins) && getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, hasPermission, page]);

  const getRoles = async () => {
    try {
      setLoading(true);
      const response = await appAxios.get(`/roles`, {});
      setAllRoles(response.data?.data);
    } catch (error) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    hasPermission(PERMISSIONS.view_roles) && getRoles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasPermission]);

  const tableHeaders = [
    'firstName',
    'lastName',
    'email',
    'phoneNumber',
    'userName',
    'role',
    'tableAction',
  ];

  return (
    <AppLayout>
      <PageLayout
        pageTitle='Administrators'
        description='Manage admins, assign roles'
        summaryText={
          (allData &&
            allData.length > 0 &&
            `${allData.length} ${allData.length > 1 ? 'admins' : 'admin'}`) ||
          ''
        }
        pageActions={
          hasPermission(PERMISSIONS.create_admin) && (
            <Button onClick={() => setAddModal(true)}>
              <AddIcon />
              Add admin
            </Button>
          )
        }
        tableProps={{
          loading,
          tableHeaders,
          data: allData,
          menuItems: [
            {
              label: 'View Admin',
              onClick: (data) => {
                setSelected(data);
                setViewModal(true);
              },
              permission: hasPermission(PERMISSIONS.view_admin),
            },
            {
              label: 'Edit Admin',
              onClick: (data) => {
                setSelected(data);
                setEditModal(true);
              },
              permission: hasPermission(PERMISSIONS.update_admin),
            },
            {
              label: 'Assign Role',
              onClick: (data) => {
                setSelected(data);
                setAssignModal(true);
              },
              permission: hasPermission(PERMISSIONS.assign_to_admin),
            },
            {
              label: 'Delete Admin',
              onClick: (data) => {
                setSelected(data);
                setDeleteModal(true);
              },
              style: {
                color: 'var(--error)',
              },
              permission: hasPermission(PERMISSIONS.delete_admin),
            },
          ],
        }}
        pageFilters={
          allRoles
            ? {
                filters: [
                  {
                    label: 'All',
                    value: 'all',
                  },
                  ...allRoles.map((item) => ({
                    label: item.name,
                    value: item._id,
                  })),
                ],
                onChange: (value) => setFilter(value),
                activeFilter: filter,
              }
            : undefined
        }
      />
      <Pagination page={page} setPage={setPage} totalResults={totalResults} />
      <AddModal open={addModal} closeModal={() => setAddModal(false)} reload={getData} />
      <EditModal
        open={editModal}
        closeModal={() => setEditModal(false)}
        reload={getData}
        data={selected}
      />
      <AssignRole
        open={assignModal}
        closeModal={() => setAssignModal(false)}
        reload={getData}
        data={selected}
        allRoles={allRoles}
      />
      <ViewModal
        open={viewModal}
        closeModal={() => setViewModal(false)}
        id={selected?._id || ''}
      />
      <DeleteModal
        open={deleteModal}
        closeModal={() => setDeleteModal(false)}
        data={selected}
        refetch={getData}
      />
    </AppLayout>
  );
}

export default Admins;
