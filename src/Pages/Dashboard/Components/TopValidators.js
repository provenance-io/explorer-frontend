import React, { useRef, useEffect, useState } from 'react';
import { maxLength, numberFormat } from 'utils';
import styled, { useTheme } from 'styled-components';
import { Content, Loading } from 'Components';
import * as echarts from 'echarts';
import { useApp, useValidators, useMediaQuery } from 'redux/hooks';
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

const TopValidators = () => {
  const [chart, setChart] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true);
  const chartElementRef = useRef(null);
  const { topCount } = useApp();
  const { getTopValidators, topValidatorsLoading, topValidators } = useValidators();
  const theme = useTheme();
  const { matches: sizeSm } = useMediaQuery(breakpoints.down('sm'));
  const { matches: sizeMd } = useMediaQuery(breakpoints.between('sm', 'md'));
  const { matches: sizeLg } = useMediaQuery(breakpoints.between('md', 'lg'));
  const totalTopValidators = topValidators.length;

  useEffect(() => {
    // On load, get the latest transaction history (14 day)
    if (initialLoad) {
      getTopValidators({ page: 1, count: topCount });
      setInitialLoad(false);
    } else if (totalTopValidators > 0) {
      // Top validators loaded, render the chart
      // Change the size of the chart and where the center of it is based on screen size
      const chartRadius = (sizeSm && '70%') || (sizeMd && '70%') || (sizeLg && '60%') || '90%';
      const chartCenter = (sizeSm && ['50%', '65%']) ||
        (sizeMd && ['50%', '50%']) || ['40%', '50%'];
      // On load, chartElementRef should get set and we can update the chart to be an echart
      // first try to get the initialized instance
      let echart = echarts.getInstanceByDom(chartElementRef.current);
      // if it isn't initialized then init
      if (!echart) echart = echarts.init(chartElementRef.current);
      window.allCharts.push(echart);
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
        topValidators.forEach(({ votingPower, moniker, addressId }) => {
          const name = moniker ? maxLength(moniker, 20) : maxLength(addressId, 20);
          const value = votingPower?.count;
          // Add to legendData
          legendData.push(name);
          // Add to seriesData
          seriesData.push({ value, name });
          // Add to selectedData (default to true/visible)
          selectedData[name] = true;
        });

        // Add in 'Others' to hold the rest of the remaning total power (only useful when >10 validators, until then, comment out)
        // legendData.push('Others');
        // seriesData.push({ value: blocksTotalPower, name: 'Others' });
        // selectedData.Others = true;

        return {
          // Colors for each of the top 10 validators in the chart
          color: [
            theme.CHART_PIE_A,
            theme.CHART_PIE_B,
            theme.CHART_PIE_C,
            theme.CHART_PIE_D,
            theme.CHART_PIE_E,
            theme.CHART_PIE_F,
            theme.CHART_PIE_G,
            theme.CHART_PIE_H,
            theme.CHART_PIE_I,
            theme.CHART_PIE_J,
          ],
          // When you hover over the pie chart, the data that gets displayed
          tooltip: {
            trigger: 'item',
            formatter: ({ data, percent }) => {
              const { name, value } = data;
              return `${name}<br />Voting Power: ${numberFormat(value)} (${percent}%)`;
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
    getTopValidators,
    topValidators,
    initialLoad,
    topCount,
    sizeSm,
    sizeMd,
    sizeLg,
    theme,
    totalTopValidators,
  ]);

  return (
    <Content
      alignItems="flex-start"
      alignContent="flex-start"
      size={sizeMd || sizeSm ? '100%' : '50%'}
      icon="PARTICIPATION"
      title={totalTopValidators > 0 ? `Top ${totalTopValidators} Validators` : 'Top Validators'}
      link={{ to: '/validators', title: 'View All' }}
    >
      {topValidatorsLoading ? (
        <Loading />
      ) : totalTopValidators > 0 ? (
        <StyledChart ref={chartElementRef} />
      ) : (
        <div>No validators available</div>
      )}
    </Content>
  );
};

export default TopValidators;
