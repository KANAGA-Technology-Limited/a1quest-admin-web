import React from 'react';

export interface TableProps {
  data: any[];
  tableHeaders: string[];
  loading: boolean;
  menuItems?: menuItemType[];
  bodyStyle?: React.CSSProperties;
  headerStyle?: React.CSSProperties;
}

export type rowType = { row: { value: string; headerName: string }[] }[];

export type menuItemType = {
  label: string;
  onClick: (data: any) => void;
  style?: React.CSSProperties;
  permission?: boolean;
};
