import LoadingIndicator from '../../common/LoadingIndicator';

const SummaryCard = ({
  label,
  value,
  showBorder = false,
  loading,
}: {
  label: string;
  value: number;
  showBorder?: boolean;
  loading: boolean;
}) => {
  return (
    <div
      style={{
        borderRight: showBorder ? '1px solid #F0F0F0' : 'none',
        paddingRight: showBorder ? 20 : 0,
        marginRight: showBorder ? 20 : 0,
      }}
    >
      <div className='flex flex-col gap-5'>
        <span className='text-[#1A202C] font-semibold'>{label}</span>
        {loading ? (
          <LoadingIndicator  />
        ) : (
          <span className='text-[#1A202C] text-2xl md:text-3xl lg:text-[32px] font-semibold'>
            {value}
          </span>
        )}
      </div>
    </div>
  );
};

export default SummaryCard;
