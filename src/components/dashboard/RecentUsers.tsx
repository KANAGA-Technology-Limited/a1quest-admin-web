import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { appAxios } from '../../api/axios';
import Table from '../../common/Table';
import { sendCatchFeedback } from '../../functions/feedback';
import { PERMISSIONS } from '../../hooks/data';
import usePermissions from '../../hooks/usePermissions';

const RecentUsers = () => {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { hasPermission } = usePermissions();

  const getData = async () => {
    try {
      setLoading(true);

      const response = await appAxios.get(`/admin-dashboard/recent-users`);
      setAllData(response.data?.data);
    } catch (error) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    hasPermission(PERMISSIONS.view_users) && getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasPermission]);

  const tableHeaders = ['userName', 'school', 'classLevel', 'gender', 'country'];
  return (
    <div className=' bg-white rounded-[10px] p-5 lg:col-span-2'>
      <div className='w-full flex items-center justify-between flex-wrap mb-10'>
        <p className='font-semibold'>Recently Joined Users</p>
        <Link to='/users' className='text-sm underline underline-offset-2'>
          View All
        </Link>
      </div>
      <Table tableHeaders={tableHeaders} data={allData} loading={loading} />
    </div>
  );
};

export default RecentUsers;
