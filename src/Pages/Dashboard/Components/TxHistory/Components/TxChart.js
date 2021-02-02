import React, { useState, useRef, useEffect } from 'react';
import styled, { useTheme } from 'styled-components';
import echarts from 'echarts';
import { format, parseISO } from 'date-fns';
import { useTxs, useMediaQuery } from 'redux/hooks';
import { breakpoints } from 'consts';

const StyledChart = styled.div`
  height: 300px;
  width: 100%;
`;
const StyledMessage = styled.div`
  width: 100%;
  margin-top: 20px;
`;

const TxChart = () => {
  const [chart, setChart] = useState(null);
  const chartElementRef = useRef(null);
  const { txHistory, txHistoryGran } = useTxs();
  const theme = useTheme();
  const { matches: isSmall } = useMediaQuery(breakpoints.down('sm'));
  const { matches: isLg } = useMediaQuery(breakpoints.down('lg'));
  const granIsDay = txHistoryGran === 'day';

  const txHistoryCount = txHistory.length;

  // Build Chart with data
  useEffect(() => {
    if (txHistoryCount > 0) {
      // On load, chartElementRef should get set and we can update the chart to be an echart
      setChart(echarts.init(chartElementRef.current));
      const buildChartData = () => {
        const xAxisData = txHistory.map(({ date }) =>
          format(parseISO(date, "yyyy-MM-dd't'HH:mm:ss"), granIsDay ? 'MMM dd' : 'MMM dd hh')
        );
        const seriesData = txHistory.map(({ numberTxs, date }) => ({ value: numberTxs, name: date }));

        return {
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: xAxisData,
            axisLabel: {
              rotate: 45,
              textStyle: { color: theme.FONT_PRIMARY },
            },
          },
          yAxis: {
            type: 'value',
            offset: isSmall ? -14 : 0,
            axisLabel: {
              rotate: isLg ? 45 : 0,
              textStyle: { color: theme.FONT_PRIMARY },
            },
          },
          color: theme.CHART_LINE_MAIN,
          tooltip: {
            show: true,
            trigger: 'axis',
            axisPointer: { lineStyle: { color: theme.CHART_LINE_MAIN, width: '1' } },
            formatter: '{b} <br/> transactions: {c}',
          },
          series: [
            {
              type: 'line',
              smooth: true,
              data: seriesData,
              areaStyle: {
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
              },
            },
          ],
        };
      };
      // Update the chart with the data
      const chartData = buildChartData();
      chart && chart.setOption(chartData);
    }
  }, [setChart, chart, txHistory, granIsDay, isSmall, isLg, theme, txHistoryCount]);

  return txHistoryCount > 0 ? <StyledChart ref={chartElementRef} /> : <StyledMessage>No transactions available</StyledMessage>;
};

export default TxChart;
