import { useState } from 'react';
import CustomModal from '../../common/CustomModal/CustomModal';
import * as yup from 'yup';
import { useFormik } from 'formik';
import LabelInput from '../../common/LabelInput/LabelInput';
import Button from '../../common/Button';
import { appAxios } from '../../api/axios';
import { sendCatchFeedback, sendFeedback } from '../../functions/feedback';

interface Props {
  closeModal: () => void;
  open: boolean;
  refetch: () => void;
}

function AddModal({ closeModal, refetch, open }: Props) {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object({
      name: yup.string().required('Required'),
    }),
  });

  const submitValues = async () => {
    try {
      setLoading(true);
      const response = await appAxios.post('/classes', {
        name: formik.values.name,
      });
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
    <CustomModal isOpen={open} onRequestClose={closeModal} title='Add Class'>
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
            Add Class
          </Button>
          <Button color='secondary' onClick={closeModal} className='!w-full'>
            Close
          </Button>
        </div>
      </form>
    </CustomModal>
  );
}

export default AddModal;
