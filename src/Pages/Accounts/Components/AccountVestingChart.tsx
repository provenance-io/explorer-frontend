import styled, { useTheme } from 'styled-components';
import * as echarts from 'echarts';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'redux/hooks';
import { breakpoints } from 'consts';
import { formatDenom, isEmpty } from 'utils';
import { VestingInfo } from 'redux/services';
import Big from 'big.js';

const StyledChart = styled.div<{ height?: string }>`
  width: 100%;
  height: ${({ height }) => (height ? height : '155px')};
`;

// Set initial chart data
const chartData = {
  color: '',
  tooltip: {
    // Needed format for TypeScript
    // eslint-disable-next-line no-empty-pattern
    formatter: ([]) => '',
  },
  polar: {
    radius: [40, '80%'],
  },
  angleAxis: {
    max: 0,
    interval: 0,
    startAngle: 90,
    axisLabel: {
      show: true,
    },
  },
  radiusAxis: {
    type: 'category',
    data: [''],
  },
  series: {
    type: 'bar',
    data: [0],
    coordinateSystem: 'polar',
    label: {
      show: false,
    },
  },
};

export const AccountVestingChart = ({ data }: { data: VestingInfo }) => {
  const [chart, setChart] = useState(null);
  const chartElementRef = useRef(null);
  const theme = useTheme();
  const { matches: isLg } = useMediaQuery(breakpoints.up('lg'));
  const { matches: isMd } = useMediaQuery(breakpoints.down('md'));
  const { matches: isSm } = useMediaQuery(breakpoints.down('sm'));

  const buildChartData = useCallback(() => {
    // Set the polar axis min/max tick intervals to the vesting amounts
    chartData.angleAxis.interval = new Big(Number(data.periodicVestingList[0].coins[0].amount))
      .div(1e9)
      .toNumber();
    // Max amount to vest is the original vesting list in hash
    chartData.angleAxis.max = new Big(Number(data?.originalVestingList[0].amount))
      .div(1e9)
      .toNumber();
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
    // Set currently vested amounts
    chartData.series.data = [new Big(currentlyVested || 0).div(1e9).toNumber()];
    // If fully vested, change color of the chart to green and remove axis ticks
    if (currentlyVested === Number(data?.originalVestingList[0].amount)) {
      chartData.color = theme.POSITIVE_CHANGE;
      chartData.angleAxis.interval = currentlyVested;
      chartData.angleAxis.axisLabel.show = false;
    }
    // Tooltip formatting
    chartData.tooltip.formatter = (params: any[]) => `
      <div>Amount Vested: ${formatDenom(
        currentlyVested,
        data.periodicVestingList[0].coins[0].denom
      )}</div>
      ${
        !(currentlyVested === Number(data?.originalVestingList[0].amount))
          ? `<div>Amount Remaining: ${formatDenom(
              new Big(Number(data.originalVestingList[0].amount)).minus(currentlyVested).toNumber(),
              data.originalVestingList[0].denom
            )}</div>`
          : ''
      }
    `;
  }, [data, theme]);

  // Build Chart with data
  useEffect(() => {
    // On load, chartElementRef should get set and we can update the chart to be an echart
    // first try to get the initialized instance
    let chart: echarts.ECharts | undefined;
    if (!isEmpty(data)) {
      if (chartElementRef.current) {
        chart =
          echarts.getInstanceByDom(chartElementRef.current as unknown as HTMLElement) ||
          echarts.init(chartElementRef.current as unknown as HTMLElement);
      }
      // Update chart with the data
      buildChartData();
      chart?.setOption(chartData);
      window.addEventListener('resize', () => {
        chart && chart.resize();
      });
    }
    return window.removeEventListener('resize', () => chart && chart.resize());
  }, [chart, buildChartData, setChart, data]);

  return (
    <StyledChart ref={chartElementRef} height={isSm ? '155px' : isLg || isMd ? '250px' : ''} />
  );
};
