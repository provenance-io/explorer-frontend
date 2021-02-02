import React, { useRef, useEffect, useState } from 'react';
import { maxLength } from 'utils';
import styled, { useTheme } from 'styled-components';
import { Content, Loading } from 'Components';
import echarts from 'echarts';
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
      const chartRadius = (sizeSm && '70%') || (sizeMd && '70%') || (sizeLg && '60%') || '90%';
      const chartCenter = (sizeSm && ['50%', '65%']) || (sizeMd && ['50%', '50%']) || ['40%', '50%'];
      // On load, chartElementRef should get set and we can update the chart to be an echart
      setChart(echarts.init(chartElementRef.current));
      const buildChartData = () => {
        const legendData = topValidators.map(({ moniker, addressId }) =>
          moniker ? maxLength(moniker, 12) : maxLength(addressId, 12)
        );
        // legendData.push('Others');
        const seriesData = topValidators.map(({ votingPower, moniker, addressId, uptime }) => ({
          value: votingPower,
          name: moniker ? maxLength(moniker, 12) : maxLength(addressId, 12),
          uptime,
        }));
        // seriesData.push({ value: blocksTotalPower, name: 'Others' });
        const buildSelectedData = () => {
          const finalObj = {};
          topValidators.forEach(({ moniker, addressId }) => {
            const key = moniker ? maxLength(moniker, 12) : maxLength(addressId, 12);
            finalObj[key] = true;
          });
          // validators.Others = true;
          return finalObj;
        };
        const selectedData = buildSelectedData();

        return {
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
          tooltip: {
            trigger: 'item',
            formatter: ({ data, percent }) => {
              const { name, value, uptime } = data;
              return `${name}<br />Voting Power: ${value}(${percent}%)<br />Uptime: ${uptime}`;
            },
          },
          legend: {
            type: 'plain',
            orient: 'vertical',
            right: 0,
            top: 0,
            bottom: 0,
            data: legendData,
            selected: selectedData,
            selectorLabel: { show: false },
            textStyle: { color: theme.FONT_PRIMARY },
          },
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
  }, [setChart, chart, getTopValidators, topValidators, initialLoad, topCount, sizeSm, sizeMd, sizeLg, theme, totalTopValidators]);

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
