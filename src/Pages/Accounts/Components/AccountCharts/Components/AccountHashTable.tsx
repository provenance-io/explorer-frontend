import { Table } from 'Components';
import { AccountHashTotals } from 'utils';

export const AccountHashTable = ({
  hashData,
  isLoading,
}: {
  hashData: AccountHashTotals;
  isLoading: boolean;
}) => {
  const tableData = [
    {
      hashBucket: 'Total',
      hashAmount: {
        amount: hashData.hashTotal,
        denom: 'nhash',
      },
    },
    {
      hashBucket: 'Available',
      hashAmount: {
        amount: hashData.hashAvailable,
        denom: 'nhash',
      },
    },
    {
      hashBucket: 'Delegated',
      hashAmount: {
        amount: hashData.hashDelegations,
        denom: 'nhash',
      },
    },
    {
      hashBucket: 'Redelegated',
      hashAmount: {
        amount: hashData.hashRedelegations,
        denom: 'nhash',
      },
    },
    {
      hashBucket: 'Unbondings',
      hashAmount: {
        amount: hashData.hashUnbondings,
        denom: 'nhash',
      },
    },
    {
      hashBucket: 'Rewards',
      hashAmount: {
        amount: hashData.hashRewards,
        denom: 'nhash',
      },
    },
  ];

  return (
    <Table
      isLoading={isLoading}
      tableData={tableData}
      tableHeaders={[
        {
          displayName: 'Hash',
          dataName: 'hashBucket',
        },
        {
          displayName: 'Amount',
          dataName: 'hashAmount',
        },
      ]}
      tableBorder={false}
    />
  );
};
