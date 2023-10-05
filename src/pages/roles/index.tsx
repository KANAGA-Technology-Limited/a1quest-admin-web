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
    getData();
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
    getPermissions();
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
          <Button onClick={() => setAddModal(true)}>
            <AddIcon />
            Add Role
          </Button>
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
            },
            {
              label: 'Edit Role',
              onClick: (data) => {
                setSelected(data);
                setEditModal(true);
              },
            },
            {
              label: 'Delete Role',
              onClick: (data) => {
                setSelected(data);
                setDeleteModal(true);
              },
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
