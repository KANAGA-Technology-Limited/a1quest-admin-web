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

const AllSubTopics = ({ topic }: { topic: string | undefined }) => {
  const [addModal, setAddModal] = useState(false);
  const [data, setData] = useState<SingleSubTopicType[] | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [editModal, setEditModal] = useState(false);
  const [selected, setSelected] = useState<SubTopicType | undefined>(undefined);
  const [deleteModal, setDeleteModal] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);

      const response = await appAxios.post(`/sub-topics/view-sub-topics`, {
        topic_id: topic,
      });
      setData(response.data?.data);
    } catch (error) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tableHeaders = ['title', 'description', 'tableAction'];

  return (
    <div>
      <PageHeader
        pageTitle='Sub Topics'
        pageActions={
          <Button onClick={() => setAddModal(true)}>
            <AddIcon />
            Add Sub-Topic
          </Button>
        }
      />
      <div>
        <Table
          tableHeaders={tableHeaders}
          data={data || []}
          loading={loading}
          menuItems={[
            {
              label: 'View Sub-Topic',
              onClick: (data: SubTopicType) => {
                navigate(`/topics/sub-topic/${data._id}`);
              },
              permission: true,
              // permission: hasPermission(PERMISSIONS.view_admin),
            },
            {
              label: 'Edit Sub-Topic',
              onClick: (data) => {
                setSelected(data);
                setEditModal(true);
              },
              permission: true,

              // permission: hasPermission(PERMISSIONS.update_admin),
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
              permission: true,

              // permission: hasPermission(PERMISSIONS.delete_admin),
            },
          ]}
        />
      </div>

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
    </div>
  );
};

export default AllSubTopics;
