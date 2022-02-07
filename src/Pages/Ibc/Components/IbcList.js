import React, { useEffect } from 'react';
import { breakpoints } from 'consts';
import { Content, ButtonTables } from 'Components';
import styled, { useTheme } from 'styled-components';
import { useIbc, useMediaQuery } from 'redux/hooks';
import { getUTCTime, capitalize } from 'utils';

const ButtonTitle = styled.span`
  font-size: 2rem;
  @media ${breakpoints.down('md')} {
    font-size: 1.4rem;
  }
`;

const IbcList = () => {
  const {
    channelBalances,
    getChannelBalances,
    channelStatus,
    channelStatusLoading: tableLoading,
    getChannelStatus,
  } = useIbc();
  const { matches: isLarge } = useMediaQuery(breakpoints.up('sm'));

  const theme = useTheme();

  let totalIbcRelayers = 0;

  // Create foundation from channelBalances
  const channelBalanceData = channelBalances.map(item => {
    const channelList = item.channels.map(channel => {
      const srcChannel = channel.srcChannel.channel;
      const dstChannel = channel.dstChannel.channel;
      const lastTx = channel.lastTx;
      const balances = channel.balances.map(balance => {
        const balanceInAmount = balance.balanceIn?.amount;
        const balanceInDenom = balance.balanceIn?.denom;
        const balanceOutAmount = balance.balanceOut?.amount;
        const balanceOutDenom = balance.balanceOut?.denom;
        const lastBalanceTx = balance.lastTx;
        return {
          balanceInAmount,
          balanceInDenom,
          balanceOutAmount,
          balanceOutDenom,
          lastBalanceTx,
        };
      });
      return { srcChannel, dstChannel, lastTx, balances };
    });
    return { chainId: item.dstChainId, chainLastTx: item.lastTx, channelList };
  });

  // Determine channel status and stats
  const channelStatusData = channelStatus.map(item => {
    totalIbcRelayers++;
    const chainId = item.dstChainId;
    const numChannels = item.channels.length;
    let activeChannels = 0;
    const channelList = item.channels
      .map(channel => {
        if (channel.status === 'STATE_OPEN') {
          activeChannels++;
        }
        return {
          srcChannel: channel.srcChannel.channel,
          dstChannel: channel.dstChannel.channel,
          channelStatus: channel.status,
        };
      })
      .sort((a, b) => {
        const aNum = parseInt(a.srcChannel.match(/-(.*)/)[1]);
        const bNum = parseInt(b.srcChannel.match(/-(.*)/)[1]);
        return aNum - bNum;
      });
    const channelStats = `${activeChannels}/${numChannels}`;
    return { chainId, channelStats, channelList };
  });

  // Now construct the final array from the two API calls
  const ibcData = channelStatusData.map(status => {
    channelBalanceData.forEach(balance => {
      if (balance.chainId === status.chainId) {
        status.chainLastTx = balance.chainLastTx;
        status.channelList.forEach(statChan => {
          balance.channelList.forEach(balChan => {
            if (
              balChan.dstChannel === statChan.dstChannel &&
              balChan.srcChannel === statChan.srcChannel
            ) {
              statChan.lastTx = balChan.lastTx;
              statChan.balances = { ...balChan.balances };
            }
          });
        });
      }
    });
    return { ...status };
  });

  useEffect(() => {
    getChannelStatus();
    getChannelBalances();
  }, [getChannelStatus, getChannelBalances]);

  const getIbcLists = ibcData.map(chain => {
    const tableHeaders = [
      { displayName: 'Provenance', dataName: 'srcChannel' },
      {
        displayName: capitalize(chain.chainId.split('-')[0].toUpperCase()),
        dataName: 'dstChannel',
      },
      { displayName: 'Status', dataName: 'channelStatus' },
      { displayName: 'Last Tx', dataName: 'lastTx' },
    ];
    const tableData = chain.channelList;

    return (
      <ButtonTables
        key={chain.chainId}
        buttonTitle={<ButtonTitle>{chain.chainId.split('-')[0].toUpperCase()}</ButtonTitle>}
        buttonStartContent={isLarge && <span>{chain.chainId}</span>}
        buttonEndContent={
          <span>
            {isLarge && 'Channel Status: '}
            {chain.channelStats}
            <br />
            {isLarge && `Last Tx: ${getUTCTime(chain.chainLastTx)}+UTC`}
          </span>
        }
        buttonMinHeight="80px"
        size="100%"
        iconPercent="76%"
        spinIcon={true}
        buttonProps={{
          blockImageProps: {
            moniker: chain.chainId,
            address: '',
            sizeText: isLarge ? 25 : 14,
            marginRight: '20px',
            colorBackground: theme.IRIS_PRIMARY,
            colorFont: theme.FONT_WHITE,
            fontWeight: theme.FONT_WEIGHT_THIN,
          },
        }}
        tableProps={{
          isLoading: tableLoading,
          tableData,
          tableHeaders,
          contentBorder: false,
        }}
      />
    );
  });

  return <Content title={`IBC Relayers (${totalIbcRelayers})`}>{getIbcLists}</Content>;
};

export default IbcList;
