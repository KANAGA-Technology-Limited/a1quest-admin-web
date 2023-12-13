import React from 'react';
import BrandImage from '../../assets/brand/logo-small.svg';

const UserAvatar = ({ avatar }: { avatar: string }) => {
  return (
    <img
      src={avatar || BrandImage}
      alt='User Avatar'
      width={200}
      height={200}
      className='w-16 h-16 rounded-full object-contain'
    />
  );
};

export default UserAvatar;
