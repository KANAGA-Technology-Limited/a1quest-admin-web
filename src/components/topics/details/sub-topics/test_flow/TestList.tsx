import React, { useEffect, useState } from 'react';
import { PERMISSIONS } from '../../../../../hooks/data';
import AddModal from './AddModal';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import Table from '../../../../../common/Table';
import ViewModal from './ViewModal';
import PageHeader from '../../../../../layout/PageLayout/PageHeader';
import { sendCatchFeedback } from '../../../../../functions/feedback';
import { appAxios } from '../../../../../api/axios';
import { TestType } from '../../../../../types/data';
import usePermissions from '../../../../../hooks/usePermissions';
import Button from '../../../../../common/Button';
import { AddIcon } from '../../../../icons';

const TestList = ({ subTopic, topic }: { subTopic: string; topic: string }) => {
  const [addModal, setAddModal] = useState(false);
  const [data, setData] = useState<TestType[] | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [editModal, setEditModal] = useState(false);
  const [selected, setSelected] = useState<TestType | undefined>(undefined);
  const [deleteModal, setDeleteModal] = useState(false);
  const { hasPermission } = usePermissions();
  const [viewModal, setViewModal] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);

      const response = await appAxios.post(`/tests/view-tests`, {
        sub_topic_id: subTopic,
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
    hasPermission(PERMISSIONS.view_tests) && getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tableHeaders = ['creation_date', 'duration', 'tableAction'];

  return (
    <div>
      <PageHeader
        pageTitle='Tests'
        pageActions={
          hasPermission(PERMISSIONS.create_test) && (
            <Button onClick={() => setAddModal(true)}>
              <AddIcon />
              Add Test
            </Button>
          )
        }
      />
      <div>
        <Table
          tableHeaders={tableHeaders}
          data={data || []}
          loading={loading}
          menuItems={[
            {
              label: 'View Test',
              onClick: (data) => {
                setSelected(data);
                setViewModal(true);
              },
              permission: hasPermission(PERMISSIONS.view_test),
            },
            {
              label: 'Edit Test',
              onClick: (data) => {
                setSelected(data);
                setEditModal(true);
              },
              permission: hasPermission(PERMISSIONS.update_test),
            },
            {
              label: 'Delete Test',
              onClick: (data) => {
                setSelected(data);
                setDeleteModal(true);
              },
              style: {
                color: 'var(--error)',
              },
              permission: hasPermission(PERMISSIONS.delete_test),
            },
          ]}
        />
      </div>

      {/* Not done */}
      <AddModal
        open={addModal}
        closeModal={() => setAddModal(false)}
        reload={getData}
        subTopic={subTopic}
        topic={topic}
      />

      {/* Not done */}
      <EditModal
        open={editModal}
        closeModal={() => setEditModal(false)}
        reload={getData}
        data={selected}
        subTopic={subTopic}
        topic={topic}
      />

      <DeleteModal
        open={deleteModal}
        closeModal={() => setDeleteModal(false)}
        data={selected}
        refetch={getData}
      />
      <ViewModal
        open={viewModal}
        closeModal={() => setViewModal(false)}
        data={selected}
      />
    </div>
  );
};

export default TestList;
