import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled, { useTheme } from 'styled-components';
import * as echarts from 'echarts';
import { format, parseISO } from 'date-fns';

const StyledChart = styled.div`
  height: 600px;
  width: 100%;
`;
const StyledMessage = styled.div`
  width: 100%;
  margin-top: 20px;
`;

const chartData = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
    },
  },
  grid: {
    right: '20%',
  },
  toolbox: {
    feature: {
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true },
    },
  },
  legend: {
    data: ['Gas Used', 'Gas Wanted', 'Fee Amount'],
  },
  xAxis: [
    {
      type: 'category',
      axisTick: {
        alignWithLabel: true,
      },
      axisLabel: {
        formatter: '{value}',
      },
    },
  ],
  yAxis: [
    {
      type: 'value',
      name: 'Gas',
      position: 'right',
      alignTicks: true,
      axisLine: {
        show: true,
        lineStyle: {},
      },
      axisLabel: {
        formatter: '{value}',
      },
    },
    {
      type: 'value',
      name: 'Fee Amount',
      position: 'left',
      alignTicks: true,
      axisLine: {
        show: true,
        lineStyle: {},
      },
      axisLabel: {
        formatter: '{value} hash',
      },
    },
  ],
  series: [
    {
      name: 'Gas Used',
      type: 'bar',
    },
    {
      name: 'Gas Wanted',
      type: 'bar',
    },
    {
      name: 'Fee Amount',
      type: 'line',
      yAxisIndex: 1,
    },
  ],
};

const GasVolumeChart = ({ gasVolumeGran, data }) => {
  const [chart, setChart] = useState(null);
  const chartElementRef = useRef(null);
  const theme = useTheme();
  const granIsDay = gasVolumeGran === 'day';

  const gasVolumeCount = data.length;

  const buildChartData = useCallback(
    dataVal => {
      const xAxisData = dataVal.map(({ date }) =>
        format(parseISO(date, "yyyy-MM-dd't'HH:mm:ss"), granIsDay ? 'MMM dd' : 'MM/dd, hh:mm')
      );
      const gasUsedData = dataVal.map(({ gasUsed, date }) => ({
        value: gasUsed / 1e9,
        name: date,
      }));
      const gasWantedData = dataVal.map(({ gasWanted, date }) => ({
        value: gasWanted / 1e9,
        name: date,
      }));
      const feeAmountData = dataVal.map(({ feeAmount, date }) => ({
        value: feeAmount / 1e9,
        name: date,
      }));

      // Chart color palette:
      const colors = [theme.CHART_PIE_H, theme.CHART_PIE_A, theme.CHART_PIE_K];
      chartData.legend.textStyle = {
        color: theme.FONT_PRIMARY,
      };
      // Set chart data items
      chartData.color = colors;
      // Set chart y-axis colors
      chartData.yAxis[0].axisLine.lineStyle.color = theme.FONT_PRIMARY;
      chartData.yAxis[1].axisLine.lineStyle.color = theme.CHART_PIE_K;
      // Set chart data items
      chartData.xAxis.data = xAxisData;
      chartData.xAxis[0].axisLabel.formatter = params => xAxisData[params];
      chartData.series[0].data = gasUsedData;
      chartData.series[1].data = gasWantedData;
      chartData.series[2].data = feeAmountData;
    },
    [theme, granIsDay]
  );

  // Build Chart with data
  useEffect(() => {
    if (gasVolumeCount > 0) {
      // On load, chartElementRef should get set and we can update the chart to be an echart
      // first try to get the initialized instance
      let echart = echarts.getInstanceByDom(chartElementRef.current);
      // if it isn't initialized then init
      if (!echart) echart = echarts.init(chartElementRef.current);
      // Push chart to page chart array in App.js
      setChart(echart);
      // Update the chart with the data
      buildChartData(data);
      chart && chart.setOption(chartData);
      window.addEventListener('resize', () => {chart && chart.resize()});
    }
    return (
      window.removeEventListener('resize', () => chart && chart.resize())
    )
  }, [setChart, chart, data, buildChartData, gasVolumeCount]);

  return gasVolumeCount > 0 ? (
    <StyledChart ref={chartElementRef} />
  ) : (
    <StyledMessage>No transactions available</StyledMessage>
  );
};

GasVolumeChart.propTypes = {
  gasVolumeGran: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default GasVolumeChart;
