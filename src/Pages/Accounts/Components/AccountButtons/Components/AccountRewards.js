import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { formatDenom, isEmpty } from 'utils';
import { useValidators, useAccounts } from 'redux/hooks';
import { Accordion, Table } from 'Components';

const ButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

const AccountRewards = () => {
  const [tableCurrentPage, setTableCurrentPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const { accountRewards, accountRewardsLoading, getAccountRewards } = useAccounts();
  const { allValidators, allValidatorsLoading, getAllValidators } = useValidators();
  const { addressId } = useParams();
  const haveRewards = !isEmpty(accountRewards);

  useEffect(() => {
    // pulling first 100 validators with status=all
    getAllValidators();
    getAccountRewards(addressId);
  }, [getAllValidators, addressId, getAccountRewards]);

  useEffect(() => {
    setTableData(
      accountRewards.rewards.map(d => {
        const validator = allValidators.find(v => v.addressId === d.validatorAddress);
        const totalBalancePrice =
          d.reward.length > 0
            ? `$${formatDenom(
                d.reward[0].totalBalancePrice.amount,
                d.reward[0].totalBalancePrice.denom,
                { decimal: 4, minimumFractionDigits: 2 }
              )}`
            : null;
        return { totalBalancePrice, ...validator, ...d };
      })
    );

    setTableCurrentPage(1);
  }, [accountRewards, allValidators, setTableData]);

  const tableHeaders = [
    { displayName: 'Moniker', dataName: 'moniker' },
    { displayName: 'Reward', dataName: 'reward' },
    { displayName: 'Value', dataName: 'totalBalancePrice' },
  ];

  const totalRewards =
    haveRewards && accountRewards.total.length > 0
      ? `${formatDenom(accountRewards.total[0].amount, accountRewards.total[0].denom, {
          decimal: 2,
          minimumFractionDigits: 2,
        })}`
      : '0 hash';

  return (
    <ButtonWrapper>
      <Accordion
        showChevron
        title={`Rewards (${totalRewards})`}
        titleFont={`font-weight: bold; font-size: 1.4rem`}
      >
        <Table
          changePage={setTableCurrentPage}
          currentPage={tableCurrentPage}
          isLoading={accountRewardsLoading || allValidatorsLoading}
          tableData={tableData.filter(element => element.totalBalancePrice)}
          tableHeaders={tableHeaders}
          totalPages={1}
        />
      </Accordion>
    </ButtonWrapper>
  );
};

export default AccountRewards;
