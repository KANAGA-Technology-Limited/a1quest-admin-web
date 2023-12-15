import React, { useEffect, useState } from 'react';
import { sendCatchFeedback } from '../../../../functions/feedback';
import { appAxios } from '../../../../api/axios';
import { StudentTestLog } from '../../../../types/data';
import LoadingIndicator from '../../../../common/LoadingIndicator';
import Pagination from '../../../../common/Pagination';
import LabelInput from '../../../../common/LabelInput/LabelInput';
import { addOneDayToDate } from '../../../../functions/date';

const UserTestLog = ({ userId }: { userId: string }) => {
  const [data, setData] = useState<StudentTestLog[] | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const getData = async () => {
    let apiString = `/users/${userId}/test-logs?page=${page}`;
    try {
      setLoading(true);
      if (startDate && endDate) {
        apiString += `&start_date=${startDate}&end_date=${addOneDayToDate(endDate)}`;
      }

      const response = await appAxios.get(apiString);
      setData(response.data?.data);
      setTotalResults(response.data?.count);
    } catch (error) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, startDate, endDate]);

  return (
    <>
      <div className='flex gap-5 items-center justify-end mb-10 flex-col md:flex-row'>
        <LabelInput
          className='!w-full md:!w-fit'
          type='date'
          label='Start Date'
          useFormik={false}
          value={startDate}
          name='date'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setStartDate(e.target.value)
          }
        />
        <LabelInput
          className='!w-full md:!w-fit'
          type='date'
          label='End Date'
          useFormik={false}
          value={endDate}
          name='date'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEndDate(e.target.value)
          }
        />
      </div>
      {loading ? (
        <LoadingIndicator />
      ) : data && data.length > 0 ? (
        <>
          <div className='grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full'>
            {data.map((item, index) => (
              <div
                className='w-full p-4 flex items-center justify-between gap-5'
                style={{
                  boxShadow: ' 0px 8px 24px 0px rgba(149, 157, 165, 0.20)',
                }}
                key={index}
              >
                <div className='flex flex-col gap-[10px]'>
                  <span className='text-[#0D0F11] text-sm font-semibold'>
                    {item.sub_topic_title || item.topic_title}
                  </span>
                  <span className='text-[#64748B] font-normal text-sm'>
                    {new Date(item.date).toLocaleString()}
                  </span>
                </div>
                <span className='text-primary font-semibold text-lg md:text-xl'>
                  {item.correct}/{item.questions}
                </span>
              </div>
            ))}
          </div>
          <Pagination page={page} setPage={setPage} totalResults={totalResults} />
        </>
      ) : (
        <p>No tests found</p>
      )}
    </>
  );
};

export default UserTestLog;
