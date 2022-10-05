import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { formatDenom, isEmpty } from 'utils';
import { useValidators, useAccounts, useFrontendPagination } from 'redux/hooks';
import { Table } from 'Components';

export const AccountRewards = () => {
  const [tableData, setTableData] = useState<any[]>([]);
  const { accountRewards, accountRewardsLoading, getAccountRewards } = useAccounts();
  const { allValidators, allValidatorsLoading, getAllValidators } = useValidators();
  const { addressId } = useParams<{ addressId: string }>();
  // Add frontend-enabled Pagination
  const {
    tableData: paginatedTableData,
    currentPage,
    changePage,
    totalPages,
  } = useFrontendPagination({ data: tableData, count: 10 });

  useEffect(() => {
    // pulling first 100 validators with status=all
    getAllValidators({});
    getAccountRewards(addressId);
  }, [getAllValidators, addressId, getAccountRewards]);

  useEffect(() => {
    setTableData(
      accountRewards.rewards?.map((d) => {
        const validator = allValidators.find((v) => v.addressId === d.validatorAddress);
        const totalBalancePrice =
          d.reward.length > 0
            ? `$${formatDenom(
                Number(d.reward[0].totalBalancePrice.amount),
                d.reward[0].totalBalancePrice.denom,
                { decimal: 4, minimumFractionDigits: 2 }
              )}`
            : null;
        return { totalBalancePrice, ...validator, ...d };
      })
    );
  }, [accountRewards, allValidators, setTableData]);

  // Determine total awards for Rewards title
  const haveRewards = !isEmpty(accountRewards);
  const totalRewards =
    haveRewards && accountRewards.total.length > 0
      ? `${formatDenom(Number(accountRewards.total[0].amount), accountRewards.total[0].denom, {
          decimal: 2,
          minimumFractionDigits: 2,
        })}`
      : '0 hash';

  const tableHeaders = [
    { displayName: 'Moniker', dataName: 'moniker' },
    { displayName: 'Reward', dataName: 'reward' },
    { displayName: 'Value', dataName: 'totalBalancePrice' },
  ];

  return (
    <Table
      isLoading={accountRewardsLoading || allValidatorsLoading}
      tableData={paginatedTableData.filter((element) => element.totalBalancePrice)}
      tableHeaders={tableHeaders}
      changePage={changePage}
      currentPage={currentPage}
      totalPages={totalPages}
      title={`Total Rewards: ${totalRewards}`}
    />
  );
};
