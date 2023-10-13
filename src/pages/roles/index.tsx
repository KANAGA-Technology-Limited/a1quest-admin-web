import { useEffect, useState } from 'react';
import AppLayout from '../../layout/AppLayout';
import PageLayout from '../../layout/PageLayout';
import { appAxios } from '../../api/axios';
import { sendCatchFeedback } from '../../functions/feedback';
import { PermissionType, RoleType } from '../../types/data';
import ViewModal from '../../components/roles/ViewModal';
import AddModal from '../../components/roles/AddModal';
import EditModal from '../../components/roles/EditModal';
import DeleteModal from '../../components/roles/DeleteModal';
import Button from '../../common/Button';
import { AddIcon } from '../../components/icons';
import usePermissions from '../../hooks/usePermissions';
import { PERMISSIONS } from '../../hooks/data';
// import ViewModal from '../../components/topics/ViewModal';

const Roles = () => {
  const [allData, setAllData] = useState([]);
  const [allPermissions, setAllPermissions] = useState<PermissionType[] | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true);
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [selected, setSelected] = useState<RoleType | undefined>(undefined);
  const { hasPermission } = usePermissions();

  const getData = async () => {
    try {
      setLoading(true);
      const response = await appAxios.get(`/roles`);
      setAllData(response.data?.data);
    } catch (error) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    hasPermission(PERMISSIONS.view_roles) && getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPermissions = async () => {
    try {
      const response = await appAxios.get(`/roles/permissions`);
      setAllPermissions(response.data?.data);
    } catch (error) {
      sendCatchFeedback(error);
    }
  };

  useEffect(() => {
    hasPermission(PERMISSIONS.view_permissions) && getPermissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tableHeaders = ['name', 'numOfAdmins', 'createdAt', 'tableAction'];

  return (
    <AppLayout>
      <PageLayout
        pageTitle='Roles'
        description='Manage roles and admin functionality'
        summaryText={
          (allData &&
            allData.length > 0 &&
            `${allData.length} ${allData.length > 1 ? 'roles' : 'role'} created`) ||
          ''
        }
        pageActions={
          hasPermission(PERMISSIONS.create_role) && (
            <Button onClick={() => setAddModal(true)}>
              <AddIcon />
              Add Role
            </Button>
          )
        }
        tableProps={{
          loading,
          tableHeaders,
          data: allData,
          menuItems: [
            {
              label: 'View Role',
              onClick: (data) => {
                setSelected(data);
                setViewModal(true);
              },
              permission: hasPermission(PERMISSIONS.view_role),
            },
            {
              label: 'Edit Role',
              onClick: (data) => {
                setSelected(data);
                setEditModal(true);
              },
              permission: hasPermission(PERMISSIONS.update_role),
            },
            {
              label: 'Delete Role',
              onClick: (data) => {
                setSelected(data);
                setDeleteModal(true);
              },
              permission: hasPermission(PERMISSIONS.delete_role),
              style: {
                color: 'var(--error)',
              },
            },
          ],
        }}
      />

      <ViewModal
        open={viewModal}
        closeModal={() => setViewModal(false)}
        data={selected}
        permissions={allPermissions}
      />
      <AddModal
        open={addModal}
        closeModal={() => setAddModal(false)}
        refetch={getData}
        permissions={allPermissions}
      />
      <EditModal
        open={editModal}
        closeModal={() => setEditModal(false)}
        data={selected}
        refetch={getData}
        permissions={allPermissions}
      />
      <DeleteModal
        open={deleteModal}
        closeModal={() => setDeleteModal(false)}
        data={selected}
        refetch={getData}
      />
    </AppLayout>
  );
};

export default Roles;
