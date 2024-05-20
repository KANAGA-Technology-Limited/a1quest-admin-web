import { useEffect, useState } from 'react';
import { appAxios } from '../../api/axios';
import CustomModal from '../../common/CustomModal/CustomModal';
import LoadingIndicator from '../../common/LoadingIndicator';
import { sendCatchFeedback } from '../../functions/feedback';
import { BroadcastType } from '../../types/data';

interface Props {
  closeModal: () => void;
  open: boolean;
  id: string;
}

function ViewModal({ closeModal, id, open }: Props) {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState<BroadcastType | null>(null);

  useEffect(() => {
    const getItem = async () => {
      setLoading(true);
      try {
        const response = await appAxios.get('/notification-broadcast/' + id);
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
    <CustomModal isOpen={open} onRequestClose={closeModal} title='Broadcast Details'>
      {loading ? (
        <LoadingIndicator />
      ) : details && Object.keys(details).length ? (
        <>
          <p className='capitalize mb-3 pb-2 border-b-2'>
            <b>Category:</b> {details.category}
          </p>
          <p className='capitalize mb-3 pb-2 border-b-2'>
            <b>Message:</b> {details.message}
          </p>
          <p className='capitalize mb-3 pb-2 border-b-2'>
            <b>Sent by:</b> {details.admin_id?.userName}
          </p>

          <p className='capitalize mb-3 pb-2 border-b-2'>
            <b>Sent at:</b> {new Date(details.creation_date).toLocaleString()}
          </p>
        </>
      ) : (
        <>No detail found</>
      )}
    </CustomModal>
  );
}

export default ViewModal;
