import React, { ButtonHTMLAttributes } from 'react';
import LoadingIndicator from '../LoadingIndicator';

function Button({
  className,
  type = 'button',
  loading = false,
  onClick,
  children,
  color = 'primary',
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: 'primary' | 'secondary';
  loading?: boolean;
}) {
  return (
    <button
      type={type}
      className={
        (color === 'secondary'
          ? 'w-fit h-[50px] bg-secondary text-black rounded-lg py-3 px-8 hover:brightness-110 duration-300 font-medium disabled:bg-gray-300'
          : 'w-fit h-[50px] bg-primary text-white rounded-lg py-3 px-8 hover:brightness-110 duration-300 font-medium disabled:bg-gray-300') +
        ' ' +
        className
      }
      onClick={onClick}
      {...rest}
    >
      {loading ? <LoadingIndicator size={20} /> : children}
    </button>
  );
}

export default Button;
