import React from 'react';
import {
  AllowedInputTypes,
  AllowedQuestionTypes,
  TestQuestionType,
} from '../../../../types/data';
import { AddIcon, DeleteIcon } from '../../../icons';
import LabelInput from '../../../../common/LabelInput/LabelInput';
import Dropdown from '../../../../common/Dropdown';
import Checkbox from '../../../../common/Checkbox';

const QuestionForm = ({
  questions,
  setQuestions,
}: {
  questions: TestQuestionType[] | undefined;
  setQuestions: React.Dispatch<React.SetStateAction<TestQuestionType[] | undefined>>;
}) => {
  const addQuestion = () => {
    setQuestions((current) => {
      const currentQuestions = current ? [...current] : [];
      currentQuestions.push({
        title: '',
        question_type: 'input',
        question_input_type: 'text',
        options: [],
      });
      return [...currentQuestions];
    });
  };

  const removeQuestion = (index: number) => {
    setQuestions((current) => {
      const currentQuestions = current ? [...current] : [];
      currentQuestions.splice(index, 1);
      return [...currentQuestions];
    });
  };

  const handleOnChangeQuestion = (data: TestQuestionType, index: number) => {
    const list = questions ? [...questions] : [];
    const value = data || {};
    list[index] = {
      ...list[index],
      ...value,
    };
    setQuestions(() => [...list]);
  };

  const addOptionToQuestion = (index: number) => {
    const list = questions ? [...questions] : [];
    list[index] = {
      ...list[index],
      options: [...(list[index].options || []), { option_value: '' }],
    };
    setQuestions(() => [...list]);
  };

  const removeOptionFromQuestion = (questionIndex: number, optionIndex: number) => {
    const list = questions ? [...questions] : [];
    list[questionIndex].options?.splice(optionIndex, 1);

    setQuestions(() => [...list]);
  };

  const handleOnChangeOption = (
    option: string,
    questionIndex: number,
    optionIndex: number
  ) => {
    const list = questions ? [...questions] : [];
    const options = list[questionIndex].options;
    if (options) {
      options[optionIndex].option_value = option;
    }

    list[questionIndex] = {
      ...list[questionIndex],
      options,
    };
    setQuestions(() => [...list]);
  };

  const handleOnChangeOptionCorrectAnswer = (
    isCorrectAnswer: boolean,
    questionIndex: number,
    optionIndex: number
  ) => {
    const list = questions ? [...questions] : [];
    const options = list[questionIndex].options;
    if (options) {
      options[optionIndex].isCorrectAnswer = isCorrectAnswer;
    }

    list[questionIndex] = {
      ...list[questionIndex],
      options,
    };
    setQuestions(() => [...list]);
  };

  return (
    <>
      <div className='mb-4 flex items-center justify-between w-full p-2 bg-gray-500 text-white rounded'>
        <p>Test Questions ({questions?.length || 0})</p>
        <button
          type='button'
          className='flex gap-2 items-center bg-white p-2 text-black rounded group hover:text-white duration-300 hover:bg-black border-none outline-none'
          onClick={addQuestion}
        >
          <AddIcon className='[&>path]:!stroke-black group-hover:[&>path]:!stroke-white' />
          Add
        </button>
      </div>
      <div className='flex flex-col gap-6 w-full'>
        {questions && questions.length > 0 ? (
          questions.map((question, questionIndex) => (
            <div key={questionIndex} className='p-4 border rounded bg-gray-100'>
              <div className='mb-2 flex items-center gap-5'>
                <p className='font-bold'>Question {questionIndex + 1}</p>
                <button
                  type='button'
                  className='border-none outline-none'
                  onClick={() => removeQuestion(questionIndex)}
                >
                  <DeleteIcon />
                </button>
              </div>
              <div
                className={'grid grid-cols-1 md:grid-cols-3 md:items-stretch gap-6 mb-4'}
              >
                <LabelInput
                  useFormik={false}
                  name={'title' + questionIndex}
                  label='Question'
                  placeholder='Type the question here'
                  value={question.title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleOnChangeQuestion({ title: e.target.value }, questionIndex)
                  }
                  className='w-full'
                />
                <Dropdown
                  useFormik={false}
                  name={'question_type' + questionIndex}
                  label='Question Type'
                  className='capitalize'
                  placeholder='Type of question'
                  value={{
                    label: question.question_type,
                    value: question.question_type,
                  }}
                  onChange={(e: { label: string; value: AllowedQuestionTypes }) =>
                    handleOnChangeQuestion({ question_type: e.value }, questionIndex)
                  }
                  values={['input', 'radio', 'checkbox', 'dropdown'].map((item) => ({
                    label: item,
                    value: item,
                  }))}
                />
                {question.question_type === 'input' && (
                  <Dropdown
                    useFormik={false}
                    name={'question_input_type' + questionIndex}
                    label='Input Type'
                    className='capitalize'
                    placeholder='Type of question input'
                    value={{
                      label: question.question_input_type,
                      value: question.question_input_type,
                    }}
                    onChange={(e: { label: string; value: AllowedInputTypes }) =>
                      handleOnChangeQuestion(
                        { question_input_type: e.value },
                        questionIndex
                      )
                    }
                    values={['number', 'text'].map((item) => ({
                      label: item,
                      value: item,
                    }))}
                  />
                )}
              </div>
              <div className='p-3 w-full border rounded bg-slate-200'>
                <div className='mb-4 flex items-center justify-between w-full border-b border-b-[#000] pb-1'>
                  <p>Question Options ({question.options?.length || 0})</p>
                  <button
                    type='button'
                    className='flex gap-2 items-center bg-black p-2 text-white rounded group hover:text-black duration-300 hover:bg-white border border-white hover:border-black outline-none'
                    onClick={() => addOptionToQuestion(questionIndex)}
                  >
                    <AddIcon className='[&>path]:!stroke-white group-hover:[&>path]:!stroke-black' />
                    Add
                  </button>
                </div>
                <div className={'grid grid-cols-1 md:grid-cols-3 md:items-stretch gap-6'}>
                  {question.options && question.options.length > 0 ? (
                    question.options?.map((option, optionIndex) => (
                      <div key={optionIndex}>
                        <div className='mb-2 flex items-center gap-5'>
                          <p className='font-bold'>Option {optionIndex + 1}</p>
                          <button
                            type='button'
                            className='border-none outline-none'
                            onClick={() =>
                              removeOptionFromQuestion(questionIndex, optionIndex)
                            }
                          >
                            <DeleteIcon />
                          </button>
                        </div>

                        <LabelInput
                          useFormik={false}
                          name={'option_value' + optionIndex}
                          label='Option'
                          placeholder='Type the option here'
                          value={option.option_value}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleOnChangeOption(
                              e.target.value,
                              questionIndex,
                              optionIndex
                            )
                          }
                          className='w-full mb-2'
                        />
                        <Checkbox
                          label='Correct Answer'
                          id={'isCorrectAnswer' + optionIndex}
                          value={String(option.isCorrectAnswer || false)?.toString()}
                          checked={option.isCorrectAnswer || false}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleOnChangeOptionCorrectAnswer(
                              e.target.checked,
                              questionIndex,
                              optionIndex
                            )
                          }
                        />
                      </div>
                    ))
                  ) : (
                    <p className='text-sm font-normal'>No option added</p>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className='text-sm font-normal'>No question added</p>
        )}
      </div>
    </>
  );
};

export default QuestionForm;
