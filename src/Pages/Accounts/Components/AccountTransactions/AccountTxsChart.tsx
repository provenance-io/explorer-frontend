import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled, { useTheme } from 'styled-components';
import * as echarts from 'echarts';
import { format, parseISO } from 'date-fns';
import { breakpoints } from 'consts';
import { useMediaQuery } from 'redux/hooks';

const StyledChart = styled.div`
  height: 300px;
  width: 100%;
`;
const StyledMessage = styled.div`
  width: 100%;
  margin-top: 20px;
`;

const chartData = {
  color: [''],
  tooltip: {
    show: true,
    trigger: 'axis',
    axisPointer: {
      lineStyle: {
        color: '',
        width: '1',
      },
      //formatter: ([]) => '',
      formatter: '{b} <br/> transactions: {c}',
    },
  },
  grid: {
    right: '20%',
  },
  legend: {
    data: ['Transactions', 'Fees (USD)'],
    textStyle: {},
    itemGap: 20,
    padding: 0,
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: {},
      axisLabel: {
        rotate: 45,
        color: '',
      },
    },
  ],
  yAxis: [
    {
      type: 'value',
      name: 'Transactions',
      alignTicks: true,
      position: 'left',
      offset: 0,
      axisLabel: {
        rotate: 0,
        color: '',
      },
      nameTextStyle: {
        align: 'left',
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '',
        },
      },
      splitLine: {
        lineStyle: {
          color: '',
        },
      },
    },
    {
      type: 'value',
      name: 'Fees (USD)',
      axisTick: {
        inside: true,
        show: true,
      },
      position: 'right',
      offset: 0,
      axisLine: {
        show: true,
        lineStyle: {
          color: '',
        },
      },
      axisLabel: {
        rotate: 0,
        color: '',
      },
      nameTextStyle: {
        align: 'right',
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: '',
        },
      },
    },
  ],
  series: [
    {
      name: 'Transactions',
      type: 'line',
      smooth: true,
      data: {},
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
    {
      name: 'Fees (USD)',
      type: 'line',
      showSymbol: false,
      smooth: true,
      data: {},
      areaStyle: {
        color: 'none',
      },
      yAxisIndex: 1,
    },
  ],
};

interface ValueProps {
  value: number;
  name: string;
}

interface AccountTxProps {
  tx: {
    date: string;
    numTxs: number;
    fees: number;
  }[];
}

export const AccountTxsChart = ({ tx }: AccountTxProps) => {
  const theme = useTheme();
  const [chart, setChart] = useState(null);
  const chartElementRef = useRef(null);
  const { matches: isSmall } = useMediaQuery(breakpoints.down('sm'));
  const { matches: isLg } = useMediaQuery(breakpoints.down('lg'));

  const buildChartData = useCallback(() => {
    const xAxisData: string[] = [];
    const transactions: { value: number; name: string }[] = [];
    const feesAmount: { value: number; name: string }[] = [];
    tx.forEach(({ date, numTxs, fees }) => {
      xAxisData.push(format(parseISO(date), 'MMM dd'));
      transactions.push({
        value: numTxs,
        name: date,
      });
      feesAmount.push({
        name: date,
        value: fees,
      });
    });

    // Now set chart data dynamically
    chartData.color = [theme.CHART_LINE_MAIN, theme.CHART_PIE_YES];
    // X axis
    chartData.xAxis[0].data = xAxisData;
    chartData.xAxis[0].axisLabel.color = theme.FONT_PRIMARY;
    // Y axis: transactions (left side)
    chartData.yAxis[0].axisLine.lineStyle.color = theme.FONT_PRIMARY;
    chartData.yAxis[0].offset = isSmall ? -14 : 0;
    chartData.yAxis[0].axisLabel.color = theme.FONT_PRIMARY;
    chartData.yAxis[0].axisLabel.rotate = isLg ? 45 : 0;
    chartData.series[0].data = transactions;
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
    chartData.yAxis[0].splitLine.lineStyle.color = theme.FONT_PRIMARY;
    // Y axis: fees (right side)
    chartData.yAxis[1].axisLine.lineStyle.color = theme.CHART_PIE_YES;
    chartData.yAxis[1].offset = isSmall ? -14 : 0;
    chartData.yAxis[1].axisLabel.color = theme.FONT_PRIMARY;
    chartData.yAxis[1].axisLabel.rotate = isLg ? -45 : 0;
    chartData.series[1].data = feesAmount.map(({ value, name }: ValueProps) => {
      const conversion = value.toFixed(2);
      return {
        value: conversion,
        name,
      };
    });
    chartData.yAxis[1].axisLabel.color = theme.CHART_PIE_YES;
    // Tooltip
    chartData.tooltip.axisPointer.lineStyle.color = theme.CHART_LINE_MAIN;
  }, [tx, isSmall, isLg, theme]);
  // Legend
  chartData.legend.textStyle = {
    color: theme.FONT_PRIMARY,
  };

  // Build chart with data
  useEffect(() => {
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
  }, [setChart, chart, buildChartData]);

  return tx.length > 0 ? (
    <StyledChart ref={chartElementRef} />
  ) : (
    <StyledMessage>No transactions available</StyledMessage>
  );
};
