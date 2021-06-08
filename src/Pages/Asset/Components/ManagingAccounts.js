import React from 'react';
import { Table } from 'Components';
import { useAssets } from 'redux/hooks';

const ManagingAccounts = () => {
  const {
    assetInfo: { managingAccounts: { allowGovControl, managers = {} } = {} } = {},
    assetInfoLoading: tableLoading,
  } = useAssets();

  const tableHeaders = [
    { displayName: 'Address', dataName: 'manager' },
    { displayName: 'Permissions', dataName: 'permissions' },
    { displayName: 'Allow Governance', dataName: 'allowGovControl' },
  ];

  const tableData = Object.keys(managers || {}).reduce(
    (acc, curr) => [
      ...acc,
      {
        allowGovControl,
        manager: curr,
        permissions: managers[curr],
      },
    ],
    []
  );

  return (
    <Table
      tableHeaders={tableHeaders}
      tableData={tableData}
      isLoading={tableLoading}
      title="Managing Accounts"
    />
  );
};

export default ManagingAccounts;
