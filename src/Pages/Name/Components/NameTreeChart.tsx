import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import * as echarts from 'echarts';
import { Loading, Filters, Content } from 'Components';
import { useName } from 'redux/hooks';
import { isEmpty } from 'utils';

const StyledChart = styled.div`
  height: 800px;
  width: 100%;
`;

const FiltersWrapper = styled.div`
  margin-bottom: 10px;
`;

const chartData = {
  tooltip: {
    // Needed format for TypeScript
    // eslint-disable-next-line no-empty-pattern
    formatter: ([]) => '',
  },
  series: [
    {
      name: 'Name Tree',
      labelLine: {
        showAbove: true,
        verticalAlign: 'top',
      },
      type: 'treemap',
      width: '100%',
      height: '100%',
      data: {},
      visibleMin: 200,
      roam: false,
      breadcrumb: {
        top: 'top',
      },
      leafDepth: 1,
      label: {
        show: true,
        fontSize: '15',
        // Needed format for TypeScript
        // eslint-disable-next-line no-empty-pattern
        formatter: ([]) => '',
      },
      upperLabel: {
        show: true,
        height: 30,
        fontSize: '20',
        fontStyle: 'normal',
        // Needed format for TypeScript
        // eslint-disable-next-line no-empty-pattern
        formatter: ([]) => '',
      },
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
  const [level, setLevel] = useState(2);
  const chartElementRef = useRef(null);

  // Set filter data
  const filterData = [
    {
      title: 'Level View',
      type: 'number',
      action: setLevel,
      value: level,
      min: '1',

    },
  ];

  // Pull name tree data
  useEffect(() => {
    getNameTree();
  }, [getNameTree]);

  const buildChartData = useCallback((data) => {
      chartData.series[0].data = data;
      chartData.series[0].leafDepth = level;
      chartData.tooltip.formatter = (info: any) => {
        const thisLabel = info.data.label && info.data.label.match(/^([^.]+)/);
        return `
          <div style="border-bottom:1px solid black;text-align:center;font-weight:bold"> 
            Name: ${thisLabel && thisLabel.length > 0 ? thisLabel[0] : ''}
          </div>
          <div> Total Children: ${info.data.children.length} </div>
          <div> Restricted: ${String(info.data.restricted)} </div>
          <div> Full Name: ${info.data.fullName}</div>
          <div> Owner: ${info.data.owner}</a></div>
        `;
      };
      chartData.series[0].label.formatter = (info: any) => `${info.data.name}`;
      
      chartData.series[0].upperLabel.formatter = (info: any) => ` ${info.data.fullName || 'Attribute Name Tree'}`;
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
    <Content title="Attribute Names">
      <FiltersWrapper>
        <Filters
          filterData={filterData}
          flush
        />
      </FiltersWrapper>
      <StyledChart ref={chartElementRef} />
    </Content>
  ) : (
    <Loading />
  );
};