import { useMemo } from 'react';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';
import { DashboardAdminMetric } from '../../types/dashboard';
import { COLORS } from './data';

const AdminChart = ({ data }: { data: DashboardAdminMetric }) => {
  const pieData = useMemo(
    () => [
      {
        name: 'Active',
        value: data.active_admins_count || 0,
      },
      {
        name: 'Inactive',
        value: data.inactive_admins_count || 0,
      },
      {
        name: 'All',
        value: data.all_admins_count || 0,
      },
    ],
    [data]
  );

  return (
    <div className='flex items-center justify-center w-full '>
      <PieChart width={300} height={300}>
        <Pie
          data={pieData}
          innerRadius={60}
          outerRadius={80}
          fill='#8884d8'
          dataKey='value'
          labelLine={false}
          label
        >
          {Object.keys(data).map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
      {/* <div className='absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center flex-col gap-2 text-center'>
        <span className='text-[#1A202C] font-bold text-2xl'>{data.all_admins_count}</span>
        <span className='font-secondary text-sm font-medium text-[#596780]'>Admins</span>
      </div> */}
    </div>
  );
};

export default AdminChart;
