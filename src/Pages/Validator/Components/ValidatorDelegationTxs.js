import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table } from '../../../Components';
import { useValidators } from '../../../redux/hooks';

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
  const tableCount = 10;
  // Fetch table data
  useEffect(() => {
    getTableData({ id: validatorId, page: tableCurrentPage, count: tableCount });
  }, [getTableData, tableCount, tableCurrentPage, validatorId]);

  // Table header values in order
  const tableHeaders = [
    { displayName: 'TxHash', dataName: 'txHash' },
    { displayName: 'TxType', dataName: 'type' },
    { displayName: 'Block', dataName: 'block' },
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
      title="Delegation Transactions"
    />
  );
};

export default ValidatorDelegationTxs;
