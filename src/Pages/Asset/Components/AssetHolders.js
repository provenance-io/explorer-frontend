import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Table } from '../../../Components';
import { useApp, useAssets } from '../../../redux/hooks';

const AssetHolders = () => {
  const { tableCount } = useApp();
  const [tableCurrentPage, setTableCurrentPage] = useState(1);
  const { assetId } = useParams();
  const {
    getAssetHolders: getTableData,
    assetHolders: tableData,
    assetHoldersLoading: tableLoading,
    assetHoldersPages: tablePages,
  } = useAssets();

  useEffect(() => {
    getTableData({ assetId, page: tableCurrentPage, count: tableCount });
  }, [getTableData, assetId, tableCount, tableCurrentPage]);

  const tableHeaders = [
    { displayName: 'Address', dataName: 'ownerAddress' },
    { displayName: 'Quantity', dataName: 'balance' },
    { displayName: 'Percentage', dataName: 'percentageHolders' },
  ];

  return (
    <Table
      tableHeaders={tableHeaders}
      tableData={tableData}
      currentPage={tableCurrentPage}
      changePage={setTableCurrentPage}
      resultsPerPage={tableCount}
      totalPages={tablePages}
      isLoading={tableLoading}
      title="Asset Holders"
      showIndex="Rank"
    />
  );
};

export default AssetHolders;
