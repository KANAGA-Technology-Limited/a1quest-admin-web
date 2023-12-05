import React, { useEffect, useState } from 'react';
import PageHeader from '../../../../layout/PageLayout/PageHeader';
import Button from '../../../../common/Button';
import { AddIcon } from '../../../icons';
import AddModal from './AddModal';
import { appAxios } from '../../../../api/axios';
import { SingleLessonType } from '../../../../types/data';
import { sendCatchFeedback } from '../../../../functions/feedback';
import Table from '../../../../common/Table';
import { useNavigate } from 'react-router-dom';
import EditModal from './EditModal';
import usePermissions from '../../../../hooks/usePermissions';
import { PERMISSIONS } from '../../../../hooks/data';
import Pagination from '../../../../common/Pagination';
import DeleteModal from './DeleteModal';

const AllLessons = ({
  topic,
  subTopic,
}: {
  topic: string | undefined;
  subTopic: string | undefined;
}) => {
  const [addModal, setAddModal] = useState(false);
  const [data, setData] = useState<SingleLessonType[] | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [editModal, setEditModal] = useState(false);
  const [selected, setSelected] = useState<SingleLessonType | undefined>(undefined);
  const [deleteModal, setDeleteModal] = useState(false);
  const { hasPermission } = usePermissions();
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);

  const getData = async () => {
    try {
      setLoading(true);

      const response = await appAxios.post(`/lessons/view-lessons`, {
        populate: {
          path: 'topic_id sub_topic_id created_by last_updated_by',
          select: 'title description firstName lastName',
        },
        topic_id: topic,
        sub_topic_id: subTopic,
        page,
      });
      setData(response.data?.data);
      setTotalResults(response.data?.count);
    } catch (error) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    hasPermission(PERMISSIONS.view_lessons) && getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasPermission, page]);

  const tableHeaders = ['title', 'description', 'tableAction'];

  return (
    <>
      <PageHeader
        pageTitle='Lessons'
        pageActions={
          hasPermission(PERMISSIONS.create_lesson) && (
            <Button onClick={() => setAddModal(true)}>
              <AddIcon />
              Add Lesson
            </Button>
          )
        }
      />

      <Table
        tableHeaders={tableHeaders}
        data={data || []}
        loading={loading}
        bodyStyle={{
          textAlign: 'left',
        }}
        headerStyle={{
          textAlign: 'left',
        }}
        menuItems={[
          {
            label: 'View Lesson',
            onClick: (data: SingleLessonType) => {
              navigate(`/topics/sub-topic/lesson/${data._id}`);
            },
            permission: hasPermission(PERMISSIONS.view_lesson),
          },
          {
            label: 'Edit Lesson',
            onClick: (data) => {
              setSelected(data);
              setEditModal(true);
            },
            permission: hasPermission(PERMISSIONS.update_lesson),
          },
          {
            label: 'Delete Lesson',
            onClick: (data) => {
              setSelected(data);
              setDeleteModal(true);
            },
            style: {
              color: 'var(--error)',
            },
            permission: hasPermission(PERMISSIONS.delete_lesson),
          },
        ]}
      />
      <Pagination page={page} setPage={setPage} totalResults={totalResults} />

      <AddModal
        open={addModal}
        closeModal={() => setAddModal(false)}
        reload={getData}
        topic={topic}
        subTopic={subTopic}
      />
      <EditModal
        open={editModal}
        closeModal={() => setEditModal(false)}
        reload={getData}
        data={selected}
        topic={topic}
        subTopic={subTopic}
      />
      <DeleteModal
        open={deleteModal}
        closeModal={() => setDeleteModal(false)}
        data={selected}
        refetch={getData}
      />
    </>
  );
};

export default AllLessons;
