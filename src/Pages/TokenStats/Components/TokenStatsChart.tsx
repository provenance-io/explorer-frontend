import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled, { useTheme } from 'styled-components';
import * as echarts from 'echarts';
import { useNetwork } from 'redux/hooks';
import { Header } from 'Components';
import { isEmpty, formatDenom } from 'utils';

const StyledChart = styled.div`
  height: 600px;
  width: 100%;
  margin-top: 35px;
`;
const StyledMessage = styled.div`
  width: 100%;
  margin: 20px;
`;

// Chart constants
const chartData = {
  color: [''],
  tooltip: {
    trigger: 'item',
    // Needed format for TypeScript
    // eslint-disable-next-line no-empty-pattern
    formatter: ({}: Params) => '',
  },
  legend: {
    top: '5%',
    left: 'center',
    itemGap: 20,
    textStyle: {
      color: '',
    },
  },
  series: [
    {
      type: 'pie',
      data: {},
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '',
      },
      label: {
        show: false,
        position: 'center',
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '20',
          fontWeight: 'bold',
        },
      },
      labelLine: {
        show: false,
      },
    },
  ],
};

interface DataProps {
  circulation: {
    amount: string;
  };
  communityPool: {
    amount: string;
  };
  bonded: {
    amount: string;
  };
  currentSupply: {
    amount: string;
  };
}

interface Params {
  name: string;
  seriesName: string;
  data: {value: string, name: string};
}

// Format token data to value:, name: array
const getDataArray = (data: DataProps) => [
  {
    value: (parseFloat(data.circulation.amount) / 1e9).toFixed(0),
    name: 'Circulation',
  },
  {
    value: (parseFloat(data.communityPool.amount) / 1e9).toFixed(0),
    name: 'Community Pool',
  },
  {
    value: (parseFloat(data.bonded.amount) / 1e9).toFixed(0),
    name: 'Bonded',
  },
  {
    value: (
      (parseFloat(data.currentSupply.amount) -
        (parseFloat(data.circulation.amount) +
          parseFloat(data.communityPool.amount) +
          parseFloat(data.bonded.amount))) /
      1e9
    ).toFixed(0),
    name: 'Remaining Total',
  },
];

const TokenStatsChart = () => {
  const [chart, setChart] = useState(null);
  const chartElementRef = useRef(null);
  const theme = useTheme();
  const { networkTokenStats, getNetworkTokenStats } = useNetwork();

  // Build dynamic chart data
  const buildChartData = useCallback(
    (data, totalHash) => {
      // Build dynamic chart items
      chartData.color = [
        theme.CHART_PIE_M,
        theme.CHART_PIE_L,
        theme.CHART_PIE_N,
        theme.CHART_PIE_C,
      ];
      chartData.series[0].data = data;
      chartData.series[0].itemStyle.borderColor = theme.BACKGROUND_LIGHT;
      chartData.legend.textStyle = {
        color: theme.FONT_PRIMARY,
      };
      chartData.tooltip.formatter = (params: Params) => {
        const percent = (parseFloat(params.data.value) / totalHash) * 100;
        return `${params.data.name} Hash<br />
              Amount: ${formatDenom(parseFloat(params.data.value), 'hash', { decimal: 0 })}<br />
              Percent: ${percent < 0.01 ? percent.toFixed(5) : percent.toFixed(2)}%`;
      };
    },
    [theme]
  );

  // Get token statistics
  useEffect(() => {
    getNetworkTokenStats();
  }, [getNetworkTokenStats]);

  // Build Chart with data
  useEffect(() => {
    let chart: echarts.ECharts | undefined;
    if (!isEmpty(networkTokenStats)) {
      // Calculate total Hash
      const totalHash = (parseFloat(networkTokenStats.currentSupply.amount) / (1e9)).toFixed(0);
      // On load, chartElementRef should get set and we can update the chart to be an echart
      // first try to get the initialized instance
      // if it isn't initialized then init
      if (chartElementRef.current) {
        chart = echarts.getInstanceByDom(chartElementRef.current) || echarts.init(chartElementRef.current);
      }
      // Update the chart with the data
      buildChartData(getDataArray(networkTokenStats), totalHash);
      chart && chart.setOption(chartData);
      window.addEventListener('resize', () => {chart && chart.resize()});
    }
    return (
      window.removeEventListener('resize', () => chart && chart.resize())
    )
  }, [setChart, chart, networkTokenStats, buildChartData]);

  const totalHash =
    !isEmpty(networkTokenStats) &&
    formatDenom(networkTokenStats.currentSupply.amount, networkTokenStats.currentSupply.denom, {
      decimal: 0,
    });

  return !isEmpty(networkTokenStats) ? (
    <>
      <Header title="Token Statistics" value={`Total: ${totalHash}`} />
      <StyledChart ref={chartElementRef} />
    </>
  ) : (
    <StyledMessage>Token statistics chart unavailable. Refresh to retry</StyledMessage>
  );
};

export default TokenStatsChart;
