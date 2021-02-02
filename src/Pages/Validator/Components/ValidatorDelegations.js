import React, { useEffect, useState } from 'react';
import { Table } from 'Components';
import { useParams } from 'react-router-dom';
import { useValidators } from 'redux/hooks';
import { formatTableData } from 'utils';

const ValidatorDelegations = () => {
  const [tableCurrentPage, setTableCurrentPage] = useState(1);
  const {
    getValidatorDelegations: getTableData,
    validatorDelegations: tableData,
    validatorDelegationsLoading: tableLoading,
    validatorDelegationsPages: tablePages,
  } = useValidators();
  const { validatorId } = useParams();
  // Results to display per page of table
  const tableCount = 5;
  // Fetch table data
  useEffect(() => {
    getTableData({ id: validatorId, page: tableCurrentPage, count: tableCount });
  }, [getTableData, tableCount, tableCurrentPage, validatorId]);
  // Table header values in order
  const tableHeaders = ['Address', 'Amount', 'Shares', 'Block'];
  // Format the raw table data into the form we need it to be displayed
  const formattedTableData = formatTableData(tableData, 'validatorDelegations');

  return (
    <Table
      tableHeaders={tableHeaders}
      tableData={formattedTableData}
      currentPage={tableCurrentPage}
      changePage={setTableCurrentPage}
      totalPages={tablePages}
      isLoading={tableLoading}
      title="Delegations"
      size="50%"
    />
  );
};

export default ValidatorDelegations;
