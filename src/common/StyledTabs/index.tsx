import React, { useEffect, useRef, useState } from 'react';
import autoAnimate from '@formkit/auto-animate';
import { useSearchParams } from 'react-router-dom';

interface Props {
  tabs: string[];
  panels: React.ReactNode[];
  panelClassName?: string;
}

const StyledTabs = ({ panels, tabs, panelClassName }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramTab = searchParams.get('tab');
  const [selectedTab, setSelectedTab] = useState<number>(Number(paramTab) || 0);
  const parentRef = useRef(null);

  useEffect(() => {
    if (parentRef.current) {
      autoAnimate(parentRef.current);
    }
  }, [parentRef]);

  return (
    <div>
      {/* Tabs */}
      <nav className='border-b border-b-[#D0D5DD] w-full p-4 pb-0 flex overflow-x-auto max-w-full gap-10 flex-nowrap whitespace-nowrap'>
        {tabs.map((tab, index) =>
          index === selectedTab ? (
            <div
              key={index}
              className='w-fit text-primary p-3 pb-0 font-semibold duration-500 transition-colors border-b-[#1D4ED8] border-b-[2px]'
            >
              {tab}
            </div>
          ) : (
            <div
              key={index}
              className='w-fit bg-transparent p-3 text-[#323A46] rounded-lg font-normal cursor-pointer duration-500 transition-colors'
              onClick={() => {
                setSelectedTab(index);
                setSearchParams((params) => {
                  params.set('tab', index.toString());
                  return params;
                });
              }}
            >
              {tab}
            </div>
          )
        )}
      </nav>

      {/* Panels */}
      <div className={'mt-[30px] ' + panelClassName} ref={parentRef}>
        {panels && panels.length > 0 && panels[selectedTab]}
      </div>
    </div>
  );
};

export default StyledTabs;
