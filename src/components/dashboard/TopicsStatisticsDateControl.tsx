import { Dispatch, SetStateAction } from 'react';
import LeftIcon from '../../assets/icons/date-left.svg';
import RightIcon from '../../assets/icons/date-right.svg';

const TopicsStatisticsDateControl = ({
  currentYear,
  setCurrentYear,
}: {
  setCurrentYear: Dispatch<SetStateAction<number>>;
  currentYear: number;
}) => {
  const increaseYear = () => {
    setCurrentYear((old) => old + 1);
  };

  const decreaseYear = () => {
    setCurrentYear((old) => old - 1);
  };

  return (
    <div className='flex items-center gap-5'>
      <button type='button' className='hover:invert duration-300' onClick={decreaseYear}>
        <img src={LeftIcon} alt='previous year' />
      </button>
      <span className='text-[#1A202C] font-semibold text-sm'>{currentYear}</span>
      <button type='button' className='hover:invert duration-300' onClick={increaseYear}>
        <img src={RightIcon} alt='next year' />
      </button>
    </div>
  );
};

export default TopicsStatisticsDateControl;
