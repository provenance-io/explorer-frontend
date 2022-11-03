import { Table } from 'Components';
import { AccountHashTotals } from 'utils';

export const HashTable = ({
  hashData,
  isLoading,
}: {
  hashData: AccountHashTotals;
  isLoading: boolean;
}) => {
  const tableData = [
    {
      hashBucket: 'Available',
      amount: {
        amount: hashData.hashAvailable,
        denom: 'nhash',
      },
    },
    {
      hashBucket: 'Delegated',
      amount: {
        amount: hashData.hashDelegations,
        denom: 'nhash',
      },
    },
    {
      hashBucket: 'Redelegated',
      amount: {
        amount: hashData.hashRedelegations,
        denom: 'nhash',
      },
    },
    {
      hashBucket: 'Unbondings',
      amount: {
        amount: hashData.hashUnbondings,
        denom: 'nhash',
      },
    },
    {
      hashBucket: 'Rewards',
      amount: {
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
          dataName: 'amount',
        },
      ]}
      tableBorder={false}
    />
  );
};
