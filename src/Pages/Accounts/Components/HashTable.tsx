import Big from 'big.js';
import { Table } from 'Components';
import { useAccounts } from 'redux/hooks';

export const HashTable = () => {
  const { accountHashData, accountHashDataLoading: tableLoading } = useAccounts();
  const availableHash = accountHashData.assets.results?.find(
    (b: { amount: string; denom: string }) => b.denom === 'nhash'
  ) as { amount: string; denom: string };
  const theseDels = new Big(
    Number(accountHashData?.delegations?.rollupTotals?.bondedTotal?.amount || 0)
  ).toNumber();
  const theseRedels = new Big(
    accountHashData?.redelegations?.rollupTotals?.redelegationTotal?.amount || 0
  ).toNumber();
  const theseUnbonds = new Big(
    accountHashData?.unbonding?.rollupTotals?.unbondingTotal?.amount || 0
  ).toNumber();
  const theseRewards = new Big(accountHashData?.rewards?.total[0]?.amount || 0).toNumber();
  const available = new Big(Number(availableHash?.amount || 0)).toNumber();

  const tableData = [
    {
      hashBucket: 'Available',
      amount: {
        amount: available,
        denom: 'nhash',
      },
    },
    {
      hashBucket: 'Delegated',
      amount: {
        amount: theseDels,
        denom: accountHashData?.delegations?.rollupTotals?.bondedTotal?.denom,
      },
    },
    {
      hashBucket: 'Redelegated',
      amount: {
        amount: theseRedels,
        denom: accountHashData?.redelegations?.rollupTotals?.redelegationTotal?.denom,
      },
    },
    {
      hashBucket: 'Unbondings',
      amount: {
        amount: theseUnbonds,
        denom: accountHashData?.unbonding?.rollupTotals?.unbondingTotal?.denom,
      },
    },
    {
      hashBucket: 'Rewards',
      amount: {
        amount: theseRewards,
        denom: accountHashData?.rewards?.total[0]?.denom,
      },
    },
  ];

  return (
    <Table
      isLoading={tableLoading}
      tableData={tableData}
      tableHeaders={[
        {
          displayName: 'Hash',
          dataName: 'hashBucket',
        },
        {
          displayName: 'Amount',
          dataName: 'amount',
        },
      ]}
      tableBorder={false}
    />
  );
};
