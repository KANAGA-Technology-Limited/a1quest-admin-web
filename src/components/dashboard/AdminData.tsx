import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { appAxios } from '../../api/axios';
import LoadingIndicator from '../../common/LoadingIndicator';
import { sendCatchFeedback } from '../../functions/feedback';
import { DashboardAdminMetric } from '../../types/dashboard';
import AdminChart from './AdminChart';
import AdminChartLabel from './AdminChartLabel';

const AdminData = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DashboardAdminMetric | null>(null);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await appAxios.get(`/admin-dashboard/admin-stats`);
      setData(response.data?.data);
    } catch (error) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='bg-white rounded-[10px] p-5 w-full'>
      <div className='w-full flex items-center justify-between flex-wrap mb-10'>
        <p className='font-semibold'>Administrators</p>
        <Link to='/admins' className='text-sm underline underline-offset-2'>
          View All
        </Link>
      </div>
      {loading ? (
        <LoadingIndicator />
      ) : (
        data && (
          <>
            <AdminChart data={data} />
            <AdminChartLabel data={data} />
          </>
        )
      )}
    </div>
  );
};

export default AdminData;
