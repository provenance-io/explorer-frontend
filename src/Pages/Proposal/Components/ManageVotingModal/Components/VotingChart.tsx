import React, { useRef, useEffect, useState, useCallback } from 'react';
import styled, { useTheme } from 'styled-components';
import * as echarts from 'echarts';
import { capitalize, formatDenom } from '../../../../../utils';

const StyledChart = styled.div<{ width: string }>`
  height: 200px;
  width: ${({ width }) => `${width}px`};
`;

interface Params {
  percent: number;
  data: {
    name: string;
    value: string;
  };
}

// Chart constants
const chartData = {
  color: [''],
  title: {
    text: '',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
    position: 'inside',
    // Needed format for TypeScript
    // eslint-disable-next-line no-empty-pattern
    formatter: ({}: Params) => '',
  },
  legend: {
    left: 'center',
    itemGap: 20,
    padding: 0,
    top: '-5%',
    textStyle: {
      color: '',
    },
  },
  series: [
    {
      name: 'Votes',
      type: 'pie',
      radius: '50%',
      data: [],
      label: {
        show: false,
        position: 'center',
      },
      labelLine: {
        show: false,
      },
    },
  ],
};

const addData = (data: { [key: string]: { amount: { amount: string } } }) => {
  const legendData: string[] = [];
  const seriesData: [{ value: string; name: string }] = [{ value: '', name: '' }];
  const selectedData: { [key: string]: boolean } = {};
  Object.keys(data).forEach((item) => {
    if (item !== 'total') {
      let name = capitalize(item);
      if (item === 'noWithVeto') {
        name = 'No With Veto';
      }
      legendData.push(name);
      seriesData.push({ value: (parseInt(data[item].amount.amount) / 1e9).toString(), name });
      selectedData[name] = true;
    }
  });
  return { seriesData, legendData, selectedData };
};

interface VotingChartProps {
  voteData: {
    abstain: {
      amount: {
        amount: string;
        denom: string;
      };
      count: number;
    };
  };
}

const VotingChart = ({ voteData }: VotingChartProps) => {
  const [chart, setChart] = useState(null);
  const chartElementRef = useRef(null);
  const theme = useTheme();

  const width = window.innerWidth > 452 ? '452' : (window.innerWidth * 0.85).toString();

  const buildChartData = useCallback(
    (
      seriesData: { value: string; name: string }[],
      _legendData: string[],
      _selectedData: { [key: string]: boolean }
    ) => {
      chartData.color = [
        theme.CHART_PIE_ABSTAIN, // abstain should be grey
        theme.CHART_PIE_G, // yes
        theme.CHART_PIE_NO, // no - red
        theme.CHART_PIE_NOWITHVETO, // noWithVeto - light blue
      ];
      chartData.series[0].data = seriesData as never[];
      chartData.legend.textStyle = { color: theme.FONT_PRIMARY };
      chartData.tooltip.formatter = (params: Params) =>
        `${params.data.name}: ${formatDenom(parseFloat(params.data.value), '')} hash (${
          params.percent
        }%)`;
    },
    [theme]
  );

  // Render chart
  useEffect(() => {
    let chart: echarts.ECharts | undefined;
    if (voteData) {
      // On load, chartElementRef should get set and we can update the chart to be an echart
      // first try to get the initialized instance
      if (chartElementRef.current) {
        chart =
          echarts.getInstanceByDom(chartElementRef.current as unknown as HTMLElement) ||
          echarts.init(chartElementRef.current as unknown as HTMLElement);
      }
      // Build the dataset
      const data = addData(voteData);
      buildChartData(data.seriesData, data.legendData, data.selectedData);
      chart && chart.setOption(chartData);
      window.addEventListener('resize', () => {
        chart && chart.resize();
      });
    }
    return window.removeEventListener('resize', () => chart && chart.resize());
  }, [setChart, chart, buildChartData, voteData]);

  return <StyledChart ref={chartElementRef} width={width} />;
};

export default VotingChart;
