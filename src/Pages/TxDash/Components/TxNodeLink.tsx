import { useState, useRef, useEffect, useCallback } from 'react';
import styled, { useTheme } from 'styled-components';
import { format } from 'date-fns';
import * as echarts from 'echarts';
import { useTxs } from 'redux/hooks';
import { subtractDays } from 'utils';
import { TxRecent } from 'redux/features/tx/txSlice';
import { Loading } from 'Components';
import Big from 'big.js';
import { ajax } from 'redux/features/api';
import { TXS_BY_ADDRESS_URL } from 'consts';

const StyledChart = styled.div`
  height: 500px;
  width: 100%;
`;
// Set chart data
const chartData = {
  title: {
    text: 'Account Transactions Node Link Chart',
    top: -5,
    left: '5%',
    textStyle: {
      color: '',
      fontWeight: 'normal',
    },
  },
  grid: {
    left: '15%',
    right: '15%',
    top: '15%',
    bottom: '15%',
  },
  tooltip: {},
  legend: [
    {
      data: [''],
    },
  ],
  animationDurationUpdate: 1500,
  animationEasingUpdate: 'quinticInOut',
  series: [
    {
      name: 'Account Interactions',
      type: 'graph',
      layout: 'force',
      circular: {
        rotateLabel: true,
      },
      data: [
        {
          id: '',
          name: '',
          symbolSize: 0,
          value: 0,
          category: 0,
        },
      ],
      links: [{ source: '', target: '', lineStyle: { width: 0 } }],
      categories: ['This Address', 'Other Address'],
      roam: true,
      draggable: true,
      force: {
        initLayout: 'circular',
        repulsion: 1000,
        edgeLength: 200,
      },
      // label: {
      //   position: 'right',
      //   formatter: '{b}',
      // },
      lineStyle: {
        color: 'source',
        curveness: 0.2,
      },
    },
  ],
};

interface Node {
  id: string;
  name: string;
  symbolSize: number;
  value: number;
  category: number;
}

interface Link {
  source: string;
  target: string;
  lineStyle: {
    width: number;
  };
}

interface NodesAndLinksProps {
  data: TxRecent['results'];
  address: string;
  target?: string;
  skip?: boolean;
}

const getNodesAndLinks = async ({
  data,
  address,
  target = '0',
  skip = false,
}: NodesAndLinksProps) => {
  // Create a nodeArray with the first entity being the current address
  // By default the value will be length of txs (usually 100).
  const nodeArray: Node[] = [
    {
      id: '0',
      name: address,
      symbolSize: new Big(data.length).div(2).toNumber(),
      value: data.length,
      category: 0,
    },
  ];
  const linkArray: Link[] = [];
  try {
    // First, find any/all other address in the first 100 transactions
    const otherAddresses: string[] = [];
    data.forEach((tx) => {
      if (tx.feepayer.address !== address) {
        otherAddresses.push(tx.feepayer.address);
      }
      if (tx.signers.length > 1) {
        tx.signers.forEach((signer) => {
          if (signer.address !== address) otherAddresses.push(signer.address);
        });
      }
    });
    // Now that we have all other addresses, create the node and link arrays
    // First create an object with keys of unique address, and the count of each
    const addressCounts: { [key: string]: number } = {};
    for (const addr of otherAddresses) {
      addressCounts[addr] = addressCounts[addr] ? addressCounts[addr] + 1 : 1;
    }
    // Now loop through this object's keys to update the node and link
    Object.keys(addressCounts).forEach((addr, idx) => {
      nodeArray.push({
        id: `${idx + 1}`,
        name: addr,
        symbolSize: new Big(addressCounts[addr]).div(2).toNumber() < 25 ? 10 : 25,
        value: addressCounts[addr],
        category: 1,
      });
      for (let i = 0; i <= addressCounts[addr]; i++) {
        linkArray.push({
          source: `${idx + 1}`,
          target,
          lineStyle: {
            width: new Big(addressCounts[addr]).div(3).toNumber(),
          },
        });
      }
    });

    const numNodes = Object.keys(addressCounts).length;

    if (!skip) {
      for (let i = 0; i < numNodes; i++) {
        const addr = Object.keys(addressCounts)[i];
        const newAddressTxs = await ajax({
          url: `${TXS_BY_ADDRESS_URL}/${addr}?count=100&page=1`,
        });
        const newNodes = await getNodesAndLinks({
          data: newAddressTxs.data.results,
          address: addr,
          target: String(i + 1),
          skip: true,
        });
        nodeArray.concat(newNodes.nodeArray);
        linkArray.concat(newNodes.linkArray);
        // console.log(newNodes);
      }
    }
  } catch (e) {
    console.log('error');
  }

  return Promise.resolve({
    nodeArray,
    linkArray,
    // data: newNodes.data,
  });
};

export const TxNodeLink = ({ address }: { address: string }) => {
  const [chart, setChart] = useState(null);
  const chartElementRef = useRef(null);
  const theme = useTheme();
  const { getTxsByAddress, txsByAddress, txsByAddressLoading } = useTxs();

  // Dates for Tx Data (searching a full year, but only using 100 results)
  const defaultDateFormat = 'yyyy-MM-dd';
  const today = new Date();
  const toDate = format(today, defaultDateFormat);
  const fromDate = format(subtractDays(today, 365), defaultDateFormat);

  // Get Tx Data
  useEffect(() => {
    getTxsByAddress({
      address,
      count: 100,
      page: 1,
      type: '',
      status: '',
      toDate,
      fromDate,
    });
  }, [getTxsByAddress, address, fromDate, toDate]);

  // Build the chart data
  const buildChartData = useCallback(
    (data: TxRecent['results']) => {
      try {
        // Format the tx array
        getNodesAndLinks({
          data,
          address,
        }).then((result) => {
          chartData.series[0].data = result.nodeArray;
          chartData.series[0].links = result.linkArray;
        });
        // Populate the chart data
        // chartData.series[0].data = graphInfo.then(value => value.nodeArray);
        // chartData.series[0].links = graphInfo.linkArray;
        // Set theme colors
        chartData.title.textStyle.color = theme.FONT_PRIMARY;
        return chartData;
      } catch (e) {
        console.log('Errors!');
      }
    },
    [address, theme]
  );

  // Build Chart with data
  useEffect(() => {
    // On load, chartElementRef should get set and we can update the chart to be an echart
    // first try to get the initialized instance
    let chart: echarts.ECharts | undefined;
    if (!txsByAddressLoading) {
      if (chartElementRef.current) {
        chart =
          echarts.getInstanceByDom(chartElementRef.current as unknown as HTMLElement) ||
          echarts.init(chartElementRef.current as unknown as HTMLElement);
      }
      // Update chart with the data
      buildChartData(txsByAddress);
      console.log(chartData);
      chart?.setOption(chartData as echarts.EChartsOption);
      window.addEventListener('resize', () => {
        chart && chart.resize();
      });
    }
    return window.removeEventListener('resize', () => chart && chart.resize());
  }, [setChart, chart, buildChartData, txsByAddress, txsByAddressLoading]);

  return !txsByAddressLoading ? <StyledChart ref={chartElementRef} /> : <Loading />;
};
