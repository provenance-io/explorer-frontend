import React, { useEffect, useState } from 'react';
import { formatDenom } from 'utils';
import { useValidators, useApp, useAccounts } from 'redux/hooks';
import ButtonTables from './ButtonTables';

const AccountRewards = () => {
  const [showContent, setShowContent] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [tableCurrentPage, setTableCurrentPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const {
    accountDelegations,
    accountDelegationsLoading,
    accountDelegationsPages,
    accountRewards,
    accountRewardsLoading,
  } = useAccounts();
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
        const rewards = accountRewards.rewards.find(r => r.validatorAddress === d.validatorSrcAddr);
        const totalBalancePrice =
          rewards?.reward.length > 0
            ? `$${formatDenom(
                rewards.reward[0].totalBalancePrice.amount,
                rewards.reward[0].totalBalancePrice.denom,
                { decimal: 4, minimumFractionDigits: 2 }
              )}`
            : null;
        return { ...rewards, totalBalancePrice, ...validator, ...d };
      })
    );

    setTableCurrentPage(1);
  }, [accountRewards, allValidators, accountDelegations, setTableData]);

  const tableHeaders = [
    { displayName: 'Moniker', dataName: 'moniker' },
    { displayName: 'Reward', dataName: 'reward' },
    { displayName: 'Value', dataName: 'totalBalancePrice' },
  ];

  const totalRewards =
    accountRewards?.total[0] && !accountRewardsLoading
      ? `${formatDenom(accountRewards.total[0].amount, accountRewards.total[0].denom, {
          decimal: 2,
          minimumFractionDigits: 2,
        })}`
      : '0 hash';

  const handleButtonClick = () => {
    setShowButton(!showButton); // Show main button
    setShowContent(!showContent); // hide content
  };

  return (
    !accountRewardsLoading && (
      <ButtonTables
        buttonTitle={`Rewards (${totalRewards})`}
        handleButtonClick={handleButtonClick}
        showButton={showButton}
        showContent={showContent}
        hasLength={[...accountDelegations]?.length > 0}
        tableProps={{
          changePage: setTableCurrentPage,
          currentPage: tableCurrentPage,
          isLoading: accountDelegationsLoading || accountRewardsLoading || allValidatorsLoading,
          tableData: tableData.filter(element => element.totalBalancePrice),
          tableHeaders,
          title: `Rewards (${totalRewards})`,
          totalPages: accountDelegationsPages,
          addButton: 'Hide',
          onButtonClick: handleButtonClick,
        }}
      />
    )
  );
};

export default AccountRewards;
