import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table } from '../../../Components';
import { useValidators } from '../../../redux/hooks';

const ValidationTxs = () => {
  const [tableCurrentPage, setTableCurrentPage] = useState(1);
  const {
    getValidatorTxs: getTableData,
    validatorTxs: tableData,
    validatorTxsLoading: tableLoading,
    validatorTxsPages: tablePages,
  } = useValidators();
  const { validatorId } = useParams();
  // Results to display per page of table
  const tableCount = 10;
  // Fetch table data
  useEffect(() => {
    getTableData({ id: validatorId, page: tableCurrentPage, count: tableCount });
  }, [getTableData, tableCount, tableCurrentPage, validatorId]);

  // Table header values in order
  const tableHeaders = [
    { displayName: 'TxHash', dataName: 'txHash' },
    { displayName: 'Block', dataName: 'block' },
    { displayName: 'TxType', dataName: 'txType' },
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
      changePage={setTableCurrentPage}
      totalPages={tablePages}
      isLoading={tableLoading}
      title="Validation Transactions"
    />
  );
};

export default ValidationTxs;
