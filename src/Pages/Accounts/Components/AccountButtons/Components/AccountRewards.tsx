import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { formatDenom } from 'utils';
import { useValidators, useAccounts } from 'redux/hooks';
import { Table } from 'Components';

const AccountRewards = () => {
  const [tableData, setTableData] = useState<any[]>([]);
  const { accountRewards, accountRewardsLoading, getAccountRewards } = useAccounts();
  const { allValidators, allValidatorsLoading, getAllValidators } = useValidators();
  const { addressId } = useParams<{ addressId: string }>();

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

  const tableHeaders = [
    { displayName: 'Moniker', dataName: 'moniker' },
    { displayName: 'Reward', dataName: 'reward' },
    { displayName: 'Value', dataName: 'totalBalancePrice' },
  ];

  return (
    <Table
      isLoading={accountRewardsLoading || allValidatorsLoading}
      tableData={tableData?.filter((element) => element.totalBalancePrice)}
      tableHeaders={tableHeaders}
    />
  );
};

export default AccountRewards;
