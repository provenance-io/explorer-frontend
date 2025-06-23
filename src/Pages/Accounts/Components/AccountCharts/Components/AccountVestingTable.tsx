import React, { useState } from 'react';
import { Table } from '../../../../../Components';
import { VestingInfo } from '../../../../../redux/services';
import { formatDenom } from '../../../../../utils';

export const AccountVestingTable = ({
  data,
  isLoading,
  period,
}: {
  data: VestingInfo;
  isLoading: boolean;
  period: 'DAY' | 'MONTH' | 'YEAR';
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
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
      param_name: `${
        period === 'DAY'
          ? 'Daily'
          : period === 'MONTH'
          ? 'Monthly'
          : period === 'YEAR'
          ? 'Yearly'
          : ''
      } Amount`,
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
    <div style={{ position: 'relative', marginBottom: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
        <span style={{ fontWeight: 600, fontSize: '1.1em' }}>Vesting Info</span>
        <span
          style={{
            marginLeft: 8,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            position: 'relative',
          }}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          tabIndex={0}
          aria-label="Vesting info details"
        >
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="8" fill="#007bff" />
            <text x="8" y="12" textAnchor="middle" fontSize="10" fill="#fff">
              i
            </text>
          </svg>
          {showTooltip && (
            <div
              style={{
                position: 'absolute',
                top: '120%',
                left: 0,
                zIndex: 10,
                background: '#fff',
                color: '#222',
                border: '1px solid #ccc',
                borderRadius: 4,
                padding: '10px 14px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                width: 320,
                fontSize: '0.95em',
                lineHeight: 1.5,
              }}
            >
              <strong>Important:</strong> All vesting schedules are estimates. The actual vesting
              started on {new Date(data.startTime).toLocaleDateString()}, and tokens vest
              continuously until {new Date(data.endTime).toLocaleDateString()}. Hash tokens are
              released continuously during each block, so tokens will trickle in rather than vest on
              specific dates.
            </div>
          )}
        </span>
      </div>
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
    </div>
  );
};
