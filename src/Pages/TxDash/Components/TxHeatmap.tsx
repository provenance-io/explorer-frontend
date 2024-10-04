import { useState, useRef, useEffect, useCallback } from 'react';
import styled, { useTheme } from 'styled-components';
import * as echarts from 'echarts';
import { useGetTxHeatmapDataQuery, DayOfData } from '../../../redux/services';
import { formatDenom } from '../../../utils';

const StyledChart = styled.div`
  height: 600px;
  width: 100%;
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
const days = ['Sat', 'Fri', 'Thu', 'Wed', 'Tue', 'Mon', 'Sun'];

// Chart data format
const chartData = {
  title: {
    text: 'Txs by Time/DOW Heatmap',
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
  grid: {
    height: '85%',
    top: '6%',
    left: 35,
    right: 85,
    bottom: 0,
  },
  xAxis: {
    type: 'category',
    data: hours,
    splitArea: {
      show: true,
    },
    axisLabel: {
      color: '',
    },
  },
  yAxis: {
    type: 'category',
    data: days,
    splitArea: {
      show: true,
    },
    axisLabel: {
      color: '',
    },
  },
  visualMap: {
    min: 0,
    max: 10,
    inRange: {
      color: ['', ''],
    },
    calculable: true,
    orient: 'vertical',
    align: 'left',
    right: 0,
    itemHeight: 510,
    top: '4.5%',
    textStyle: {
      color: '',
    },
  },
  series: [
    {
      name: 'Weekly Transactions',
      type: 'heatmap',
      // Data in format [hour of day, day of week, amount of txs]
      // Zeroes in amount of txs must return a non-number (i.e., -)
      data: [],
      label: {
        color: 'BLACK',
        show: true,
        // eslint-disable-next-line
        formatter: ({}) => '',
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
        label: {
          show: false,
        },
      },
    },
  ],
};

export const TxHeatmap = () => {
  const [chart, setChart] = useState(null);
  const chartElementRef = useRef(null);
  const theme = useTheme();
  // const { matches: isSmall } = useMediaQuery(breakpoints.down('sm'));
  // const { matches: isLg } = useMediaQuery(breakpoints.down('lg'));
  const { data: txHeatmapData, isLoading: txHeatmapDataLoading } = useGetTxHeatmapDataQuery();

  // Build the dynamic chart content
  const buildChartData = useCallback(
    (data) => {
      // Mutate the data into the format we need, and store in seriesData
      const seriesData: any = [];
      // Also find the max number of transactions to set max in chart
      let maxTxs = 0;
      data.forEach((dayData: DayOfData) => {
        dayData.data.forEach((day, index) => {
          seriesData.push([day.hour, Math.abs(dayData.dow - 6), day.numberTxs || '-']);
          if (day.numberTxs > maxTxs) {
            maxTxs = day.numberTxs;
          }
        });
      });
      // Set heatmap data
      chartData.series[0].data = seriesData;
      // Set heatmap max
      chartData.visualMap.max = maxTxs;
      // Configure label

      // Set heatmap colors
      chartData.visualMap.inRange.color = [theme.CHART_PIE_A, theme.CHART_PIE_D, theme.RED_PRIMARY];
      // Format the tooltip
      chartData.tooltip.formatter = (params: any) => `
        <div>Day: ${days[params.data[1]] || days[params.data.value[1]]}</div>
        <div>Hour: ${hours[params.data[0]] || hours[params.data.value[0]]}</div>
        <div>Txs Count: ${formatDenom(params.data[2] || params.data.value[2], '')}</div>
      `;
      // Format the label for max value
      chartData.series[0].label.formatter = (params: any) => {
        if (params.data[2] === maxTxs) {
          return 'Max';
        }
        return '';
      };
      // Color the axis labels
      chartData.xAxis.axisLabel.color = theme.FONT_PRIMARY;
      chartData.yAxis.axisLabel.color = theme.FONT_PRIMARY;
      chartData.visualMap.textStyle.color = theme.FONT_PRIMARY;
      // Color the chart title
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
      buildChartData(txHeatmapData?.heatmap);
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
