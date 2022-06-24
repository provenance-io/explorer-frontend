import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router';
import styled, { useTheme } from 'styled-components';
import { useGovernance } from 'redux/hooks';
import { Content, Loading } from 'Components';
import * as echarts from 'echarts';
import { formatDenom, isEmpty } from 'utils';

const StyledChart = styled.div`
  height: 200px;
  width: 100%;
  margin-bottom: -55px;
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
    padding: 10,
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
      itemStyle: {
        borderRadius: [5,0,0,5],
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
        borderRadius: [5,0,0,5],
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
        borderRadius: [0,0,0,0],
      },
      backgroundStyle: {
        borderRadius: [0,0,0,0],
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
      name: 'Abstain',
      type: 'bar',
      stack: 'total',
      itemStyle: {
        borderRadius: [0,0,0,0],
      },
      backgroundStyle: {
        borderRadius: [0,0,0,0],
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
      name: 'No With Veto',
      type: 'bar',
      stack: 'total',
      itemStyle: {
        borderRadius: [0,5,5,0],
      },
      backgroundStyle: {
        borderRadius: [0,5,5,0],
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
  ]
};

interface ParamsProps {
  proposalId: string;
}

const getNumberInHash = (({ amount, denom, total }:{ amount: string, denom: string, total: string }) => {
  const response = { value: (Number(amount) / Number(total)), denom, rawValue: Number(amount) };
  return response;
});

export const ProposalVotingChart = () => {
  const { proposalId } = useParams<ParamsProps>();
  const { tally: voteData, params, getProposal, proposalLoading } = useGovernance();
  const [chart, setChart] = useState(null);
  const chartElementRef = useRef(null);
  const theme = useTheme();

  useEffect(() => {
    if (isEmpty(voteData)) {
      getProposal(proposalId);
    }
  }, [getProposal, voteData, proposalId]);

  let total = "0";
  let denom = "";
  let passThreshold = "0";
  let vetoThreshold = "0";
  if (!isEmpty(voteData)) {
    total = voteData.total.amount.amount;
    denom = voteData.total.amount.denom;
    passThreshold = params.passThreshold;
    vetoThreshold = params.vetoThreshold;
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
        theme.CHART_PIE_NO, // no - light blue
        theme.CHART_PIE_ABSTAIN, // abstain should be grey
        theme.CHART_PIE_NOWITHVETO, // noWithVeto - red
      ];
      // Legend font colo
      chartData.legend.textStyle = {
        color: theme.FONT_PRIMARY,
      };
      // Voting
      chartData.series[0].data = [yesVotes];
      chartData.series[1].data = [noVotes];
      chartData.series[2].data = [abstainVotes];
      chartData.series[3].data = [noWithVetoVotes];

      // Markline for pass threshold
      if (chartData.series[0].markLine) {
        chartData.series[0].markLine.data[0].label.formatter = `Pass Threshold (${Number(passThreshold)*100}%)`;
        chartData.series[0].markLine.data[0].xAxis = Number(passThreshold);
        chartData.series[0].markLine.data[0].label.color = theme.FONT_PRIMARY;
        chartData.series[0].markLine.data[0].lineStyle.color = theme.GREEN_POSITIVE_PRIMARY;
        // Markline for veto threshold
        chartData.series[0].markLine.data[1].label.formatter = `Veto Threshold (${Number(vetoThreshold)*100}%)`;
        chartData.series[0].markLine.data[1].xAxis = 1 -  Number(vetoThreshold);
        chartData.series[0].markLine.data[1].label.color = theme.FONT_PRIMARY;
        chartData.series[0].markLine.data[1].lineStyle.color = theme.RED_NEGATIVE_PRIMARY;
      };
      // Border radius
      if (noWithVetoVotes.value === 0 && abstainVotes.value !== 0) {
        chartData.series[2].itemStyle.borderRadius = [0,5,5,0];
        chartData.series[0].backgroundStyle.borderRadius = [5,5,5,5];
      }
      else if (abstainVotes.value === 0 && noWithVetoVotes.value === 0 && noVotes.value !== 0) {
        chartData.series[1].itemStyle.borderRadius = [0,5,5,0];
        chartData.series[0].backgroundStyle.borderRadius = [5,5,5,5];
      }
      else {
        chartData.series[0].itemStyle.borderRadius = [5,5,5,5];
        chartData.series[0].backgroundStyle.borderRadius = [5,5,5,5];
      }
      // Set background style
      if (chartData.series[0].backgroundStyle) {
        chartData.series[0].backgroundStyle.color = theme.BACKGROUND_LIGHT;
        chartData.series[0].backgroundStyle.shadowColor = theme.BACKGROUND_BLACK;
      }

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
                ${param.seriesName}: ${formatDenom(parseFloat(param.data.rawValue), param.data.denom)}
                (${param.data.value ? (Number(param.data.value) * 100).toFixed(2) : '--'}%)
              </div>
            </div>`;
            idx++;
        });
        return returnString;
      };
  }, [theme, total, vetoThreshold, passThreshold]);

  // Render chart
  useEffect(() => {
    let chart: echarts.ECharts | undefined;
    if (!isEmpty(voteData)) {
      // On load, chartElementRef should get set and we can update the chart to be an echart
      // first try to get the initialized instance
      if (chartElementRef.current) {
        chart = echarts.getInstanceByDom(chartElementRef.current as unknown as HTMLElement) || echarts.init(chartElementRef.current as unknown as HTMLElement);
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
    <Content title={proposalLoading ? '' : `Total Votes: ${formatDenom(Number(total), denom)}`}>
      {proposalLoading ? <Loading /> :
        Number(total) > 0 ? <StyledChart ref={chartElementRef}/> : ''
      }
    </Content>
  );
};