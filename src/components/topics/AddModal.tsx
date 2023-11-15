import React, { useState } from 'react';
import CustomModal from '../../common/CustomModal/CustomModal';
import Button from '../../common/Button';
import { appAxios } from '../../api/axios';
import { sendCatchFeedback, sendFeedback } from '../../functions/feedback';
import { useFormik } from 'formik';
import * as yup from 'yup';
import LabelInput from '../../common/LabelInput/LabelInput';
import { ClassType } from '../../types/data';
import TextArea from '../../common/TextArea/TextArea';
import Dropdown from '../../common/Dropdown';

interface Props {
  closeModal: () => void;
  reload: () => void;
  open: boolean;
  classes: ClassType[] | undefined;
}

function AddModal({ closeModal, reload, open, classes }: Props) {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: '',
      selectedClass: '',
      description: '',
      test_notice: '',
      num_of_questions: '',
      test_duration: '',
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object({
      title: yup.string().required('Required'),
      selectedClass: yup.string().required('Required'),
      description: yup.string().required('Required'),
    }),
  });

  const submitValues = async () => {
    try {
      setLoading(true);
      const response = await appAxios.post(`/topics`, {
        title: formik.values.title,
        class_id: formik.values.selectedClass,
        description: formik.values.description,
        test_notice: formik.values.test_notice,
        num_of_questions: Number(formik.values.num_of_questions),
        test_duration: Number(formik.values.test_duration),
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
    <CustomModal isOpen={open} onRequestClose={closeModal} title='Create Topic'>
      <form onSubmit={formik.handleSubmit} className='w-full' spellCheck>
        <div className='w-full border-[0.6px] rounded-md border-[#DBDBDB] p-4 mt-7 mb-10'>
          <LabelInput
            formik={formik}
            name='title'
            label='Topic title'
            className='mb-6'
            placeholder='Title'
            required
          />
          <Dropdown
            values={
              classes?.map((item) => ({
                label: item.name,
                value: item._id,
              })) || []
            }
            name='selectedClass'
            formik={formik}
            className='capitalize mb-6'
            placeholder='Class'
            label='Class'
            required
          />
          <TextArea
            formik={formik}
            name='description'
            label='Topic description'
            placeholder='Description'
            rows={3}
            className='mb-6'
            required
          />
          <TextArea
            formik={formik}
            name='test_notice'
            label='Test notice'
            placeholder="Notice to the students when taking this topics's test"
            rows={3}
            className='mb-6'
          />
          <LabelInput
            formik={formik}
            name='num_of_questions'
            label='Number of test questions'
            placeholder='Number of questions students should answer'
            className='mb-6'
            type='number'
          />
          <LabelInput
            formik={formik}
            name='test_duration'
            label='Test duration (minutes)'
            placeholder='How long the test should take for this topic'
            type='number'
          />
        </div>
        <div className='flex items-center w-full justify-around gap-4 px-5'>
          <Button type='submit' loading={loading} className='!w-full'>
            Create
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
