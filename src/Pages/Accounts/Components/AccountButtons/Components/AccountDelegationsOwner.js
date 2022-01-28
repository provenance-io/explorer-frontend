import React, { useEffect, useState } from 'react';
import { useValidators, useApp, useAccounts, useStaking } from 'redux/hooks';
import ButtonTables from './ButtonTables';

const AccountDelegationsOwner = () => {
  const [showContent, setShowContent] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [tableCurrentPage, setTableCurrentPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const { accountDelegations, accountDelegationsLoading, accountDelegationsPages } = useAccounts();
  const { handleStaking, isDelegate, ManageStakingBtn, modalFns, validator } = useStaking();
  const { isLoggedIn } = useApp();
  const { allValidators, allValidatorsLoading, getAllValidators } = useValidators();

  useEffect(() => {
    // pulling first 100 validators with status=all
    if (isLoggedIn) getAllValidators();
  }, [isLoggedIn, getAllValidators]);

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
    { displayName: 'Staking', dataName: 'manageStaking' },
    { displayName: 'Moniker', dataName: 'moniker' },
    { displayName: 'Amount', dataName: 'amount' },
  ];

  const handleButtonClick = () => {
    setShowButton(!showButton); // Show main button
    setShowContent(!showContent); // hide content
  };

  return (
    <ButtonTables
      buttonTitle="Delegations"
      handleButtonClick={handleButtonClick}
      showButton={showButton}
      showContent={showContent}
      tableProps={{
        changePage: setTableCurrentPage,
        currentPage: tableCurrentPage,
        isLoading: accountDelegationsLoading || allValidatorsLoading,
        ManageStakingBtn,
        tableData,
        tableHeaders,
        title: 'Delegations',
        totalPages: accountDelegationsPages,
        addButton: 'Hide',
        onButtonClick: handleButtonClick,
      }}
      stakingProps={{
        isDelegate,
        isLoggedIn,
        modalOpen: modalFns.modalOpen,
        onClose: modalFns.deactivateModalOpen,
        onStaking: handleStaking,
        validator: validator || {},
      }}
    />
  );
};

export default AccountDelegationsOwner;
