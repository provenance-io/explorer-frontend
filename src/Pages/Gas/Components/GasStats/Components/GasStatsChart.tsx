import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled, { useTheme } from 'styled-components';
import * as echarts from 'echarts';
import { format, parseISO } from 'date-fns';
import { useMediaQuery } from '../../../../../redux/hooks';
import { breakpoints } from '../../../../../consts';
import { formatDenom } from '../../../../../utils';

const StyledChart = styled.div`
  height: 600px;
  width: 100%;
`;
const StyledMessage = styled.div`
  width: 100%;
  margin-top: 20px;
`;

const chartData = {
  color: '',
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
    },
    // Needed format for TypeScript
    // eslint-disable-next-line no-empty-pattern
    formatter: ([]) => '',
  },
  grid: {
    right: '20%',
  },
  toolbox: {
    right: '',
    feature: {
      saveAsImage: { show: true },
    },
  },
  legend: {
    data: [''],
    textStyle: {},
    itemGap: 20,
    padding: 0,
  },
  xAxis: [
    {
      type: 'category',
      name: 'Date',
      data: {},
      axisTick: {
        alignWithLabel: true,
      },
      axisLabel: {
        rotate: 0,
        color: '',
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '',
        },
      },
    },
  ],
  yAxis: {
    type: 'value',
    name: 'Gas',
    alignTicks: true,
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
    max: '',
    min: '',
    nameTextStyle: {
      align: 'left',
    },
  },
  series: [
    {
      name: '',
      type: '',
      data: [{}],
    },
    {
      name: '',
      type: '',
      data: [{}],
      color: '',
      markLine: {},
      barGap: '-100%',
    },
  ],
};

interface DataArray {
  minGasUsed: number;
  maxGasUsed: number;
  avgGasUsed: number;
  stdDevGasUsed: number;
  messageType: string;
  date: string;
}

interface GasStatsProps {
  gasStatsGran: string;
  data: DataArray[];
  plotType: string;
  msgType: string;
}

interface plotDataProps {
  name: string;
  value: number;
  minGasUsed?: number;
  maxGasUsed?: number;
  stdDevGasUsed?: number;
  messageType?: string;
}

interface markLineDataProps {
  name: string;
  xAxis: string;
  yAxis: number;
}

const GasStatsChart = ({ gasStatsGran, data, msgType, plotType }: GasStatsProps) => {
  const [chart, setChart] = useState(null);
  const chartElementRef = useRef(null);
  const theme = useTheme();
  const { matches: isSmall } = useMediaQuery(breakpoints.down('sm'));
  const { matches: isLarge } = useMediaQuery(breakpoints.up('md'));
  const granIsDay = gasStatsGran === 'day';

  const gasStatsCount = data.length;

  const buildChartData = useCallback(
    (data: DataArray[]) => {
      const plotData: plotDataProps[] = [];
      const markLineData: markLineDataProps[][] = [];
      let count = 0;
      const averages: number[] = [];
      const avgMin: number[] = [];
      const avgMax: number[] = [];
      const stdDev: number[] = [];
      const xAxis = data.map((item) => item.date);
      let xAxisData = [...new Set(xAxis)];
      data.forEach((item) => {
        // If we have a message type and it matches what we are looking for:
        if (msgType && item.messageType === msgType) {
          plotData.push({
            value: item.avgGasUsed,
            name: item.date,
            messageType: item.messageType,
            minGasUsed: item.minGasUsed,
            maxGasUsed: item.maxGasUsed,
            stdDevGasUsed: item.stdDevGasUsed,
          });
          markLineData.push([
            {
              name: '',
              xAxis: format(parseISO(item.date), granIsDay ? 'MMM dd' : 'MM/dd, hh:mm'),
              yAxis: item.minGasUsed,
            },
            {
              name: '',
              xAxis: format(parseISO(item.date), granIsDay ? 'MMM dd' : 'MM/dd, hh:mm'),
              yAxis: item.maxGasUsed,
            },
          ]);
          count++;
        }
        // Otherwise, if we have no message type it means we need to average all fees
        if (!msgType) {
          if (plotData.length === 0) {
            plotData.push({
              value: 0,
              name: item.date,
              messageType: '',
              minGasUsed: 0,
              maxGasUsed: 0,
              stdDevGasUsed: 0,
            });
          }
          if (plotData[count]?.name === item.date) {
            averages.push(item.avgGasUsed);
            avgMin.push(item.minGasUsed);
            avgMax.push(item.maxGasUsed);
            stdDev.push(item.stdDevGasUsed);
          } else {
            plotData[count].value = averages.reduce((a, b) => a + b) / averages.length;
            plotData[count].minGasUsed = avgMin.reduce((a, b) => a + b) / avgMin.length;
            plotData[count].maxGasUsed = avgMax.reduce((a, b) => a + b) / avgMax.length;
            plotData[count].stdDevGasUsed = stdDev.reduce((a, b) => a + b) / stdDev.length;
            markLineData.push([
              {
                name: '',
                xAxis: format(
                  parseISO(plotData[count].name),
                  granIsDay ? 'MMM dd' : 'MM/dd, hh:mm'
                ),
                yAxis: avgMin.reduce((a, b) => a + b) / avgMin.length,
              },
              {
                name: '',
                xAxis: format(
                  parseISO(plotData[count].name),
                  granIsDay ? 'MMM dd' : 'MM/dd, hh:mm'
                ),
                yAxis: avgMax.reduce((a, b) => a + b) / avgMax.length,
              },
            ]);
            count++;
            plotData.push({
              value: 0,
              name: item.date,
              messageType: '',
              minGasUsed: 0,
              maxGasUsed: 0,
              stdDevGasUsed: 0,
            });
          }
        }
      });
      // Grab the last value for plotData if all tx types
      if (!msgType) {
        plotData[count].value = averages.reduce((a, b) => a + b) / averages.length;
        plotData[count].minGasUsed = avgMin.reduce((a, b) => a + b) / avgMin.length;
        plotData[count].maxGasUsed = avgMax.reduce((a, b) => a + b) / avgMax.length;
        plotData[count].stdDevGasUsed = stdDev.reduce((a, b) => a + b) / stdDev.length;
        markLineData.push([
          {
            name: '',
            xAxis: format(parseISO(plotData[count].name), granIsDay ? 'MMM dd' : 'MM/dd, hh:mm'),
            yAxis: avgMin.reduce((a, b) => a + b) / avgMin.length,
          },
          {
            name: '',
            xAxis: format(parseISO(plotData[count].name), granIsDay ? 'MMM dd' : 'MM/dd, hh:mm'),
            yAxis: avgMax.reduce((a, b) => a + b) / avgMax.length,
          },
        ]);
      }
      // Check against xAxisData if any days are missing, as it screws up the chart render
      if (xAxisData.length !== plotData.length && plotData.length > 0) {
        let idx = 0;
        xAxisData.forEach((item) => {
          if (idx >= plotData.length || item !== plotData[idx].name) {
            if (idx === 0) {
              plotData.unshift({
                value: plotData[idx].value,
                name: item,
                messageType: plotData[idx].messageType,
                minGasUsed: plotData[idx].minGasUsed,
                maxGasUsed: plotData[idx].maxGasUsed,
                stdDevGasUsed: plotData[idx].stdDevGasUsed,
              });
              markLineData.unshift([
                { name: '', xAxis: item, yAxis: markLineData[idx][0].yAxis },
                { name: '', xAxis: item, yAxis: markLineData[idx][1].yAxis },
              ]);
            } else if (idx >= plotData.length) {
              plotData.push({
                value: plotData[idx - 1].value,
                name: item,
                messageType: plotData[idx - 1].messageType,
                minGasUsed: plotData[idx - 1].minGasUsed,
                maxGasUsed: plotData[idx - 1].maxGasUsed,
                stdDevGasUsed: plotData[idx - 1].stdDevGasUsed,
              });
              markLineData.push([
                { name: '', xAxis: item, yAxis: markLineData[idx - 1][0].yAxis },
                { name: '', xAxis: item, yAxis: markLineData[idx - 1][1].yAxis },
              ]);
            } else {
              plotData.splice(idx, 0, {
                value: plotData[idx].value,
                name: item,
                messageType: plotData[idx].messageType,
                minGasUsed: plotData[idx].minGasUsed,
                maxGasUsed: plotData[idx].maxGasUsed,
                stdDevGasUsed: plotData[idx].stdDevGasUsed,
              });
              markLineData.splice(idx, 0, [
                {
                  name: '',
                  xAxis: format(parseISO(item), granIsDay ? 'MMM dd' : 'MM/dd, hh:mm'),
                  yAxis: markLineData[idx][0].yAxis,
                },
                {
                  name: '',
                  xAxis: format(parseISO(item), granIsDay ? 'MMM dd' : 'MM/dd, hh:mm'),
                  yAxis: markLineData[idx][1].yAxis,
                },
              ]);
            }
          }
          idx++;
        });
      }

      // Update xAxisData to ISO format
      xAxisData = xAxisData.map((item) =>
        format(parseISO(item), granIsDay ? 'MMM dd' : 'MM/dd, hh:mm')
      );
      // Set chart series data
      chartData.series = [
        {
          name: 'Average Gas Used',
          type: plotType,
          data: plotData,
          color: theme.CHART_LINE_MAIN,
          markLine: [],
          barGap: '-100%',
        },
        {
          name: 'Min/Max Gas Used',
          type: plotType,
          data: [],
          color: theme.CHART_PIE_K,
          markLine: {
            data: markLineData,
            symbol: 'line',
            lineStyle: {
              color: theme.CHART_PIE_K,
              width: 2,
            },
          },
          barGap: '-100%',
        },
      ];
      // Set chart legend
      chartData.legend.textStyle = {
        color: theme.FONT_PRIMARY,
      };
      chartData.legend.data = ['Average Gas Used', 'Min/Max Gas Used'];
      // Set chart xAxis data
      chartData.xAxis[0].data = xAxisData;
      // Set y axis min/max
      chartData.yAxis.max = (
        Math.max(...markLineData.map((item) => item[1].yAxis)) + 10000
      ).toFixed(0);
      chartData.yAxis.min = (
        Math.min(...markLineData.map((item) => item[0].yAxis)) - 10000
      ).toFixed(0);
      // Set x and y Axis rotation
      chartData.yAxis.axisLabel = {
        rotate: isSmall ? 90 : 0,
        color: theme.FONT_PRIMARY,
      };
      chartData.yAxis.axisLine.lineStyle.color = theme.CHART_LINE_MAIN;
      chartData.xAxis[0].axisLine.lineStyle.color = theme.CHART_LINE_MAIN;
      chartData.xAxis[0].axisLabel = {
        rotate: isSmall ? 90 : 0,
        color: theme.FONT_PRIMARY,
      };
      // Set tooltip data
      chartData.tooltip.formatter = (params) => `
        <table>
          <div style="text-align:center;"><b>${
            granIsDay ? params[0].data.name.slice(0, 10) : params[0].data.name
          }</b></div>
          <div>Message Type: <b>${!msgType ? 'All Types Average' : msgType}</b></div>
          <div>Average Gas Used: ${formatDenom(params[0].data.value, '', { decimal: 0 })}</div>
          <div>Minimum Gas Used: ${formatDenom(params[0].data.minGasUsed, '', { decimal: 0 })}</div>
          <div>Maximum Gas Used: ${formatDenom(params[0].data.maxGasUsed, '', { decimal: 0 })}</div>
          <div>Standard Deviation: ${formatDenom(params[0].data.stdDevGasUsed, '', {
            decimal: 0,
          })}</div>
        </div>
      `;
      // Remove tools when small
      chartData.toolbox = {
        right: isLarge ? '5%' : '7%',
        feature: {
          saveAsImage: { show: isSmall ? false : true },
        },
      };
    },
    [theme, granIsDay, isSmall, isLarge, msgType, plotType]
  );

  // Build Chart with data
  useEffect(() => {
    let chart: echarts.ECharts | undefined;
    if (gasStatsCount > 0) {
      // On load, chartElementRef should get set and we can update the chart to be an echart
      // first try to get the initialized instance
      if (chartElementRef.current) {
        chart =
          echarts.getInstanceByDom(chartElementRef.current as unknown as HTMLElement) ||
          echarts.init(chartElementRef.current as unknown as HTMLElement);
      }
      // Update the chart with the data
      buildChartData(data);
      chart?.setOption(chartData);
      window.addEventListener('resize', () => {
        chart && chart.resize();
      });
    }
    return window.removeEventListener('resize', () => chart && chart.resize());
  }, [setChart, chart, data, buildChartData, gasStatsCount]);

  return gasStatsCount > 0 ? (
    <StyledChart ref={chartElementRef} />
  ) : (
    <StyledMessage>{`No message fee data available for ${msgType} messages`}</StyledMessage>
  );
};

export default GasStatsChart;
