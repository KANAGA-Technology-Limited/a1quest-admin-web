import React from 'react';
import { StudentType } from '../../types/data';

const SchoolInfo = ({ user }: { user: StudentType }) => {
  return (
    <div className='w-full bg-[#F0F7FF] rounded-md px-6 py-5'>
      <h2 className='font-semibold text-lg md:text-xl mb-1 text-[#272835]'>
        School Info
      </h2>
      <p className='text-[#828282] mb-4 text-sm'>User's school details</p>
      <p>
        <b>School:</b> <span>{user.school}</span>
      </p>
      <p>
        <b>Class:</b> <span>{user.classLevel}</span>
      </p>
      <p>
        <b>Country:</b> <span>{user.country}</span>
      </p>
      <p>
        <b>State:</b> <span>{user.countryState}</span>
      </p>
    </div>
  );
};

export default SchoolInfo;
