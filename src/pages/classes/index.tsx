import { useEffect, useState } from 'react';
import AppLayout from '../../layout/AppLayout';
import PageLayout from '../../layout/PageLayout';
import { appAxios } from '../../api/axios';
import { sendCatchFeedback } from '../../functions/feedback';
import { ClassType } from '../../types/data';
import Button from '../../common/Button';
import { AddIcon } from '../../components/icons';
import ViewModal from '../../components/classes/ViewModal';
import AddModal from '../../components/classes/AddModal';
import EditModal from '../../components/classes/EditModal';
import DeleteModal from '../../components/classes/DeleteModal';
import usePermissions from '../../hooks/usePermissions';
import { PERMISSIONS } from '../../hooks/data';
import Pagination from '../../common/Pagination';

const Classes = () => {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [selected, setSelected] = useState<ClassType | undefined>(undefined);
  const { hasPermission } = usePermissions();
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await appAxios.get(`/classes?page=${page}`);
      setAllData(response.data?.data);
      setTotalResults(response.data?.count);
    } catch (error) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    hasPermission(PERMISSIONS.view_class) && getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasPermission, page]);

  const tableHeaders = ['name', 'topics', 'subTopics', 'users', 'tableAction'];

  return (
    <AppLayout>
      <PageLayout
        pageTitle='Classes'
        description='Keep track of the number of classes on A1Quest'
        summaryText={
          (allData && allData.length > 0 && allData.length > 1
            ? `there are currently ${allData.length} classes`
            : `there is currently ${allData.length} class`) || ''
        }
        pageActions={
          hasPermission(PERMISSIONS.create_class) && (
            <Button onClick={() => setAddModal(true)}>
              <AddIcon />
              Add Class
            </Button>
          )
        }
        tableProps={{
          loading,
          tableHeaders,
          data: allData,
          menuItems: [
            {
              label: 'View Class',
              onClick: (data) => {
                setSelected(data);
                setViewModal(true);
              },
              permission: hasPermission(PERMISSIONS.view_class),
            },
            {
              label: 'Edit Class',
              onClick: (data) => {
                setSelected(data);
                setEditModal(true);
              },
              permission: hasPermission(PERMISSIONS.update_class),
            },
            {
              label: 'Delete Class',
              onClick: (data) => {
                setSelected(data);
                setDeleteModal(true);
              },
              style: {
                color: 'var(--error)',
              },
              permission: hasPermission(PERMISSIONS.delete_class),
            },
          ],
        }}
      />
      <Pagination page={page} setPage={setPage} totalResults={totalResults} />

      <ViewModal
        open={viewModal}
        closeModal={() => setViewModal(false)}
        data={selected}
      />
      <AddModal open={addModal} closeModal={() => setAddModal(false)} refetch={getData} />
      <EditModal
        open={editModal}
        closeModal={() => setEditModal(false)}
        data={selected}
        refetch={getData}
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

export default Classes;
