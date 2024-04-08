import { useMemo } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { TopicStatisticsType } from '../../types/dashboard';
import TopicChartCustomTooltip from './TopicChartCustomTooltip';
import { COLORS } from './data';

const labels = ['JS1', 'JS2', 'JS3', 'SS1', 'SS2', 'SS3'];

const TopicStatisticsChart = ({ data }: { data: TopicStatisticsType }) => {
  const graphData = useMemo(() => {
    const dataLabel = Object.keys(data);
    const newData = dataLabel.map((item, index) => ({
      ...Object.values(data)[index],
      label: item,
    }));

    return newData;
  }, [data]);

  return (
    <>
      <ResponsiveContainer width='100%' height={300}>
        <BarChart width={650} height={300} data={graphData} barSize={20}>
          <XAxis
            dataKey='label'
            axisLine={false}
            tickLine={false}
            stroke='#69778C'
            fontSize={14}
            dy={10}
            className='uppercase'
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            dx={10}
            fontSize={12}
            stroke='#69778C'
            orientation='right'
          />
          <Tooltip content={<TopicChartCustomTooltip />} />
          {labels.map((label, index) => (
            <Bar dataKey={label} fill={COLORS[index]} barSize={80} stackId='a' />
          ))}
          <CartesianGrid strokeDasharray='1 1' vertical={false} />
        </BarChart>
      </ResponsiveContainer>
      <div className='flex items-center justify-center w-full mt-5 gap-5'>
        {labels.map((item, index) => (
          <div className='flex items-center gap-2' key={item}>
            <div
              style={{ backgroundColor: COLORS[index] }}
              className='w-4 h-4 rounded-full'
            />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default TopicStatisticsChart;
