import { Table } from '../../../../../Components';
import { VestingInfo } from '../../../../../redux/services';
import { formatDenom } from '../../../../../utils';

export const AccountVestingTable = ({
  data,
  isLoading,
}: {
  data: VestingInfo;
  isLoading: boolean;
}) => {
  const nextVesting = data.periodicVestingList.find((element) => !element.isVested);
  // Calculate sum of vested tokens
  let currentlyVested = 0;
  data.currentlyVested
    .filter((element) => element.denom === 'nhash')
    .forEach((element) => {
      currentlyVested += Number(element.amount);
    });

  const tableData = [
    {
      param_name: 'Start',
      value: new Date(data.startTime).toLocaleDateString(),
    },
    {
      param_name: 'End',
      value: new Date(data.endTime).toLocaleDateString(),
    },
    {
      param_name: 'Next Amount',
      value: nextVesting
        ? formatDenom(Number(nextVesting.coins[0].amount), nextVesting.coins[0].denom, {
            decimal: 2,
          })
        : 'N/A',
    },
    {
      param_name: 'Next Date',
      value: nextVesting ? new Date(nextVesting.vestingDate).toLocaleDateString() : 'Fully Vested',
    },
    {
      param_name: 'Granted',
      value: formatDenom(
        Number(data.originalVestingList[0].amount),
        data.originalVestingList[0].denom
      ),
    },
    {
      param_name: 'Vested',
      value: formatDenom(Number(currentlyVested), data.originalVestingList[0].denom),
    },
  ];

  return (
    <Table
      isLoading={isLoading}
      tableData={tableData}
      tableHeaders={[
        {
          displayName: 'Info',
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
