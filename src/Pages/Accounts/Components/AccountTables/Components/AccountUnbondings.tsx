import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useValidators, useAccounts, useFrontendPagination } from 'redux/hooks';
import { Table } from 'Components';
import { formatDenom } from 'utils';

export const AccountUnbondings = () => {
  const [tableData, setTableData] = useState<any[]>([]);
  const {
    accountUnbonding,
    accountUnbondingLoading,
    getAccountUnbonding,
    accountUnbondingTotal: { amount, denom },
  } = useAccounts();
  const { allValidators, allValidatorsLoading, getAllValidators } = useValidators();
  const { addressId } = useParams<{ addressId: string }>();

  // Add frontend-enabled Pagination
  const {
    tableData: paginatedTableData,
    currentPage,
    changePage,
    totalPages,
  } = useFrontendPagination({ data: tableData });

  useEffect(() => {
    // pulling first 100 validators with status=all
    getAllValidators({});
    getAccountUnbonding(addressId);
  }, [addressId, getAllValidators, getAccountUnbonding]);

  useEffect(() => {
    setTableData(
      accountUnbonding
        .map((d) => {
          const validator = allValidators.find((v) => v.addressId === d.validatorSrcAddr);
          return { ...validator, ...d };
          // Sort from earliest to latest end date
        })
        .sort((a, b) => Number(a.endTime.millis) - Number(b.endTime.millis))
    );
  }, [allValidators, accountUnbonding, setTableData]);

  const totalUnbondings = formatDenom(parseFloat(amount || '0'), denom, {
    decimal: 2,
  });

  const tableHeaders = [
    { displayName: 'Moniker', dataName: 'moniker' },
    { displayName: 'Amount', dataName: 'amount' },
    { displayName: 'End Time', dataName: 'endTime' },
  ];

  return (
    <Table
      isLoading={accountUnbondingLoading || allValidatorsLoading}
      tableData={paginatedTableData}
      tableHeaders={tableHeaders}
      changePage={changePage}
      currentPage={currentPage}
      totalPages={totalPages}
      title={`Total Unbondings (${totalUnbondings})`}
    />
  );
};
