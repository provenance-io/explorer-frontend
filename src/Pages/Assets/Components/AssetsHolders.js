import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Table } from 'Components';
import { formatTableData } from 'utils';
import { useAssets } from 'redux/hooks';

const AssetsHolders = () => {
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
    getTableData({
      page: tableCurrentPage,
      count: tableCount,
      asset: assetId,
    });
  }, [getTableData, assetId, tableCount, tableCurrentPage]);

  const tableHeaders = ['Rank', 'Address', 'Quantity', 'Percentage'];
  // Format the raw table data into the form we need it to be displayed
  const formattedTableData = formatTableData(tableData, 'assetHolders');

  return (
    <Table
      tableHeaders={tableHeaders}
      tableData={formattedTableData}
      currentPage={tableCurrentPage}
      changePage={setTableCurrentPage}
      totalPages={tablePages}
      isLoading={tableLoading}
      title="Asset Holders"
    />
  );
};

export default AssetsHolders;
