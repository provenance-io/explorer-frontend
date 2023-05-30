import React, { Fragment, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Table, Filters } from 'Components';
import { formatDenom } from 'utils';
import { useValidators, useApp, useAccounts, useStaking } from 'redux/hooks';
import { MY_VALIDATOR_STATUS_OPTIONS, STAKING_TYPES, VALIDATOR_STATUS_OPTIONS } from 'consts';
import { ManageStakingModal } from './ManageStakingModal';

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
  const [validatorPower, setValidatorPower] = useState(0);

  const {
    allValidators,
    allValidatorsLoading,
    validators: tableData,
    validatorsPages: tablePages,
    validatorsRecentLoading: tableLoading,
    getAllValidators,
    getValidatorsRecent: getTableData,
    validatorsTotal = 1,
  } = useValidators();

  const { isDelegate, ManageStakingBtn, modalFns, validator } = useStaking();

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

  const isActive = tableFilterStatus === 'active';
  const isJailed = tableFilterStatus === 'jailed';
  const isDelegateFilter = myValTableFilterStatus === STAKING_TYPES.DELEGATE;
  // const isCandidate = tableFilterStatus === 'candidate';

  useEffect(() => {
    // pulling first 100 validators with status=all
    if (isLoggedIn)
      getAllValidators({
        page: 1,
        count: 100,
        status: 'all',
      });
  }, [isLoggedIn, getAllValidators]);

  useEffect(() => {
    getTableData({ page: tableCurrentPage, count: tableCount, status: tableFilterStatus });
  }, [getTableData, tableCount, tableCurrentPage, tableFilterStatus]);

  useEffect(() => {
    setMyValTableData(
      currentVals.map((d) => {
        const validator = allValidators.find((v) => v.addressId === d.validatorSrcAddr);
        const rewards = accountRewards.rewards.find(
          (r) => r.validatorAddress === d.validatorSrcAddr
        );
        const totalBalancePrice =
          rewards?.reward.length > 0
            ? `$${formatDenom(
                rewards.reward[0].totalBalancePrice.amount,
                rewards.reward[0].totalBalancePrice.denom,
                { decimal: 4, minimumFractionDigits: 2 }
              )}`
            : '-- --';
        return { ...rewards, totalBalancePrice, ...validator, ...d };
      })
    );

    setMyValTableCurrentPage(1);
  }, [accountRewards, allValidators, currentVals, isDelegateFilter, setMyValTableData]);

  useEffect(() => {
    const percentFormatter = new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    const num = (1 / validatorsTotal) * 5.5;
    const formattedNum = percentFormatter.format(num);
    setValidatorPower(formattedNum);
  }, [validatorsTotal]);

  const myValTableHeaders = [
    isDelegateFilter && { displayName: 'Staking', dataName: 'manageStaking' },
    { displayName: 'Moniker', dataName: 'moniker' },
    { displayName: 'Commission', dataName: 'commission' },
    { displayName: 'Delegation Amount', dataName: 'amount' },
    isDelegateFilter && { displayName: 'Reward', dataName: 'reward' },
    isDelegateFilter && { displayName: 'Total Value', dataName: 'totalBalancePrice' },
    !isDelegateFilter && { displayName: 'End Time', dataName: 'endTime' },
  ] // Remove the nulls
    .filter((th) => th);

  // Table header values in order
  const tableHeaders = [
    isLoggedIn && { displayName: 'Staking', dataName: 'delegate' },
    { displayName: 'Moniker', dataName: 'moniker' },
    { displayName: 'Address', dataName: 'addressId' },
    { displayName: 'Commission', dataName: 'commission' },
    { displayName: 'Bonded Tokens', dataName: 'bondedTokens' },
    isActive && { displayName: 'Voting Power*', dataName: 'votingPower' },
    isActive && { displayName: '24Hr Power Change', dataName: 'hr24Change' },
    !isJailed && { displayName: 'Delegators', dataName: 'delegators' },
    isJailed && { displayName: 'Unbonding Height', dataName: 'unbondingHeight' },
  ] // Remove the nulls
    .filter((th) => th);

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
      {[...accountDelegations, ...accountRedelegations, ...accountUnbonding]?.length > 0 &&
        isLoggedIn && (
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
        validator={validator || {}}
      />
      {isActive && <p>*Maximum voting power is currently {validatorPower}</p>}
    </ValidatorListContainer>
  );
};

export default ValidatorList;
