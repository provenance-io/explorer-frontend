import React, { useEffect, useState } from 'react';
import { Table } from 'Components';
import { useParams } from 'react-router-dom';
import { useApp, useTxs } from 'redux/hooks';
import { formatTableData } from 'utils';

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
  const tableHeaders = ['Tx Hash', 'TxType', 'Fee', 'Signer'];
  // Format the raw table data into the form we need it to be displayed
  const formattedTableData = formatTableData(tableData, 'blockTxs');

  return (
    <Table
      tableHeaders={tableHeaders}
      tableData={formattedTableData}
      currentPage={tableCurrentPage}
      changePage={setTableCurrentPage}
      totalPages={tablePages}
      isLoading={tableLoading}
      showIndex
      title="Block Transactions"
    />
  );
};

export default BlockTxs;
