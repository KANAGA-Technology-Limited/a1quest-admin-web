import { useEffect, useState } from 'react';
import { appAxios } from '../../../../api/axios';
import Button from '../../../../common/Button';
import Pagination from '../../../../common/Pagination';
import Table from '../../../../common/Table';
import { sendCatchFeedback } from '../../../../functions/feedback';
import { PERMISSIONS } from '../../../../hooks/data';
import usePermissions from '../../../../hooks/usePermissions';
import PageHeader from '../../../../layout/PageLayout/PageHeader';
import { TestType } from '../../../../types/data';
import { AddIcon } from '../../../icons';
import AddModal from './AddModal';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';
import ViewModal from './ViewModal';

const TestList = ({
  topic,
  minimumQuestion = 0,
}: {
  topic: string;
  minimumQuestion: number;
}) => {
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

      const response = await appAxios.post(`/questions/view-questions`, {
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
    hasPermission(PERMISSIONS.view_questions) && getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, hasPermission]);

  const tableHeaders = ['title', 'question_type', 'question_input_type', 'tableAction'];

  return (
    <>
      <PageHeader
        pageTitle={`Test Questions (${minimumQuestion} minimum)`}
        pageActions={
          hasPermission(PERMISSIONS.create_question) && (
            <Button onClick={() => setAddModal(true)}>
              <AddIcon />
              Add Question
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
            label: 'View Question',
            onClick: (data) => {
              setSelected(data);
              setViewModal(true);
            },
            permission: hasPermission(PERMISSIONS.view_question),
          },
          {
            label: 'Edit Question',
            onClick: (data) => {
              setSelected(data);
              setEditModal(true);
            },
            permission: hasPermission(PERMISSIONS.update_question),
          },
          {
            label: 'Delete Question',
            onClick: (data) => {
              setSelected(data);
              setDeleteModal(true);
            },
            style: {
              color: 'var(--error)',
            },
            permission: hasPermission(PERMISSIONS.delete_question),
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
