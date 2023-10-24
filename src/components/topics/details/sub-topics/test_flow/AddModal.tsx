import React, { useState } from 'react';
import CustomModal from '../../../../../common/CustomModal/CustomModal';
import Button from '../../../../../common/Button';
import { appAxios } from '../../../../../api/axios';
import { sendCatchFeedback, sendFeedback } from '../../../../../functions/feedback';
import { useFormik } from 'formik';
import * as yup from 'yup';
import LabelInput from '../../../../../common/LabelInput/LabelInput';
import { TestQuestionType } from '../../../../../types/data';
import QuestionForm from './QuestionForm';

interface Props {
  closeModal: () => void;
  reload: () => void;
  open: boolean;
  subTopic: string | undefined;
  topic: string | undefined;
}

function AddModal({ closeModal, reload, open, subTopic, topic }: Props) {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<TestQuestionType[] | undefined>(undefined);

  const formik = useFormik({
    initialValues: {
      duration: '',
      notice: '',
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object({
      notice: yup.string().required('Required'),
      duration: yup.string().required('Required'),
    }),
  });

  const submitValues = async () => {
    if (!questions || questions.length <= 0) {
      return sendFeedback('Please add questions under this test', 'error');
    }

    const invalidQuestionInput = questions.some(
      (item) =>
        !item.title || // question title isn't provided
        !item.question_type || // question type isn't selected
        (item.question_type === 'input' && !item.question_input_type) || // question type is input and input type isn't selected
        !item.options || // no options
        item.options.some((option) => !option.option_value) || // one option name is missing
        !item.options.some((option) => option.isCorrectAnswer) // no correct answer selected
    );

    if (invalidQuestionInput) {
      return sendFeedback('Please ensure all fields are entered correctly', 'error');
    }

    try {
      setLoading(true);
      const response = await appAxios.post(`/tests`, {
        duration: Number(formik.values.duration),
        notice: formik.values.notice,
        sub_topic_id: subTopic,
        topic_id: topic,
        questions: questions.map((question) => ({
          title: question.title,
          question_type: question.question_type,
          question_input_type: question.question_input_type,
          options: question.options?.map((option) => ({
            option_value: option.option_value,
            isCorrectAnswer: option.isCorrectAnswer,
          })),
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

  return (
    <CustomModal
      isOpen={open}
      onRequestClose={closeModal}
      title='Create Test'
      width='1200px'
      shouldCloseOnOverlayClick={false}
    >
      <form onSubmit={formik.handleSubmit} className='w-full' spellCheck>
        <div className='w-full border-[0.6px] rounded-md border-[#DBDBDB] p-4 mt-7 mb-10'>
          <div className='grid grid-cols-1 md:grid-cols-2 w-full gap-6 mb-6'>
            <LabelInput
              formik={formik}
              name='notice'
              label='Test Notice'
              placeholder='Notice'
              hint='Note to students before they start the test'
            />
            <LabelInput
              formik={formik}
              name='duration'
              label='Test duration (minutes)'
              placeholder='Duration'
              hint='How long would the test last'
              type='number'
            />
          </div>

          <QuestionForm questions={questions} setQuestions={setQuestions} />
        </div>
        <div className='flex items-center justify-center w-full px-5'>
          <div className='md:max-w-[50%] flex w-full justify-center gap-4'>
            <Button type='submit' loading={loading} className='!w-full'>
              Create
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

export default AddModal;
