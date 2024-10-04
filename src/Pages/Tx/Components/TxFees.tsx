//@ts-nocheck
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { isEmpty, formatDenom } from 'utils';
import styled, { useTheme } from 'styled-components';
import { Content, Loading } from 'Components';
import * as echarts from 'echarts';
import { useTxs } from 'redux/hooks';
import { breakpoints } from 'consts';

const StyledChart = styled.div`
  height: 300px;
  width: 80%;
  margin: 0 auto;
  @media ${breakpoints.down('lg')} {
    height: 350px;
    width: 100%;
  }
`;

// Constant chart data
const chartData = {
  // When you hover over the pie chart, the data that gets displayed
  color: [''],
  tooltip: {
    trigger: 'item',
    formatter: ({ data, percent }: { data: { name: string; amount: string }; percent: number }) => {
      const { name, amount } = data;
      return `${name}<br />Value: ${amount} (${percent}%)<br />`;
    },
  },
  // The legend/key on the right side showing color/name
  legend: {
    data: [],
    selected: {},
    top: '0%',
    width: '65%',
    type: 'scroll',
    left: 'center',
    itemGap: 20,
    textStyle: {
      color: '',
    },
  },
  // The data actually populating the pie chart
  series: [
    {
      data: [],
      type: 'pie',
      radius: '70%',
      avoidLabelOverlap: false,
      label: {
        show: false,
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
};

interface FeeProps {
  fees: {
    amount: string;
    denom: string;
    msgType: string;
  }[];
  type: string;
}

// Builds fees
const getFees = (fee: FeeProps) => {
  const value = fee.fees.reduce((sum, a) => sum + Number(a.amount), 0);
  const denom = fee.fees[0].denom;
  const amount = formatDenom(value, denom, { decimal: 20 });
  // roundAmount will determine if the value is shown or not (must be > 0 at 4 dec places)
  const roundAmount = parseFloat(
    formatDenom(value, denom, { decimal: value / 1e9 < 0.0001 ? 20 : 4, showDenom: false })
  );
  return { type: fee.type, amount, value, roundAmount };
};

interface AdjustedFeeProps {
  type: string;
  amount: string;
  value: number;
  roundAmount: number;
}

// Populates the chart data
const addData = (fees: AdjustedFeeProps[]) => {
  // Legend data shows the fees and their color on the right
  const legendData: string[] = [];
  // Series data, this is the information in the actual drawn-out chart
  const seriesData: { value: number; name: string; amount: string }[] = [];
  // Track selected fees (able to toggle them on/off in the legend)
  const selectedData: { [key: string]: boolean } = {};
  fees.forEach(({ type, value, amount, roundAmount }) => {
    if (roundAmount > 0) {
      // Add to legendData
      const name = type;
      legendData.push(name);
      // Add to seriesData
      seriesData.push({ value, name, amount });
      // Add to selectedData (default to true/visible)
      selectedData[name] = true;
    }
  });
  return { seriesData, legendData, selectedData };
};

const TxFees = () => {
  const [chart, setChart] = useState(null);
  const chartElementRef = useRef(null);
  const theme = useTheme();
  const { txInfo, txsInfoLoading, txMsgsLoading } = useTxs();
  const haveTxInfo = !isEmpty(txInfo);

  // Break out/format fees
  const fees = haveTxInfo && txInfo.fee.map((fee) => getFees(fee));

  // Calculate total fees
  let totalFees = 0;
  if (fees) {
    fees.forEach((item) => (totalFees += parseFloat(item.amount)));
  }

  // Function to build the variable chart elements
  const buildChartData = useCallback(
    (seriesData, legendData, selectedData) => {
      chartData.color = [
        theme.CHART_PIE_C,
        theme.CHART_PIE_K,
        theme.CHART_PIE_I,
        theme.CHART_PIE_L,
      ];
      chartData.legend.data = legendData;
      chartData.legend.textStyle = { color: theme.FONT_PRIMARY };
      chartData.legend.selected = selectedData;
      chartData.series[0].data = seriesData;
    },
    [theme]
  );

  // Transaction info comes from main page

  useEffect(() => {
    // Only render if transaction info is available
    if (fees) {
      const data = addData(fees);
      // Update the chart with the data
      buildChartData(data.seriesData, data.legendData, data.selectedData);
    }
    // On load, chartElementRef should get set and we can update the chart to be an echart
    // first try to get the initialized instance
    let chart: echarts.ECharts | undefined;
    // if it isn't initialized then init
    if (chartElementRef.current) {
      chart =
        echarts.getInstanceByDom(chartElementRef.current as unknown as HTMLElement) ||
        echarts.init(chartElementRef.current as unknown as HTMLElement);
    }
    chart?.setOption(chartData);
    window.addEventListener('resize', () => {
      chart && chart.resize();
    });
    return window.removeEventListener('resize', () => chart && chart.resize());
  }, [setChart, buildChartData, chart, fees]);

  return (
    <Content
      alignItems="flex-start"
      alignContent="flex-start"
      icon="PRICE"
      title={`Fees: ${
        txMsgsLoading
          ? '--'
          : formatDenom(totalFees, 'hash', {
              decimal: totalFees < 0.0001 ? 20 : 4,
            })
      }`}
    >
      {txsInfoLoading || txMsgsLoading ? (
        <Loading />
      ) : haveTxInfo ? (
        <StyledChart ref={chartElementRef} />
      ) : (
        <div>Fee information not available for this transaction</div>
      )}
    </Content>
  );
};

export default TxFees;
