import React, { useState, useEffect } from 'react';
import { Table } from 'Components';
import { useAssets } from 'redux/hooks';

const AssetsList = () => {
  const [tableCurrentPage, setTableCurrentPage] = useState(1);
  const { getAssetsList: getTableData, assets: tableData, assetsLoading: tableLoading, assetsPages: tablePages } = useAssets();
  // How many results to display
  const tableCount = 10;

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
    { displayName: 'Status', dataName: 'status' },
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
