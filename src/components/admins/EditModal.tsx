import React, { useState } from 'react';
import CustomModal from '../../common/CustomModal/CustomModal';
import Button from '../../common/Button';
import { appAxios } from '../../api/axios';
import { sendCatchFeedback, sendFeedback } from '../../functions/feedback';
import { useFormik } from 'formik';
import * as yup from 'yup';
import LabelInput from '../../common/LabelInput/LabelInput';
import { AdminType } from '../../types/data';
import { useAppSelector } from '../../store/hooks';
import Dropdown from '../../common/Dropdown';

interface Props {
  closeModal: () => void;
  reload: () => void;
  open: boolean;
  data: AdminType | undefined;
}

function EditModal({ closeModal, reload, open, data }: Props) {
  const [loading, setLoading] = useState(false);
  const { user } = useAppSelector((state) => state.user);

  const formik = useFormik({
    initialValues: {
      email: data?.email || '',
      firstName: data?.firstName || '',
      phoneNumber: data?.phoneNumber?.slice(4) || '',
      userName: data?.userName || '',
      lastName: data?.lastName || '',
      role: data?.role || 'admin',
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object({
      email: yup.string().email('Enter a valid email').required('Required'),
      firstName: yup.string().required('Required'),
      phoneNumber: yup.string().required('Required'),
      userName: yup.string().required('Required'),
      lastName: yup.string().required('Required'),
      role: yup.string().required('Required'),
    }),
    enableReinitialize: true,
  });

  const submitValues = async () => {
    try {
      setLoading(true);
      const response = await appAxios.patch(`/admin-mgmt/${data?._id}`, {
        email: formik.values.email,
        firstName: formik.values.firstName,
        phoneNumber: `+234${formik.values.phoneNumber}`,
        userName: formik.values.userName,
        lastName: formik.values.lastName,
        role: formik.values.role,
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
          {user?.role === 'super' && (
            <Dropdown
              values={['admin', 'super'].map((item) => ({
                label: item,
                value: item,
              }))}
              name='role'
              formik={formik}
              placeholder='Admin Type'
              className='capitalize mb-6'
              value={{
                label: formik.values.role,
                value: formik.values.role,
              }}
              label='Admin Type'
            />
          )}
          <LabelInput
            formik={formik}
            name='firstName'
            label='First name'
            className='mb-6'
          />
          <LabelInput
            formik={formik}
            name='lastName'
            label='Last name'
            className='mb-6'
          />
          <LabelInput formik={formik} name='userName' label='Username' className='mb-6' />
          <LabelInput
            formik={formik}
            name='email'
            label='Email'
            type='email'
            className='mb-6'
          />
          <LabelInput
            formik={formik}
            name='phoneNumber'
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
