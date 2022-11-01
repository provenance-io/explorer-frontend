import { useState, useRef, useEffect, useCallback } from 'react';
import { useParams } from 'react-router';
import styled, { useTheme } from 'styled-components';
import * as echarts from 'echarts';
import Big from 'big.js';
import { useAccounts, useMediaQuery } from 'redux/hooks';
import { Loading } from 'Components';
import { isEmpty } from 'utils';
import { breakpoints } from 'consts';

const StyledChart = styled.div<{ height?: string }>`
  width: 100%;
  height: ${({ height }) => (height ? height : '155px')};
`;
const StyledMessage = styled.div`
  width: 100%;
  margin-top: 20px;
`;

// Set initial chart data
const chartData = {
  radar: {
    // shape: 'circle',
    indicator: [{ name: '', max: 0 }],
    splitNumber: 3,
    axisNameGap: 5,
  },
  // tooltip: {
  //   show: true,
  // },
  series: [
    {
      name: 'Hash',
      type: 'radar',
      data: [{ name: '', value: [0] }],
      symbolSize: 10,
      backgroundColor: '',
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: '',
          },
          {
            offset: 1,
            color: '',
          },
        ]),
      },
    },
  ],
};

export const HashChart = () => {
  const [chart, setChart] = useState(null);
  const chartElementRef = useRef(null);
  const theme = useTheme();
  const { addressId: address } = useParams<{ addressId: string }>();
  const { matches: isLg } = useMediaQuery(breakpoints.up('lg'));
  const { matches: isMd } = useMediaQuery(breakpoints.down('md'));
  const { matches: isSm } = useMediaQuery(breakpoints.down('sm'));

  const { getAccountHashData, accountHashData, accountHashDataLoading } = useAccounts();

  // Pull all hash data only at the initial render
  useEffect(() => {
    getAccountHashData(address);
  }, [address, getAccountHashData]);

  // Grab the account total hash amount:
  const availableHash = accountHashData.assets.results?.find(
    (b: { amount: string; denom: string }) => b.denom === 'nhash'
  ) as { amount: string; denom: string };

  const buildChartData = useCallback(() => {
    const theseDels = new Big(
      Number(accountHashData?.delegations?.rollupTotals?.bondedTotal?.amount || 0)
    )
      .div(1e9)
      .toNumber();
    const theseRedels = new Big(
      accountHashData?.redelegations?.rollupTotals?.redelegationTotal?.amount || 0
    )
      .div(1e9)
      .toNumber();
    const theseUnbonds = new Big(
      accountHashData?.unbonding?.rollupTotals?.unbondingTotal?.amount || 0
    )
      .div(1e9)
      .toNumber();
    const theseRewards = new Big(accountHashData?.rewards?.total[0]?.amount || 0)
      .div(1e9)
      .toNumber();
    const available = new Big(Number(availableHash?.amount || 0)).div(1e9).toNumber();
    const theseTotal = available + theseDels + theseRedels + theseUnbonds + theseRewards;
    chartData.series[0].data[0].value = [
      available,
      theseRewards,
      theseRedels,
      theseUnbonds,
      theseDels,
    ];
    chartData.radar.indicator = [
      { name: 'Available', max: theseTotal || 1 },
      { name: 'Reward', max: theseTotal || 1 },
      { name: 'Redelegated', max: theseTotal || 1 },
      { name: 'Unbonding', max: theseTotal || 1 },
      { name: 'Delegated', max: theseTotal || 1 },
    ];
    chartData.series[0].backgroundColor = theme.CHART_LINE_MAIN;
    chartData.series[0].areaStyle.color = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 0,
        color: theme.CHART_LINE_GRADIENT_START,
      },
      {
        offset: 1,
        color: theme.CHART_LINE_GRADIENT_END,
      },
    ]);
  }, [availableHash, accountHashData, theme]);

  // Build Chart with data
  useEffect(() => {
    // On load, chartElementRef should get set and we can update the chart to be an echart
    // first try to get the initialized instance
    let chart: echarts.ECharts | undefined;
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
    return window.removeEventListener('resize', () => chart && chart.resize());
  }, [chart, buildChartData, setChart]);

  return accountHashDataLoading ? (
    <Loading />
  ) : isEmpty(accountHashData) ? (
    <StyledMessage>No hash data available</StyledMessage>
  ) : (
    <StyledChart ref={chartElementRef} height={isSm ? '155px' : isLg || isMd ? '250px' : ''} />
  );
};
