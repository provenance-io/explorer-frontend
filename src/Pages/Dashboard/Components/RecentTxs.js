import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { maxLength, getUTCTime, capitalize } from 'utils';
import { Link } from 'react-router-dom';
import { useInterval, useTxs, useMediaQuery } from 'redux/hooks';
import { Content, TimeTicker, Loading } from 'Components';
import { polling, breakpoints } from 'consts';

const RecentTxsWrapper = styled.div`
  margin-top: 22px;
  flex-basis: 100%;
`;

const TxLineContainer = styled.div`
  flex-basis: 100%;
  border-top: 1px solid ${({ theme }) => theme.BORDER_PRIMARY};
`;
const TxLineRow = styled.div`
  margin: 10px 0;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;
const Type = styled.div`
  text-transform: capitalize;
  @media ${breakpoints.down('sm')} {
    font-size: 1.2rem;
    max-width: 50%;
  }
`;
const Denomination = styled.div`
  text-transform: uppercase;
  display: inline-block;
  @media ${breakpoints.down('sm')} {
    font-size: 1rem;
  }
`;
const FeeLine = styled.div`
  @media ${breakpoints.down('sm')} {
    font-size: 1.2rem;
  }
`;
const FeeTitle = styled.div`
  display: inline-block;
  @media ${breakpoints.down('sm')} {
    font-size: 1rem;
  }
`;
const RecentCountContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  margin-left: auto;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.FONT_SECONDARY};
`;
const RecentCountTitle = styled.div`
  margin-right: 4px;
`;
const RecentCountOption = styled.div`
  ${({ theme, active }) => !active && `color: ${theme.FONT_LINK};`}
  ${({ theme, active }) => active && `font-weight: ${theme.FONT_WEIGHT_BOLDEST}`};
  cursor: ${({ active }) => (active ? 'normal' : 'pointer')};
`;
const RecentCountComma = styled.div`
  margin-right: 3px;
`;

const RecentTxs = () => {
  const [txsRecentLoading, setTxsRecentLoading] = useState(false);
  const { txs, getTxsRecent, recentTxsCount, setRecentTxsCount } = useTxs();
  const { matches: isSmall } = useMediaQuery(breakpoints.down('md'));

  const totalTxs = txs.length;

  // Poll the API for new data every 30s
  useInterval(() => getTxsRecent({ count: recentTxsCount }), polling.recentTxs);

  // Initial load, get most recent blocks
  useEffect(() => {
    setTxsRecentLoading(true);
    // Get initial blocks
    getTxsRecent({ count: recentTxsCount })
      .then(() => setTxsRecentLoading(false))
      .catch(() => setTxsRecentLoading(false));
  }, [getTxsRecent, recentTxsCount]);

  const buildTxLines = () =>
    txs.map(({ txHash, fee, type = 'N/A', denomination = 'N/A', time }) => {
      const utcTime = time ? getUTCTime(time) : 'N/A';
      const txCharLength = isSmall ? 10 : 16;

      return (
        <TxLineContainer key={txHash}>
          <TxLineRow title={txHash}>
            <div>
              TX# <Link to={`/tx/${txHash}`}>{maxLength(txHash, txCharLength)}</Link>
            </div>
            <TimeTicker timestamp={utcTime} />
          </TxLineRow>
          <TxLineRow>
            <Type>{capitalize(type)}</Type>
            <FeeLine>
              <FeeTitle>Fee:</FeeTitle> {fee ? fee : '[N/A]'} <Denomination>{denomination ? denomination : 'VSPN'}</Denomination>
            </FeeLine>
          </TxLineRow>
        </TxLineContainer>
      );
    });

  return (
    <Content
      size={isSmall ? '100%' : '50%'}
      alignItems="flex-start"
      alignSelf="flex-start"
      icon="SETTINGS"
      title={totalTxs > 0 ? `${totalTxs} Most Recent Transactions` : 'Most Recent Transactions'}
      link={{ to: '/txs', title: 'View All' }}
    >
      {txsRecentLoading ? (
        <Loading />
      ) : totalTxs > 0 ? (
        <RecentTxsWrapper>
          {buildTxLines()}
          <RecentCountContainer>
            <RecentCountTitle>Recent Count:</RecentCountTitle>
            <RecentCountOption active={recentTxsCount === 10} onClick={() => recentTxsCount !== 10 && setRecentTxsCount(10)}>
              10
            </RecentCountOption>
            <RecentCountComma>,</RecentCountComma>
            <RecentCountOption active={recentTxsCount === 20} onClick={() => recentTxsCount !== 20 && setRecentTxsCount(20)}>
              20
            </RecentCountOption>
            <RecentCountComma>,</RecentCountComma>
            <RecentCountOption active={recentTxsCount === 30} onClick={() => recentTxsCount !== 30 && setRecentTxsCount(30)}>
              30
            </RecentCountOption>
          </RecentCountContainer>
        </RecentTxsWrapper>
      ) : (
        <div>No recent transactions available</div>
      )}
    </Content>
  );
};

export default RecentTxs;
