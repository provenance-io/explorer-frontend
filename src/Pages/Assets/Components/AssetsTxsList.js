import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Table } from 'Components';
import { formatTableData } from 'utils';
import { useAssets } from 'redux/hooks';

const AssetsTxsList = () => {
  const [tableCurrentPage, setTableCurrentPage] = useState(1);
  const { assetId } = useParams();
  const {
    getAssetTransactions: getTableData,
    assetTransactions: tableData,
    assetTransactionsLoading: tableLoading,
    assetTransactionsPages: tablePages,
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

  const tableHeaders = ['TxHash', 'TxType', 'Address', 'Value', 'Currency'];
  // Format the raw table data into the form we need it to be displayed
  const formattedTableData = formatTableData(tableData, 'assetTransactions');

  return (
    <Table
      tableHeaders={tableHeaders}
      tableData={formattedTableData}
      currentPage={tableCurrentPage}
      changePage={setTableCurrentPage}
      totalPages={tablePages}
      isLoading={tableLoading}
      title="Asset Transaction List"
      showAge="timestamp"
    />
  );
};

export default AssetsTxsList;
