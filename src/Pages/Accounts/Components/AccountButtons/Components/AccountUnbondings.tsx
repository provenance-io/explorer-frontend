import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useValidators, useAccounts } from 'redux/hooks';
import { Table } from 'Components';

export const AccountUnbondings = () => {
  const [tableData, setTableData] = useState<any[]>([]);
  const {
    accountRedelegations,
    accountRedelegationsLoading,
    accountUnbonding,
    accountUnbondingLoading,
    getAccountRedelegations,
    getAccountUnbonding,
  } = useAccounts();
  const { allValidators, allValidatorsLoading, getAllValidators } = useValidators();
  const { addressId } = useParams<{ addressId: string }>();

  useEffect(() => {
    // pulling first 100 validators with status=all
    getAllValidators({});
    getAccountUnbonding(addressId);
    getAccountRedelegations(addressId);
  }, [addressId, getAllValidators, getAccountUnbonding, getAccountRedelegations]);

  useEffect(() => {
    setTableData(
      [...accountRedelegations, ...accountUnbonding]
        .map((d) => {
          const validator = allValidators.find((v) => v.addressId === d.validatorSrcAddr);
          return { ...validator, ...d };
          // Sort from earliest to latest end date
        })
        .sort((a, b) => Number(a.endTime.millis) - Number(b.endTime.millis))
    );
  }, [allValidators, accountRedelegations, accountUnbonding, setTableData]);

  const tableHeaders = [
    { displayName: 'Moniker', dataName: 'moniker' },
    { displayName: 'Amount', dataName: 'amount' },
    { displayName: 'End Time', dataName: 'endTime' },
  ];

  return (
    <Table
      isLoading={accountRedelegationsLoading || accountUnbondingLoading || allValidatorsLoading}
      tableData={tableData}
      tableHeaders={tableHeaders}
    />
  );
};
