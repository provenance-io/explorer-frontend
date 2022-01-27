import React, { useEffect, useState } from 'react';
import { useValidators, useApp, useAccounts } from 'redux/hooks';
import ButtonTables from './ButtonTables';

const AccountUnbondings = () => {
  const [showContent, setShowContent] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [tableCurrentPage, setTableCurrentPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const {
    accountRedelegations,
    accountRedelegationsLoading,
    accountUnbonding,
    accountUnbondingLoading,
  } = useAccounts();
  const { isLoggedIn } = useApp();
  const { allValidators, allValidatorsLoading, getAllValidators } = useValidators();

  useEffect(() => {
    // pulling first 100 validators with status=all
    if (isLoggedIn) getAllValidators();
  }, [isLoggedIn, getAllValidators]);

  useEffect(() => {
    setTableData(
      (accountRedelegations, accountUnbonding).map(d => {
        const validator = allValidators.find(v => v.addressId === d.validatorSrcAddr);
        return { ...validator, ...d };
      })
    );

    setTableCurrentPage(1);
  }, [allValidators, accountRedelegations, accountUnbonding, setTableData]);

  const tableHeaders = [
    { displayName: 'Moniker', dataName: 'moniker' },
    { displayName: 'Amount', dataName: 'amount' },
    { displayName: 'End Time', dataName: 'endTime' },
  ];

  const handleButtonClick = () => {
    setShowButton(!showButton); // Show main button
    setShowContent(!showContent); // hide content
  };

  return (
    <ButtonTables
      buttonTitle="Unbondings/Redelegations"
      handleButtonClick={handleButtonClick}
      showButton={showButton}
      showContent={showContent}
      hasLength={[...accountRedelegations, ...accountUnbonding]?.length > 0}
      tableProps={{
        changePage: setTableCurrentPage,
        currentPage: tableCurrentPage,
        isLoading: accountRedelegationsLoading || accountUnbondingLoading || allValidatorsLoading,
        tableData,
        tableHeaders,
        title: 'Unbondings/Redelegations',
        totalPages: 1,
        addButton: 'Hide',
        onButtonClick: handleButtonClick,
      }}
    />
  );
};

export default AccountUnbondings;
