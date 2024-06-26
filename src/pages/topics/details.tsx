import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { appAxios } from '../../api/axios';
import LoadingIndicator from '../../common/LoadingIndicator';
import StyledTabs from '../../common/StyledTabs';
import TopicInfo from '../../components/topics/details/TopicInfo';
import AllSubTopics from '../../components/topics/details/sub-topics/AllSubTopics';
import TestList from '../../components/topics/details/test_flow/TestList';
import { sendCatchFeedback } from '../../functions/feedback';
import { PERMISSIONS } from '../../hooks/data';
import usePermissions from '../../hooks/usePermissions';
import AppLayout from '../../layout/AppLayout';
import PageHeader from '../../layout/PageLayout/PageHeader';
import { SingleTopicType } from '../../types/data';

const tabs = ['About', 'Sub-Topics', 'Test'];

const TopicDetails = () => {
  const [data, setData] = useState<SingleTopicType | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { hasPermission } = usePermissions();

  const getData = async () => {
    try {
      setLoading(true);

      const response = await appAxios.get(`/topics/${id}`);
      setData(response.data?.data);
    } catch (error) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    hasPermission(PERMISSIONS.view_topic) && getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasPermission]);

  const panels = [
    <TopicInfo key='About' data={data} />,
    <AllSubTopics key='Sub-Topics' topic={data?._id} />,
    <TestList key='Test' topic={data?._id || ''} minimumQuestion={data?.num_of_questions || 0} />,
  ];

  return (
    <AppLayout>
      <PageHeader
        pageTitle={loading ? '' : data?.title || 'Topic Details'}
        destination='/topics'
        description='View and maintain all the details associated with this topic'
        summaryText='edit topic description and other details'
        loading={loading}
        showBack
      />
      <section className='bg-white pb-8'>
        {loading ? (
          <div className='p-5'>
            <LoadingIndicator text='Fetching Info' />
          </div>
        ) : (
          <StyledTabs tabs={tabs} panels={panels} panelClassName='px-5' />
        )}
      </section>
    </AppLayout>
  );
};

export default TopicDetails;
