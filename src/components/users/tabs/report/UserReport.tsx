import React, { useEffect, useState } from 'react';
import { appAxios } from '../../../../api/axios';
import { LessonReportType } from '../../../../types/data';
import { sendCatchFeedback } from '../../../../functions/feedback';
import LoadingIndicator from '../../../../common/LoadingIndicator';
import TabSwitch from '../../../../common/TabSwitch';
import ReportCard from './ReportCard';
import LessonGraph from './LessonGraph';

const UserReport = ({ userId }: { userId: string }) => {
  const [data, setData] = useState<LessonReportType[] | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<string>('All');

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const response = await appAxios.get(`/users/${userId}/topics`);
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
      ) : data && data.length > 0 ? (
        <>
          <TabSwitch
            tabs={['All', ...data.map((item) => item.title)]}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
          {selectedTab === 'All' && (
            <div className='grid gap-4 w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-10'>
              {data.map((item) => (
                <ReportCard data={item} key={item._id} />
              ))}
            </div>
          )}
          {selectedTab !== 'All' && (
            <LessonGraph
              id={data.find((item) => item.title === selectedTab)?._id || ''}
              userId={userId}
            />
          )}
        </>
      ) : (
        <p>No report found</p>
      )}
    </>
  );
};

export default UserReport;
