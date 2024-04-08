import AdminData from '../../components/dashboard/AdminData';
import DashboardMetrics from '../../components/dashboard/DashboardMetrics';
import RecentUsers from '../../components/dashboard/RecentUsers';
import TopicStatistics from '../../components/dashboard/TopicStatistics';
import AppLayout from '../../layout/AppLayout';

const Dashboard = () => {
  return (
    <AppLayout>
      <DashboardMetrics />
      <TopicStatistics />
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-10 w-full mt-10'>
        <RecentUsers />
        <AdminData />
      </div>
    </AppLayout>
  );
};

export default Dashboard;
