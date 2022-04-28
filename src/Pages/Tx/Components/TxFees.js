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
  tooltip: {
    trigger: 'item',
    formatter: ({ data, percent }) => {
      const { name, amount } = data;
      return `${name}<br />Value: ${amount} (${percent}%)<br />`;
    },
  },
  // The legend/key on the right side showing color/name
  legend: {
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

// Builds fees
const getFees = fee => {
  const value = fee.fees[0].amount;
  const denom = fee.fees[0].denom;
  const amount = formatDenom(value, denom, { decimal: 20 });
  // roundAmount will determine if the value is shown or not (must be > 0 at 4 dec places)
  const roundAmount = parseFloat(formatDenom(value, denom, { decimal: 4, showDenom: false }));
  return { type: fee.type, amount, value, roundAmount };
};

// Populates the chart data
const addData = fees => {
  // Legend data shows the fees and their color on the right
  const legendData = [];
  // Series data, this is the information in the actual drawn-out chart
  const seriesData = [];
  // Track selected fees (able to toggle them on/off in the legend)
  const selectedData = {};
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
  const { txInfo, txInfoLoading } = useTxs();
  const haveTxInfo = !isEmpty(txInfo);

  // Break out/format fees
  const fees = haveTxInfo && txInfo.fee.map(fee => getFees(fee));

  // Calculate total fees
  let totalFees = 0;
  if (fees) {
    fees.forEach(item => (totalFees += parseFloat(item.amount)));
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
      // On load, chartElementRef should get set and we can update the chart to be an echart
      // first try to get the initialized instance
      let echart = echarts.getInstanceByDom(chartElementRef.current);
      // if it isn't initialized then init
      if (!echart) echart = echarts.init(chartElementRef.current);
      setChart(echart);
      // Build the dataset
      const data = addData(fees);
      // Update the chart with the data
      buildChartData(data.seriesData, data.legendData, data.selectedData);
      chart && chart.setOption(chartData);
      window.addEventListener('resize', () => {
        chart && chart.resize();
      });
    }
    return window.removeEventListener('resize', () => chart && chart.resize());
  }, [setChart, buildChartData, chart, fees]);

  return (
    <Content
      alignItems="flex-start"
      alignContent="flex-start"
      icon="PRICE"
      title={`Fees: ${formatDenom(totalFees, 'hash', { decimal: 4 })}`}
    >
      {txInfoLoading ? (
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
