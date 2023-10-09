import React from 'react';
import { PageFilterType } from '../../types/layout';
import ScrollContainer from 'react-indiana-drag-scroll';

const PageFilter = ({ filter }: { filter: PageFilterType }) => {
  return (
    <ScrollContainer className='mb-[10px] px-[30px] flex items-center w-full max-w-full no-scroll-bar overflow-x-auto text-[#707070] text-sm font-normal gap-10 border-b border-b-[#E4E4E4] pb-2'>
      {filter.filters.map((item) => (
        <button
          key={item.value}
          className={
            item.value === filter.activeFilter
              ? 'text-primary underline underline-offset-4 duration-300'
              : 'duration-300'
          }
          onClick={() => filter.onChange(item.value)}
        >
          {item.label}
        </button>
      ))}
    </ScrollContainer>
  );
};

export default PageFilter;
