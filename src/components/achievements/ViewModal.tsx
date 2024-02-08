import { useEffect, useState } from 'react';
import CustomModal from '../../common/CustomModal/CustomModal';
import { appAxios } from '../../api/axios';
import { sendCatchFeedback } from '../../functions/feedback';
import LoadingIndicator from '../../common/LoadingIndicator';
import { AdminType } from '../../types/data';

interface Props {
  closeModal: () => void;
  open: boolean;
  id: string;
}

function ViewModal({ closeModal, id, open }: Props) {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState<AdminType | null>(null);

  useEffect(() => {
    const getItem = async () => {
      setLoading(true);
      try {
        const response = await appAxios.get('/admin-mgmt/' + id);
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
    <CustomModal isOpen={open} onRequestClose={closeModal} title='Admin Details'>
      {loading ? (
        <LoadingIndicator />
      ) : details && Object.keys(details).length ? (
        <>
          <p className='capitalize mb-3 pb-2 border-b-2'>
            <b>Username:</b> {details.userName}
          </p>
          <p className='capitalize mb-3 pb-2 border-b-2'>
            <b>First name:</b> {details.firstName}
          </p>
          <p className='capitalize mb-3 pb-2 border-b-2'>
            <b>Last name:</b> {details.lastName}
          </p>
          <p className='mb-3 pb-2 border-b-2'>
            <b>Email:</b> {details.email}
          </p>
          <p className='capitalize mb-3 pb-2 border-b-2'>
            <b>Phone:</b> {details.phoneNumber}
          </p>
          <p className='capitalize mb-3 pb-2 border-b-2'>
            <b>Role:</b>{' '}
            {details.populatedRoles.length > 0
              ? details.populatedRoles.map((item) => item.name).join(', ')
              : 'None'}
          </p>
          <p className='capitalize mb-3 pb-2 border-b-2'>
            <b>Permissions:</b>{' '}
            {details.populatedRoles.length <= 0
              ? 'None'
              : details.populatedRoles
                  .map((item) => item.permissions.map((permission) => permission.name))
                  .join(', ')}
          </p>
          <p className='capitalize mb-3 pb-2 border-b-2'>
            <b>Admin Type:</b> {details.role}
          </p>
          <p className='capitalize mb-3 pb-2 border-b-2'>
            <b>Created at:</b> {new Date(details.createdAt).toDateString()}
          </p>
        </>
      ) : (
        <>No detail found</>
      )}
    </CustomModal>
  );
}

export default ViewModal;
