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
        label='Topic title'
        className='mb-6'
        disabled={!isEditing}
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
      />

      <TextArea
        formik={formik}
        name='description'
        label='Topic description'
        placeholder='Description'
        disabled={!isEditing}
        rows={3}
      />
      {hasPermission(PERMISSIONS.update_topic) &&
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

export default TopicInfo;
