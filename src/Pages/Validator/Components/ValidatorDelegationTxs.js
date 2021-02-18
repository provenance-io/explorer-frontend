import React, { useEffect, useState } from 'react';
import { Table } from 'Components';
import { useParams } from 'react-router-dom';
import { useValidators } from 'redux/hooks';

const ValidatorDelegationTxs = () => {
  const [tableCurrentPage, setTableCurrentPage] = useState(1);
  const {
    getValidatorDelegationTxs: getTableData,
    validatorDelegationTxs: tableData,
    validatorDelegationTxsLoading: tableLoading,
    validatorDelegationTxsPages: tablePages,
  } = useValidators();
  const { validatorId } = useParams();
  // Results to display per page of table
  const tableCount = 5;
  // Fetch table data
  useEffect(() => {
    getTableData({ id: validatorId, page: tableCurrentPage, count: tableCount });
  }, [getTableData, tableCount, tableCurrentPage, validatorId]);

  // Table header values in order
  const tableHeaders = [
    { displayName: 'TxHash', dataName: 'txHash' },
    { displayName: 'Block', dataName: 'block' },
    { displayName: 'From', dataName: 'from' },
    { displayName: 'Amount', dataName: 'amount' },
    { displayName: 'To', dataName: 'to' },
    { displayName: 'TxType', dataName: 'type' },
    { displayName: 'Fee', dataName: 'fee' },
    { displayName: 'Signer', dataName: 'signer' },
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
      title="Delegation Transactions"
    />
  );
};

export default ValidatorDelegationTxs;
