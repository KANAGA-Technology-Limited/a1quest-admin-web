import React from 'react';
import Button from '../../common/Button';
import LabelInput from '../../common/LabelInput/LabelInput';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { sendCatchFeedback, sendFeedback } from '../../functions/feedback';
import { appAxios } from '../../api/axios';
import { useNavigate, useParams } from 'react-router-dom';

const VerifyAccountForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const param = useParams();

  const formik = useFormik({
    initialValues: {
      code: '',
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object({
      code: yup.string().required('Code is required'),
    }),
  });

  const submitValues = async () => {
    try {
      setLoading(true);
      const response = await appAxios.post('/admin/verify-code', {
        verificationCode: formik.values.code,
      });
      sendFeedback(response.data?.message, 'success');
      formik.resetForm();
      navigate('/auth/login');
    } catch (error: any) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };

  const sendVerificationCode = async () => {
    try {
      setLoading(true);
      const response = await appAxios.post('/admin/resend-code', {
        email: param?.email,
      });
      sendFeedback(response.data?.message, 'success');
    } catch (error: any) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className='font-bold text-xl md:text-[26px] mb-[3px] font-poppins'>
        Verify Account
      </h1>
      <p className='md:text-lg mb-6'>Enter the verification code sent to your email</p>

      <form onSubmit={formik.handleSubmit} className='w-full md:w-3/5 '>
        <LabelInput
          formik={formik}
          name='code'
          label='Verification code'
          className='mb-[22px]'
        />
        <div className='mb-[66px]'>
          <span className='text-sm font-normal '>
            Didn&apos;t receive a verification code?{' '}
            <button
              className='text-primary font-semibold'
              type='button'
              onClick={sendVerificationCode}
            >
              Resend
            </button>
          </span>
        </div>
        <Button type='submit' loading={loading} className='w-full'>
          Verify Account
        </Button>
      </form>
    </>
  );
};

export default VerifyAccountForm;
