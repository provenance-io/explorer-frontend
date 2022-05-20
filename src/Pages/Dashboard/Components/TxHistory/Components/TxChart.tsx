import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled, { useTheme } from 'styled-components';
import * as echarts from 'echarts';
import { format, parseISO } from 'date-fns';
import { breakpoints } from 'consts';
import { TxHistory } from 'redux/features/tx/txSlice';
import { NetworkVolumeStats } from 'redux/features/network/networkSlice';
import { PriceHistory } from 'redux/features/orderbook/orderbookSlice';
import { useTxs, useMediaQuery, useNetwork, useOrderbook } from '../../../../../redux/hooks';

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
            color: "",
          },
          {
            offset: 1,
            color: "",
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

// Checks value array against date array. If values are missing, add
// previous day's values
const fillGaps = (dateArray: string[], valueArray: ValueProps[]) => {
  if (dateArray.length !== valueArray.length && valueArray.length > 0) {
    let idx = 0;
    dateArray.forEach(item => {
      if (idx >= valueArray.length || item !== valueArray[idx].name) {
        if (idx === 0) {
          valueArray.unshift({
            value: valueArray[idx].value,
            name: item,
          });
        }
        else if (idx >= valueArray.length) {
          valueArray.push({
            value: valueArray[idx-1].value,
            name: item,
          })
        }
        else {
          valueArray.splice(idx,0,
            {
              value: valueArray[idx].value,
              name: item,
            })
        }
      }
      idx++;
    })
  };
  return valueArray;
}

interface ValueProps {
  value: number;
  name: string;
}

interface TxHistoryProps {
  txHistoryGran: string;
}

const TxChart = ({ txHistoryGran }: TxHistoryProps) => {
  const [chart, setChart] = useState(null);
  const chartElementRef = useRef(null);
  const { txHistory } = useTxs();
  const { networkGasVolume } = useNetwork();
  const { priceHistory, dailyPrice } = useOrderbook();
  const theme = useTheme();
  const { matches: isSmall } = useMediaQuery(breakpoints.down('sm'));
  const { matches: isLg } = useMediaQuery(breakpoints.down('lg'));
  const granIsDay = txHistoryGran === 'day';

  const txHistoryCount = txHistory.length;

  const buildChartData = useCallback(() => {
    const xAxisTicks: string[] = [];
    const xAxisShort: string[] = [];
    const xAxisData = txHistory.map(({ date }: TxHistory) => {
      xAxisTicks.push(date);
      xAxisShort.push(date.slice(0,10));
      return format(parseISO(date), granIsDay ? 'MMM dd' : 'MM/dd, hh:mm');
    });

    const transactions = txHistory.map(({ numberTxs, date }: TxHistory) => ({
      value: numberTxs,
      name: date,
    }));
    const fees = networkGasVolume.map(({ feeAmount, date }: NetworkVolumeStats) => ({
      value: parseInt((feeAmount/1e9).toFixed(0)),
      name: date,
    }));

    let priceHistoryRange: ValueProps[] = [];
    if (priceHistory.length > 0) {
      priceHistoryRange = fees.map(({ name }: ValueProps) => {
        const found = priceHistory.find((price: PriceHistory) => name.slice(0,10) === (price.trade_timestamp as string).slice(0,10));
        return({ 
          value: found?.price || dailyPrice.last_price,
          name,
        })
      })
    };

    // Check against xAxisTicks if any fees are missing. If so, add in the previous day's fees
    fillGaps(xAxisTicks, fees);
    fillGaps(xAxisShort, priceHistoryRange);

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
    let count = 0;
    chartData.series[1].data = fees.map(({ value, name }: ValueProps) => {
      const conversion = (value*priceHistoryRange[count].value).toFixed(2);
      count++;
      return {
        value: conversion,
        name,
      }
    });
    chartData.yAxis[1].axisLabel.color = theme.CHART_PIE_YES;
    // Tooltip
    chartData.tooltip.axisPointer.lineStyle.color = theme.CHART_LINE_MAIN;
  }, [txHistory, networkGasVolume, granIsDay, isSmall, isLg, theme, priceHistory, dailyPrice.last_price]);
  // Legend
  chartData.legend.textStyle = {
    color: theme.FONT_PRIMARY,
  };

  // Build chart with data
  useEffect(() => {
    let chart: echarts.ECharts | undefined;
    if (txHistoryCount > 0) {
      if (chartElementRef.current) {
        chart = echarts.getInstanceByDom(chartElementRef.current as unknown as HTMLElement) || echarts.init(chartElementRef.current as unknown as HTMLElement);
      };
      // Update chart with the data
      buildChartData();
      chart?.setOption(chartData);
      window.addEventListener('resize', () => {chart && chart.resize()});
    }
    return (
      window.removeEventListener('resize', () => chart && chart.resize())
    )
  }, [setChart, txHistoryCount, chart, buildChartData]);

  return txHistoryCount > 0 ? (
    <StyledChart ref={chartElementRef} />
  ) : (
    <StyledMessage>No transactions available</StyledMessage>
  );
};

export default TxChart;
