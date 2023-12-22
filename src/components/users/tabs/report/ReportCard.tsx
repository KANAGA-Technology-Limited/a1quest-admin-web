import React from 'react';
import { LessonReportType } from '../../../../types/data';
import FileUpload from '../../../../assets/icons/file-upload.svg';

const ReportCard = ({ data }: { data: LessonReportType }) => {
  return (
    <div className='w-full bg-white py-[10px] px-[14px] rounded-lg border border-[#EAECF0] shadow-md'>
      <div className='flex items-center gap-[14px] w-full'>
        <img src={FileUpload} alt='File' />
        <div>
          <p className='text-[#344054] font-normal text-xs'>{data.title}</p>
          <span className='text-[#E87C4E] text-sm font-normal'>
            {data.takenLessons}/{data.allLessons}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
