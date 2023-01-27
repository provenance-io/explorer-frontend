import { useState, useRef, useEffect, useCallback } from 'react';
import styled, { useTheme } from 'styled-components';
import * as echarts from 'echarts';
import { useGetTxHeatmapDataQuery, DailyTotal } from '../../../redux/services';
import { capitalize, formatDenom } from '../../../utils';
// import { useMediaQuery } from '../../../redux/hooks';
// import { breakpoints } from '../../../consts';

const StyledChart = styled.div`
  height: 300px;
  width: 100%;
`;
const StyledMessage = styled.div`
  width: 100%;
  margin-top: 20px;
`;

// Chart data formats
const chartData = {
  title: {
    text: 'Txs By Days Of Week',
    top: -5,
    left: '5%',
    textStyle: {
      color: '',
      fontWeight: 'normal',
    },
  },
  tooltip: {
    position: 'top',
    // eslint-disable-next-line
    formatter: ({}) => '',
  },
  series: [
    {
      name: 'Days of Week Transaction Counts',
      type: 'pie',
      radius: [25, 75],
      center: ['50%', '50%'],
      roseType: 'area',
      itemStyle: {
        color: '',
        borderRadius: 1,
        borderColor: '',
      },
      label: {
        color: '',
      },
      labelLine: {
        length: 3,
        length2: 3,
      },
      data: [{ value: 0, name: '' }],
    },
  ],
};

export const TxDaysOfWeek = () => {
  const [chart, setChart] = useState(null);
  const chartElementRef = useRef(null);
  const theme = useTheme();
  // const { matches: isSmall } = useMediaQuery(breakpoints.down('sm'));
  // const { matches: isLg } = useMediaQuery(breakpoints.down('lg'));
  const { data: txHeatmapData, isLoading: txHeatmapDataLoading } = useGetTxHeatmapDataQuery();
  const buildChartData = useCallback(
    (data?: DailyTotal[]) => {
      // Format data
      const seriesData: { value: number; name: string }[] = [];
      data?.forEach((item: DailyTotal) =>
        seriesData.push({ value: item.numberTxs, name: capitalize(item.day) })
      );
      // Set chart data
      chartData.series[0].data = seriesData;
      // Format tooltip
      chartData.tooltip.formatter = (params: any) =>
        `<div>Txs Count: ${formatDenom(params.data.value, '')}</div>`;
      // Color items, borders, and labels
      chartData.series[0].itemStyle.borderColor = theme.FONT_PRIMARY;
      chartData.series[0].itemStyle.color = theme.CHART_PIE_D;
      chartData.series[0].label.color = theme.FONT_PRIMARY;
      chartData.title.textStyle.color = theme.FONT_PRIMARY;
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
      buildChartData(txHeatmapData?.dailyTotal);
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
