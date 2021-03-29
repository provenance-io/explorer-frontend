import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Table } from 'Components';
import { useAssets } from 'redux/hooks';

const AssetsList = () => {
  const [tableCurrentPage, setTableCurrentPage] = useState(1);
  const { assetId } = useParams();
  const { getAssetsList: getTableData, assets: tableData, assetsLoading: tableLoading, assetsPages: tablePages } = useAssets();
  // How many results to display
  const tableCount = 10;

  useEffect(() => {
    getTableData({
      page: tableCurrentPage,
      count: tableCount,
      asset: assetId,
    });
  }, [getTableData, assetId, tableCount, tableCurrentPage]);

  const tableHeaders = [
    { displayName: 'Name', dataName: 'marker' },
    { displayName: 'Circulation', dataName: 'supplyCirculation' },
    { displayName: 'Supply', dataName: 'supplyTotal' },
    { displayName: 'Owner', dataName: 'ownerAddress' },
    { displayName: 'Status', dataName: 'status' },
  ];

  return (
    <Table
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
