import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { TopicPerformanceType } from '../../../../types/data';

const GeneralPerformance = ({ data }: { data: TopicPerformanceType }) => {
  return (
    <div className='w-full'>
      <ResponsiveContainer width='100%' height={400}>
        <BarChart
          width={500}
          height={400}
          data={data.tests.slice(0, 10)}
          barCategoryGap={14}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis axisLine={false} tickLine={false} dataKey='sub_topic' />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickFormatter={(label) => (label ? `${label}%` : label)}
            // minTickGap={20}
          />
          <Tooltip />
          <Bar
            dataKey='percentage'
            fill='#059669'
            activeBar={<Rectangle fill='#F0AC27' />}
            barSize={15}
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GeneralPerformance;
