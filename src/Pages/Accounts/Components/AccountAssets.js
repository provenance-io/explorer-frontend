import React from 'react';
import { Table } from 'Components';
import { useAccounts } from 'redux/hooks';
import { numberFormat } from 'utils';

const AccountAssets = () => {
  // Spotlight pulls all account data including balances, no need to refetch in this Component
  const { accountInfoLoading: tableLoading, accountInfo: tableData } = useAccounts();

  // Table header values in order
  const tableHeaders = ['Asset', 'Total Balance', 'Estimated Value (USD)', 'Available', 'Freeze', 'In Order'];
  // Balances are hidden within the existing data
  const tableDataBalances = tableData?.balances || [];
  // Format the raw table data into the form we need it to be displayed
  const formattedTableData = tableDataBalances.map((dataObj) => {
    const finalObj = {};
    Object.keys(dataObj).forEach((key) => {
      const value = dataObj[key];
      switch (key) {
        case 'amount':
          finalObj['total balance'] = { value: numberFormat(value) };
          break;
        case 'denom':
          finalObj['asset'] = { value, link: `/asset/${value}` };
          break;
        case 'value':
          finalObj['estimated value (usd)'] = { value: numberFormat(value) };
          break;
        case 'available':
          finalObj['signer'] = { value: numberFormat(value) };
          break;
        case 'freeze':
          finalObj['freeze'] = { value: numberFormat(value) };
          break;
        case 'order':
          finalObj['in order'] = { value: numberFormat(value) };
          break;
        default:
          break;
      }
    });
    return finalObj;
  });

  return <Table tableHeaders={tableHeaders} tableData={formattedTableData} isLoading={tableLoading} title="Account Assets" />;
};

export default AccountAssets;
