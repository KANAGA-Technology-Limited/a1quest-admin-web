import { useEffect, useState } from 'react';
import { appAxios } from '../../api/axios';
import { sendCatchFeedback } from '../../functions/feedback';
import { DashboardMetric } from '../../types/dashboard';
import SummaryCard from './SummaryCard';

const DashboardMetrics = () => {
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<DashboardMetric | null>(null);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await appAxios.get(`/admin-dashboard/count`);
      setStats(response.data?.data);
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
    <div className='bg-white p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 rounded-[10px] gap-y-10'>
      <SummaryCard
        value={stats?.all_users_count || 0}
        loading={loading}
        label='Total Number of Users'
        showBorder
      />
      <SummaryCard
        value={stats?.subscribed_users || 0}
        loading={loading}
        label='Total Subscribed Users'
        showBorder
      />
      <SummaryCard
        value={stats?.active_users || 0}
        loading={loading}
        label='Total Active Users'
        showBorder
      />
      <SummaryCard
        value={stats?.inactive_users || 0}
        loading={loading}
        label='Total Inactive Users'
      />
    </div>
  );
};

export default DashboardMetrics;
