import React, { useState } from 'react';
import { SingleLessonType } from '../../../../types/data';
import { sendCatchFeedback, sendFeedback } from '../../../../functions/feedback';
import { appAxios } from '../../../../api/axios';
import * as yup from 'yup';
import { useFormik } from 'formik';
import LabelInput from '../../../../common/LabelInput/LabelInput';
import TextArea from '../../../../common/TextArea/TextArea';
import Button from '../../../../common/Button';
import usePermissions from '../../../../hooks/usePermissions';
import { PERMISSIONS } from '../../../../hooks/data';

const LessonInfo = ({ data }: { data: SingleLessonType | undefined }) => {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { hasPermission } = usePermissions();

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
      const response = await appAxios.patch(`/lessons/${data?._id}`, {
        title: formik.values.title,
        topic_id: data?.topic_id?._id,
        description: formik.values.description,
        sub_topic_id: data?.sub_topic_id?._id,
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
        label='Lesson title'
        className='mb-6'
        disabled={!isEditing}
      />

      <TextArea
        formik={formik}
        name='description'
        label='Lesson description'
        placeholder='Description'
        disabled={!isEditing}
        rows={3}
      />
      {hasPermission(PERMISSIONS.update_subtopic) &&
        (isEditing ? (
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
        ))}
    </form>
  );
};

export default LessonInfo;
