import { useEffect, useState } from 'react';
import AppLayout from '../../layout/AppLayout';
import PageLayout from '../../layout/PageLayout';
import { appAxios } from '../../api/axios';
import { sendCatchFeedback } from '../../functions/feedback';
import { ClassType, TopicType } from '../../types/data';
import Button from '../../common/Button';
import { AddIcon } from '../../components/icons';
import AddModal from '../../components/topics/AddModal';
import EditModal from '../../components/topics/EditModal';
import DeleteModal from '../../components/topics/DeleteModal';
import { useNavigate } from 'react-router-dom';
import usePermissions from '../../hooks/usePermissions';
import { PERMISSIONS } from '../../hooks/data';
import Pagination from '../../common/Pagination';
// import ViewModal from '../../components/topics/ViewModal';

const Topics = () => {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allClasses, setAllClasses] = useState<ClassType[] | undefined>(undefined);
  const [filter, setFilter] = useState('');
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selected, setSelected] = useState<TopicType | undefined>(undefined);
  const [deleteModal, setDeleteModal] = useState(false);
  const navigate = useNavigate();
  const { hasPermission } = usePermissions();
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);

  const getClasses = async () => {
    try {
      setLoading(true);

      const response = await appAxios.get(`/classes`);
      setAllClasses(response.data?.data);
      setFilter(response.data.data[0]._id);
    } catch (error) {
      sendCatchFeedback(error);
    }
  };
  useEffect(() => {
    hasPermission(PERMISSIONS.view_class) && getClasses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasPermission]);

  const getData = async () => {
    try {
      setLoading(true);

      const response = await appAxios.post(`/topics/view-topics`, {
        ...(filter &&
          filter !== '' && {
            class_id: filter,
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
    if (filter) {
      hasPermission(PERMISSIONS.view_topics) && getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, hasPermission, page]);

  const tableHeaders = ['title', 'description', 'num_of_enrollments', 'tableAction'];

  return (
    <AppLayout>
      <PageLayout
        pageTitle='Topics'
        description='Keep track of of the subject on A1Quest'
        summaryText={
          (allData &&
            allData.length > 0 &&
            `you currently have a total number of ${allData.length} ${
              allData.length > 1 ? 'subjects' : 'subject'
            }`) ||
          ''
        }
        pageActions={
          hasPermission(PERMISSIONS.create_topic) && (
            <Button onClick={() => setAddModal(true)}>
              <AddIcon />
              Add Topic
            </Button>
          )
        }
        tableProps={{
          loading,
          tableHeaders,
          data: allData,
          bodyStyle: {
            textAlign: 'left',
          },
          headerStyle: {
            textAlign: 'left',
          },
          menuItems: [
            {
              label: 'View Topic',
              onClick: (data: TopicType) => {
                navigate(`/topics/${data._id}`);
              },
              permission: hasPermission(PERMISSIONS.view_topic),
            },
            {
              label: 'Edit Topic',
              onClick: (data) => {
                setSelected(data);
                setEditModal(true);
              },
              permission: hasPermission(PERMISSIONS.update_topic),
            },
            {
              label: 'Delete Topic',
              onClick: (data) => {
                setSelected(data);
                setDeleteModal(true);
              },
              style: {
                color: 'var(--error)',
              },
              permission: hasPermission(PERMISSIONS.delete_topic),
            },
          ],
        }}
        pageFilters={
          allClasses
            ? {
                filters: allClasses.map((item) => ({
                  label: item.name,
                  value: item._id,
                })),
                onChange: (value) => setFilter(value),
                activeFilter: filter,
              }
            : undefined
        }
      />
      <Pagination page={page} setPage={setPage} totalResults={totalResults} />

      <AddModal
        open={addModal}
        closeModal={() => setAddModal(false)}
        reload={getData}
        classes={allClasses}
      />
      <EditModal
        open={editModal}
        closeModal={() => setEditModal(false)}
        reload={getData}
        classes={allClasses}
        data={selected}
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

export default Topics;
