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
  color: [''],
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
    data: ['Gas Used', 'Gas Wanted', 'Fee'],
    textStyle: {},
    itemGap: 20,
    padding: 0,
  },
  xAxis: [
    {
      type: 'category',
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
  yAxis: [
    {
      type: 'value',
      name: 'Gas',
      position: 'right',
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
      nameTextStyle: {
        align: 'right',
      },
    },
    {
      type: 'value',
      name: 'Fee (hash)',
      position: 'left',
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
      nameTextStyle: {
        align: 'left',
      },
    },
  ],
  series: [
    {
      name: 'Gas Used',
      type: 'bar',
      data: {},
    },
    {
      name: 'Gas Wanted',
      type: 'bar',
    },
    {
      name: 'Fee',
      type: 'line',
      yAxisIndex: 1,
    },
  ],
};

interface DataArray {
  gasUsed: string;
  gasWanted: string;
  feeAmount: string;
  date: string;
}

interface GasVolumeProps {
  gasVolumeGran: string;
  data: DataArray[];
}

interface ParamsArray {
  name: string;
  seriesName: string;
  data: { value: string; name: string };
}

const GasVolumeChart = ({ gasVolumeGran, data }: GasVolumeProps) => {
  const [chart, setChart] = useState(null);
  const chartElementRef = useRef(null);
  const theme = useTheme();
  const { matches: isSmall } = useMediaQuery(breakpoints.down('sm'));
  const { matches: isLarge } = useMediaQuery(breakpoints.up('md'));
  const granIsDay = gasVolumeGran === 'day';

  const gasVolumeCount = data.length;

  const buildChartData = useCallback(
    (dataVal: DataArray[]) => {
      const xAxisData = dataVal.map(({ date }) =>
        format(parseISO(date), granIsDay ? 'MMM dd' : 'MM/dd, hh:mm')
      );
      const gasUsedData = dataVal.map(({ gasUsed, date }) => ({
        value: parseFloat(gasUsed).toFixed(0),
        name: date,
      }));
      const gasWantedData = dataVal.map(({ gasWanted, date }) => ({
        value: parseFloat(gasWanted).toFixed(0),
        name: date,
      }));
      const feeAmountData = dataVal.map(({ feeAmount, date }) => ({
        value: parseFloat(feeAmount) / 1e9,
        name: date,
      }));

      // Chart color palette:
      const colors: string[] = [theme.CHART_PIE_I, theme.CHART_LINE_MAIN, theme.CHART_PIE_K];
      chartData.legend.textStyle = {
        color: theme.FONT_PRIMARY,
      };
      // Set chart tooltip
      chartData.tooltip.formatter = (params: ParamsArray[]) => {
        const day = params[0].name.slice(0, 10);
        let returnString = '';
        let idx = 0;
        params.forEach((p) => {
          returnString += `
          <div style="display:flex;padding:2px;">
            <div
              style="
                height:10px;
                width:10px;
                border-radius:50%;
                align-self:center;
                margin-right:10px;
                background-color:${colors[idx]};
              "
            >
            </div>
            <div style="text-align:center;">
              ${p.seriesName}: ${
            p.seriesName === 'Fee'
              ? `${formatDenom(parseFloat(p.data.value), 'hash', { decimal: 0 })}`
              : `${formatDenom(parseFloat(p.data.value), '', { decimal: 0 })}`
          }
            </div>
            </div>`;
          idx++;
        });
        returnString = `<div>${granIsDay ? day : params[0].data.name}</div> ${returnString}`;
        return returnString;
      };
      // Set chart data items
      chartData.color = colors;
      // Set chart y-axis colors
      chartData.yAxis[0].axisLine.lineStyle.color = theme.CHART_LINE_MAIN;
      chartData.yAxis[1].axisLine.lineStyle.color = theme.CHART_PIE_K;
      chartData.xAxis[0].axisLine.lineStyle.color = theme.CHART_LINE_MAIN;
      // Set chart data items
      chartData.xAxis[0].data = xAxisData;
      chartData.series[0].data = gasUsedData;
      chartData.series[1].data = gasWantedData;
      chartData.series[2].data = feeAmountData;
      // Large/small display settings
      chartData.yAxis[0].axisLabel = {
        rotate: isSmall ? 90 : 0,
        color: theme.FONT_PRIMARY,
      };
      chartData.yAxis[1].axisLabel = {
        rotate: isSmall ? 90 : 0,
        color: theme.CHART_PIE_K,
      };
      chartData.xAxis[0].axisLabel = {
        rotate: isSmall ? 45 : 0,
        color: theme.FONT_PRIMARY,
      };
      // Tool view
      chartData.toolbox = {
        right: isLarge ? '5%' : '7%',
        feature: {
          saveAsImage: { show: isSmall ? false : true },
        },
      };
    },
    [theme, granIsDay, isSmall, isLarge]
  );

  // Build Chart with data
  useEffect(() => {
    let chart: echarts.ECharts | undefined;
    if (gasVolumeCount > 0) {
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
  }, [setChart, chart, data, buildChartData, gasVolumeCount]);

  return gasVolumeCount > 0 ? (
    <StyledChart ref={chartElementRef} />
  ) : (
    <StyledMessage>No transactions available</StyledMessage>
  );
};

export default GasVolumeChart;
