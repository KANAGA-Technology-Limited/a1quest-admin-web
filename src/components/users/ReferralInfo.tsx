import React from 'react';
import { StudentType } from '../../types/data';
import { formatNumberToNaira } from '../../functions/stringManipulations';

const ReferralInfo = ({ user }: { user: StudentType }) => {
  return (
    <div className='w-full bg-[#F0F7FF] rounded-md px-6 py-5'>
      <h2 className='font-semibold text-lg md:text-xl mb-1 text-[#272835]'>
        Referral Info
      </h2>
      <p className='text-[#828282] mb-4 text-sm'>Details on user's referral history</p>

      <p>
        <b>Number of referrals:</b> <span>{user.numOfReferrals}</span>
      </p>
      <p>
        <b>Earnings:</b> <span>{formatNumberToNaira(user.referralEarnings)}</span>
      </p>
    </div>
  );
};

export default ReferralInfo;
