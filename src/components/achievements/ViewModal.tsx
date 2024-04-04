import { useEffect, useState } from 'react';
import CustomModal from '../../common/CustomModal/CustomModal';
import { appAxios } from '../../api/axios';
import { sendCatchFeedback } from '../../functions/feedback';
import LoadingIndicator from '../../common/LoadingIndicator';
import { SingleAchievementType } from '../../types/data';

interface Props {
  closeModal: () => void;
  open: boolean;
  id: string;
}

function ViewModal({ closeModal, id, open }: Props) {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState<SingleAchievementType | null>(null);

  useEffect(() => {
    const getItem = async () => {
      setLoading(true);
      try {
        const response = await appAxios.get('/achievements/' + id);
        setDetails(response.data?.data);
      } catch (error) {
        sendCatchFeedback(error);
      } finally {
        setLoading(false);
      }
    };

    if (open && id) {
      getItem();
    }
  }, [open, id]);

  return (
    <CustomModal isOpen={open} onRequestClose={closeModal} title='Achievement Details'>
      {loading ? (
        <LoadingIndicator />
      ) : details && Object.keys(details).length ? (
        <>
          <img
            src={details.badge}
            alt='Badge'
            width={100}
            height={100}
            className='w-[100px] h-[100px] rounded-full object-cover mb-3'
          />
          <p className='capitalize mb-3 pb-2 border-b-2'>
            <b>Name:</b> {details.name}
          </p>
          <p className='capitalize mb-3 pb-2 border-b-2'>
            <b>Notification Message:</b> {details.notification_message}
          </p>
          <p className='capitalize mb-3 pb-2 border-b-2'>
            <b>Active:</b> {details.active ? 'Yes' : 'No'}
          </p>
          <p className='mb-3 pb-2 border-b-2'>
            <b>Number of Topics:</b> {details.no_of_topics}
          </p>
          <p className='mb-3 pb-2 border-b-2'>
            <b>Number of Sub-Topics:</b> {details.no_of_sub_topics}
          </p>
          <p className='mb-3 pb-2 border-b-2'>
            <b>Number of Lessons:</b> {details.no_of_lessons}
          </p>
          <p className='mb-3 pb-2 border-b-2'>
            <b>Number of Tests:</b> {details.tests?.no_of_tests}
          </p>
          <p className='mb-3 pb-2 border-b-2'>
            <b>Average test score:</b> {details.tests?.avg_score}
          </p>
          <p className='mb-3 pb-2 border-b-2'>
            <b>Streak count:</b> {details.no_of_days_in_streak}
          </p>
          <p className='mb-3 pb-2 border-b-2'>
            <b>Created by:</b>{' '}
            {details.created_by?.firstName + ' ' + details.created_by?.lastName}
          </p>

          <p className='capitalize mb-3 pb-2 border-b-2'>
            <b>Created at:</b> {new Date(details.creation_date).toDateString()}
          </p>
        </>
      ) : (
        <>No detail found</>
      )}
    </CustomModal>
  );
}

export default ViewModal;
