import React from 'react';
import { Table } from 'Components';
import { useAccounts, useAssets } from 'redux/hooks';

const AccountAssets = () => {
  // Spotlight pulls all account data including balances, no need to refetch in this Component
  const { accountInfoLoading: tableLoading, accountAssets } = useAccounts();
  const { assetMetadata } = useAssets();

  const tableData = accountAssets.map((a) => ({
    ...a,
    displayDenom: assetMetadata.find((md) => md.base === a.denom)?.display,
  }));

  // Table header values in order
  const tableHeaders = [
    { displayName: 'Asset', dataName: 'queryDenom' },
    { displayName: 'Total Balance', dataName: 'balances' },
  ];

  return (
    <Table
      tableHeaders={tableHeaders}
      tableData={tableData}
      isLoading={tableLoading}
      title="Account Assets"
    />
  );
};

export default AccountAssets;
