import React, { useEffect, useState } from 'react';
import { ClassType, SingleTopicType } from '../../../types/data';
import { sendCatchFeedback, sendFeedback } from '../../../functions/feedback';
import { appAxios } from '../../../api/axios';
import * as yup from 'yup';
import { useFormik } from 'formik';
import LabelInput from '../../../common/LabelInput/LabelInput';
import Dropdown from '../../../common/Dropdown';
import TextArea from '../../../common/TextArea/TextArea';
import Button from '../../../common/Button';
import usePermissions from '../../../hooks/usePermissions';
import { PERMISSIONS } from '../../../hooks/data';

const TopicInfo = ({ data }: { data: SingleTopicType | undefined }) => {
  const [loading, setLoading] = useState(false);
  const [allClasses, setAllClasses] = useState<ClassType[] | undefined>(undefined);
  const [isEditing, setIsEditing] = useState(false);
  const { hasPermission } = usePermissions();

  const getClasses = async () => {
    try {
      const response = await appAxios.get(`/classes`);
      setAllClasses(response.data?.data);
    } catch (error) {
      sendCatchFeedback(error);
    }
  };
  useEffect(() => {
    if (data) {
      hasPermission(PERMISSIONS.view_class) && getClasses();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const formik = useFormik({
    initialValues: {
      title: data?.title || '',
      selectedClass: data?.class_id?._id || '',
      description: data?.description || '',
      test_notice: data?.test_notice || '',
      num_of_questions: data?.num_of_questions || '',
      test_duration: data?.test_duration || '',
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object({
      title: yup.string().required('Required'),
      selectedClass: yup.string().required('Required'),
      description: yup.string().required('Required'),
    }),
    enableReinitialize: true,
  });

  const submitValues = async () => {
    try {
      setLoading(true);
      const response = await appAxios.patch(`/topics/${data?._id}`, {
        title: formik.values.title,
        class_id: formik.values.selectedClass,
        description: formik.values.description,
        test_notice: formik.values.test_notice,
        num_of_questions: Number(formik.values.num_of_questions),
        test_duration: Number(formik.values.test_duration),
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
      {/* Uneditable elements */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 pb-2 border-b-2'>
        <p>
          <b>Enrollments:</b> {data.num_of_enrollments || 0}
        </p>
        <p>
          <b>Created by:</b> {data.created_by.firstName + ' ' + data.created_by.lastName}
        </p>
        <p>
          <b>Date created:</b> {new Date(data.creation_date).toDateString()}
        </p>
        <p>
          <b>Last updated by:</b>{' '}
          {data.last_updated_by.firstName + ' ' + data.last_updated_by.lastName}
        </p>
        <p>
          <b>Last date updated:</b> {new Date(data.last_update_date).toDateString()}
        </p>
      </div>

      <LabelInput
        formik={formik}
        name='title'
        label='Topic title'
        className='mb-6'
        disabled={!isEditing}
        required
      />
      <Dropdown
        values={
          allClasses?.map((item) => ({
            label: item.name,
            value: item._id,
          })) || []
        }
        name='selectedClass'
        formik={formik}
        className='capitalize mb-6'
        label='Class'
        value={{
          label: allClasses?.find((item) => item._id === formik.values.selectedClass)
            ?.name,
          value: formik.values.selectedClass,
        }}
        isDisabled={!isEditing}
        required
      />

      <TextArea
        formik={formik}
        name='description'
        label='Topic description'
        placeholder='Description'
        disabled={!isEditing}
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
        disabled={!isEditing}
      />
      <LabelInput
        formik={formik}
        name='num_of_questions'
        label='Number of test questions'
        placeholder='Number of questions students should answer'
        className='mb-6'
        type='number'
        disabled={!isEditing}
      />
      <LabelInput
        formik={formik}
        name='test_duration'
        label='Test duration (minutes)'
        disabled={!isEditing}
        placeholder='How long the test should take for this topic'
        type='number'
      />

      {hasPermission(PERMISSIONS.update_topic) &&
        (isEditing ? (
          <div className='flex gap-5 mt-10'>
            <Button
              onClick={() => formik.handleSubmit()}
              loading={loading}
              className='!w-[236px] !max-w-full'
            >
              Update
            </Button>
            <Button
              onClick={() => setIsEditing(false)}
              color='secondary'
              className='!w-[236px] !max-w-full'
            >
              Cancel
            </Button>
          </div>
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

export default TopicInfo;
