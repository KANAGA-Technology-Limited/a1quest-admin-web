import React from 'react';
import { StudentType } from '../../types/data';

const SubscriptionInfo = ({ user }: { user: StudentType }) => {
  return (
    <div className='w-full bg-[#FFF5F0] rounded-md px-6 py-5'>
      <h2 className='font-semibold text-lg md:text-xl mb-1 text-[#272835]'>
        Subscription Info
      </h2>
      <p className='text-[#828282] mb-4 text-sm'>User's subscription details</p>

      <p>
        <b>Active:</b> <span>{user.subscription?.active ? 'Yes' : 'No'}</span>
      </p>
      <p>
        <b>Running:</b> <span>{user.subscription?.running ? 'Yes' : 'No'}</span>
      </p>

      <p>
        <b>Next payment:</b>{' '}
        <span>{new Date(user.subscription?.nextPaymentDate).toDateString()}</span>
      </p>
    </div>
  );
};

export default SubscriptionInfo;
