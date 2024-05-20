import TableMenu from './TableMenu';
import { menuItemType } from './types';

export const formatTableValue = ({
  value,
  headerName,
  menuItems,
  data,
}: {
  value: string;
  headerName: string;
  menuItems?: menuItemType[];
  data: any;
}) => {
  // Boolean Check
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }

  // Capitalize Check
  if (['email', 'userName'].includes(headerName)) {
    // should not be capitalized
    return value;
  }

  // Data check
  if (['createdAt', 'creation_date', 'last_update_date'].includes(headerName)) {
    return new Date(value).toDateString();
  }

  // Array check
  if (Array.isArray(value)) {
    return <span className='capitalize'>{value.join(', ')}</span>;
  }

  // Object check
  if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
    return (
      <span className='capitalize'>
        {
          (value['fullname'] ||
            value['name'] ||
            value['userName'] ||
            value['firstName'] ||
            Object.values(value)[0]) as string
        }
      </span>
    );
  }

  // Status Check
  if (headerName === 'status') {
    let color = '';

    switch (value) {
      case 'open':
        color = 'green';
        break;
      case 'completed':
        color = 'green';
        break;
      case 'pending':
        color = 'orange';
        break;
      case 'closed':
        color = 'red';
        break;
      case 'cancelled':
        color = 'red';
        break;

      default:
        color = 'black';
        break;
    }
    return (
      <span
        className='capitalize'
        style={{
          color,
        }}
      >
        {value}
      </span>
    );
  }

  // Menu ID check
  if (headerName === 'tableAction') {
    return <TableMenu data={data} menuItems={menuItems} />;
  }

  // image check
  if (['badge'].includes(headerName)) {
    return (
      <img
        src={value}
        alt=''
        className='w-[50px] h-[50px] rounded-full object-cover'
        width={100}
        height={100}
        loading='lazy'
      />
    );
  }

  return <span className='capitalize'>{value?.toString() || '-'}</span>;
};
