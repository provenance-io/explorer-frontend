import React, { useState, useEffect } from 'react';
import { Table } from 'Components';
import { useApp, useAssets } from 'redux/hooks';

const AssetsList = () => {
  const [tableCurrentPage, setTableCurrentPage] = useState(1);
  const { tableCount } = useApp();
  const {
    assets,
    assetsLoading: tableLoading,
    assetsPages: tablePages,
    assetMetadata,
    getAssetMetadata,
    getAssetsList: getTableData,
  } = useAssets();

  const tableData = assets.map(a => ({
    ...a,
    displayDenom: assetMetadata.find(md => md.base === a.marker)?.display,
  }));

  useEffect(() => {
    getTableData({
      page: tableCurrentPage,
      count: tableCount,
    });
    getAssetMetadata();
  }, [getTableData, tableCount, tableCurrentPage, getAssetMetadata]);

  const tableHeaders = [
    { displayName: 'Name', dataName: 'marker' },
    { displayName: 'Total Supply', dataName: 'supply' },
    { displayName: 'Price Per Unit', dataName: 'pricePerToken' },
    { displayName: 'Total Value', dataName: 'totalBalancePrice' },
    { displayName: 'Holding Account', dataName: 'holdingAccount' },
    { displayName: 'Marker Type', dataName: 'markerType' },
    { displayName: 'Last Tx', dataName: 'lastTxTimestamp' },
  ];

  return (
    <Table
      showAge="lastTxTimestamp"
      tableHeaders={tableHeaders}
      tableData={tableData}
      currentPage={tableCurrentPage}
      changePage={setTableCurrentPage}
      totalPages={tablePages}
      isLoading={tableLoading}
      title="Assets List"
    />
  );
};

export default AssetsList;
