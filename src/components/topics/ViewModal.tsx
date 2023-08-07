import { useEffect, useState } from 'react';
import CustomModal from '../../common/CustomModal/CustomModal';
import { appAxios } from '../../api/axios';
import { sendCatchFeedback } from '../../functions/feedback';
import LoadingIndicator from '../../common/LoadingIndicator';
import { AppointmentType } from '../../types/data';

interface Props {
  closeModal: () => void;
  open: boolean;
  id: string;
}

function ViewModal({ closeModal, id, open }: Props) {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState<AppointmentType | null>(null);

  useEffect(() => {
    const getItem = async () => {
      setLoading(true);
      try {
        const response = await appAxios.get('/single/booking/' + id);
        setDetails(response.data?.data);
      } catch (error) {
        sendCatchFeedback(error);
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      getItem();
    }
  }, [open, id]);

  return (
    <CustomModal modalState={open} closeModal={closeModal} title='Appointment Details'>
      {loading ? (
        <LoadingIndicator />
      ) : details && Object.keys(details).length ? (
        <>
          <p className='capitalize mb-3 pb-2 border-b-2'>
            <b>Date:</b> {new Date(details.date).toDateString()}
          </p>
          <p className='capitalize mb-3 pb-2 border-b-2'>
            <b>Artisan:</b> {details.artisan.companyName}
          </p>
          <p className='capitalize mb-3 pb-2 border-b-2'>
            <b>Artisan Phone:</b> {details.artisan.phone}
          </p>
          <p className='mb-3 pb-2 border-b-2'>
            <b>Duration:</b> {details.duration} hrs
          </p>
          <p className='capitalize mb-3 pb-2 border-b-2'>
            <b>Completed by User:</b> {details.userCompleted ? 'Yes' : 'No'}
          </p>
          {details.userCompletedAt && (
            <p className='capitalize mb-3 pb-2 border-b-2'>
              <b>Completion Time:</b> {new Date(details.userCompletedAt).toDateString()}
            </p>
          )}
          <p className='capitalize mb-3 pb-2 border-b-2'>
            <b>Notes:</b> {details.notes}
          </p>
          <p className='capitalize mb-3 pb-2 border-b-2'>
            <b>Address:</b> {details.address}
          </p>
          <p className='capitalize mb-3 pb-2 border-b-2'>
            <b>Exact Location:</b> {details.location?.coordinates?.join(', ')}
          </p>
          <p className='capitalize mb-3 pb-2 border-b-2'>
            <b>Status:</b> {details.status}
          </p>
          <p className='capitalize mb-3 pb-2 border-b-2'>
            <b>Rescheduled:</b> {details.rescheduled ? 'Yes' : 'No'}
          </p>
          <p className='capitalize mb-3 pb-2 border-b-2'>
            <b>Viewed by Artisan:</b> {details.artisanViewed ? 'Yes' : 'No'}
          </p>
          <p className='capitalize mb-3 pb-2 border-b-2'>
            <b>Completed by Artisan:</b> {details.artisanCompleted ? 'Yes' : 'No'}
          </p>
          <p className='capitalize mb-3 pb-2 border-b-2'>
            <b>Cancelled by Artisan:</b> {details.artisanCancelled ? 'Yes' : 'No'}
          </p>
          <p className='capitalize mb-3 pb-2 border-b-2'>
            <b>Cancelled by User:</b> {details.userCancelled ? 'Yes' : 'No'}
          </p>
          <p className='capitalize mb-3 pb-2 border-b-2'>
            <b>In Dispute:</b> {details.isInDispute ? 'Yes' : 'No'}
          </p>

          <p className='capitalize mb-3 pb-2 border-b-2'>
            <b>Created At:</b> {new Date(details.createdAt).toDateString()}
          </p>
        </>
      ) : (
        <>No detail found</>
      )}
    </CustomModal>
  );
}

export default ViewModal;
