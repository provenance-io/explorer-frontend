import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled, { useTheme } from 'styled-components';
import * as echarts from 'echarts';
import { format, parseISO } from 'date-fns';
import { Loading } from 'Components';
import { useMediaQuery, useName } from 'redux/hooks';
import { breakpoints } from 'consts';
import { formatDenom, isEmpty } from 'utils';

const StyledChart = styled.div`
  height: 600px;
  width: 100%;
`;
const StyledMessage = styled.div`
  width: 100%;
  margin-top: 20px;
`;

const chartData = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
    },
    // Needed format for TypeScript
    // eslint-disable-next-line no-empty-pattern
    formatter: ([]) => '',
  },
  series: [
    {
      name: 'Name Tree',
      type: 'treemap',
      data: {},
      leafDepth: 1,
      levels: [
        {
          itemStyle: {
            borderColor: '#555',
            borderWidth: 4,
            gapWidth: 4
          }
        },
        {
          colorSaturation: [0.3, 0.6],
          itemStyle: {
            borderColorSaturation: 0.7,
            gapWidth: 2,
            borderWidth: 2
          }
        },
        {
          colorSaturation: [0.3, 0.5],
          itemStyle: {
            borderColorSaturation: 0.6,
            gapWidth: 1
          }
        },
        {
          colorSaturation: [0.3, 0.5]
        }
      ],
    }
  ]
}

export const NameTreeChart = () => {
  const { nameTree, nameTreeLoading, getNameTree } = useName();
  const [chart, setChart] = useState(null);
  const chartElementRef = useRef(null);
  const theme = useTheme();
  const { matches: isSmall } = useMediaQuery(breakpoints.down('sm'));
  const { matches: isLarge } = useMediaQuery(breakpoints.up('md'));

  console.log(nameTree);

  // Pull name tree data
  useEffect(() => {
    getNameTree();
  }, [getNameTree]);

  console.log(nameTree);

  const buildChartData = useCallback((data) => {
      chartData.series[0].data = data;
      chartData.tooltip.formatter = params => {
        console.log(params);
        return 'params';
      }
    },
    []
  );

  // Build Chart with data
  useEffect(() => {
    let chart: echarts.ECharts | undefined;
    if (!isEmpty(nameTree)) {
      // On load, chartElementRef should get set and we can update the chart to be an echart
      // first try to get the initialized instance
      if (chartElementRef.current) {
        chart = echarts.getInstanceByDom(chartElementRef.current as unknown as HTMLElement) || echarts.init(chartElementRef.current as unknown as HTMLElement);
      }
      // Update the chart with the data
      buildChartData(nameTree);
      chart?.setOption(chartData);
      window.addEventListener('resize', () => {chart && chart.resize()});
    }
    return (
      window.removeEventListener('resize', () => chart && chart.resize())
    )
  }, [setChart, chart, nameTree, buildChartData]);

  return !nameTreeLoading ? (
    <StyledChart ref={chartElementRef} />
  ) : (
    <Loading />
  );
};