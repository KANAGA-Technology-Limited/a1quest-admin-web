import { useEffect, useState } from 'react';
import AppLayout from '../../layout/AppLayout';
import PageLayout from '../../layout/PageLayout';
import { appAxios } from '../../api/axios';
import { sendCatchFeedback } from '../../functions/feedback';
import { StudentDataFilter, StudentType } from '../../types/data';
import usePermissions from '../../hooks/usePermissions';
import { PERMISSIONS } from '../../hooks/data';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../common/Pagination';
// import ViewModal from '../../components/topics/ViewModal';

const Users = () => {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<StudentDataFilter>('registered');
  const { hasPermission } = usePermissions();
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      setLoading(true);

      const response = await appAxios.post(`/users`, {
        ...(filter &&
          filter !== 'registered' && {
            ...(filter === 'active' && {
              active: true,
            }),
            ...(filter === 'subscribed' && {
              running: true,
            }),
            ...(filter === 'deleted' && {
              deleted: true,
            }),
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
    hasPermission(PERMISSIONS.view_users) && getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, hasPermission, page]);

  const tableHeaders = [
    'userName',
    'school',
    'classLevel',
    'gender',
    'country',
    'numOfReferrals',
    'tableAction',
  ];

  return (
    <AppLayout>
      <PageLayout
        pageTitle='Users'
        description='Manage user accounts'
        summaryText={
          (allData &&
            allData.length > 0 &&
            `${allData.length} ${allData.length > 1 ? 'users' : 'user'}`) ||
          ''
        }
        tableProps={{
          loading,
          tableHeaders,
          data: allData,
          menuItems: [
            {
              label: 'View User Details',
              onClick: (data: StudentType) => {
                navigate(`/users/${data._id}`);
              },
              permission: hasPermission(PERMISSIONS.view_user),
            },
          ],
        }}
        pageFilters={{
          filters: [
            {
              label: 'Registered',
              value: 'registered',
            },
            {
              label: 'Active',
              value: 'active',
            },
            {
              label: 'Subscribed',
              value: 'subscribed',
            },
            {
              label: 'Deleted',
              value: 'deleted',
            },
          ],
          onChange: (value: any) => setFilter(value),
          activeFilter: filter,
        }}
      />

      <Pagination page={page} setPage={setPage} totalResults={totalResults} />
    </AppLayout>
  );
};

export default Users;
