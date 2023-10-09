import React from 'react';
import PageHeader, { PageHeaderProps } from './PageHeader';
import Table from '../../common/Table';
import { TableProps } from '../../common/Table/types';
import PageFilter from '../../common/PageFilter';
import { PageFilterType } from '../../types/layout';

interface Props {
  pageTitle: string;
  pageActions?: React.ReactNode;
  tableProps: TableProps;
  pageFilters?: PageFilterType;
}

function PageLayout({
  pageTitle,
  pageActions,
  tableProps,
  description,
  summaryText,
  pageFilters,
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
      {pageFilters && <PageFilter filter={pageFilters} />}
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
