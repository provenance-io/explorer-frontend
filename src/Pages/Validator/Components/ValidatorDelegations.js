import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table } from '../../../Components';
import { useMediaQuery, useValidators } from '../../../redux/hooks';
import { breakpoints } from '../../../consts';

const ValidatorDelegations = () => {
  const [tableCurrentPage, setTableCurrentPage] = useState(1);
  const { matches } = useMediaQuery(breakpoints.up('sm'));
  const {
    getValidatorDelegations: getTableData,
    validatorDelegations: tableData,
    validatorDelegationsLoading: tableLoading,
    validatorDelegationsPages: tablePages,
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
    { displayName: 'Address', dataName: 'delegatorAddr' },
    { displayName: 'Amount', dataName: 'amount' },
    { displayName: 'Shares', dataName: 'shares' },
  ];

  return (
    <Table
      tableHeaders={tableHeaders}
      tableData={tableData}
      currentPage={tableCurrentPage}
      changePage={setTableCurrentPage}
      totalPages={tablePages}
      isLoading={tableLoading}
      title="Delegations"
      size={matches && '48%'}
    />
  );
};

export default ValidatorDelegations;
