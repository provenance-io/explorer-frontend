import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { formatDenom } from 'utils';
import { useValidators, useAccounts } from 'redux/hooks';
import { ButtonTables } from 'Components';

const AccountUnbondings = () => {
  const [tableCurrentPage, setTableCurrentPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const {
    accountRedelegations,
    accountRedelegationsTotal: { amount: rAmount },
    accountRedelegationsLoading,
    accountUnbonding,
    accountUnbondingLoading,
    accountUnbondingTotal: { amount: uAmount, denom: uDenom },
    getAccountRedelegations,
    getAccountUnbonding,
  } = useAccounts();
  const { allValidators, allValidatorsLoading, getAllValidators } = useValidators();
  const { addressId } = useParams();

  useEffect(() => {
    // pulling first 100 validators with status=all
    getAllValidators();
    getAccountUnbonding(addressId);
    getAccountRedelegations(addressId);
  }, [addressId, getAllValidators, getAccountUnbonding, getAccountRedelegations]);

  useEffect(() => {
    setTableData(
      [...accountRedelegations, ...accountUnbonding]
        .map(d => {
          const validator = allValidators.find(v => v.addressId === d.validatorSrcAddr);
          return { ...validator, ...d };
          // Sort from earliest to latest end date
        })
        .sort((a, b) => a.endTime.millis - b.endTime.millis)
    );

    setTableCurrentPage(1);
  }, [allValidators, accountRedelegations, accountUnbonding, setTableData]);

  const tableHeaders = [
    { displayName: 'Moniker', dataName: 'moniker' },
    { displayName: 'Amount', dataName: 'amount' },
    { displayName: 'End Time', dataName: 'endTime' },
  ];

  const totalAmount = formatDenom(rAmount + uAmount, uDenom, { decimal: 2 });

  return (
    <ButtonTables
      buttonTitle={`Unbondings/Redelegations (${totalAmount})`}
      size="100%"
      iconPercent="76%"
      spinIcon={true}
      tableProps={{
        changePage: setTableCurrentPage,
        currentPage: tableCurrentPage,
        isLoading: accountRedelegationsLoading || accountUnbondingLoading || allValidatorsLoading,
        tableData,
        tableHeaders,
        totalPages: 1,
        contentBorder: false,
      }}
    />
  );
};

export default AccountUnbondings;
