import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useWallet } from '@provenanceio/wallet-lib';
import { Table, Filters } from 'Components';
import { useValidators, useApp, useAccounts, useStaking } from 'redux/hooks';
import { VALIDATOR_STATUS_OPTIONS } from 'consts';
import ManageStakingModal from './ManageStakingModal';

const ValidatorListContainer = styled.div`
  width: 100%;
`;

const ValidatorList = () => {
  const [tableCurrentPage, setTableCurrentPage] = useState(1);
  const [tableFilterStatus, setTableFilterStatus] = useState('active');
  const {
    validators: tableData,
    validatorsPages: tablePages,
    validatorsRecentLoading: tableLoading,
    getValidatorsRecent: getTableData,
  } = useValidators();
  const { handleStaking, ManageStakingBtn, modalFns, validator } = useStaking();
  const { getAccountDelegations } = useAccounts();
  const { walletService } = useWallet();
  const { tableCount, isLoggedIn } = useApp();

  useEffect(() => {
    (async () => {
      try {
        if (isLoggedIn) {
          getAccountDelegations(walletService.state.address);
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, [isLoggedIn, getAccountDelegations, walletService.state.address]);

  useEffect(() => {
    getTableData({ page: tableCurrentPage, count: tableCount, status: tableFilterStatus });
  }, [getTableData, tableCount, tableCurrentPage, tableFilterStatus]);

  const isJailed = tableFilterStatus === 'jailed';

  // Table header values in order
  const tableHeaders = [
    { displayName: 'Moniker', dataName: 'moniker' },
    { displayName: 'Address', dataName: 'addressId' },
    { displayName: 'Commission', dataName: 'commission' },
    { displayName: 'Bonded Tokens', dataName: 'bondedTokens' },
    !isJailed && { displayName: 'Voting Power', dataName: 'votingPower' },
    !isJailed && { displayName: 'Uptime', dataName: 'uptime' },
    { displayName: 'Self Bonded', dataName: 'selfBonded' },
    !isJailed && { displayName: 'Delegators', dataName: 'delegators' },
    !isJailed && { displayName: 'Bond Height', dataName: 'bondHeight' },
    isJailed && { displayName: 'Unbonding Height', dataName: 'unbondingHeight' },
    isLoggedIn && { displayName: '', dataName: 'manageStaking' },
  ]
    // Remove the nulls
    .filter((th) => th);

  // Data to populate table filters
  const filterData = [
    {
      title: 'Validator Status:',
      type: 'dropdown',
      options: VALIDATOR_STATUS_OPTIONS,
      action: setTableFilterStatus,
    },
  ];

  return (
    <ValidatorListContainer>
      <Filters filterData={filterData} />
      <Table
        tableHeaders={tableHeaders}
        tableData={tableData}
        currentPage={tableCurrentPage}
        changePage={setTableCurrentPage}
        totalPages={tablePages}
        isLoading={tableLoading}
        title="Validators List"
        ManageStakingBtn={ManageStakingBtn}
        showIndex
      />
      <ManageStakingModal
        handleStaking={handleStaking}
        isLoggedIn={isLoggedIn}
        onClose={modalFns.deactivateModalOpen}
        modalOpen={modalFns.modalOpen}
        validator={validator}
      />
    </ValidatorListContainer>
  );
};

export default ValidatorList;
