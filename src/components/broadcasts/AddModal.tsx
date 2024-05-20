import { useFormik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';
import { appAxios } from '../../api/axios';
import Button from '../../common/Button';
import CustomModal from '../../common/CustomModal/CustomModal';
import Dropdown from '../../common/Dropdown';
import LabelInput from '../../common/LabelInput/LabelInput';
import { sendCatchFeedback, sendFeedback } from '../../functions/feedback';

interface Props {
  closeModal: () => void;
  reload: () => void;
  open: boolean;
}

function AddModal({ closeModal, reload, open }: Props) {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      message: '',
      type: 'in-app',
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object({
      message: yup.string().required('Required'),
      type: yup.string().required('Required'),
    }),
  });

  const submitValues = async () => {
    try {
      setLoading(true);

      const response = await appAxios.post(`/notification-broadcast`, {
        message: formik.values.message,
        type: formik.values.type,
      });
      closeModal();
      reload();
      formik.resetForm();
      sendFeedback(response.data?.message, 'success');
    } catch (error) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomModal
      isOpen={open}
      onRequestClose={closeModal}
      title='Send Broadcast'
      width='600px'
    >
      <form onSubmit={formik.handleSubmit} className='w-full'>
        <div className='w-full border-[0.6px] rounded-md border-[#DBDBDB] p-4 mt-7 mb-10 grid grid-cols-1 gap-6'>
          <LabelInput formik={formik} name='message' label='Notification Message' />
          <Dropdown
            values={[
              { label: 'In-App Notification', value: 'in-app' },
              { label: 'Push Notification', value: 'push' },
            ].map(({ label, value }) => ({
              label,
              value,
            }))}
            name='type'
            formik={formik}
            placeholder='Broadcast Type'
            defaultValue={{
              label:
                formik.values.type === 'in-app'
                  ? 'In-App Notification'
                  : 'Push Notification',
              value: formik.values.type,
            }}
            label='Broadcast Type'
          />
        </div>
        <div className='flex items-center w-full justify-around gap-4 px-5'>
          <Button type='submit' loading={loading} className='!w-full'>
            Send
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
