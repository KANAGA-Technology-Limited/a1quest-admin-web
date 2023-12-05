import React from 'react';
import { StudentType } from '../../types/data';

const GuardianDetails = ({ user }: { user: StudentType }) => {
  return (
    <div className='w-full bg-white shadow-sm border rounded-md px-6 py-5'>
      <h2 className='font-semibold text-lg md:text-xl mb-1 text-[#272835]'>
        Parent/Guardian
      </h2>
      <p className='text-[#828282] mb-4 text-sm'>Info on user's parent/guardian</p>
      <p>
        <b>Name:</b> <span>{user.guardianFullName}</span>
      </p>
      <p>
        <b>Email:</b> <span>{user.guardianEmail}</span>
      </p>
      <p>
        <b>Report interval:</b> <span>{user.reportToGuardian}</span>
      </p>
    </div>
  );
};

export default GuardianDetails;
