import React, { useEffect, useState } from 'react';
import CustomModal from '../../../../../common/CustomModal/CustomModal';
import Button from '../../../../../common/Button';
import { appAxios } from '../../../../../api/axios';
import { sendCatchFeedback, sendFeedback } from '../../../../../functions/feedback';
import { useFormik } from 'formik';
import * as yup from 'yup';
import LabelInput from '../../../../../common/LabelInput/LabelInput';
import { QuestionOptionType, TestType } from '../../../../../types/data';
import OptionForm from './OptionForm';
import Dropdown from '../../../../../common/Dropdown';

interface Props {
  closeModal: () => void;
  reload: () => void;
  open: boolean;
  subTopic: string | undefined;
  topic: string | undefined;
  data: TestType | undefined;
}

function EditModal({ closeModal, reload, open, subTopic, data, topic }: Props) {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<QuestionOptionType[] | undefined>(undefined);

  const formik = useFormik({
    initialValues: {
      title: data?.title || '',
      question_type: data?.question_type || '',
      question_input_type: data?.question_input_type || '',
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object({
      title: yup.string().required('Required'),
      question_type: yup.string().required('Required'),
      question_input_type: yup.string().when('question_type', {
        is: 'input',
        then: (schema) => schema.required('Input type is required'),
      }),
    }),
    enableReinitialize: true,
  });

  const submitValues = async () => {
    if (!options || options.length <= 0) {
      return sendFeedback('Please add options under this question', 'error');
    }

    const invalidQuestionInput =
      options.some((item) => !item.option_value) || // option doesn't have value
      !options.some((item) => item.isCorrectAnswer); // no correct answer selected

    if (invalidQuestionInput) {
      return sendFeedback('Please ensure all fields are entered correctly', 'error');
    }

    try {
      setLoading(true);
      const response = await appAxios.patch(`/questions/${data?._id}`, {
        sub_topic_id: subTopic,
        topic_id: topic,
        title: formik.values.title,
        question_type: formik.values.question_type,
        ...(formik.values.question_type === 'input' && {
          question_input_type: formik.values.question_input_type,
        }),
        options: options?.map((option) => ({
          option_value: option.option_value,
          isCorrectAnswer: option.isCorrectAnswer || false,
        })),
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

  useEffect(() => {
    if (data) {
      setOptions(data.options);
    }
  }, [data]);

  if (!data) return null;

  return (
    <CustomModal
      isOpen={open}
      onRequestClose={closeModal}
      title='Update Question'
      width='1200px'
      shouldCloseOnOverlayClick={false}
    >
      <form onSubmit={formik.handleSubmit} className='w-full' spellCheck>
        <div className='w-full border-[0.6px] rounded-md border-[#DBDBDB] p-4 mt-7 mb-10'>
          <div className='grid grid-cols-1 md:grid-cols-2 w-full gap-6 mb-6'>
            <LabelInput
              formik={formik}
              name='title'
              label='Question'
              placeholder='Type the question here'
            />
            <Dropdown
              name='question_type'
              label='Question Type'
              className='capitalize'
              placeholder='Type of question'
              formik={formik}
              defaultValue={{
                label: formik.values.question_type,
                value: formik.values.question_type,
              }}
              values={['input', 'radio', 'checkbox', 'dropdown'].map((item) => ({
                label: item,
                value: item,
              }))}
            />
            {formik.values.question_type === 'input' && (
              <Dropdown
                formik={formik}
                name='question_input_type'
                label='Input Type'
                className='capitalize'
                placeholder='Type of question input'
                values={['text', 'number'].map((item) => ({
                  label: item,
                  value: item,
                }))}
                defaultValue={{
                  label: formik.values.question_input_type,
                  value: formik.values.question_input_type,
                }}
              />
            )}
          </div>

          <OptionForm options={options} setOptions={setOptions} />
        </div>
        <div className='flex items-center justify-center w-full px-5'>
          <div className='md:max-w-[50%] flex w-full justify-center gap-4'>
            <Button type='submit' loading={loading} className='!w-full'>
              Update
            </Button>
            <Button color='secondary' onClick={closeModal} className='!w-full'>
              Close
            </Button>
          </div>
        </div>
      </form>
    </CustomModal>
  );
}

export default EditModal;
