import React, { useEffect, useState } from 'react';
import { Table } from 'Components';
import { useParams } from 'react-router-dom';
import { useMediaQuery, useValidators } from 'redux/hooks';
import { breakpoints } from 'consts';

const ValidatorUnbondingDelegations = () => {
  const [tableCurrentPage, setTableCurrentPage] = useState(1);
  const { matches } = useMediaQuery(breakpoints.up('sm'));
  console.log(matches);
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
  const tableHeaders = [
    { displayName: 'Address', dataName: 'delegatorAddr' },
    { displayName: 'Amount', dataName: 'amount' },
    { displayName: 'Block', dataName: 'block' },
    { displayName: 'End Time', dataName: 'endTime' },
  ];

  return (
    <Table
      tableHeaders={tableHeaders}
      tableData={tableData}
      currentPage={tableCurrentPage}
      changePage={setTableCurrentPage}
      totalPages={tablePages}
      isLoading={tableLoading}
      title="Unbonding Delegations"
      size={matches && '50%'}
    />
  );
};

export default ValidatorUnbondingDelegations;
