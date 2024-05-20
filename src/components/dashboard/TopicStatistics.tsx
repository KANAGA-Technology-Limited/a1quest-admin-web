import { useEffect, useState } from 'react';
import { appAxios } from '../../api/axios';
import LoadingIndicator from '../../common/LoadingIndicator';
import { sendCatchFeedback } from '../../functions/feedback';
import { TopicStatisticsType } from '../../types/dashboard';
import TopicsStatisticsDateControl from './TopicsStatisticsDateControl';
import TopicStatisticsChart from './TopicStatisticsChart';

const TopicStatistics = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TopicStatisticsType | null>(null);
  const [currentYear, setCurrentYear] = useState(new Date().getUTCFullYear());

  const getData = async () => {
    try {
      setLoading(true);
      const response = await appAxios.get(
        `/admin-dashboard/classes-stats?year=${currentYear}`
      );
      setData(response.data?.data);
    } catch (error) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentYear]);

  return (
    <div className='mt-10 p-5 bg-white rounded-[10px]'>
      <div className='w-full flex items-center justify-between flex-wrap mb-10'>
        <p className='text-xl md:text-2xl lg:text-[32px] font-bold'>Topic Statistics</p>
        <TopicsStatisticsDateControl
          currentYear={currentYear}
          setCurrentYear={setCurrentYear}
        />
      </div>
      {loading ? <LoadingIndicator /> : data && <TopicStatisticsChart data={data} />}
    </div>
  );
};

export default TopicStatistics;
