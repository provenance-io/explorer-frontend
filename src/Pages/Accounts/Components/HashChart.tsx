import { useState, useRef, useEffect, useCallback } from 'react';
import styled, { useTheme } from 'styled-components';
import * as echarts from 'echarts';
import { useMediaQuery } from 'redux/hooks';
import { Loading } from 'Components';
import { AccountHashTotals, isEmpty } from 'utils';
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

export const HashChart = ({
  hashData,
  isLoading,
}: {
  hashData: AccountHashTotals;
  isLoading: boolean;
}) => {
  const [chart, setChart] = useState(null);
  const chartElementRef = useRef(null);
  const theme = useTheme();
  const { matches: isLg } = useMediaQuery(breakpoints.up('lg'));
  const { matches: isMd } = useMediaQuery(breakpoints.down('md'));
  const { matches: isSm } = useMediaQuery(breakpoints.down('sm'));

  const buildChartData = useCallback(() => {
    chartData.series[0].data[0].value = [
      hashData.hashAvailable,
      hashData.hashRewards,
      hashData.hashRedelegations,
      hashData.hashUnbondings,
      hashData.hashDelegations,
    ];
    chartData.radar.indicator = [
      { name: 'Available', max: hashData.hashTotal || 1 },
      { name: 'Reward', max: hashData.hashTotal || 1 },
      { name: 'Redelegated', max: hashData.hashTotal || 1 },
      { name: 'Unbonding', max: hashData.hashTotal || 1 },
      { name: 'Delegated', max: hashData.hashTotal || 1 },
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
  }, [hashData, theme]);

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

  return isLoading ? (
    <Loading />
  ) : isEmpty(hashData) ? (
    <StyledMessage>No hash data available</StyledMessage>
  ) : (
    <StyledChart ref={chartElementRef} height={isSm ? '155px' : isLg || isMd ? '250px' : ''} />
  );
};
