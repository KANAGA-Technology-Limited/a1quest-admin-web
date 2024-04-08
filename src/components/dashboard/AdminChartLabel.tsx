import { DashboardAdminMetric } from '../../types/dashboard';
import { COLORS } from './data';

const AdminChartLabel = ({ data }: { data: DashboardAdminMetric }) => {
  return (
    <div className='flex flex-col gap-5 w-full'>
      <div className='flex items-center justify-between w-full'>
        <div className='flex items-center gap-2'>
          <div
            className='w-3 h-3 rounded-full'
            style={{
              backgroundColor: COLORS[0],
            }}
          />
          <span className='text-sm font-medium text-[#596780]'>Active Admins</span>
        </div>
        <span className='text-[#1A202C] font-semibold text-sm'>
          {data.active_admins_count || 0}
        </span>
      </div>
      <div className='flex items-center justify-between w-full'>
        <div className='flex items-center gap-2'>
          <div
            className='w-3 h-3 rounded-full'
            style={{
              backgroundColor: COLORS[1],
            }}
          />
          <span className='text-sm font-medium text-[#596780]'>Inactive Admins</span>
        </div>
        <span className='text-[#1A202C] font-semibold text-sm'>
          {data.inactive_admins_count || 0}
        </span>
      </div>
      <div className='flex items-center justify-between w-full'>
        <div className='flex items-center gap-2'>
          <div
            className='w-3 h-3 rounded-full'
            style={{
              backgroundColor: COLORS[2],
            }}
          />
          <span className='text-sm font-medium text-[#596780]'>Total Admins</span>
        </div>
        <span className='text-[#1A202C] font-semibold text-sm'>
          {data.all_admins_count || 0}
        </span>
      </div>
    </div>
  );
};

export default AdminChartLabel;
