import React from 'react';
import Button from '../../common/Button';
import LabelInput from '../../common/LabelInput/LabelInput';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { sendCatchFeedback, sendFeedback } from '../../functions/feedback';
import { appAxios } from '../../api/axios';
import { useAppDispatch } from '../../store/hooks';
import { Link, useNavigate } from 'react-router-dom';
import {
  //  signOut,
  updateToken,
  updateUser,
} from '../../store/slices/user';
import { UserType } from '../../types/user';

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object({
      email: yup.string().email('Enter a valid email').required('Email is required'),
      password: yup.string().required('Password is required'),
    }),
  });
  const submitValues = async () => {
    try {
      setLoading(true);
      const response = await appAxios.post('/admin/login', {
        email: formik.values.email,
        password: formik.values.password,
      });
      const userToken = response.data?.data;
      dispatch(updateToken({ token: userToken }));

      const accountResponse = await appAxios.get('/admin/profile');
      const accountInfo: UserType = accountResponse.data.data;
      dispatch(updateUser({ user: accountInfo }));

      // Check if account is verified
      // if (!accountInfo.isVerified) {
      //   // Sign the user out so they can verify their email first
      //   dispatch(signOut());

      //   // Send verification code
      //   sendFeedback('Verify your account to continue', 'info');
      //   await appAxios.post('/admin/resend-code', {
      //     email: accountInfo.email,
      //   });
      //   return navigate('/auth/verify-email');
      // }

      sendFeedback(response.data?.message, 'success');
      formik.resetForm();
      return navigate('/dashboard');
    } catch (error: any) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className='font-bold text-xl md:text-[26px] mb-[3px] font-poppins'>
        Hello Again!
      </h1>
      <p className='md:text-lg mb-6'>Welcome Back</p>
      <form onSubmit={formik.handleSubmit} className='w-full '>
        <LabelInput
          formik={formik}
          name='email'
          label='Email'
          type='email'
          className='mb-6'
        />
        <LabelInput
          formik={formik}
          name='password'
          label='Password'
          type='password'
          className='mb-[32px]'
        />

        <Button type='submit' loading={loading} className='!w-full'>
          Login
        </Button>
        <div className='mt-[18px] text-center'>
          <Link to='/auth/forgot-password' className='text-sm font-normal opacity-70'>
            Forgot password
          </Link>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
