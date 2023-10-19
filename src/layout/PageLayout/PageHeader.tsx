import React from 'react';
import BackComponent from '../../common/BackComponent';

export interface PageHeaderProps {
  pageTitle: string;
  pageActions?: React.ReactNode;
  summaryText?: string;
  description?: string;
  showBack?: boolean;
  loading?: boolean;
}

function PageHeader({
  pageTitle,
  pageActions,
  description,
  summaryText,
  loading,
  showBack,
}: PageHeaderProps) {
  return (
    <div className='flex items-center justify-between mb-4 bg-white flex-wrap gap-2 px-6 py-5'>
      <div className='flex items-center gap-5 flex-wrap'>
        {showBack && <BackComponent useDefaultBack showText={false} />}
        <div className='flex bg-white gap-1 flex-col'>
          <div className='flex items-center gap-[14px] flex-wrap'>
            <h1 className='font-bold text-xl text-[#2E335B]'>{pageTitle}</h1>

            {!loading && summaryText && (
              <p className='px-2 py-[2px] bg-[#BBCAF3] rounded-2xl'>{summaryText}</p>
            )}
          </div>
          {description && <p className='text-[#667085] text-sm'>{description}</p>}
        </div>
      </div>

      {pageActions}
    </div>
  );
}

export default PageHeader;
