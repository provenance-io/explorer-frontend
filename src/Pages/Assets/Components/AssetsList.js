import React, { useState, useEffect } from 'react';
import { Table } from 'Components';
import { useAssets } from 'redux/hooks';

const AssetsList = () => {
  const [tableCurrentPage, setTableCurrentPage] = useState(1);
  const {
    assets,
    assetsLoading: tableLoading,
    assetsPages: tablePages,
    assetMetadata,
    getAssetsList: getTableData,
  } = useAssets();
  // How many results to display
  const tableCount = 10;

  const tableData = assets.map((a) => ({
    ...a,
    displayDenom: assetMetadata.find((md) => md.base === a.marker)?.display,
  }));

  useEffect(() => {
    getTableData({
      page: tableCurrentPage,
      count: tableCount,
    });
  }, [getTableData, tableCount, tableCurrentPage]);

  const tableHeaders = [
    { displayName: 'Name', dataName: 'marker' },
    { displayName: 'Total Supply', dataName: 'supply' },
    { displayName: 'Holding Account', dataName: 'holdingAccount' },
    { displayName: 'Marker Type', dataName: 'markerType' },
    { displayName: 'Mintable', dataName: 'mintable' },
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
