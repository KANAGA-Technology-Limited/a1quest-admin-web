import React from 'react';
import PageHeader, { PageHeaderProps } from './PageHeader';
import Table from '../../common/Table';
import { TableProps } from '../../common/Table/types';

interface Props {
  pageTitle: string;
  pageActions?: React.ReactNode;
  tableProps: TableProps;
}

function PageLayout({
  pageTitle,
  pageActions,
  tableProps,
  description,
  summaryText,
}: Props & PageHeaderProps) {
  return (
    <>
      <PageHeader
        pageTitle={pageTitle}
        pageActions={pageActions}
        description={description}
        summaryText={summaryText}
        loading={tableProps.loading}
      />
      <Table
        tableHeaders={tableProps.tableHeaders}
        data={tableProps.data}
        loading={tableProps.loading}
        menuItems={tableProps.menuItems}
      />
    </>
  );
}

export default PageLayout;
