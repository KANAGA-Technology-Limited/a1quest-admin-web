import React, { useState } from 'react';
import CustomModal from '../../common/CustomModal/CustomModal';
import Button from '../../common/Button';
import { appAxios } from '../../api/axios';
import { sendCatchFeedback, sendFeedback } from '../../functions/feedback';
import { useFormik } from 'formik';
import * as yup from 'yup';
import LabelInput from '../../common/LabelInput/LabelInput';
import { AchievementType } from '../../types/data';

interface Props {
  closeModal: () => void;
  reload: () => void;
  open: boolean;
  data: AchievementType | undefined;
}

function EditModal({ closeModal, reload, open, data }: Props) {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: data?.name || '',
      notification_message: data?.notification_message || '',
      badge: data?.badge?.slice(4) || '',
      no_of_lessons: data?.no_of_lessons || '',
      no_of_sub_topics: data?.no_of_sub_topics || '',
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object({
      name: yup.string().required('Required'),
      notification_message: yup.string().required('Required'),
      badge: yup.string().required('Required'),
      no_of_lessons: yup.string().required('Required'),
      no_of_sub_topics: yup.string().required('Required'),
    }),
    enableReinitialize: true,
  });

  const submitValues = async () => {
    try {
      setLoading(true);
      const response = await appAxios.patch(`/admin-mgmt/${data?._id}`, {
        name: formik.values.name,
        notification_message: formik.values.notification_message,
        badge: `+234${formik.values.badge}`,
        no_of_lessons: formik.values.no_of_lessons,
        no_of_sub_topics: formik.values.no_of_sub_topics,
      });
      closeModal();
      reload();
      sendFeedback(response.data?.message, 'success');
    } catch (error) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };

  if (!data) return null;

  return (
    <CustomModal isOpen={open} onRequestClose={closeModal} title='Edit Admin'>
      <form onSubmit={formik.handleSubmit} className='w-full'>
        <div className='w-full border-[0.6px] rounded-md border-[#DBDBDB] p-4 mt-7 mb-10'>
          <LabelInput
            formik={formik}
            name='notification_message'
            label='First name'
            className='mb-6'
          />
          <LabelInput
            formik={formik}
            name='no_of_sub_topics'
            label='Last name'
            className='mb-6'
          />
          <LabelInput
            formik={formik}
            name='no_of_lessons'
            label='Username'
            className='mb-6'
          />
          <LabelInput
            formik={formik}
            name='name'
            label='Email'
            type='name'
            className='mb-6'
          />
          <LabelInput
            formik={formik}
            name='badge'
            label='Phone number'
            type='number'
            className='mb-6'
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
