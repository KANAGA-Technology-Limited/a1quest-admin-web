import React from 'react';
import { StudentType } from '../../types/data';

const PersonalInfo = ({ user }: { user: StudentType }) => {
  return (
    <div className='w-full bg-white shadow-sm border rounded-md px-6 py-5'>
      <h2 className='font-semibold text-lg md:text-xl mb-1 text-[#272835]'>
        Personal Info
      </h2>
      <p className='text-[#828282] mb-4 text-sm'>User's details</p>

      <p>
        <b>Email:</b> <span>{user.email}</span>
      </p>
      <p>
        <b>First name:</b> <span>{user.firstName}</span>
      </p>
      <p>
        <b>Last name:</b> <span>{user.lastName}</span>
      </p>
      <p>
        <b>Gender:</b> <span>{user.gender}</span>
      </p>
      <p>
        <b>Username:</b> <span>{user.userName}</span>
      </p>
    </div>
  );
};

export default PersonalInfo;
