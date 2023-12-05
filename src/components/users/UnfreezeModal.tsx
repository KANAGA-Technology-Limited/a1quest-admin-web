import { FormEvent, useState } from 'react';
import CustomModal from '../../common/CustomModal/CustomModal';
import Button from '../../common/Button';
import { appAxios } from '../../api/axios';
import { sendCatchFeedback, sendFeedback } from '../../functions/feedback';
import { StudentType } from '../../types/data';

interface Props {
  closeModal: () => void;
  open: boolean;
  refetch: () => void;
  data: StudentType | undefined;
}

function UnfreezeModal({ closeModal, refetch, open, data }: Props) {
  const [loading, setLoading] = useState(false);

  const submitValues = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await appAxios.patch(`/users/${data?._id}/unfreeze-user`);
      sendFeedback(response.data?.message, 'success');
      refetch();
      return closeModal();
    } catch (error: any) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };

  if (!data) return null;
  return (
    <CustomModal isOpen={open} onRequestClose={closeModal} title='Unfreeze User'>
      <form onSubmit={submitValues} className='w-full'>
        <div className='w-full border-[0.6px] rounded-md border-[#DBDBDB] p-4 mt-7 mb-10'>
          <h3 className='text-[#06102B] text-lg mb-4 text-center'>
            You are about to unfreeze this user's account. Are you sure you want to
            continue?
          </h3>
        </div>

        <div className='flex items-center w-full justify-around gap-4 px-5'>
          <Button type='submit' loading={loading} className='!w-full'>
            Unfreeze
          </Button>
          <Button color='secondary' onClick={closeModal} className='!w-full'>
            Cancel
          </Button>
        </div>
      </form>
    </CustomModal>
  );
}

export default UnfreezeModal;
