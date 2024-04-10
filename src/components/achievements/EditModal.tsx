import { useFormik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';
import { appAxios } from '../../api/axios';
import Button from '../../common/Button';
import CustomModal from '../../common/CustomModal/CustomModal';
import Dropdown from '../../common/Dropdown';
import LabelInput from '../../common/LabelInput/LabelInput';
import { sendCatchFeedback, sendFeedback } from '../../functions/feedback';
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
      no_of_topics: data?.no_of_topics || undefined,
      no_of_sub_topics: data?.no_of_sub_topics || undefined,
      no_of_lessons: data?.no_of_lessons || undefined,
      no_of_tests: data?.tests?.no_of_tests || undefined,
      avg_score: data?.tests?.avg_score || undefined,
      no_of_days_in_streak: data?.no_of_days_in_streak || undefined,
      changeBadge: false,
      newBadge: undefined,
      active: data?.active,
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object({
      name: yup.string().required('Required'),
      notification_message: yup.string().required('Required'),
    }),
    enableReinitialize: true,
  });

  const submitValues = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formik.values.newBadge && formData.append('badge', formik.values.newBadge);
      formData.append('name', formik.values.name);
      formData.append('notification_message', formik.values.notification_message);

      formik.values.no_of_topics &&
        formData.append('no_of_topics', formik.values.no_of_topics.toString());
      formik.values.no_of_lessons &&
        formData.append('no_of_lessons', formik.values.no_of_lessons.toString());
      formik.values.no_of_sub_topics &&
        formData.append('no_of_sub_topics', formik.values.no_of_sub_topics.toString());
      formik.values.no_of_tests &&
        formData.append('no_of_tests', formik.values.no_of_tests.toString());
      formik.values.avg_score &&
        formData.append('avg_score', formik.values.avg_score.toString());
      formik.values.no_of_days_in_streak &&
        formData.append(
          'no_of_days_in_streak',
          formik.values.no_of_days_in_streak.toString()
        );
      formData.append('active', String(formik.values.active));

      const response = await appAxios.patch(`/achievements/${data?._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
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
    <CustomModal
      isOpen={open}
      onRequestClose={closeModal}
      title='Edit Achievement'
      width='1000px'
    >
      <form onSubmit={formik.handleSubmit} className='w-full'>
        <div className='w-full border-[0.6px] rounded-md border-[#DBDBDB] p-4 mt-7 mb-10 grid grid-cols-1 md:grid-cols-2 gap-6'>
          <LabelInput formik={formik} name='name' label='Name' />
          <LabelInput
            formik={formik}
            name='notification_message'
            label='Notification Message'
          />
          <LabelInput
            formik={formik}
            name='no_of_topics'
            label='Number of topics'
            type='number'
          />
          <LabelInput
            formik={formik}
            name='no_of_sub_topics'
            label='Number of sub topics'
            type='number'
          />
          <LabelInput
            formik={formik}
            name='no_of_lessons'
            label='Number of Lessons'
            type='number'
          />
          <LabelInput
            formik={formik}
            name='no_of_tests'
            label='Number of tests'
            type='number'
          />
          <LabelInput
            formik={formik}
            name='avg_score'
            label='Average score'
            type='number'
          />
          <LabelInput
            formik={formik}
            name='no_of_days_in_streak'
            label='Number of days in streak'
            type='number'
          />
          <Dropdown
            values={[
              { label: 'Yes', value: true },
              { label: 'No', value: false },
            ].map(({ label, value }) => ({
              label,
              value,
            }))}
            name='active'
            formik={formik}
            placeholder='Activate Now?'
            className='md:col-span-2'
            value={{
              label: formik.values.active ? 'Yes' : 'No',
              value: formik.values.active,
            }}
            label='Activate'
          />
          <Dropdown
            values={[
              { label: 'Yes', value: true },
              { label: 'No', value: false },
            ].map(({ label, value }) => ({
              label,
              value,
            }))}
            name='changeBadge'
            formik={formik}
            placeholder='Change Badge Image?'
            className='md:col-span-2'
            value={{
              label: formik.values.changeBadge ? 'Yes' : 'No',
              value: formik.values.changeBadge,
            }}
            label='Change Badge Image'
          />
          {formik.values.changeBadge && (
            <div className='flex flex-col gap-3 col-span-2 border rounded p-2'>
              <label htmlFor='badgeImage'>New Badge Image</label>
              <input
                type='file'
                name='badgeImage'
                id='badgeImage'
                accept='image/*'
                onChange={(e: any) => {
                  const file = e.target.files[0];
                  formik.setFieldValue('newBadge', file);
                }}
              />
            </div>
          )}
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
