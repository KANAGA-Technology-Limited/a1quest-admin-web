import React, { useState } from 'react';
import { SingleSubTopicType } from '../../../../types/data';
import { sendCatchFeedback, sendFeedback } from '../../../../functions/feedback';
import { appAxios } from '../../../../api/axios';
import * as yup from 'yup';
import { useFormik } from 'formik';
import LabelInput from '../../../../common/LabelInput/LabelInput';
import TextArea from '../../../../common/TextArea/TextArea';
import Button from '../../../../common/Button';

const SubTopicInfo = ({ data }: { data: SingleSubTopicType | undefined }) => {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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
        description: formik.values.description,
        topic_id: data?.topic_id._id,
      });

      sendFeedback(response.data?.message, 'success');
      setIsEditing(false);
    } catch (error) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };

  if (!data) return null;

  return (
    <form
      className='border-[0.5px] border-[#DBDBDB] rounded-[6px] px-5 py-4 w-full'
      spellCheck
    >
      <LabelInput
        formik={formik}
        name='title'
        label='Sub-Topic title'
        className='mb-6'
        disabled={!isEditing}
      />

      <TextArea
        formik={formik}
        name='description'
        label='Sub-Topic description'
        placeholder='Description'
        disabled={!isEditing}
        rows={3}
      />
      {isEditing ? (
        <Button
          onClick={() => formik.handleSubmit()}
          loading={loading}
          className='!w-[236px] !max-w-full mt-10'
        >
          Update
        </Button>
      ) : (
        <Button
          onClick={() => setIsEditing(true)}
          color='secondary'
          className='!w-[236px] !max-w-full mt-10'
        >
          Edit
        </Button>
      )}
    </form>
  );
};

export default SubTopicInfo;
