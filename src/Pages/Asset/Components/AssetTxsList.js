import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Table } from 'Components';
import { useAssets } from 'redux/hooks';

const AssetTxsList = () => {
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
      denom: assetId,
    });
  }, [getTableData, assetId, tableCount, tableCurrentPage]);

  const tableHeaders = [
    { displayName: 'TxHash', dataName: 'txHash' },
    { displayName: 'Block', dataName: 'block' },
    { displayName: 'TxType', dataName: 'txType' },
    { displayName: 'Fee', dataName: 'fee' },
    { displayName: 'Signer', dataName: 'signers' },
    { displayName: 'Status', dataName: 'status' },
    { displayName: 'Timestamp', dataName: 'timestamp' },
  ];

  return (
    <Table
      tableHeaders={tableHeaders}
      tableData={tableData}
      currentPage={tableCurrentPage}
      changePage={setTableCurrentPage}
      totalPages={tablePages}
      isLoading={tableLoading}
      title="Asset Transaction List"
      showAge="timestamp"
    />
  );
};

export default AssetTxsList;
