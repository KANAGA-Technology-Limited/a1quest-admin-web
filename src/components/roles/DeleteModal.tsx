import { useState } from 'react';
import CustomModal from '../../common/CustomModal/CustomModal';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Button from '../../common/Button';
import { appAxios } from '../../api/axios';
import { sendCatchFeedback, sendFeedback } from '../../functions/feedback';
import { RoleType } from '../../types/data';
import { CrossIcon } from '../icons';

interface Props {
  closeModal: () => void;
  open: boolean;
  refetch: () => void;
  data: RoleType | undefined;
}

function DeleteModal({ closeModal, refetch, open, data }: Props) {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: data?.name || '',
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object({
      name: yup.string().required('Required'),
    }),
    enableReinitialize: true,
  });

  const submitValues = async () => {
    try {
      setLoading(true);
      const response = await appAxios.delete('/roles/' + data?._id);
      sendFeedback(response.data?.message, 'success');
      formik.resetForm();
      refetch();
      return closeModal();
    } catch (error: any) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <CustomModal isOpen={open} onRequestClose={closeModal} title='Delete Role'>
      <form onSubmit={formik.handleSubmit} className='w-full'>
        <div className='w-full border-[0.6px] rounded-md border-[#DBDBDB] p-4 mt-7 mb-10'>
          <h3 className='text-[#06102B] font-semibold text-lg mb-4 text-center'>
            Deleting this role would do the following:
          </h3>
          <ul className='flex flex-col gap-3'>
            <li className='flex items-center gap-[10px] text-[#4B5768]'>
              <CrossIcon />
              <span>Disassociate functionalities from admins under it</span>
            </li>
            <li className='flex items-center gap-[10px] text-[#4B5768]'>
              <CrossIcon />
              <span>Remove assigned permissions from it</span>
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
