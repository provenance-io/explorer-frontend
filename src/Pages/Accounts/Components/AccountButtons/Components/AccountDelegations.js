import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { formatDenom } from 'utils';
import { useValidators, useAccounts } from 'redux/hooks';
import { ButtonTables } from 'Components';

const AccountDelegations = () => {
  const [tableCurrentPage, setTableCurrentPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const {
    accountDelegations,
    accountDelegationsLoading,
    accountDelegationsPages,
    accountDelegationsTotal: { amount, denom },
    getAccountDelegations,
  } = useAccounts();
  const { allValidators, allValidatorsLoading, getAllValidators } = useValidators();
  const { addressId } = useParams();

  useEffect(() => {
    // pulling first 100 validators with status=all
    getAllValidators();
    getAccountDelegations({ address: addressId });
  }, [addressId, getAllValidators, getAccountDelegations]);

  useEffect(() => {
    setTableData(
      accountDelegations.map(d => {
        const validator = allValidators.find(v => v.addressId === d.validatorSrcAddr);
        return { ...validator, ...d };
      })
    );

    setTableCurrentPage(1);
  }, [allValidators, accountDelegations, setTableData]);

  const tableHeaders = [
    //{ displayName: 'Staking', dataName: 'manageStaking' },
    { displayName: 'Moniker', dataName: 'moniker' },
    { displayName: 'Amount', dataName: 'amount' },
  ];

  const totalAmount = formatDenom(amount, denom, { decimal: 2 });

  return (
    <ButtonTables
      buttonTitle={`Delegations (${totalAmount})`}
      size="100%"
      iconPercent="76%"
      spinIcon={true}
      tableProps={{
        changePage: setTableCurrentPage,
        currentPage: tableCurrentPage,
        isLoading: accountDelegationsLoading || allValidatorsLoading,
        tableData,
        tableHeaders,
        totalPages: accountDelegationsPages,
        contentBorder: false,
      }}
    />
  );
};

export default AccountDelegations;
