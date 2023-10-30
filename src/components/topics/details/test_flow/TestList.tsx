import React, { useEffect, useState } from 'react';
import { PERMISSIONS } from '../../../../hooks/data';
import AddModal from './AddModal';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import Table from '../../../../common/Table';
import ViewModal from './ViewModal';
import PageHeader from '../../../../layout/PageLayout/PageHeader';
import { sendCatchFeedback } from '../../../../functions/feedback';
import { appAxios } from '../../../../api/axios';
import { TestType } from '../../../../types/data';
import usePermissions from '../../../../hooks/usePermissions';
import Button from '../../../../common/Button';
import { AddIcon } from '../../../icons';
import Pagination from '../../../../common/Pagination';

const TestList = ({ topic }: { topic: string }) => {
  const [addModal, setAddModal] = useState(false);
  const [data, setData] = useState<TestType[] | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [editModal, setEditModal] = useState(false);
  const [selected, setSelected] = useState<TestType | undefined>(undefined);
  const [deleteModal, setDeleteModal] = useState(false);
  const { hasPermission } = usePermissions();
  const [viewModal, setViewModal] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);

  const getData = async () => {
    try {
      setLoading(true);

      const response = await appAxios.post(`/tests/view-tests`, {
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
    hasPermission(PERMISSIONS.view_tests) && getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, hasPermission]);

  const tableHeaders = ['creation_date', 'duration', 'tableAction'];

  return (
    <>
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
      <ViewModal
        open={viewModal}
        closeModal={() => setViewModal(false)}
        data={selected}
      />
    </>
  );
};

export default TestList;
