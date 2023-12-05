import React, { useEffect, useState } from 'react';
import AppLayout from '../../layout/AppLayout';
import PageHeader from '../../layout/PageLayout/PageHeader';
import { SingleSubTopicType } from '../../types/data';
import { appAxios } from '../../api/axios';
import { useParams } from 'react-router-dom';
import { sendCatchFeedback } from '../../functions/feedback';
import StyledTabs from '../../common/StyledTabs';
import LoadingIndicator from '../../common/LoadingIndicator';
import SubTopicInfo from '../../components/topics/details/sub-topics/SubTopicInfo';
import usePermissions from '../../hooks/usePermissions';
import { PERMISSIONS } from '../../hooks/data';
import TestList from '../../components/topics/details/sub-topics/test_flow/TestList';
import AllLessons from '../../components/topics/details/lesson/AllLessons';

const tabs = ['About', 'Lessons', 'Test'];

const SubTopicDetails = () => {
  const [data, setData] = useState<SingleSubTopicType | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { hasPermission } = usePermissions();

  const getData = async () => {
    try {
      setLoading(true);

      const response = await appAxios.get(`/sub-topics/${id}`);
      setData(response.data?.data);
    } catch (error) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    hasPermission(PERMISSIONS.view_subtopics) && getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasPermission]);

  const panels = [
    <SubTopicInfo key='About' data={data} />,
    <AllLessons
      key='Lessons'
      subTopic={data?._id || ''}
      topic={data?.topic_id._id || ''}
    />,
    <TestList key='Test' subTopic={data?._id || ''} topic={data?.topic_id._id || ''} />,
  ];

  return (
    <AppLayout>
      <PageHeader
        pageTitle={loading ? '' : data?.title || 'Sub-Topic Details'}
        destination={`/topics/${data?.topic_id?._id}`}
        description='View and maintain all the details associated with this sub-topic'
        summaryText='edit sub-topic description and other details'
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

export default SubTopicDetails;
