import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router';
import styled, { useTheme } from 'styled-components';
import { useGovernance } from 'redux/hooks';
import * as echarts from 'echarts';
import { formatDenom, isEmpty } from 'utils';

const StyledChart = styled.div`
  height: 200px;
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
      stack: 'total',
      itemStyle: {
        barBorderRadius: [5,0,0,5],
      },
      emphasis: {
        focus: 'series',
      },
      markLine: {
        silent: true,
        data: [
          {
            name: 'Pass Threshold',
            xAxis: 0,
            label: {
              show: true,
              formatter: 'Pass Threshold',
              fontStyle: 'normal',
              fontFamily: 'Montserrat',
              textBorderColor: 'none',
              color: '',
            },
            lineStyle: {
              color: 'red',
            },
          },
          {
            name: 'Veto Threshold',
            xAxis: 0,
            label: {
              show: true,
              formatter: 'Veto Threshold',
              fontStyle: 'normal',
              fontFamily: 'Montserrat',
              textBorderColor: 'none',
              color: '',
              position: 'start',
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
    {
      name: 'No',
      type: 'bar',
      stack: 'total',
      itemStyle: {
        barBorderRadius: [0,0,0,0],
      },
      emphasis: {
        focus: 'series',
      },
      markLine: {
        data: [],
      },
    },
    {
      name: 'Abstain',
      type: 'bar',
      stack: 'total',
      itemStyle: {
        barBorderRadius: [0,0,0,0],
      },
      emphasis: {
        focus: 'series',
      },
      markLine: {
        data: [],
      },
    },
    {
      name: 'No With Veto',
      type: 'bar',
      stack: 'total',
      itemStyle: {
        barBorderRadius: [0,5,5,0],
      },
      emphasis: {
        focus: 'series',
      },
      markLine: {
        data: [],
      },
    },
  ]
};

interface ParamsProps {
  proposalId: string;
}

const getNumberInHash = (({ amount, denom, total }:{ amount: string, denom: string, total: string }) => {
  const response = { value: 100 * (Number(amount) / Number(total)), denom, rawValue: Number(amount) };
  return response;
});

export const QuorumChart = () => {
  const { proposalId } = useParams<ParamsProps>();
  const { proposalVotes, getProposalVotes } = useGovernance();
  const { tally: voteData } = proposalVotes;
  const [chart, setChart] = useState(null);
  const chartElementRef = useRef(null);
  const theme = useTheme();

  useEffect(() => {
    if (isEmpty(voteData)) {
      getProposalVotes(proposalId);
    }
  }, [getProposalVotes, voteData, proposalId]);

  let total = "0";
  if (!isEmpty(voteData)) {
    total = voteData.total.amount.amount;
  }

  const buildChartData = useCallback(
    (data) => {
      // Build data
      const yesVotes = getNumberInHash({ amount: data.yes.amount.amount, denom: data.yes.amount.denom, total  });
      const noVotes = getNumberInHash({ amount: data.no.amount.amount, denom: data.no.amount.denom, total });
      const abstainVotes = getNumberInHash({ amount: data.abstain.amount.amount, denom: data.abstain.amount.denom, total });
      const noWithVetoVotes = getNumberInHash({ amount: data.noWithVeto.amount.amount, denom: data.noWithVeto.amount.denom, total });

      // Set Chart Data items
      // Color chart pallete
      chartData.color = [
        theme.CHART_PIE_G, // yes
        theme.CHART_PIE_NO, // no - red
        theme.CHART_PIE_ABSTAIN, // abstain should be grey
        theme.CHART_PIE_NOWITHVETO, // noWithVeto - light blue
      ];
      chartData.series[0].data = [yesVotes];
      chartData.series[1].data = [noVotes];
      chartData.series[2].data = [abstainVotes];
      chartData.series[3].data = [noWithVetoVotes];
      if (noWithVetoVotes.value === 0) {
        chartData.series[0].itemStyle.barBorderRadius = [5,5,5,5];
      };
      // Set pass threshold marker line data
      chartData.series[0].markLine.data[0].label.formatter = `Pass Threshold (${Number(proposalVotes.params.passThreshold)*100}%)`;
      chartData.series[0].markLine.data[0].xAxis = Number(proposalVotes.params.passThreshold) * 100;
      chartData.series[0].markLine.data[0].label.color = theme.FONT_PRIMARY;
      chartData.series[0].markLine.data[0].lineStyle.color = theme.GREEN_POSITIVE_PRIMARY;
      // Set veto threshold marker line data
      chartData.series[0].markLine.data[1].label.formatter = `Veto Threshold (${Number(proposalVotes.params.vetoThreshold)*100}%)`;
      chartData.series[0].markLine.data[1].xAxis = 100 - Number(proposalVotes.params.vetoThreshold) * 100;
      chartData.series[0].markLine.data[1].label.color = theme.FONT_PRIMARY;
      chartData.series[0].markLine.data[1].lineStyle.color = theme.RED_NEGATIVE_PRIMARY;

      chartData.tooltip.formatter = (params: ParamsArray[]) => {
        let returnString = "";
        let idx = 0;
        params.forEach(param => {
          returnString += `
            <div style="display:flex;padding:2px;">
              <div 
                style="
                  height:10px;
                  width:10px;
                  border-radius:50%;
                  align-self:center;
                  margin-right:10px;
                  background-color:${chartData.color[idx]};
                "
              >
              </div>
              <div style="text-align:center;">
                ${param.seriesName}: ${formatDenom(parseFloat(param.data.rawValue), param.data.denom)} (${param.data.value}%)
              </div>
            </div>`;
            idx++;
        });
        return returnString;
      };
  }, [theme, total]);

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

  return (
    <StyledChart ref={chartElementRef}/>
  );
};