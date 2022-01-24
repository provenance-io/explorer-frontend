import React, { useEffect, useState } from 'react';
import { Table } from 'Components';
import { useParams } from 'react-router-dom';
import { useAccounts, useAssets } from 'redux/hooks';

const AccountAssets = () => {
  const [tableCurrentPage, setTableCurrentPage] = useState(1);
  const { addressId } = useParams();
  const {
    accountAssets,
    accountAssetsTotal,
    accountAssetsPages: tablePages,
    getAccountAssets: getTableData,
    accountAssetsLoading: tableLoading,
  } = useAccounts();

  const { assetMetadata } = useAssets();

  // Build table data
  const tableData = accountAssets.map(a => ({
    ...a,
    displayDenom: assetMetadata.find(md => md.base === a.denom)?.display,
  }));

  useEffect(() => {
    getTableData({
      address: addressId,
      page: tableCurrentPage,
      count: 10,
    });
  }, [getTableData, tableCurrentPage, addressId]);

  // Table header values in order
  const tableHeaders = [
    { displayName: 'Asset', dataName: 'denom' },
    { displayName: 'Price', dataName: 'pricePerToken' },
    { displayName: 'Total Balance', dataName: 'balances' },
    { displayName: 'Total Value', dataName: 'totalBalancePrice' },
  ];

  return (
    <Table
      tableHeaders={tableHeaders}
      tableData={tableData}
      currentPage={tableCurrentPage}
      changePage={setTableCurrentPage}
      totalPages={tablePages}
      isLoading={tableLoading}
      title={`Account Assets (${accountAssetsTotal} total)`}
    />
  );
};

export default AccountAssets;
