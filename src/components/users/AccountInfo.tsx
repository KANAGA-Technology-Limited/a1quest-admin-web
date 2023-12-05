import React from 'react';
import { StudentType } from '../../types/data';

const AccountInfo = ({ user }: { user: StudentType }) => {
  return (
    <div className='w-full bg-[#FFF5F0] rounded-md px-6 py-5'>
      <h2 className='font-semibold text-lg md:text-xl mb-1 text-[#272835]'>
        Account Info
      </h2>
      <p className='text-[#828282] mb-4 text-sm'>User's account details</p>

      <p>
        <b>User goal:</b> <span>{user.goal} minutes</span>
      </p>
      <p>
        <b>Registered:</b> <span>{new Date(user.createdAt).toDateString()}</span>
      </p>
      <p>
        <b>Verified:</b> <span>{user.isVerified ? 'Yes' : 'No'}</span>
      </p>
      <p>
        <b>Frozen:</b> <span>{!user.isNotFreezed ? 'Yes' : 'No'}</span>
      </p>
    </div>
  );
};

export default AccountInfo;
