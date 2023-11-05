import React from 'react';

export default function Pagination({
  totalResults,
  page,
  setPage,
  defaultTotalPages,
}: {
  totalResults?: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  defaultTotalPages?: number;
}) {
  const limit = 20;

  const totalPages: number = defaultTotalPages || Math.ceil((totalResults || 0) / limit);
  if (!totalResults && !defaultTotalPages) return null;

  return (
    <aside className='flex justify-between w-full items-center px-[30px] mt-[27px] flex-wrap'>
      <span className='text-sm text-[#344054] font-medium'>
        Page <span className='text-black'>{page}</span> of {totalPages}
      </span>
      <div className='flex gap-3 items-center flex-wrap'>
        <button
          className='disabled:pointer-events-none disabled:opacity-70 bg-white hover:bg-primary text-[#344054] hover:text-white duration-300 transition-colors px-[14px] py-2 rounded-lg border border-[#D0D5DD] shadow'
          onClick={() => setPage(page - 1)}
          disabled={page <= 1}
        >
          Previous
        </button>
        <button
          className='disabled:pointer-events-none disabled:opacity-70 bg-white hover:bg-primary text-[#344054] hover:text-white duration-300 transition-colors px-[14px] py-2 rounded-lg border border-[#D0D5DD] shadow'
          onClick={() => setPage(page + 1)}
          disabled={page >= totalPages}
        >
          Next
        </button>
      </div>
    </aside>
  );
}
