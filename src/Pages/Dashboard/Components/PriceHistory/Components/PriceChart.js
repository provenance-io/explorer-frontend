import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled, { useTheme } from 'styled-components';
import * as echarts from 'echarts';
import { useMediaQuery } from 'redux/hooks';
import { breakpoints } from 'consts';

const StyledChart = styled.div`
  height: 300px;
  width: 100%;
`;
const StyledMessage = styled.div`
  width: 100%;
  margin-top: 20px;
`;

// Search for start value from the end to capture all data from that date
const getZoom = (date, data) => {
  // Set initial zoomValue so at least something is returned
  let zoomValue = data[data.length - 1];
  // Start from end of array and find matches
  for (let i = data.length - 1; i >= 0; i--) {
    if (date === data[i].trade_timestamp.slice(0, 10)) {
      zoomValue = data[i].trade_timestamp;
      break;
    }
  }
  return zoomValue;
};

// Chart constants
const chartData = {
  tooltip: {
    show: true,
    trigger: 'axis',
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
    type: 'time',
    boundaryGap: false,
    axisLabel: {
      formatter: '{MMM}-{dd}',
    },
  },
  yAxis: {
    type: 'value',
    boundaryGap: false,
  },
  series: [
    {
      name: 'Hash Price ($USD)',
      type: 'line',
      smooth: true,
      symbol: 'none',
    },
  ],
};

const PriceChart = ({ startDate, endDate, data }) => {
  const [chart, setChart] = useState(null);
  const chartElementRef = useRef(null);
  const theme = useTheme();
  const { matches: isSmall } = useMediaQuery(breakpoints.down('sm'));
  const { matches: isLg } = useMediaQuery(breakpoints.down('lg'));
  const dataCount = data.length;

  // Build dynamic chart data
  const buildChartData = useCallback(
    (data, startDate, endDate) => {
      const seriesData = data.map(({ price, trade_timestamp, trade_id }) => [
        trade_timestamp,
        price,
        trade_id,
      ]);
      // Find min data values
      const dataMin = Math.min(...data.map(item => item.price));

      // Build dynamic chart items
      chartData.grid = { bottom: isLg ? 90 : 75 };
      chartData.tooltip.axisPointer = { lineStyle: { color: theme.CHART_LINE_MAIN, width: '1' } };
      chartData.tooltip.position = isSmall && ['10%', '70%'];
      // formatting the tooltip output into table
      chartData.tooltip.formatter = params => {
        const day = `Date: ${params[0].value[0].slice(0, 10)}`;
        let returnString = '';
        let calcAvg = 0;
        params.forEach(param => {
          const time = `${new Date(param.value[0]).toLocaleTimeString('en-US')}`;
          const price = `$${param.value[1].toFixed(3)}`;
          const tradeId = `${param.value[2]}`;
          calcAvg += param.value[1];
          returnString += `
          <tr>
            <td style="text-align:left; padding:0 15px; border-right:1px solid black;">${time}</td>
            <td style="text-align:center; padding:0 20px;">${price}</td>
            <td style="text-align:left; padding:0 15px; border-left:1px solid black;">${tradeId}</td>
          </tr>`;
        });
        const Avg = `$${(calcAvg / params.length).toFixed(3)}`;
        return `
        <table>
          <div style="display:flex; justify-content:space-between;">
            <div style="text-align:left;"><b>${day}</b></div>
            <div><b>Average Price: ${Avg}</b></div>
          </div>
          <tr>
            <th style="border-bottom:1px solid black;">Time</th>
            <th style="border-bottom:1px solid black;">Price (USD)</th>
            <th style="border-bottom:1px solid black;">Trade ID</th>
          </tr>
          <tbody>
            ${returnString}
          <tbody>
        </table>
        <div style="text-align:center;"><b>Transactions: ${params.length}</b></div>`;
      };
      chartData.xAxis.axisLabel.color = theme.FONT_PRIMARY;
      chartData.xAxis.axisLabel.rotate = isLg ? 45 : 0;
      chartData.yAxis.offset = isSmall ? -14 : 0;
      chartData.yAxis.axisLabel = {
        rotate: isLg ? 45 : 0,
        color: theme.FONT_PRIMARY,
      };
      chartData.yAxis.max = obj => obj.max;
      chartData.yAxis.min = obj =>
        obj.min === dataMin ? 0 : (obj.min - (obj.max - obj.min) * 0.05).toFixed(2);
      chartData.color = theme.CHART_LINE_MAIN;
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
    let echart = echarts.getInstanceByDom(chartElementRef.current);
    // if it isn't initialized then init
    if (!echart) echart = echarts.init(chartElementRef.current);
    window.allCharts.push(echart);
    setChart(echart);
    // Update the chart with the data
    buildChartData(data, startDate, endDate);
    chart && chart.setOption(chartData);
  }, [setChart, chart, startDate, endDate, data, buildChartData]);

  return dataCount > 0 ? (
    <StyledChart ref={chartElementRef} />
  ) : (
    <StyledMessage>No pricing history available</StyledMessage>
  );
};

PriceChart.propTypes = {
  data: PropTypes.array.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
};

export default PriceChart;
