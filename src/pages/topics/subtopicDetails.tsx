import React, { useEffect, useState } from 'react';
import AppLayout from '../../layout/AppLayout';
import PageHeader from '../../layout/PageLayout/PageHeader';
import { SingleSubTopicType } from '../../types/data';
import Button from '../../common/Button';
import { appAxios } from '../../api/axios';
import { useParams } from 'react-router-dom';
import { sendCatchFeedback } from '../../functions/feedback';
import { AddIcon } from '../../components/icons';
import StyledTabs from '../../common/StyledTabs';
import LoadingIndicator from '../../common/LoadingIndicator';
import SubTopicInfo from '../../components/topics/details/sub-topics/SubTopicInfo';
import SubTopicDocuments from '../../components/topics/details/sub-topics/SubTopicDocuments';
import SubTopicAudios from '../../components/topics/details/sub-topics/SubTopicAudios';
import SubTopicVideos from '../../components/topics/details/sub-topics/SubTopicVideos';
import AddFileModal from '../../components/topics/details/sub-topics/AddFileModal';

const tabs = ['About', 'Videos', 'Audios', 'Documents'];

const SubTopicDetails = () => {
  const [data, setData] = useState<SingleSubTopicType | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [addModal, setAddModal] = useState(false);
  const [selected, setSelected] = useState<SingleSubTopicType | undefined>(undefined);
  const { id } = useParams();

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
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const panels = [
    <SubTopicInfo key='About' data={data} />,
    <SubTopicVideos key='Videos' data={data} refetch={getData} />,
    <SubTopicAudios key='Audios' data={data} refetch={getData} />,
    <SubTopicDocuments key='Documents' data={data} refetch={getData} />,
  ];

  return (
    <AppLayout>
      <PageHeader
        pageTitle={loading ? '' : data?.title || 'Sub-Topic Details'}
        destination='/topics'
        pageActions={
          <Button
            onClick={() => {
              setSelected(data);
              setAddModal(true);
            }}
          >
            <AddIcon />
            Add File
          </Button>
        }
        description='View and maintain all the files associated with this sub-topic'
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
      <AddFileModal
        open={addModal}
        closeModal={() => setAddModal(false)}
        reload={getData}
        data={selected}
      />
    </AppLayout>
  );
};

export default SubTopicDetails;
