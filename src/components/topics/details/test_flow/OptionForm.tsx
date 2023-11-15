import React from 'react';
import { QuestionOptionType } from '../../../../types/data';
import { AddIcon, DeleteIcon } from '../../../icons';
import LabelInput from '../../../../common/LabelInput/LabelInput';
import Checkbox from '../../../../common/Checkbox';

const OptionForm = ({
  options,
  setOptions,
}: {
  options: QuestionOptionType[] | undefined;
  setOptions: React.Dispatch<React.SetStateAction<QuestionOptionType[] | undefined>>;
}) => {
  const addOption = () => {
    setOptions((current) => {
      const currentOptions = current ? [...current] : [];
      currentOptions.push({
        option_value: '',
        isCorrectAnswer: false,
      });
      return [...currentOptions];
    });
  };

  const removeOption = (index: number) => {
    setOptions((current) => {
      const currentOptions = current ? [...current] : [];
      currentOptions.splice(index, 1);
      return [...currentOptions];
    });
  };

  const handleOnChangeOption = (data: QuestionOptionType, index: number) => {
    const list = options ? [...options] : [];
    const value = data || {};
    list[index] = {
      ...list[index],
      ...value,
    };
    setOptions(() => [...list]);
  };

  const handleOnChangeOptionCorrectAnswer = (index: number, isCorrectAnswer: boolean) => {
    const list = options ? [...options] : [];
    list[index].isCorrectAnswer = isCorrectAnswer;
    setOptions(() => [...list]);
  };

  return (
    <>
      <div className='mb-4 flex items-center justify-between w-full p-2 bg-gray-500 text-white rounded'>
        <p>Options ({options?.length || 0})</p>
        <button
          type='button'
          className='flex gap-2 items-center bg-white p-2 text-black rounded group hover:text-white duration-300 hover:bg-black border-none outline-none'
          onClick={addOption}
        >
          <AddIcon className='[&>path]:!stroke-black group-hover:[&>path]:!stroke-white' />
          Add
        </button>
      </div>
      <div className='flex flex-col gap-6 w-full'>
        {options && options.length > 0 ? (
          options.map((option, index) => (
            <>
              <div className={'grid grid-cols-1 md:grid-cols-3 md:items-stretch gap-6'}>
                <div key={index}>
                  <div className='mb-2 flex items-center gap-5'>
                    <p className='font-bold'>Option {index + 1}</p>
                    <button
                      type='button'
                      className='border-none outline-none'
                      onClick={() => removeOption(index)}
                    >
                      <DeleteIcon />
                    </button>
                  </div>

                  <LabelInput
                    useFormik={false}
                    name={'option_value' + index}
                    label='Option'
                    placeholder='Type the option here'
                    value={option.option_value}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleOnChangeOption({ option_value: e.target.value }, index)
                    }
                    className='w-full mb-2'
                  />
                  <Checkbox
                    label='Correct Answer'
                    id={'isCorrectAnswer' + index}
                    value={String(option.isCorrectAnswer || false)?.toString()}
                    checked={option.isCorrectAnswer || false}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleOnChangeOptionCorrectAnswer(index, e.target.checked)
                    }
                  />
                </div>
              </div>
            </>
          ))
        ) : (
          <p className='text-sm font-normal'>No option added</p>
        )}
      </div>
    </>
  );
};

export default OptionForm;
