import React, { useRef, useEffect, useState } from 'react';
import { maxLength, numberFormat } from 'utils';
import styled, { useTheme } from 'styled-components';
import { Content, Loading } from 'Components';
import * as echarts from 'echarts';
import { useApp, useValidators, useMediaQuery } from 'redux/hooks';
import { breakpoints } from 'consts';

const StyledChart = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  height: 350px;
  width: 100%;
`;

const TopValidators = () => {
  const [chart, setChart] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true);
  const chartElementRef = useRef(null);
  const { topCount } = useApp();
  const { getTopValidators, topValidatorsLoading, topValidators } = useValidators();
  const theme = useTheme();
  const { matches: sizeSm } = useMediaQuery(breakpoints.down('md'));
  const { matches: sizeMd } = useMediaQuery(breakpoints.between('sm', 'md'));
  const { matches: sizeLg } = useMediaQuery(breakpoints.between('md', 'lg'));
  const { matches: sizeXl } = useMediaQuery(breakpoints.up('lg'));
  const { matches: sizeHuge } = useMediaQuery(breakpoints.up('xl'));
  const totalTopValidators = topValidators.length;

  useEffect(() => {
    // On load, get the latest transaction history (14 day)
    if (initialLoad) {
      getTopValidators({ page: 1, count: topCount });
      setInitialLoad(false);
    } else if (totalTopValidators > 0) {
      // Top validators loaded, render the chart
      // Change the size of the chart and where the center of it is based on screen size
      // On load, chartElementRef should get set and we can update the chart to be an echart
      // first try to get the initialized instance
      let echart = echarts.getInstanceByDom(chartElementRef.current);
      // if it isn't initialized then init
      if (!echart) echart = echarts.init(chartElementRef.current);
      window.allCharts.push(echart);
      setChart(echart);
      // Function to return the full set of finalized chart data
      const buildChartData = () => {
        // Series data, this is the information in the actual drawn-out chart
        const seriesData = [];
        // Track selected validators (able to toggle them on/off in the legend)
        const selectedData = {};
        // Add data into both sets of data (legend/series)
        topValidators.forEach(({ votingPower, moniker, addressId }) => {
          const name = moniker ? maxLength(moniker, 20) : maxLength(addressId, 20);
          const value = votingPower?.count;
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
            position: ['10%'],
            formatter: ({ data, percent }) => {
              const { name, value } = data;
              return `${name}<br />Voting Power: ${numberFormat(value)} (${percent}%)`;
            },
          },
          // The legend/key on the right side showing color/name
          legend: {
            type: !sizeXl ? 'scroll' : 'plain',
            orient: !sizeXl ? 'horizontal' : 'vertical',
            right: !sizeXl ? '2%' : sizeHuge ? '15%' : '6%',
            top: !sizeXl ? '2%' : '6%',
            itemGap: !sizeXl ? 30 : 10,
            textStyle: { color: theme.FONT_PRIMARY },
          },
          // The data actually populating the pie chart
          series: [
            {
              center: !sizeXl ? ['50%', '60%'] : ['30%', '50%'],
              radius: !sizeXl ? '70%' : sizeHuge ? '90%' : '60%',
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
      chart && chart.setOption(chartData);
      window.addEventListener('resize', () => {
        chart && chart.resize();
      });
    }
    return window.removeEventListener('resize', () => chart && chart.resize());
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
    sizeXl,
    sizeHuge,
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
