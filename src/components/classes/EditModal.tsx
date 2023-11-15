import { useState } from 'react';
import CustomModal from '../../common/CustomModal/CustomModal';
import * as yup from 'yup';
import { useFormik } from 'formik';
import LabelInput from '../../common/LabelInput/LabelInput';
import Button from '../../common/Button';
import { appAxios } from '../../api/axios';
import { sendCatchFeedback, sendFeedback } from '../../functions/feedback';
import { ClassType } from '../../types/data';

interface Props {
  closeModal: () => void;
  open: boolean;
  refetch: () => void;
  data: ClassType | undefined;
}

function EditModal({ closeModal, refetch, open, data }: Props) {
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
      const response = await appAxios.patch('/classes/' + data?._id, {
        name: formik.values.name,
      });
      sendFeedback(response.data?.message, 'success');
      refetch();
      return closeModal();
    } catch (error: any) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <CustomModal isOpen={open} onRequestClose={closeModal} title='Edit Class'>
      <form onSubmit={formik.handleSubmit} className='w-full'>
        <div className='w-full border-[0.6px] rounded-md border-[#DBDBDB] p-4 mt-7 mb-10'>
          <LabelInput
            formik={formik}
            name='name'
            label='Class Name'
            placeholder='Enter class name'
          />
        </div>

        <div className='flex items-center w-full justify-around gap-4 px-5'>
          <Button type='submit' loading={loading} className='!w-full'>
            Update
          </Button>
          <Button color='secondary' onClick={closeModal} className='!w-full'>
            Close
          </Button>
        </div>
      </form>
    </CustomModal>
  );
}

export default EditModal;
