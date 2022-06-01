import React, { useRef, useEffect, useState, useCallback } from 'react';
import styled, { useTheme } from 'styled-components';
import * as echarts from 'echarts';

const StyledChart = styled.div`
  height: 200px;
  width: 100%;
  margin-bottom: -50px;
`;

interface ParamsArray {
  name: string;
  seriesName: string;
  data: {value: string, rawValue: string, denom: string};
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
  legend: {
    data: ['Yes', 'No', 'Abstain', 'No With Veto'],
    textStyle: {},
    itemGap: 20,
    padding: 0,
  },
  xAxis: {
      type: 'value',
      show: false,
      axisLabel: {
        formatter: '{value} %',
      },
  },
  yAxis: {
    type: 'category',
    show: false,    
  },
  series: [
    {
      name: 'Yes',
      type: 'bar',
      data: [{ value: 50, rawValue: 0 }],
      showBackground: true,
      stack: 'total',
      backgroundStyle: {
        color: '',
        borderColor: 'rgba(180, 180, 180, 0.3)',
        borderWidth: 1,
        borderDashOffset: 5,
        shadowBlur: 3,
        shadowColor: 'black',
        shadowOffsetX: -1,
        shadowOffsetY: 1,
      },
    },
    {
      name: 'No',
      type: 'bar',
      stack: 'total',
    },
    {
      name: 'Abstain',
      type: 'bar',
      stack: 'total',
    },
    {
      name: 'No With Veto',
      type: 'bar',
      stack: 'total',
    },
  ]
};

// Note: once TS compiler is updated on another branch these will be valid

//type VoteOptions = 'yes' | 'no' | 'abstain' | 'noWithVeto' | 'total';

interface VotingChartProps {
  voteData: {
    //[key in VoteOptions]: {
    [key: string]: {
      amount: {
        amount: string;
        denom: string;
      };
      count: number;
    };
  };
  hover: string;
}

export const IndividualVotingCharts = ({
  voteData,
  hover,
}: VotingChartProps) => {
  const [chart, setChart] = useState(null);
  const chartElementRef = useRef(null);
  const theme = useTheme();

  const buildChartData = useCallback(
    (data) => {
      // Set Chart Data items
      // Color chart pallete
      chartData.color = [
        theme.CHART_PIE_G, // yes
        theme.CHART_PIE_NO, // no - light blue
        theme.CHART_PIE_ABSTAIN, // abstain should be grey
        theme.CHART_PIE_NOWITHVETO, // noWithVeto - red
      ];
      // Legend font colo
      chartData.legend.textStyle = {
        color: theme.FONT_PRIMARY,
      };
      // Voting
      chartData.series[0].data = data.VOTE_OPTION_YES;
      chartData.series[1].data = data.VOTE_OPTION_NO;
      chartData.series[2].data = data.VOTE_OPTION_ABSTAIN;
      chartData.series[3].data = data.VOTE_OPTION_NO_WITH_VETO;
      // Set background style
      if (chartData.series[0].backgroundStyle) {
        chartData.series[0].backgroundStyle.color = theme.BACKGROUND_LIGHT;
        chartData.series[0].backgroundStyle.shadowColor = theme.BACKGROUND_BLACK;
      }

      chartData.tooltip.formatter = (params: ParamsArray[]) => hover;
  }, [theme, hover]);

  // Render chart
  useEffect(() => {
    let chart: echarts.ECharts | undefined;
    if (voteData) {
      // On load, chartElementRef should get set and we can update the chart to be an echart
      // first try to get the initialized instance
      if (chartElementRef.current) {
        chart = echarts.getInstanceByDom(chartElementRef.current) || echarts.init(chartElementRef.current);
      };
      // Build the dataset
      buildChartData(voteData);
      chart && chart.setOption(chartData);
      window.addEventListener('resize', () => {chart && chart.resize()});
    }
    return (
      window.removeEventListener('resize', () => chart && chart.resize())
    )
  }, [setChart, chart, buildChartData, voteData]);

  return <StyledChart ref={chartElementRef}/>;
};