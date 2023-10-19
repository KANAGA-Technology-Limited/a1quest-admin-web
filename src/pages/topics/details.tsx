import React, { useEffect, useState } from 'react';
import AppLayout from '../../layout/AppLayout';
import PageHeader from '../../layout/PageLayout/PageHeader';
import { SingleTopicType } from '../../types/data';
import Button from '../../common/Button';
import { appAxios } from '../../api/axios';
import { useParams } from 'react-router-dom';
import { sendCatchFeedback } from '../../functions/feedback';
import { AddIcon } from '../../components/icons';
import AddFileModal from '../../components/topics/details/AddFileModal';
import StyledTabs from '../../common/StyledTabs';
import TopicInfo from '../../components/topics/details/TopicInfo';
import AllSubTopics from '../../components/topics/details/sub-topics/AllSubTopics';
import TopicDocuments from '../../components/topics/details/TopicDocuments';
import TopicVideos from '../../components/topics/details/TopicVideos';
import TopicAudios from '../../components/topics/details/TopicAudios';
import LoadingIndicator from '../../common/LoadingIndicator';

const tabs = ['About', 'Sub-Topics', 'Videos', 'Audios', 'Documents'];

const TopicDetails = () => {
  const [data, setData] = useState<SingleTopicType | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [addModal, setAddModal] = useState(false);
  const { id } = useParams();

  const panels = [
    <TopicInfo key='About' data={data} />,
    <AllSubTopics key='Sub-Topics' topic={data?._id} />,
    <TopicVideos key='Videos' data={data} />,
    <TopicAudios key='Audios' data={data} />,
    <TopicDocuments key='Documents' data={data} />,
  ];

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
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppLayout>
      <PageHeader
        pageTitle={loading ? '' : data?.title || 'Topic Details'}
        destination='/topics'
        pageActions={
          <Button onClick={() => setAddModal(true)}>
            <AddIcon />
            Add File
          </Button>
        }
        description='View and maintain all the files associated with this topic'
        summaryText='edit topic description and some other details'
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
      <AddFileModal
        open={addModal}
        closeModal={() => setAddModal(false)}
        reload={getData}
        classes={[]}
      />
    </AppLayout>
  );
};

export default TopicDetails;
