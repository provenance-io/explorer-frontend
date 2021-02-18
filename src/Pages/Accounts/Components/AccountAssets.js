import React from 'react';
import { Table } from 'Components';
import { useAccounts } from 'redux/hooks';

const AccountAssets = () => {
  // Spotlight pulls all account data including balances, no need to refetch in this Component
  const { accountInfoLoading: tableLoading, accountAssets: tableData } = useAccounts();

  // Table header values in order
  const tableHeaders = [
    { displayName: 'Asset', dataName: 'denom' },
    { displayName: 'Total Balance', dataName: 'amount' },
    { displayName: 'Estimated Value (USD)', dataName: 'value' },
    { displayName: 'Available', dataName: 'available' },
    { displayName: 'Freeze', dataName: 'freeze' },
    { displayName: 'In Order', dataName: 'inOrder' },
  ];

  return <Table tableHeaders={tableHeaders} tableData={tableData} isLoading={tableLoading} title="Account Assets" />;
};

export default AccountAssets;
