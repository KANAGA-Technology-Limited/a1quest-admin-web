import React, { useEffect, useState } from 'react';
import { TopicPerformanceType } from '../../../../types/data';
import { appAxios } from '../../../../api/axios';
import { sendCatchFeedback } from '../../../../functions/feedback';
import LoadingIndicator from '../../../../common/LoadingIndicator';
import GeneralPerformance from './GeneralPerformance';
import GeneralSummary from './GeneralSummary';

const UserPerformance = ({ userId }: { userId: string }) => {
  const [data, setData] = useState<TopicPerformanceType | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const response = await appAxios.get(`/users/${userId}/performance`);
        setData(response.data.data);
      } catch (error) {
        sendCatchFeedback(error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [userId]);
  return (
    <>
      {loading ? (
        <LoadingIndicator text='Fetching Lesson Reports' />
      ) : data ? (
        <>
          <div className='bg-white p-10 mt-10 rounded-lg w-full'>
            <GeneralPerformance data={data} />
            <GeneralSummary data={data} />
          </div>
        </>
      ) : (
        <p>No report found</p>
      )}
    </>
  );
};

export default UserPerformance;
