const labels = ['JS1', 'JS2', 'JS3', 'SS1', 'SS2', 'SS3'];

const TopicChartCustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: any;
  label?: string;
}) => {
  if (active && payload.length > 0) {
    return (
      <div className='text-center flex items-center justify-center p-3 bg-[#1E1B39] rounded-lg text-white flex-col'>
        <p className='font-semibold uppercase mb-2'>{label}</p>
        <p className='font-light mb-1 font-secondary text-xs'>Enrollments</p>
        {labels.map((item) => (
          <p className='text-normal text-sm'>
            {item}:&nbsp;
            {payload[0]?.payload && payload[0]?.payload[item]}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

export default TopicChartCustomTooltip;
