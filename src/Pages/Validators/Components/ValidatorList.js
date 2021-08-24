import React, { Fragment, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Table, Filters } from 'Components';
import { useValidators, useApp, useAccounts, useStaking } from 'redux/hooks';
import { MY_VALIDATOR_STATUS_OPTIONS, STAKING_TYPES, VALIDATOR_STATUS_OPTIONS } from 'consts';
import ManageStakingModal from './ManageStakingModal';

const ValidatorListContainer = styled.div`
  width: 100%;
`;

const MyValTable = styled(Table)`
  margin-bottom: 20px;
`;

const ValidatorList = () => {
  const [tableCurrentPage, setTableCurrentPage] = useState(1);
  const [myValTableCurrentPage, setMyValTableCurrentPage] = useState(1);
  const [tableFilterStatus, setTableFilterStatus] = useState('active');
  const [myValTableFilterStatus, setMyValTableFilterStatus] = useState(STAKING_TYPES.DELEGATE);
  const [myValTableData, setMyValTableData] = useState([]);
  const {
    allValidators,
    allValidatorsLoading,
    validators: tableData,
    validatorsPages: tablePages,
    validatorsRecentLoading: tableLoading,
    getAllValidators,
    getValidatorsRecent: getTableData,
  } = useValidators();
  const { handleStaking, isDelegate, ManageStakingBtn, modalFns, validator } = useStaking();
  const {
    accountDelegations,
    accountDelegationsLoading,
    accountDelegationsPages,
    accountRedelegations,
    accountRedelegationsLoading,
    accountRewards,
    accountRewardsLoading,
    accountUnbonding,
    accountUnbondingLoading,
  } = useAccounts();
  const { tableCount, isLoggedIn } = useApp();

  const currentVals = useMemo(() => {
    switch (myValTableFilterStatus) {
      case STAKING_TYPES.DELEGATE:
        return accountDelegations;
      case STAKING_TYPES.REDELEGATE:
        return accountRedelegations;
      case STAKING_TYPES.UNDELEGATE:
        return accountUnbonding;
      default:
        return null;
    }
  }, [myValTableFilterStatus, accountDelegations, accountRedelegations, accountUnbonding]);

  const isJailed = tableFilterStatus === 'jailed';
  const isDelegateFilter = myValTableFilterStatus === STAKING_TYPES.DELEGATE;

  useEffect(() => {
    // pulling first 100 validators with status=all
    if (isLoggedIn) getAllValidators();
  }, [isLoggedIn, getAllValidators]);

  useEffect(() => {
    getTableData({ page: tableCurrentPage, count: tableCount, status: tableFilterStatus });
  }, [getTableData, tableCount, tableCurrentPage, tableFilterStatus]);

  useEffect(() => {
    setMyValTableData(
      currentVals.map(d => {
        const validator = allValidators.find(v => v.addressId === d.validatorSrcAddr);
        const rewards = isDelegateFilter
          ? accountRewards.rewards.find(r => r.validatorAddress === d.validatorSrcAddr)
          : {};
        return { ...rewards, ...validator, ...d };
      })
    );

    setMyValTableCurrentPage(1);
  }, [accountRewards, allValidators, currentVals, isDelegateFilter, setMyValTableData]);

  const myValTableHeaders = [
    isDelegateFilter && { displayName: 'Staking', dataName: 'manageStaking' },
    { displayName: 'Moniker', dataName: 'moniker' },
    { displayName: 'Voting Power', dataName: 'votingPower' },
    { displayName: 'Commission', dataName: 'commission' },
    { displayName: 'Delegation Amount', dataName: 'amount' },
    { displayName: 'Reward', dataName: 'reward' },
  ] // Remove the nulls
    .filter(th => th);

  // Table header values in order
  const tableHeaders = [
    isLoggedIn && { displayName: 'Staking', dataName: 'delegate' },
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
  ] // Remove the nulls
    .filter(th => th);

  const myValFilterData = [
    {
      title: 'My Validator Type:',
      type: 'dropdown',
      options: MY_VALIDATOR_STATUS_OPTIONS,
      action: setMyValTableFilterStatus,
    },
  ];

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
      {[...accountDelegations, ...accountRedelegations, ...accountUnbonding]?.length > 0 && (
        <Fragment>
          <Filters filterData={myValFilterData} />
          <MyValTable
            changePage={setMyValTableCurrentPage}
            currentPage={myValTableCurrentPage}
            isLoading={
              accountDelegationsLoading ||
              accountRedelegationsLoading ||
              accountUnbondingLoading ||
              accountRewardsLoading ||
              allValidatorsLoading
            }
            ManageStakingBtn={ManageStakingBtn}
            tableData={myValTableData}
            tableHeaders={myValTableHeaders}
            title="My Validators"
            totalPages={isDelegateFilter ? accountDelegationsPages : 1}
          />
        </Fragment>
      )}

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
      />
      <ManageStakingModal
        isDelegate={isDelegate}
        isLoggedIn={isLoggedIn}
        modalOpen={modalFns.modalOpen}
        onClose={modalFns.deactivateModalOpen}
        onStaking={handleStaking}
        validator={validator || {}}
      />
    </ValidatorListContainer>
  );
};

export default ValidatorList;
