import React, { useState } from 'react';
import CustomModal from '../../../../common/CustomModal/CustomModal';
import Button from '../../../../common/Button';
import { appAxios } from '../../../../api/axios';
import { sendCatchFeedback, sendFeedback } from '../../../../functions/feedback';
import { useFormik } from 'formik';
import * as yup from 'yup';
import LabelInput from '../../../../common/LabelInput/LabelInput';
import { SubTopicType } from '../../../../types/data';
import TextArea from '../../../../common/TextArea/TextArea';

interface Props {
  closeModal: () => void;
  reload: () => void;
  open: boolean;
  topic: string | undefined;
  data: SubTopicType | undefined;
}

function EditModal({ closeModal, reload, open, data, topic }: Props) {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: data?.title || '',
      description: data?.description || '',
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object({
      title: yup.string().required('Required'),
      description: yup.string().required('Required'),
    }),
    enableReinitialize: true,
  });

  const submitValues = async () => {
    try {
      setLoading(true);
      const response = await appAxios.patch(`/sub-topics/${data?._id}`, {
        title: formik.values.title,
        topic_id: topic,
        description: formik.values.description,
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

  if (!data) return null;

  return (
    <CustomModal isOpen={open} onRequestClose={closeModal} title='Edit Sub-Topic'>
      <form onSubmit={formik.handleSubmit} className='w-full' spellCheck>
        <div className='w-full border-[0.6px] rounded-md border-[#DBDBDB] p-4 mt-7 mb-10'>
          <LabelInput
            formik={formik}
            name='title'
            label='Sub-Topic title'
            className='mb-6'
          />

          <TextArea
            formik={formik}
            name='description'
            label='Sub-Topic description'
            placeholder='Description'
            rows={3}
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
