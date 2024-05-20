import { useEffect, useState } from 'react';
import { appAxios } from '../../api/axios';
import Button from '../../common/Button';
import Pagination from '../../common/Pagination';
import AddModal from '../../components/broadcasts/AddModal';
import ViewModal from '../../components/broadcasts/ViewModal';
import { SendIcon } from '../../components/icons';
import { sendCatchFeedback } from '../../functions/feedback';
import { PERMISSIONS } from '../../hooks/data';
import usePermissions from '../../hooks/usePermissions';
import AppLayout from '../../layout/AppLayout';
import PageLayout from '../../layout/PageLayout';
import { BroadcastType } from '../../types/data';

const BroadcastsPage = () => {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addModal, setAddModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [selected, setSelected] = useState<BroadcastType | undefined>(undefined);
  const { hasPermission } = usePermissions();
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);

  const getData = async () => {
    try {
      setLoading(true);

      const response = await appAxios.post(`/notification-broadcast/get`, {
        populate: {
          path: 'admin_id',
          select: 'firstName lastName userName phoneNumber',
        },
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
    hasPermission(PERMISSIONS.view_broadcasts) && getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasPermission, page]);

  const tableHeaders = [
    'message',
    'category',
    'admin_id',
    'creation_date',
    'tableAction',
  ];
  return (
    <AppLayout>
      <PageLayout
        pageTitle='Broadcasts'
        description='Manage broadcasts notifications'
        summaryText={
          (allData &&
            allData.length > 0 &&
            `${allData.length} ${allData.length > 1 ? 'broadcasts' : 'broadcast'}`) ||
          ''
        }
        pageActions={
          hasPermission(PERMISSIONS.send_broadcast) && (
            <Button onClick={() => setAddModal(true)}>
              <SendIcon />
              Send broadcast
            </Button>
          )
        }
        tableProps={{
          loading,
          tableHeaders,
          data: allData,
          menuItems: [
            {
              label: 'View Broadcast',
              onClick: (data) => {
                setSelected(data);
                setViewModal(true);
              },
              permission: hasPermission(PERMISSIONS.view_broadcast),
            },
          ],
        }}
      />
      <Pagination page={page} setPage={setPage} totalResults={totalResults} />
      <AddModal open={addModal} closeModal={() => setAddModal(false)} reload={getData} />

      <ViewModal
        open={viewModal}
        closeModal={() => setViewModal(false)}
        id={selected?._id || ''}
      />
    </AppLayout>
  );
};

export default BroadcastsPage;
