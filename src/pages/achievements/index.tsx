import React, { useEffect, useState } from 'react';
import { AchievementType } from '../../types/data';
import usePermissions from '../../hooks/usePermissions';
import { appAxios } from '../../api/axios';
import { sendCatchFeedback } from '../../functions/feedback';
import { PERMISSIONS } from '../../hooks/data';
import AppLayout from '../../layout/AppLayout';
import PageLayout from '../../layout/PageLayout';
import Button from '../../common/Button';
import { AddIcon } from '../../components/icons';
import Pagination from '../../common/Pagination';
import AddModal from '../../components/achievements/AddModal';
import EditModal from '../../components/achievements/EditModal';
import ViewModal from '../../components/achievements/ViewModal';
import DeleteModal from '../../components/achievements/DeleteModal';

const AchievementsPage = () => {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addModal, setAddModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selected, setSelected] = useState<AchievementType | undefined>(undefined);
  const { hasPermission } = usePermissions();
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);

  const getData = async () => {
    try {
      setLoading(true);

      const response = await appAxios.get(`/achievements`);
      setAllData(response.data?.data);
      setTotalResults(response.data?.count);
    } catch (error) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    hasPermission(PERMISSIONS.view_achievements) && getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasPermission, page]);

  const tableHeaders = [
    'badge',
    'name',
    'notification_message',
    'active',
    'creation_date',
    'tableAction',
  ];
  return (
    <AppLayout>
      <PageLayout
        pageTitle='Achievements'
        description='Manage achievements'
        summaryText={
          (allData &&
            allData.length > 0 &&
            `${allData.length} ${allData.length > 1 ? 'achievements' : 'achievement'}`) ||
          ''
        }
        pageActions={
          hasPermission(PERMISSIONS.create_achievement) && (
            <Button onClick={() => setAddModal(true)}>
              <AddIcon />
              Add achievement
            </Button>
          )
        }
        tableProps={{
          loading,
          tableHeaders,
          data: allData,
          menuItems: [
            {
              label: 'View Achievement',
              onClick: (data) => {
                setSelected(data);
                setViewModal(true);
              },
              permission: hasPermission(PERMISSIONS.view_achievement),
            },
            {
              label: 'Edit Achievement',
              onClick: (data) => {
                setSelected(data);
                setEditModal(true);
              },
              permission: hasPermission(PERMISSIONS.update_achievement),
            },
            {
              label: 'Delete Achievement',
              onClick: (data) => {
                setSelected(data);
                setDeleteModal(true);
              },
              style: {
                color: 'var(--error)',
              },
              permission: hasPermission(PERMISSIONS.delete_achievement),
            },
          ],
        }}
      />
      <Pagination page={page} setPage={setPage} totalResults={totalResults} />
      <AddModal open={addModal} closeModal={() => setAddModal(false)} reload={getData} />
      <EditModal
        open={editModal}
        closeModal={() => setEditModal(false)}
        reload={getData}
        data={selected}
      />
      <ViewModal
        open={viewModal}
        closeModal={() => setViewModal(false)}
        id={selected?._id || ''}
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

export default AchievementsPage;
