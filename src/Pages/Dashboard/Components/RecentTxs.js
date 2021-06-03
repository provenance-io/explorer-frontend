import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { maxLength, getUTCTime, capitalize, formatNhash, numberFormat } from 'utils';
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

const RecentTxs = () => {
  // Note: we use a separate loading here because we only want a loading icon on first page load, not refreses/re-fetches
  const [txsRecentLoading, setTxsRecentLoading] = useState(false);
  const { txs, getTxsRecent, recentTxsCount, txsRecentLoading: txsRecentLoadingStore } = useTxs();
  const { matches: isSmall } = useMediaQuery(breakpoints.down('md'));

  const totalTxs = txs.length;

  // Poll the API for new data every 30s
  useInterval(
    () => !txsRecentLoadingStore && getTxsRecent({ count: recentTxsCount }),
    polling.recentTxs
  );

  // Initial load, get most recent blocks
  useEffect(() => {
    setTxsRecentLoading(true);
    // Get initial blocks
    getTxsRecent({ count: recentTxsCount })
      .then(() => setTxsRecentLoading(false))
      .catch(() => setTxsRecentLoading(false));
  }, [getTxsRecent, recentTxsCount]);

  const buildTxLines = () =>
    txs.map(({ txHash, fee, msg = [], denomination = '--', time }, index) => {
      const { amount: feeAmount, denom: feeDenom } = fee;
      const { type = '--' } = msg[0];
      const utcTime = time ? getUTCTime(time) : '--';
      const txCharLength = isSmall ? 10 : 16;
      const feeAmountFinal =
        feeDenom === 'nhash'
          ? `${formatNhash(feeAmount)} hash`
          : `${numberFormat(feeAmount)} ${feeDenom}`;

      return (
        <TxLineContainer key={`${txHash}_${index}`}>
          <TxLineRow title={txHash}>
            <div>
              TX# <Link to={`/tx/${txHash}`}>{maxLength(txHash, txCharLength)}</Link>
            </div>
            <TimeTicker timestamp={utcTime} />
          </TxLineRow>
          <TxLineRow>
            <Type>{capitalize(type)}</Type>
            <FeeLine>
              <FeeTitle>Fee:</FeeTitle> {feeAmountFinal}
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
        <RecentTxsWrapper>{buildTxLines()}</RecentTxsWrapper>
      ) : (
        <div>No recent transactions available</div>
      )}
    </Content>
  );
};

export default RecentTxs;
