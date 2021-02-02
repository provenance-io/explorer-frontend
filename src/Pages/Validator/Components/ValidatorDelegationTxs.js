import React, { useEffect, useState } from 'react';
import { Table } from 'Components';
import { useParams } from 'react-router-dom';
import { useValidators } from 'redux/hooks';
import { formatTableData } from 'utils';

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
  const tableHeaders = ['TxHash', 'Block', 'From', 'Amount', 'To', 'TxType', 'Fee', 'Signer', 'Status', 'Timestamp'];
  // Format the raw table data into the form we need it to be displayed
  const formattedTableData = formatTableData(tableData, 'validatorDelegationTxs');

  return (
    <Table
      tableHeaders={tableHeaders}
      tableData={formattedTableData}
      currentPage={tableCurrentPage}
      changePage={setTableCurrentPage}
      totalPages={tablePages}
      isLoading={tableLoading}
      title="Delegation Transactions"
    />
  );
};

export default ValidatorDelegationTxs;
