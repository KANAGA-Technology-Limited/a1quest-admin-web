import React, { useEffect, useState } from 'react';
import { sendCatchFeedback } from '../../../../functions/feedback';
import { appAxios } from '../../../../api/axios';
import { StudentTestLog } from '../../../../types/data';
import LoadingIndicator from '../../../../common/LoadingIndicator';
import Pagination from '../../../../common/Pagination';
import LabelInput from '../../../../common/LabelInput/LabelInput';

const UserTestLog = ({ userId }: { userId: string }) => {
  const [data, setData] = useState<StudentTestLog[] | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');

  const getData = async () => {
    try {
      setLoading(true);
      const apiString = selectedDate
        ? `/users/${userId}/test-logs?page=${page}&year=${new Date(
            selectedDate
          ).getFullYear()}&month=${new Date(selectedDate).getMonth() + 1}`
        : `/users/${userId}/test-logs?page=${page}`;

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
  }, [page, selectedDate]);

  return (
    <>
      <LabelInput
        className='mb-10 !w-fit'
        type='month'
        label='Date Filter'
        useFormik={false}
        value={selectedDate}
        name='date'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSelectedDate(e.target.value)
        }
      />
      {loading ? (
        <LoadingIndicator />
      ) : data && data.length > 0 ? (
        <>
          <div className='grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full'>
            {data.map((item) => (
              <div
                className='w-full p-4 flex items-center justify-between gap-5'
                style={{
                  boxShadow: ' 0px 8px 24px 0px rgba(149, 157, 165, 0.20)',
                }}
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
