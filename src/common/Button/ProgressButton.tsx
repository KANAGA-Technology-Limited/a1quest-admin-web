import React from 'react';
import LoadingIndicator from '../LoadingIndicator';

const ProgressButton = ({
  progressTitle,
  progressValue,
  loading,
}: {
  progressTitle?: string;
  progressValue?: number;
  loading?: boolean;
}) => {
  return (
    <div className='bg-transparent absolute top-0 bottom-0 right-0 left-0 rounded-lg flex items-center justify-center'>
      <div className='relative rounded-lg w-full h-full flex items-center justify-center'>
        <p className='z-10 flex items-center justify-center gap-2'>
          {loading && <LoadingIndicator size={20} />}
          <span>
            {progressTitle}: {`${Math.round(progressValue || 1)} %`}
          </span>
        </p>
        {/* Loading bar */}
        <div
          className='bg-[#092C4C] absolute top-0 bottom-0 right-0 left-0 rounded-lg'
          style={{
            width: `${progressValue}%`,
          }}
        />
      </div>
    </div>
  );
};

export default ProgressButton;
