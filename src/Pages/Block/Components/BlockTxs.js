import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table } from '../../../Components';
import { useApp, useTxs } from '../../../redux/hooks';

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
    getTableData({
      blockheight: pageBlockHeight,
      page: tableCurrentPage,
      count: tableCount,
    });
  }, [getTableData, pageBlockHeight, tableCurrentPage, tableCount]);

  // Table header values in order
  const tableHeaders = [
    { displayName: 'Tx Hash', dataName: 'txHash' },
    { displayName: 'Block', dataName: 'block' },
    { displayName: 'Tx Type', dataName: 'txType' },
    { displayName: 'Fee', dataName: 'fee' },
    { displayName: 'Signer', dataName: 'signers' },
    { displayName: 'Status', dataName: 'status' },
    { displayName: 'Timestamp', dataName: 'time' },
  ];

  return (
    <Table
      tableHeaders={tableHeaders}
      tableData={tableData}
      currentPage={tableCurrentPage}
      resultsPerPage={tableCount}
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
