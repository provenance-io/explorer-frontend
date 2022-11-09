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
  // Calculate sum of vested tokens
  let currentlyVested = 0;
  // Because we want to break as soon as we find an item not vested, use a for loop
  const lengthOfVestingSched = Number(data.periodicVestingList.length);
  const periodicVestingSched = data.periodicVestingList;
  if (periodicVestingSched) {
    for (let i = 0; i < lengthOfVestingSched; i++) {
      if (periodicVestingSched[i].isVested) {
        // Add all currently vested amounts
        currentlyVested += Number(periodicVestingSched[i].coins[0].amount);
      } else {
        break;
      }
    }
  }
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
