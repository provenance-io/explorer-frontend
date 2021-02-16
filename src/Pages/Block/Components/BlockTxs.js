import React, { useEffect, useState } from 'react';
import { Table } from 'Components';
import { useParams } from 'react-router-dom';
import { useApp, useTxs } from 'redux/hooks';

const BlockTxs = () => {
  const [tableCurrentPage, setTableCurrentPage] = useState(1);
  const {
    getTxsByBlock: getTableData,
    txsByBlock: tableData,
    txsByBlockPages: tablePages,
    txsByBlockLoading: tableLoading,
  } = useTxs();
  const { blockHeight: pageBlockHeight } = useParams();
  const { tableCount } = useApp();

  useEffect(() => {
    getTableData(pageBlockHeight);
  }, [getTableData, pageBlockHeight, tableCount, tablePages]);

  // Table header values in order
  const tableHeaders = [
    { displayName: 'Tx Hash', dataName: 'txHash' },
    { displayName: 'Tx Type', dataName: 'txType' },
    { displayName: 'Fee', dataName: 'fee' },
    { displayName: 'Signer', dataName: 'signer' },
  ];

  return (
    <Table
      tableHeaders={tableHeaders}
      tableData={tableData}
      currentPage={tableCurrentPage}
      changePage={setTableCurrentPage}
      totalPages={tablePages}
      isLoading={tableLoading}
      showIndex
      title="Block Transactions"
      noResults={`Block ${pageBlockHeight} has no transactions`}
    />
  );
};

export default BlockTxs;
