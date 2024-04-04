import React, { useState } from 'react';
import CustomModal from '../../common/CustomModal/CustomModal';
import Button from '../../common/Button';
import { appAxios } from '../../api/axios';
import { sendCatchFeedback, sendFeedback } from '../../functions/feedback';
import { useFormik } from 'formik';
import * as yup from 'yup';
import LabelInput from '../../common/LabelInput/LabelInput';
import { useAppSelector } from '../../store/hooks';
import Dropdown from '../../common/Dropdown';

interface Props {
  closeModal: () => void;
  reload: () => void;
  open: boolean;
}

function AddModal({ closeModal, reload, open }: Props) {
  const [loading, setLoading] = useState(false);
  const { user } = useAppSelector((state) => state.user);

  const formik = useFormik({
    initialValues: {
      email: '',
      firstName: '',
      phoneNumber: '',
      userName: '',
      lastName: '',
      password: '',
      role: 'admin',
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
      password: yup.string().required('Required'),
      role: yup.string().required('Required'),
    }),
  });

  const submitValues = async () => {
    try {
      setLoading(true);
      const response = await appAxios.post(`/admin-mgmt`, {
        email: formik.values.email,
        firstName: formik.values.firstName,
        phoneNumber: `+234${formik.values.phoneNumber}`,
        userName: formik.values.userName,
        lastName: formik.values.lastName,
        password: formik.values.password,
        role: formik.values.role,
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
    <CustomModal isOpen={open} onRequestClose={closeModal} title='Create Admin'>
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
          <LabelInput formik={formik} name='password' label='Password' type='password' />
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
