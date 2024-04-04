import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import React, { useEffect, useState } from 'react';
import { LessonsIcon, TimeIcon } from './icons';
import { SingleLessonReportType } from '../../../../types/data';
import { sendCatchFeedback } from '../../../../functions/feedback';
import { appAxios } from '../../../../api/axios';
import LoadingIndicator from '../../../../common/LoadingIndicator';
import { formatTime } from '../../../../functions/stringManipulations';

const LessonGraph = ({ id, userId }: { id: string; userId: string }) => {
  const [data, setData] = useState<SingleLessonReportType | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const response = await appAxios.get(`/users/${userId}/topics/${id}`);
        setData(response.data.data);
      } catch (error) {
        sendCatchFeedback(error);
      } finally {
        setLoading(false);
      }
    };

    if (id && userId) {
      getData();
    }
  }, [id, userId]);

  if (!id) return null;
  return (
    <div className='w-full mt-10'>
      {loading ? (
        <LoadingIndicator text='Fetching Report Details' />
      ) : data ? (
        <div className='w-full bg-white rounded-lg pt-10 p-8'>
          {/* Graph */}
          <ResponsiveContainer width='100%' height={300}>
            <BarChart width={500} height={300} data={data.sub_topics}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='title' axisLine={false} tickLine={false} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) =>
                  value !== 0 ? (value > 1 ? `${value} mins` : `${value} min`) : '0'
                }
              />
              <Tooltip />
              <Bar
                dataKey='time'
                fill='#059669'
                activeBar={<Rectangle fill='#F0AC27' />}
                barSize={15}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>

          {/* Summary */}
          <div className='mt-[50px] flex flex-wrap justify-center gap-5 items-center w-full'>
            <div className='flex flex-col gap-[6px] items-center text-center'>
              <div className='flex items-center gap-[5px]'>
                <LessonsIcon />
                <span className='text-[#06102B] font-semibold'>
                  {data.takenLessons}/{data.allLessons}
                </span>
              </div>
              <p className='text-[#4B5768] text-sm font-normal'>Lessons Learned</p>
            </div>
            <div className='flex flex-col gap-[6px] items-center text-center'>
              <div className='flex items-center gap-[5px]'>
                <TimeIcon />
                <span className='text-[#06102B] font-semibold'>
                  {formatTime(data.total_time * 60 || 0, true)}
                </span>
              </div>
              <p className='text-[#4B5768] text-sm font-normal'>Time spent</p>
            </div>
          </div>
        </div>
      ) : (
        <p>No report found</p>
      )}
    </div>
  );
};

export default LessonGraph;
