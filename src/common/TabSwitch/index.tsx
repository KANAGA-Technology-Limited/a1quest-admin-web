import React from 'react';

const TabSwitch = ({
  tabs,
  setSelectedTab,
  selectedTab,
}: {
  tabs: string[];
  selectedTab: string;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <nav className='w-full flex overflow-x-auto max-w-full gap-8 flex-nowrap whitespace-nowrap'>
      {tabs.map((tab) =>
        tab === selectedTab ? (
          <div
            key={tab}
            className='w-fit text-[#0C1F56] pb-[15px] font-semibold duration-500 transition-colors border-b-[#0C1F56] border-b-[2px]'
          >
            {tab}
          </div>
        ) : (
          <div
            key={tab}
            className='w-fit pb-[15px] text-[#BBCAF3] font-normal cursor-pointer duration-500 transition-colors'
            onClick={() => {
              setSelectedTab(tab);
            }}
          >
            {tab}
          </div>
        )
      )}
    </nav>
  );
};

export default TabSwitch;
