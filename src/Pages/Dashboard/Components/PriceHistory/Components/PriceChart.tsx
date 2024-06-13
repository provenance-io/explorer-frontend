import { useState, useRef, useEffect, useCallback } from 'react';
import styled, { useTheme } from 'styled-components';
import * as echarts from 'echarts';
import { useMediaQuery } from 'redux/hooks';
import { breakpoints } from 'consts';
import { HistoricalPricing } from 'redux/features/orderbook/orderbookSlice';
import { format, parseISO } from 'date-fns';

const StyledChart = styled.div`
  height: 300px;
  width: 100%;
`;
const StyledMessage = styled.div`
  width: 100%;
  margin-top: 20px;
`;

// Chart constants
const chartData = {
  color: '',
  grid: { bottom: 0 },
  dataZoom: [
    {
      type: '',
      startValue: '',
      endValue: '',
    },
    { startValue: '', endValue: '' },
  ],
  tooltip: {
    axisPointer: { lineStyle: { color: '', width: '1' } },
    position: [''],
    show: true,
    trigger: 'axis',
    formatter: (arg: any) => '',
  },
  toolbox: {
    feature: {
      dataZoom: {
        yAxisIndex: 'none',
      },
      restore: {},
      saveAsImage: {},
    },
  },
  xAxis: {
    data: [],
    type: 'time',
    boundaryGap: false,
    axisLabel: {
      formatter: '{MMM}-{dd}',
      color: '',
      rotate: 0,
    },
  },
  yAxis: {
    type: 'value',
    name: 'Price (USD)',
    boundaryGap: false,
    offset: 0,
    axisTick: {
      show: true,
    },
    axisLabel: {
      rotate: 0,
      color: '',
    },
    splitLine: {
      show: false,
    },
    axisLine: {
      lineStyle: {
        color: '',
      },
    },
    max: (obj: any) => '' || 0,
    min: (obj: any) => '',
  },
  series: [
    {
      data: [],
      name: 'Hash Price ($USD)',
      type: 'line',
      smooth: true,
      symbol: 'none',
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

// Search for start value from the end to capture all data from that date
const getZoom = (date: string, data: HistoricalPricing[]) => {
  // Set initial zoomValue so at least something is returned
  let zoomValue = data[data.length - 1].time_close;
  // Start from end of array and find matches
  for (let i = data.length - 1; i >= 0; i--) {
    if (date === data[i].time_close.slice(0, 10)) {
      zoomValue = data[i].time_close;
      break;
    }
  }
  return zoomValue;
};

interface PriceChartProps {
  startDate: string;
  endDate: string;
  data: HistoricalPricing[];
}

const PriceChart = ({ startDate, endDate, data }: PriceChartProps) => {
  const [chart, setChart] = useState(null);
  const chartElementRef = useRef(null);
  const theme = useTheme();
  const { matches: isSmall } = useMediaQuery(breakpoints.down('sm'));
  const { matches: isLg } = useMediaQuery(breakpoints.down('lg'));
  const dataCount = data.length;

  // Build dynamic chart data
  const buildChartData = useCallback(
    (data, startDate, endDate) => {
      const seriesData = data.map((item: HistoricalPricing) => [
        format(parseISO(item.time_close), 'yyyy-MM-dd'),
        parseFloat(item.quote.USD.close.toFixed(3)),
        parseFloat(item.quote.USD.high.toFixed(3)),
        parseFloat(item.quote.USD.low.toFixed(3)),
        parseFloat(item.quote.USD.volume.toFixed(3)),
      ]);
      // Build dynamic chart items
      chartData.grid = { bottom: isLg ? 90 : 75 };
      chartData.tooltip.axisPointer = { lineStyle: { color: theme.CHART_LINE_MAIN, width: '1' } };
      chartData.tooltip.position = isSmall ? ['10%', '70%'] : [''];
      // formatting the tooltip output into table
      chartData.tooltip.formatter = (params) => {
        const day = `Date: ${params[0].value[0].slice(0, 10)}`;
        let returnString = '';
        params.forEach((param: any) => {
          const high = `$${param.value[2]}`;
          const price = `$${param.value[3]}`;
          const volume = `${param.value[4]}`;
          returnString += `
          <tr>
            <td style="text-align:left; padding:0 15px; border-right:1px solid black;">${high}</td>
            <td style="text-align:center; padding:0 20px;">${price}</td>
            <td style="text-align:left; padding:0 15px; border-left:1px solid black;">$${volume}</td>
          </tr>`;
        });
        return `
        <table>
          <div style="display:flex; justify-content:space-between;">
            <div style="text-align:left;"><b>${day}</b></div>
            <div><b>Price: ${params[0].value[1]}</b></div>
          </div>
          <tr>
            <th style="border-bottom:1px solid black;">High</th>
            <th style="border-bottom:1px solid black;">Low</th>
            <th style="border-bottom:1px solid black;">Volume</th>
          </tr>
          <tbody>
            ${returnString}
          <tbody>
        </table>`;
      };
      // chartData.xAxis.data = seriesData.map(
      //   (item: { value: string; name: number; date: string }) => item.date
      // );
      chartData.xAxis.axisLabel.color = theme.FONT_PRIMARY;
      chartData.xAxis.axisLabel.rotate = isLg ? 45 : 0;
      chartData.yAxis.offset = isSmall ? -14 : 0;
      chartData.yAxis.axisLabel = {
        rotate: isLg ? 45 : 0,
        color: theme.FONT_PRIMARY,
      };
      chartData.dataZoom = [
        {
          type: 'inside',
          startValue: getZoom(startDate, data),
          endValue: endDate,
        },
        {
          startValue: getZoom(startDate, data),
          endValue: endDate,
        },
      ];
      chartData.yAxis.axisLine.lineStyle.color = theme.FONT_PRIMARY;
      chartData.yAxis.max = (obj: any) => obj.max;
      chartData.yAxis.min = (obj: any) => obj.min;
      chartData.color = theme.CHART_LINE_MAIN;
      chartData.series[0].data = seriesData;
      chartData.series[0].areaStyle = {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: theme.CHART_LINE_GRADIENT_START,
          },
          {
            offset: 1,
            color: theme.CHART_LINE_GRADIENT_END,
          },
        ]),
      };
    },
    [theme, isLg, isSmall]
  );

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
    buildChartData(data, startDate, endDate);
    chart?.setOption(chartData);
    window.addEventListener('resize', () => {
      chart && chart.resize();
    });
    return window.removeEventListener('resize', () => chart && chart.resize());
  }, [setChart, chart, startDate, endDate, data, buildChartData]);

  return dataCount > 0 ? (
    <StyledChart ref={chartElementRef} />
  ) : (
    <StyledMessage>No pricing history available</StyledMessage>
  );
};

export default PriceChart;
