import { useState, useRef, useEffect, useCallback, SetStateAction, Dispatch } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import * as echarts from 'echarts';
import { useTxs } from '../../../redux/hooks';
import { maxLength, subtractDays } from '../../../utils';
import { TxRecent } from '../../../redux/features/tx/txSlice';
import { Loading } from '../../../Components';
import Big from 'big.js';
import { ajax } from '../../../redux/features/api';
import { TXS_BY_ADDRESS_URL } from '../../../consts';

// TODO: Need to clean up how nodes are generated

const StyledChart = styled.div`
  height: 500px;
  width: 100%;
`;
// Set chart data
const chartData = {
  tooltip: {
    // eslint-disable-next-line
    formatter: ({}) => '',
  },
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
        edgeLength: 75,
      },
      label: {
        position: 'right',
        formatter: '{b}',
        show: false,
      },
      emphasis: {
        label: {
          show: false,
        },
      },
      lineStyle: {
        color: 'source',
        curveness: 0.0,
      },
      height: 200,
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
  nodeArray: Node[];
  linkArray: Link[];
  data: TxRecent['results'];
  address: string;
  target?: string;
  skip?: boolean;
  lastIndex: number;
}

const getNodesAndLinks = async ({
  nodeArray,
  linkArray,
  data,
  address,
  target = '0',
  skip = false,
  lastIndex,
}: NodesAndLinksProps) => {
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
    // Create a holder for the IDs of each node to pass as the target on second loop
    const targetIds: string[] = [];
    // Now loop through this object's keys to update the node and link
    Object.keys(addressCounts).forEach((addr) => {
      nodeArray.push({
        id: `${lastIndex + 1}`,
        name: addr,
        symbolSize: 25, // new Big(addressCounts[addr]).div(2).toNumber() < 25 ? 10 : 25,
        value: addressCounts[addr],
        category: 1,
      });
      targetIds.push(`${lastIndex + 1}`);
      for (let i = 0; i <= addressCounts[addr]; i++) {
        linkArray.push({
          source: `${lastIndex + 1}`,
          target,
          lineStyle: {
            width: new Big(addressCounts[addr]).div(5).toNumber(),
          },
        });
      }
      lastIndex++;
    });

    const numNodes = Object.keys(addressCounts).length;

    if (!skip) {
      for (let i = 0; i < numNodes; i++) {
        const addr = Object.keys(addressCounts)[i];
        const newAddressTxs = await ajax({
          url: `${TXS_BY_ADDRESS_URL}/${addr}?count=100&page=1`,
        });
        const newNodes = await getNodesAndLinks({
          nodeArray,
          linkArray,
          data: newAddressTxs.data.results,
          address: addr,
          target: targetIds[i],
          skip: true,
          lastIndex,
        });
        nodeArray.concat(newNodes.nodeArray);
        linkArray.concat(newNodes.linkArray);
        lastIndex = nodeArray.length;
      }
    }
  } catch (e) {
    new Error(`Error attempting to pull address ${address}`);
  }

  return Promise.resolve({
    nodeArray,
    linkArray,
    // data: newNodes.data,
  });
};

export const TxNodeLink = ({
  address,
  setAddress,
}: {
  address: string;
  setAddress: Dispatch<SetStateAction<string>>;
}) => {
  const [chart, setChart] = useState(null);
  const chartElementRef = useRef(null);
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
    (data: TxRecent['results']) =>
      new Promise((resolve, reject) => {
        try {
          // Create a nodeArray with the first entity being the current address
          // By default the value will be length of txs (usually 100).
          const nodeArray: Node[] = [
            {
              id: '0',
              name: address,
              symbolSize: 50, //new Big(data.length).div(2).toNumber(),
              value: 100, //data.length,
              category: 0,
            },
          ];
          const linkArray: Link[] = [];
          const lastIndex = 0;
          // Format the tx array
          getNodesAndLinks({
            nodeArray,
            linkArray,
            data,
            address,
            lastIndex,
          }).then((result) => {
            chartData.series[0].data = result.nodeArray;
            chartData.series[0].links = result.linkArray;
            chartData.tooltip.formatter = (params: any) => {
              if (params.data.name) {
                return `
                  <div>${maxLength(params.data.name, 14, '6')}</div>
                  <div>Shared Txs: ${params.data.value}</div>
                `;
              }
              return '';
            };
            resolve(chartData);
          });
          return chartData;
        } catch (e) {
          reject(e);
          return e;
        }
      }),
    [address]
  );

  // Build Chart with data
  useEffect(() => {
    // On load, chartElementRef should get set and we can update the chart to be an echart
    // first try to get the initialized instance
    let chart: echarts.ECharts | undefined;
    (async () => {
      if (!txsByAddressLoading) {
        if (chartElementRef.current) {
          chart =
            echarts.getInstanceByDom(chartElementRef.current as unknown as HTMLElement) ||
            echarts.init(chartElementRef.current as unknown as HTMLElement);
        }
        // Update chart with the data
        const currChartData: any = await buildChartData(txsByAddress);
        chart?.setOption(currChartData as echarts.EChartsOption);
        chart?.on('click', (params) => {
          if (params.componentType === 'series') {
            if (params.seriesType === 'graph') {
              // Update the searched address if clicked
              // @ts-ignore
              setAddress(params.data.name);
            }
          }
        });
        window.addEventListener('resize', () => {
          chart && chart.resize();
        });
      }
    })();
    return window.removeEventListener('resize', () => chart && chart.resize());
  }, [setChart, chart, buildChartData, txsByAddress, txsByAddressLoading, setAddress]);

  return !txsByAddressLoading ? <StyledChart ref={chartElementRef} /> : <Loading />;
};
