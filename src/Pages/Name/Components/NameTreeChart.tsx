import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import * as echarts from 'echarts';
import { Loading, Filters, Content } from 'Components';
import { useName } from 'redux/hooks';
import { isEmpty } from 'utils';
import { Colors } from 'theme/Colors';

const StyledChart = styled.div`
  height: 800px;
  width: 100%;
`;

const FiltersWrapper = styled.div``;

const chartData = {
  tooltip: {
    // Needed format for TypeScript
    // eslint-disable-next-line no-empty-pattern
    formatter: ([]) => '',
  },
  series: [
    {
      name: 'Name Tree',
      top: 0,
      labelLine: {
        showAbove: true,
        verticalAlign: 'top',
      },
      type: 'treemap',
      width: '100%',
      height: '90%',
      data: {},
      visibleMin: 200,
      roam: false,
      breadcrumb: {
        top: 'top',
      },
      leafDepth: 1,
      label: {
        show: true,
        fontSize: '12',
        // Needed format for TypeScript
        // eslint-disable-next-line no-empty-pattern
        formatter: ([]) => '',
      },
      upperLabel: {
        show: true,
        height: 30,
        color: '',
        fontSize: '15',
        fontStyle: 'normal',
        textBorderColor: 'none',
        // Needed format for TypeScript
        // eslint-disable-next-line no-empty-pattern
        formatter: ([]) => '',
      },
      levels: [
        // Level 1
        {
          itemStyle: {
            borderColor: '#555',
            borderWidth: 5,
            gapWidth: 4,
          },
          upperLabel: {
            show: true,
          },
        },
        // Level 2
        {
          itemStyle: {
            borderColorSaturation: 0.1,
            gapWidth: 2,
            borderWidth: 5,
          },
          upperLabel: {
            show: true,
          },
        },
        // Level 3
        {
          colorSaturation: [0.3, 0.5],
          itemStyle: {
            borderColorSaturation: 0.3,
            gapWidth: 2,
            borderWidth: 1,
          },
          upperLabel: {
            show: true,
          },
        },
        // Level 4
        {
          colorSaturation: [0.3, 0.5],
          itemStyle: {
            borderColorSaturation: 0.5,
            gapWidth: 2,
            borderWidth: 1,
          },
          upperLabel: {
            show: true,
          },
        },
        // Level 5
        {
          colorSaturation: [0.3, 0.5],
          itemStyle: {
            borderColorSaturation: 0.6,
            gapWidth: 2,
            borderWidth: 1,
          },
          upperLabel: {
            show: true,
          },
        },
        // Level 6
        {
          colorSaturation: [0.3, 0.5],
          itemStyle: {
            borderColorSaturation: 0.6,
            gapWidth: 2,
            borderWidth: 1,
          },
          upperLabel: {
            show: true,
          },
        },
        // Level 7
        {
          colorSaturation: [0.3, 0.5],
          itemStyle: {
            borderColorSaturation: 0.7,
            gapWidth: 2,
            borderWidth: 1,
          },
          upperLabel: {
            show: true,
          },
        },
        // Level 8
        {
          colorSaturation: [0.3, 0.5],
          itemStyle: {
            borderColorSaturation: 0.8,
            gapWidth: 2,
            borderWidth: 1,
          },
          upperLabel: {
            show: true,
          },
        },
      ],
    },
  ],
};

export const NameTreeChart = () => {
  const { nameTree, nameTreeLoading, getNameTree } = useName();
  const [chart, setChart] = useState(null);
  const [level, setLevel] = useState(2);
  const chartElementRef = useRef(null);

  // Set filter data. Note that if more levels are eventually
  // needed, adjust the max here and add more levels to the
  // above, or rewrite initial chart config as a function
  // similar to example at
  // https://echarts.apache.org/examples/en/editor.html?c=treemap-show-parent
  const filterData = [
    {
      title: 'Level View',
      type: 'number',
      action: setLevel,
      value: level,
      min: '1',
      max: '8',
    },
  ];

  // Pull name tree data
  useEffect(() => {
    getNameTree();
  }, [getNameTree]);

  const buildChartData = useCallback(
    (data) => {
      chartData.series[0].data = data;
      chartData.series[0].leafDepth = level;
      chartData.tooltip.formatter = (info: any) => {
        const thisLabel = info.data.label && info.data.label.match(/^([^.]+)/);
        return `
          <div style="border-bottom:1px solid black;text-align:center;font-weight:bold"> 
            Name: ${thisLabel && thisLabel.length > 0 ? thisLabel[0] : 'Attribute Name Tree'}
          </div>
          <div> Total Children: ${info.data.children.length} </div>
          <div> Restricted: ${String(info.data.restricted || 'false')} </div>
          <div> Full Name: ${info.data.fullName || 'N/A'}</div>
          <div> Owner: ${info.data.owner || 'N/A'}</a></div>
        `;
      };
      chartData.series[0].upperLabel.color = Colors.FONT_WHITE;
      chartData.series[0].label.formatter = (info: any) => `${info.data.name}`;
      chartData.series[0].upperLabel.formatter = (info: any) =>
        ` ${info.data.fullName || 'Attribute Name Tree'}`;
    },
    [level]
  );

  // Build Chart with data
  useEffect(() => {
    let chart: echarts.ECharts | undefined;
    if (!isEmpty(nameTree)) {
      // On load, chartElementRef should get set and we can update the chart to be an echart
      // first try to get the initialized instance
      if (chartElementRef.current) {
        chart =
          echarts.getInstanceByDom(chartElementRef.current as unknown as HTMLElement) ||
          echarts.init(chartElementRef.current as unknown as HTMLElement);
      }
      // Update the chart with the data
      buildChartData(nameTree);
      chart?.setOption(chartData);
      window.addEventListener('resize', () => {
        chart && chart.resize();
      });
    }
    return window.removeEventListener('resize', () => chart && chart.resize());
  }, [setChart, chart, nameTree, buildChartData]);

  return !nameTreeLoading ? (
    <Content title="Attribute Names">
      <FiltersWrapper>
        <Filters filterData={filterData} flush />
      </FiltersWrapper>
      <StyledChart ref={chartElementRef} />
    </Content>
  ) : (
    <Loading />
  );
};
