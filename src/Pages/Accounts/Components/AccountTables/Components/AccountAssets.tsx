import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAssets, useAccounts } from 'redux/hooks';
import { Table } from 'Components';

export const AccountAssets = () => {
  const [tableCurrentPage, setTableCurrentPage] = useState(1);
  const { addressId } = useParams<{ addressId: string }>();
  const {
    accountAssets,
    accountAssetsTotal,
    accountAssetsPages: tablePages,
    getAccountAssets: getTableData,
    accountAssetsLoading: tableLoading,
  } = useAccounts();

  const { assetMetadata, getAssetMetadata } = useAssets();

  useEffect(() => {
    getTableData({
      address: addressId,
      page: tableCurrentPage,
      count: 10,
    });
    getAssetMetadata();
  }, [getTableData, tableCurrentPage, addressId, getAssetMetadata]);

  // Build table data
  const tableData = accountAssets.map((a) => ({
    ...a,
    displayDenom: assetMetadata.find((md) => md.base === a.denom)?.display,
    exponent:
      assetMetadata.find((md) => md.base === a.denom)?.denomUnits?.find((du) => !!du.exponent)
        ?.exponent || 0,
  }));

  // Table header values in order
  const tableHeaders = [
    { displayName: 'Asset', dataName: 'denom' },
    { displayName: 'Total Balance', dataName: 'balances' },
    { displayName: 'Price Per Unit', dataName: 'pricePerToken' },
    { displayName: 'Total Value', dataName: 'totalBalancePrice.amount' },
  ];

  return (
    <Table
      changePage={setTableCurrentPage}
      currentPage={tableCurrentPage}
      isLoading={tableLoading}
      tableData={tableData}
      tableHeaders={tableHeaders}
      totalPages={tablePages}
      title={`Total Assets: ${accountAssetsTotal}`}
    />
  );
};
