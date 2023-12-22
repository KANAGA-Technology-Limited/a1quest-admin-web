import React from 'react';
import { TopicPerformanceType } from '../../../../types/data';
import { QuestionIcon, ScoreIcon, TimeIcon } from './icons';
import { formatTime } from '../../../../functions/stringManipulations';

const GeneralSummary = ({ data }: { data: TopicPerformanceType }) => {
  return (
    <div className='mt-[50px]'>
      <h3 className='text-[#06102B] font-semibold text-xl md:text-2xl mb-6'>Summary</h3>
      <div className='flex flex-wrap gap-20 items-center'>
        <div className='flex flex-col gap-[6px] items-center text-center'>
          <div className='flex items-center gap-[5px]'>
            <ScoreIcon />
            <span className='text-[#06102B] font-semibold'>{data.numOfTests}</span>
          </div>
          <p className='text-[#4B5768] text-xs font-normal'>Tests Attempted</p>
        </div>
        <div className='flex flex-col gap-[6px] items-center text-center'>
          <div className='flex items-center gap-[5px]'>
            <QuestionIcon />
            <span className='text-[#06102B] font-semibold'>{data.questionsGotten}</span>
          </div>
          <p className='text-[#4B5768] text-xs font-normal'>Questions gotten</p>
        </div>
        <div className='flex flex-col gap-[6px] items-center text-center'>
          <div className='flex items-center gap-[5px]'>
            <TimeIcon />
            <span className='text-[#06102B] font-semibold'>
              {formatTime(data.averageTimePerQuestion * 60 || 0, true)}
            </span>
          </div>
          <p className='text-[#4B5768] text-xs font-normal'>Avg. Time/question</p>
        </div>
      </div>
    </div>
  );
};

export default GeneralSummary;
