import React, { useEffect, useState } from 'react';
import AppLayout from '../../layout/AppLayout';
import PageHeader from '../../layout/PageLayout/PageHeader';
import { SingleLessonType } from '../../types/data';
import Button from '../../common/Button';
import { appAxios } from '../../api/axios';
import { useParams } from 'react-router-dom';
import { sendCatchFeedback } from '../../functions/feedback';
import { AddIcon } from '../../components/icons';
import StyledTabs from '../../common/StyledTabs';
import LoadingIndicator from '../../common/LoadingIndicator';
import usePermissions from '../../hooks/usePermissions';
import { PERMISSIONS } from '../../hooks/data';
import LessonInfo from '../../components/topics/details/lesson/LessonInfo';
import LessonVideo from '../../components/topics/details/lesson/LessonVideo';
import LessonAudio from '../../components/topics/details/lesson/LessonAudio';
import LessonDocument from '../../components/topics/details/lesson/LessonDocument';
import AddFileModal from '../../components/topics/details/lesson/AddFileModal';

const tabs = ['About', 'Video', 'Audio', 'Document'];

const LessonDetails = () => {
  const [data, setData] = useState<SingleLessonType | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [addModal, setAddModal] = useState(false);
  const [selected, setSelected] = useState<SingleLessonType | undefined>(undefined);
  const { id } = useParams();
  const { hasPermission } = usePermissions();

  const getData = async () => {
    try {
      setLoading(true);

      const response = await appAxios.get(`/lessons/${id}`);
      setData(response.data?.data);
    } catch (error) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    hasPermission(PERMISSIONS.view_lesson) && getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasPermission]);

  const panels = [
    <LessonInfo key='About' data={data} />,
    <LessonVideo key='Video' data={data} refetch={getData} />,
    <LessonAudio key='Audio' data={data} refetch={getData} />,
    <LessonDocument key='Document' data={data} refetch={getData} />,
  ];

  return (
    <AppLayout>
      <PageHeader
        pageTitle={loading ? '' : data?.title || 'Lesson Details'}
        destination={`/topics/sub-topic/${data?.sub_topic_id?._id}`}
        pageActions={
          hasPermission(PERMISSIONS.upload_lesson_resource) && (
            <Button
              onClick={() => {
                setSelected(data);
                setAddModal(true);
              }}
            >
              <AddIcon />
              Add File
            </Button>
          )
        }
        description='View and maintain all the files associated with this lesson'
        summaryText='edit lesson description and other details'
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

export default LessonDetails;
