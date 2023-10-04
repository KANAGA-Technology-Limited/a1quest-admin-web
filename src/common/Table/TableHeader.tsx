import React from 'react';

function TableHeader({ tableHeaders }: { tableHeaders: string[] }) {
  return (
    <thead className='font-medium text-xs text-[#667085] uppercase  bg-white'>
      <tr>
        {tableHeaders.map((header, index) =>
          header !== 'tableAction' ? (
            <th
              className='px-3 py-3 align-middle'
              scope='col'
              key={header}
              style={{
                textAlign: index === 0 ? 'left' : 'center',
              }}
            >
              {/* Convert camel cased header to words */}
              {header?.replace(/([a-z])([A-Z])/g, '$1 $2')?.toLowerCase()}
            </th>
          ) : (
            <th
              className='px-3 py-3 align-middle'
              scope='col'
              key={header}
              style={{
                textAlign: index === 0 ? 'left' : 'center',
              }}
            ></th>
          )
        )}
      </tr>
    </thead>
  );
}

export default TableHeader;
