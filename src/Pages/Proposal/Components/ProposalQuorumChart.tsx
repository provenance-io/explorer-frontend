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
  margin-top: -40px;
  margin-bottom: -70px;
`;

interface ParamsArray {
  name: string;
  seriesName: string;
  data: {
    value: string;
    rawValue: string;
    valueDenom: string;
    totalEligible: string;
    totalEligibleDenom: string;
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
      data: [{ value: 50, rawValue: 0 }],
      showBackground: true,
      stack: 'total',
      itemStyle: {
        borderRadius: [5, 5, 5, 5],
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
        borderRadius: [5, 5, 5, 5],
      },
      emphasis: {
        focus: 'series',
      },
      markLine: {
        silent: true,
        data: [
          {
            name: 'Quorum Threshold',
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
        ],
        symbol: 'line',
        lineStyle: {
          color: 'black',
          width: 2,
        },
      },
    },
  ],
};

interface ParamsProps {
  proposalId: string;
}

const getNumberInHash = ({
  amount,
  denom,
  total,
  totalDenom,
  totalEligible,
  totalEligibleDenom,
}: {
  amount: string;
  denom: string;
  total: string;
  totalDenom: string;
  totalEligible: string;
  totalEligibleDenom: string;
}) => {
  const response = {
    value: 100 * (Number(amount) / Number(totalEligible)),
    valueDenom: denom,
    rawValue: Number(amount),
    total,
    totalEligible,
    totalEligibleDenom,
  };
  return response;
};

export const ProposalQuorumChart = () => {
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

  let total = '0';
  let totalEligible = '0';
  let totalDenom = '';
  let totalEligibleDenom = '';
  let quorumThreshold = '0';
  if (!isEmpty(voteData)) {
    total = voteData.total.amount.amount;
    totalEligible = params.totalEligibleAmount.amount;
    totalEligibleDenom = params.totalEligibleAmount.denom;
    totalDenom = voteData.total.amount.denom;
    quorumThreshold = params.quorumThreshold;
  }

  const percentVoted = (100 * Number(total)) / Number(totalEligible);

  const buildChartData = useCallback(
    (data) => {
      // Build data
      const votes = getNumberInHash({
        amount: data.total.amount.amount,
        denom: data.total.amount.denom,
        total,
        totalDenom,
        totalEligible,
        totalEligibleDenom,
      });

      // Set Chart Data items
      // Color chart pallete
      if (votes.value >= Number(quorumThreshold) * 100) {
        chartData.color = [
          theme.CHART_PIE_G, // yes
        ];
      } else {
        chartData.color = [
          theme.CHART_PIE_ABSTAIN, // abstain colors
        ];
      }
      // Voting
      chartData.series[0].data = [votes];
      chartData.series[0].backgroundStyle.color = theme.BACKGROUND_LIGHT;
      chartData.series[0].backgroundStyle.shadowColor = theme.BACKGROUND_BLACK;
      // Set quorum threshold marker line data
      chartData.series[0].markLine.data[0].label.formatter = `Quorum Threshold (${
        Number(quorumThreshold) * 100
      }%)`;
      chartData.series[0].markLine.data[0].xAxis = Number(quorumThreshold) * 100;
      chartData.series[0].markLine.data[0].label.color = theme.FONT_PRIMARY;
      chartData.series[0].markLine.data[0].lineStyle.color = theme.GREEN_POSITIVE_PRIMARY;

      chartData.tooltip.formatter = (params: ParamsArray[]) =>
        `<div style="padding:2px;">
          ${params[0].seriesName}: ${formatDenom(
          parseFloat(params[0].data.rawValue),
          params[0].data.valueDenom
        )} (${Number(params[0].data.value).toFixed(2)}%)
          <br />
          Eligible Votes: ${formatDenom(
            parseFloat(params[0].data.totalEligible),
            params[0].data.totalEligibleDenom,
            { decimal: 0, minimumFractionDigits: 0 }
          )}
          <br />
          Outstanding: ${formatDenom(
            parseFloat(params[0].data.totalEligible) - parseFloat(params[0].data.rawValue),
            params[0].data.totalEligibleDenom,
            { decimal: 0, minimumFractionDigits: 0 }
          )}
        </div>`;
    },
    [theme, total, quorumThreshold, totalDenom, totalEligible, totalEligibleDenom]
  );

  // Render chart
  useEffect(() => {
    let chart: echarts.ECharts | undefined;
    if (!isEmpty(voteData)) {
      // On load, chartElementRef should get set and we can update the chart to be an echart
      // first try to get the initialized instance
      if (chartElementRef.current) {
        chart =
          echarts.getInstanceByDom(chartElementRef.current as unknown as HTMLElement) ||
          echarts.init(chartElementRef.current as unknown as HTMLElement);
      }
      // Build the dataset
      buildChartData(voteData);
      chart && chart.setOption(chartData);
      window.addEventListener('resize', () => {
        chart && chart.resize();
      });
    }
    return window.removeEventListener('resize', () => chart && chart.resize());
  }, [setChart, chart, buildChartData, voteData]);

  return (
    <Content
      title={
        proposalLoading
          ? ''
          : `Percent Voted: ${
              percentVoted === 0 || !percentVoted
                ? '0'
                : percentVoted < 0.0001
                ? '< 0.01'
                : percentVoted.toFixed(2)
            }%`
      }
    >
      {proposalLoading ? <Loading /> : <StyledChart ref={chartElementRef} />}
    </Content>
  );
};
