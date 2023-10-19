import React, { ButtonHTMLAttributes } from 'react';
import LoadingIndicator from '../LoadingIndicator';
import ProgressButton from './ProgressButton';

function Button({
  className,
  type = 'button',
  loading = false,
  onClick,
  children,
  color = 'primary',
  showProgress,
  progressTitle,
  progressValue,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: 'primary' | 'secondary';
  loading?: boolean;
  showProgress?: boolean;
  progressTitle?: string;
  progressValue?: number;
}) {
  return (
    <button
      type={type}
      className={
        (color === 'secondary'
          ? 'relative w-fit h-[50px] bg-secondary text-black rounded-lg px-4 hover:brightness-110 duration-300 font-medium disabled:bg-gray-300 flex items-center justify-center gap-2'
          : 'relative w-fit h-[50px] bg-primary text-white rounded-lg px-4 hover:brightness-110 duration-300 font-medium disabled:bg-gray-300 flex items-center justify-center gap-2') +
        ' ' +
        className
      }
      onClick={onClick}
      {...rest}
    >
      {showProgress && (
        <ProgressButton
          progressTitle={progressTitle}
          progressValue={progressValue}
          loading={loading}
        />
      )}
      {!showProgress && (loading ? <LoadingIndicator size={20} /> : children)}
    </button>
  );
}

export default Button;
