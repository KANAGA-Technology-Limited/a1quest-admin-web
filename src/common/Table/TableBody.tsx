import React from 'react';
import { formatTableValue } from './functions';
import { menuItemType, rowType } from './types';

function TableBody({
  data,
  tableHeaders,
  menuItems,
  bodyStyle,
}: {
  data: any[];
  tableHeaders: string[];
  menuItems?: menuItemType[];
  bodyStyle?: React.CSSProperties;
}) {
  const tableRows: rowType = React.useMemo(
    () =>
      data?.map((data: any) => ({
        row: tableHeaders.map((header) => ({
          value: data[header],
          headerName: header,
        })),
      })),
    [data, tableHeaders]
  );

  return (
    <tbody className='[&>*:last-child]:border-none text-[#667085]'>
      {tableRows.map(({ row }, mainIndex) => (
        <tr
          key={mainIndex}
          className={
            mainIndex % 2 === 0
              ? 'bg-[#F9FAFB] border border-[#EAECF0] px-3 py-6 border-x-0 '
              : 'bg-white border border-[#EAECF0] px-3 py-6 border-x-0'
          }
        >
          {row.map((item, index) => (
            <td
              className='px-3 py-3 text-sm align-middle'
              key={index}
              style={{ textAlign: index === 0 ? 'left' : 'center', ...bodyStyle }}
            >
              <p className='line-clamp-2'>
                {formatTableValue({
                  value: item.value,
                  headerName: item.headerName,
                  menuItems,
                  data: data[mainIndex],
                })}
              </p>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;
