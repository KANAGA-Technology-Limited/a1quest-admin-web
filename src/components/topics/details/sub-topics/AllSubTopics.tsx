import React, { useEffect, useState } from 'react';
import PageHeader from '../../../../layout/PageLayout/PageHeader';
import Button from '../../../../common/Button';
import { AddIcon } from '../../../icons';
import AddModal from './AddModal';
import { appAxios } from '../../../../api/axios';
import { SingleSubTopicType, SubTopicType } from '../../../../types/data';
import { sendCatchFeedback } from '../../../../functions/feedback';
import Table from '../../../../common/Table';
import { useNavigate } from 'react-router-dom';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import usePermissions from '../../../../hooks/usePermissions';
import { PERMISSIONS } from '../../../../hooks/data';
import Pagination from '../../../../common/Pagination';

const AllSubTopics = ({ topic }: { topic: string | undefined }) => {
  const [addModal, setAddModal] = useState(false);
  const [data, setData] = useState<SingleSubTopicType[] | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [editModal, setEditModal] = useState(false);
  const [selected, setSelected] = useState<SubTopicType | undefined>(undefined);
  const [deleteModal, setDeleteModal] = useState(false);
  const { hasPermission } = usePermissions();
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);

  const getData = async () => {
    try {
      setLoading(true);

      const response = await appAxios.post(`/sub-topics/view-sub-topics`, {
        topic_id: topic,
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
    hasPermission(PERMISSIONS.view_subtopics) && getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasPermission, page]);

  const tableHeaders = ['title', 'description', 'tableAction'];

  return (
    <>
      <PageHeader
        pageTitle='Sub Topics'
        pageActions={
          hasPermission(PERMISSIONS.create_subtopic) && (
            <Button onClick={() => setAddModal(true)}>
              <AddIcon />
              Add Sub-Topic
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
            label: 'View Sub-Topic',
            onClick: (data: SubTopicType) => {
              navigate(`/topics/sub-topic/${data._id}`);
            },
            permission: hasPermission(PERMISSIONS.view_subtopic),
          },
          {
            label: 'Edit Sub-Topic',
            onClick: (data) => {
              setSelected(data);
              setEditModal(true);
            },
            permission: hasPermission(PERMISSIONS.update_subtopic),
          },
          {
            label: 'Delete Sub-Topic',
            onClick: (data) => {
              setSelected(data);
              setDeleteModal(true);
            },
            style: {
              color: 'var(--error)',
            },
            permission: hasPermission(PERMISSIONS.delete_subtopic),
          },
        ]}
      />
      <Pagination page={page} setPage={setPage} totalResults={totalResults} />

      <AddModal
        open={addModal}
        closeModal={() => setAddModal(false)}
        reload={getData}
        topic={topic}
      />
      <EditModal
        open={editModal}
        closeModal={() => setEditModal(false)}
        reload={getData}
        data={selected}
        topic={topic}
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

export default AllSubTopics;
