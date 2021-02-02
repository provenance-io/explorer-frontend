import React, { useEffect, useState } from 'react';
import { Table } from 'Components';
import { useParams } from 'react-router-dom';
import { useValidators } from 'redux/hooks';
import { formatTableData } from 'utils';

const ValidatorUnbondingDelegations = () => {
  const [tableCurrentPage, setTableCurrentPage] = useState(1);
  const {
    getValidatorUnbondingDelegations: getTableData,
    validatorUnbondingDelegations: tableData,
    validatorUnbondingDelegationsLoading: tableLoading,
    validatorUnbondingDelegationsPages: tablePages,
  } = useValidators();
  const { validatorId } = useParams();
  // Results to display per page of table
  const tableCount = 5;
  // Fetch table data
  useEffect(() => {
    getTableData({ id: validatorId, page: tableCurrentPage, count: tableCount });
  }, [getTableData, tableCount, tableCurrentPage, validatorId]);
  // Table header values in order
  const tableHeaders = ['Address', 'Amount', 'Block', 'End Time'];
  // Format the raw table data into the form we need it to be displayed
  const formattedTableData = formatTableData(tableData, 'validatorUnbondingDelegations');

  return (
    <Table
      tableHeaders={tableHeaders}
      tableData={formattedTableData}
      currentPage={tableCurrentPage}
      changePage={setTableCurrentPage}
      totalPages={tablePages}
      isLoading={tableLoading}
      title="Unbonding Delegations"
      size="50%"
    />
  );
};

export default ValidatorUnbondingDelegations;
