import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { formatDenom } from 'utils';
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
    if (date === data[i].dateTime.slice(0, 10)) {
      zoomValue = data[i].dateTime;
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
      rotate: 0,
      formatter: '{MMM}-{dd}',
    },
  },
  yAxis: {
    type: 'value',
    boundaryGap: [0, '100%'],
    axisLabel: {},
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
      const seriesData = data.map(({ displayPricePerDisplayUnit, dateTime }) => [
        dateTime,
        parseFloat(formatDenom(displayPricePerDisplayUnit, 'USD')).toFixed(3),
      ]);
      chartData.tooltip.axisPointer = { lineStyle: { color: theme.CHART_LINE_MAIN, width: '1' } };
      chartData.xAxis.axisLabel.color = theme.FONT_PRIMARY;
      chartData.yAxis.offset = isSmall ? -14 : 0;
      chartData.yAxis.axisLabel = {
        rotate: isLg ? 45 : 0,
        color: theme.FONT_PRIMARY,
      };
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
