import React, { useRef, useEffect, useState, useCallback } from 'react';
import styled, { useTheme } from 'styled-components';
import { useGovernance } from '../../../redux/hooks';
import { Content, Loading } from '../../../Components';
import * as echarts from 'echarts';
import { formatDenom, isEmpty } from '../../../utils';
import Big from 'big.js';

const StyledChart = styled.div`
  height: 200px;
  width: 100%;
  margin-top: -45px;
  margin-bottom: -70px;
`;

interface ParamsArray {
  name: string;
  seriesName: string;
  data: {
    value: string;
    initialDeposit: string;
    currentDeposit: string;
    neededDeposit: string;
    denom: string;
  };
}

// Chart constants
const chartData = {
  color: [''],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'none',
    },
    // Needed format for TypeScript
    // eslint-disable-next-line no-empty-pattern
    formatter: ([]: ParamsArray[]) => '',
  },
  xAxis: {
      type: 'value',
      show: false,
      axisLabel: {
        formatter: '{value} %',
      },
      max: 100,
  },
  yAxis: {
    type: 'category',
    show: false,    
  },
  series: [
    {
      name: 'Total Votes',
      type: 'bar',
      data: [{ value: 50 }],
      showBackground: true,
      itemStyle: {
        borderRadius: [5,5,5,5],
      },
      backgroundStyle: {
        color: '',
        borderColor: 'rgba(180, 180, 180, 0.3)',
        borderWidth: 1,
        borderDashOffset: 5,
        shadowBlur: 3,
        shadowColor: 'black',
        shadowOffsetX: -1,
        shadowOffsetY: 1,
        borderRadius: [5,5,5,5],
      },
      markLine: {
        silent: true,
        data: [
          {
            name: 'Deposit Threshold',
            xAxis: -1,
            label: {
              show: true,
              formatter: '',
              fontStyle: 'normal',
              fontFamily: 'Montserrat',
              textBorderColor: 'none',
              color: '',
            },
            lineStyle: {
              color: 'red',
            },
          },
        ],
        symbol: 'line',
        lineStyle: {
          color: 'black',
          width: 2,
        },
      },
    },
  ]
};

const getPercentage = (num = 0, den = 1) => new Big(num).div(den).times(100).toNumber();

export const ProposalDepositsChart = () => {
  const { proposal, proposalLoading } = useGovernance();
  const { timings } = proposal;
  const current = Number(timings.deposit.current);
  const initial = Number(timings.deposit.initial);
  const needed = Number(timings.deposit.needed) || 1;
  const denom = timings.deposit.denom;

  const [chart, setChart] = useState(null);
  const chartElementRef = useRef(null);
  const theme = useTheme();

  const buildChartData = useCallback(
    () => {
      // Build data
      const deposits = {
        value: getPercentage(current, needed),
        initialDeposit: initial,
        currentDeposit: current,
        neededDeposit: needed,
        denom,
      };

      // Set Chart Data items
      // Color chart pallete
      if (deposits.value >= 100) {
        chartData.color = [
          theme.CHART_PIE_C, // yes
        ];
      }
      else {
        chartData.color = [
          theme.CHART_PIE_E, // no
        ];
      }
      // Voting
      chartData.series[0].data = [deposits];
      chartData.series[0].backgroundStyle.color = theme.BACKGROUND_LIGHT;
      chartData.series[0].backgroundStyle.shadowColor = theme.BACKGROUND_BLACK;
      if (getPercentage(current, needed) >= 100) {
        chartData.series[0].markLine.data[0].xAxis = getPercentage(needed, current);
        chartData.series[0].markLine.data[0].label.color = theme.FONT_PRIMARY;
      }
      else {
        chartData.series[0].markLine.data[0].xAxis = 100;
        chartData.series[0].markLine.data[0].label.color = theme.FONT_PRIMARY;
      }
      chartData.series[0].markLine.data[0].label.formatter = `Pass Threshold ${formatDenom(needed, 'nhash')}`;

      chartData.tooltip.formatter = (params: ParamsArray[]) => (
        `<div style="padding:2px;">
          Current Deposits: ${formatDenom(Number(params[0].data.currentDeposit), denom)} (${params[0].data.value}%)
          <br />
          Initial Deposit: ${formatDenom(Number(params[0].data.initialDeposit), denom)}
          ${Number(params[0].data.currentDeposit) < Number(params[0].data.neededDeposit) ?
            `<br />
            Outstanding: ${formatDenom(Number(params[0].data.neededDeposit) - Number(params[0].data.initialDeposit), params[0].data.denom)}` : ''
          }
        </div>`
      );
  }, [theme, current, denom, initial, needed]);

  // Render chart
  useEffect(() => {
    let chart: echarts.ECharts | undefined;
    if (!isEmpty(timings)) {
      // On load, chartElementRef should get set and we can update the chart to be an echart
      // first try to get the initialized instance
      if (chartElementRef.current) {
        chart = echarts.getInstanceByDom(chartElementRef.current as unknown as HTMLElement) || echarts.init(chartElementRef.current as unknown as HTMLElement);
      };
      // Build the dataset
      buildChartData();
      chart && chart.setOption(chartData);
      window.addEventListener('resize', () => {chart && chart.resize()});
    }
    return (
      window.removeEventListener('resize', () => chart && chart.resize())
    )
  }, [setChart, chart, buildChartData, timings]);

  return (
    <Content title={proposalLoading ? '' : `Deposits: ${formatDenom(current, denom)} (${getPercentage(current, needed)}%)`}>
      {proposalLoading ? 
        <Loading /> 
        :
        <StyledChart ref={chartElementRef}/>
      }
    </Content>
  );
};