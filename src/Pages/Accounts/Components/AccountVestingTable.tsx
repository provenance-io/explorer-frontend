import { Table } from 'Components';
import { VestingInfo } from 'redux/services';
import { formatDenom } from 'utils';

export const AccountVestingTable = ({
  data,
  isLoading,
}: {
  data: VestingInfo;
  isLoading: boolean;
}) => {
  const nextVesting = data.periodicVestingList.find((element) => !element.isVested);
  const tableData = [
    {
      param_name: 'Start Date',
      value: new Date(data.startTime).toLocaleDateString(),
    },
    {
      param_name: 'End Date',
      value: new Date(data.endTime).toLocaleDateString(),
    },
    {
      param_name: 'Next Amount',
      value: nextVesting
        ? formatDenom(Number(nextVesting.coins[0].amount), nextVesting.coins[0].denom)
        : 'N/A',
    },
    {
      param_name: 'Next Date',
      value: nextVesting ? new Date(nextVesting.vestingDate).toLocaleDateString() : 'Fully Vested',
    },
    {
      param_name: 'Amount Granted',
      value: formatDenom(
        Number(data.originalVestingList[0].amount),
        data.originalVestingList[0].denom
      ),
    },
  ];

  return (
    <Table
      isLoading={isLoading}
      tableData={tableData}
      tableHeaders={[
        {
          displayName: 'Vesting Info',
          dataName: 'param_name',
        },
        {
          displayName: 'Value',
          dataName: 'value',
        },
      ]}
      tableBorder={false}
    />
  );
};
