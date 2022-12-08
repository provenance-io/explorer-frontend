import { useState, useRef, useEffect, useCallback } from 'react';
import styled, { useTheme } from 'styled-components';
import * as echarts from 'echarts';
import { useGetTxHeatmapDataQuery, HourlyTotal } from 'redux/services';
// import { breakpoints } from 'consts';
// import { useMediaQuery } from 'redux/hooks';

const StyledChart = styled.div`
  height: 600px;
  width: 25%;
`;
const StyledMessage = styled.div`
  width: 100%;
  margin-top: 20px;
`;

const hours = [
  '12am',
  '1am',
  '2am',
  '3am',
  '4am',
  '5am',
  '6am',
  '7am',
  '8am',
  '9am',
  '10am',
  '11am',
  '12pm',
  '1pm',
  '2pm',
  '3pm',
  '4pm',
  '5pm',
  '6pm',
  '7pm',
  '8pm',
  '9pm',
  '10pm',
  '11pm',
];

// Chart data format
const chartData = {
  title: {
    text: 'Txs By Hrs of Day',
    left: '5%',
    textStyle: {
      color: '',
      fontWeight: 'normal',
    },
  },
  color: '',
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  grid: {
    top: '5.5%',
    bottom: '5%',
    containLabel: true,
  },
  xAxis: {
    type: 'value',
    show: false,
    axisLabel: {
      color: '',
    },
    // boundaryGap: [0, 0.01],
    // itemStyle: {
    //   show: false,
    // },
    // axisLabel: {
    //   rotate: 270,
    // },
  },
  yAxis: {
    type: 'category',
    data: [''],
    axisLabel: {
      color: '',
    },
  },
  series: [
    {
      name: 'Tx Count',
      type: 'bar',
      data: [0],
    },
  ],
};

export const TxByHour = () => {
  const [chart, setChart] = useState(null);
  const chartElementRef = useRef(null);
  const theme = useTheme();
  // const { matches: isSmall } = useMediaQuery(breakpoints.down('sm'));
  // const { matches: isLg } = useMediaQuery(breakpoints.down('lg'));
  const { data: txHeatmapData, isLoading: txHeatmapDataLoading } = useGetTxHeatmapDataQuery();

  const buildChartData = useCallback(
    (data) => {
      // Format data
      const seriesData: any = [];
      const yAxisData: any = [];
      data
        .slice()
        .reverse()
        .forEach((item: HourlyTotal) => {
          seriesData.push(item.numberTxs);
          yAxisData.push(hours[item.hour]);
        });
      // Set chart data
      chartData.yAxis.data = yAxisData;
      chartData.series[0].data = seriesData;
      // Set chart color
      chartData.color = theme.CHART_PIE_D;
      // Color the axis labels
      chartData.xAxis.axisLabel.color = theme.FONT_PRIMARY;
      chartData.yAxis.axisLabel.color = theme.FONT_PRIMARY;
      chartData.title.textStyle.color = theme.FONT_PRIMARY;
      // Format tooltip
      // chartData.tooltip.formatter = (params: any) =>
      //   `<div>Txs Count: ${formatDenom(params.data.value, '')}</div>`;
    },
    [theme]
  );

  // Build Chart with data
  useEffect(() => {
    // On load, chartElementRef should get set and we can update the chart to be an echart
    // first try to get the initialized instance
    let chart: echarts.ECharts | undefined;
    if (!txHeatmapDataLoading) {
      if (chartElementRef.current) {
        chart =
          echarts.getInstanceByDom(chartElementRef.current as unknown as HTMLElement) ||
          echarts.init(chartElementRef.current as unknown as HTMLElement);
      }
      // Update chart with the data
      buildChartData(txHeatmapData?.hourlyTotal);
      chart?.setOption(chartData);
      window.addEventListener('resize', () => {
        chart && chart.resize();
      });
    }
    return window.removeEventListener('resize', () => chart && chart.resize());
  }, [setChart, chart, txHeatmapData, txHeatmapDataLoading, buildChartData]);

  return txHeatmapData ? (
    <StyledChart ref={chartElementRef} />
  ) : (
    <StyledMessage>No transactions heatmap data available</StyledMessage>
  );
};
