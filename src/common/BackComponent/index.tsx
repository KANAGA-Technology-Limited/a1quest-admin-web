import React from 'react';
import ArrowLeftImage from '../../assets/icons/arrow-left.svg';
import { useNavigate } from 'react-router-dom';

const BackComponent = ({
  containerClass,
  text = 'Back',
  destination,
  showText = true,
  useDefaultBack = false,
}: {
  containerClass?: string;
  text?: string;
  showText?: boolean;
  destination?: string;
  useDefaultBack?: boolean;
}) => {
  const navigate = useNavigate();
  return (
    <div className={containerClass}>
      <button
        onClick={() => (useDefaultBack ? navigate(-1) : navigate(destination || ''))}
        className='flex items-center gap-2'
      >
        <img src={ArrowLeftImage} alt='Back' className='h-5' />
        {showText && <span>{text}</span>}
      </button>
    </div>
  );
};

export default BackComponent;
