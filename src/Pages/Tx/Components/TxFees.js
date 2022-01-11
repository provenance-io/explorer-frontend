import React, { useRef, useEffect, useState } from 'react';
import { isEmpty, formatDenom } from 'utils';
import styled, { useTheme } from 'styled-components';
import { Content, Loading } from 'Components';
import * as echarts from 'echarts';
import { useMediaQuery, useTxs } from 'redux/hooks';
import { breakpoints } from 'consts';
import { useParams } from 'react-router-dom';

const StyledChart = styled.div`
  height: 300px;
  width: 80%;
  margin: 0 auto;
  @media ${breakpoints.down('lg')} {
    height: 350px;
    width: 100%;
  }
`;

const TxFees = () => {
  const [chart, setChart] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true);
  const chartElementRef = useRef(null);
  const theme = useTheme();
  const { txHash } = useParams();
  const { getTxInfo, txInfo, txInfoLoading } = useTxs();
  const haveTxInfo = !isEmpty(txInfo);
  const { matches: sizeSm } = useMediaQuery(breakpoints.down('sm'));
  const { matches: sizeMd } = useMediaQuery(breakpoints.between('sm', 'md'));
  const { matches: sizeLg } = useMediaQuery(breakpoints.between('md', 'lg'));

  useEffect(() => {
    // On load, get the fees
    if (initialLoad) {
      getTxInfo(txHash);
      setInitialLoad(false);
    } else if (haveTxInfo) {
      const { fee } = txInfo;
      // Break out/format fees
      const fees = fee.map(fee => {
        const value = fee.fees[0].amount;
        const denom = fee.fees[0].denom;
        const amount = formatDenom(value, denom, { decimal: 20 });
        // roundAmount will determine if the value is shown or not (must be > 0 at 4 dec places)
        const roundAmount = parseFloat(formatDenom(value, denom, { decimal: 4, showDenom: false }));
        return { type: fee.type, amount, value, roundAmount };
      });

      // Fees loaded, render the chart
      // Change the size of the chart and where the center of it is based on screen size
      const chartRadius = (sizeSm && '70%') || (sizeMd && '70%') || (sizeLg && '60%') || '90%';
      const chartCenter = (sizeSm && ['50%', '65%']) ||
        (sizeMd && ['50%', '50%']) || ['40%', '50%'];
      // On load, chartElementRef should get set and we can update the chart to be an echart
      // first try to get the initialized instance
      let echart = echarts.getInstanceByDom(chartElementRef.current);
      // if it isn't initialized then init
      if (!echart) echart = echarts.init(chartElementRef.current);
      setChart(echart);
      // Function to return the full set of finalized chart data
      const buildChartData = () => {
        // Legend data shows the validators, their name, and their color on the right
        const legendData = [];
        // Series data, this is the information in the actual drawn-out chart
        const seriesData = [];
        // Track selected validators (able to toggle them on/off in the legend)
        const selectedData = {};
        // Add data into both sets of data (legend/series)
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

        return {
          // Colors for each of the top 10 validators in the chart
          color: [theme.CHART_PIE_C, theme.CHART_PIE_K, theme.CHART_PIE_I, theme.CHART_PIE_L],
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
            type: 'plain',
            orient: 'vertical',
            right: 5,
            top: 0,
            bottom: 0,
            data: legendData,
            selected: selectedData,
            textStyle: { color: theme.FONT_PRIMARY },
          },
          // The data actually populating the pie chart
          series: [
            {
              radius: chartRadius,
              center: chartCenter,
              type: 'pie',
              data: seriesData,
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
      };
      // Update the chart with the data
      const chartData = buildChartData();
      // Update the chart with the data
      chart && chart.setOption(chartData);
    }
  }, [
    setChart,
    chart,
    initialLoad,
    sizeSm,
    sizeMd,
    sizeLg,
    theme,
    haveTxInfo,
    txInfo,
    getTxInfo,
    txHash,
  ]);

  return (
    <Content alignItems="flex-start" alignContent="flex-start" icon="PRICE" title="Fees">
      {txInfoLoading ? (
        <Loading />
      ) : haveTxInfo ? (
        <StyledChart ref={chartElementRef} />
      ) : (
        <div>No validators available</div>
      )}
    </Content>
  );
};

export default TxFees;
