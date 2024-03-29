import { FormEvent, useState } from 'react';
import CustomModal from '../../common/CustomModal/CustomModal';
import Button from '../../common/Button';
import { appAxios } from '../../api/axios';
import { sendCatchFeedback, sendFeedback } from '../../functions/feedback';
import { AchievementType } from '../../types/data';
import { CrossIcon } from '../icons';

interface Props {
  closeModal: () => void;
  open: boolean;
  refetch: () => void;
  data: AchievementType | undefined;
}

function DeleteModal({ closeModal, refetch, open, data }: Props) {
  const [loading, setLoading] = useState(false);

  const submitValues = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await appAxios.delete('/achievements/' + data?._id);
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
    <CustomModal isOpen={open} onRequestClose={closeModal} title='Delete Achievement'>
      <form onSubmit={submitValues} className='w-full'>
        <div className='w-full border-[0.6px] rounded-md border-[#DBDBDB] p-4 mt-7 mb-10'>
          <h3 className='text-[#06102B] font-semibold text-lg mb-4 text-center'>
            Deleting this achievement would do the following:
          </h3>
          <ul className='flex flex-col gap-3'>
            <li className='flex items-center gap-[10px] text-[#4B5768]'>
              <CrossIcon />
              <span>Clear all the associated settings for this achievement</span>
            </li>
            <li className='flex items-center gap-[10px] text-[#4B5768]'>
              <CrossIcon />
              <span>Remove this achievement from associated users</span>
            </li>
          </ul>
        </div>

        <div className='flex items-center w-full justify-around gap-4 px-5'>
          <Button type='submit' loading={loading} className='!w-full !bg-error'>
            Delete
          </Button>
          <Button color='secondary' onClick={closeModal} className='!w-full'>
            Cancel
          </Button>
        </div>
      </form>
    </CustomModal>
  );
}

export default DeleteModal;
