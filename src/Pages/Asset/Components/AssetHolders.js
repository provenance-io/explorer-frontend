import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Table } from 'Components';
import { useAssets } from 'redux/hooks';

const AssetHolders = () => {
  const [tableCurrentPage, setTableCurrentPage] = useState(1);
  const { assetId } = useParams();
  const {
    getAssetHolders: getTableData,
    assetHolders: tableData,
    assetHoldersLoading: tableLoading,
    assetHoldersPages: tablePages,
  } = useAssets();
  // How many results to display
  const tableCount = 10;

  useEffect(() => {
    getTableData({ assetId, page: tableCurrentPage, count: tableCount });
  }, [getTableData, assetId, tableCount, tableCurrentPage]);

  const tableHeaders = [
    { displayName: 'Address', dataName: 'ownerAddress' },
    { displayName: 'Quantity', dataName: 'balance' },
    { displayName: 'Percentage', dataName: 'percentageHolders' },
  ];

  // TEMP: Table data from the server is un-sorted, sort it based on the quantity of the asset
  const sortedTableData = tableData.sort((a, b) => (a?.balance?.count < b?.balance?.count ? 1 : -1));

  return (
    <Table
      tableHeaders={tableHeaders}
      tableData={sortedTableData}
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
