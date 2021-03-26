import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useBlocks, useInterval } from 'redux/hooks';
import { Link as BaseLink } from 'react-router-dom';
import { Content, Loading, Sprite as BaseSprite, DataCard } from 'Components';
import { maxLength, getUTCTime, numberFormat, formatSeconds, nHashtoHash } from 'utils';
import { polling } from 'consts';

const Group = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-basis: ${({ size }) => size || 'auto'};
`;
const BlockPreviewLine = styled.div`
  text-align: center;
  margin: 12px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-basis: 100%;
`;
const BlockImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  background: ${({ theme }) => theme.BACKGROUND_LIGHT};
  height: 150px;
  width: 150px;
  overflow: hidden;
`;
const BlockImageLetter = styled.span`
  font-size: 7rem;
  color: ${({ theme }) => theme.FONT_PRIMARY};
`;
const Sprite = styled(BaseSprite)`
  margin-right: 8px;
`;
const Link = styled(BaseLink)`
  font-size: ${({ size }) => (size ? size : 'inherit')};
  ${({ weight }) => weight && `font-weight: ${weight};`}
`;

const BlockSpotlight = () => {
  const [initialLoad, setInitialLoad] = useState(true);
  const [blockLoading, setBlockLoading] = useState(false);
  const { blockLatest, getBlockSpotlight, blockSpotlightFailed, blockSpotlightLoading } = useBlocks();

  // Initial load, get most recent blocks
  useEffect(() => {
    if (initialLoad) {
      setBlockLoading(true);
      setInitialLoad(false);
      // Get initial blocks
      getBlockSpotlight()
        .then(() => setBlockLoading(false))
        .catch(() => setBlockLoading(false));
    }
  }, [getBlockSpotlight, initialLoad]);

  // Poll the API for new data every 5s
  useInterval(() => !blockSpotlightLoading && getBlockSpotlight(), polling.blockSpotlight, blockSpotlightFailed);

  // Dropping in '--' to know which values are missing from the tendermintRPC and need to be added by a BE API
  const { avgBlockTime, bondedTokens = {}, latestBlock = {}, totalTxCount } = blockLatest;
  const { count: bondedTokensCount, total: bondedTokensTotal } = bondedTokens;
  const { height, icon, moniker, proposerAddress, time, validatorCount = {}, votingPower = {} } = latestBlock;
  const { count: validatorCountAmount, total: validatorCountTotal } = validatorCount;
  const { count: votingPowerCount, total: votingPowerTotal } = votingPower;

  const utcTime = time ? `${getUTCTime(time)}+UTC` : '--';
  const votingPowerPercent = `${numberFormat((votingPowerCount / votingPowerTotal) * 100, 2)}%`;
  const bondedTokensPercent = `${numberFormat((bondedTokensCount / bondedTokensTotal) * 100, 4, { minimumFractionDigits: 2 })}%`;
  const txTotalCountShorthand = numberFormat(totalTxCount, 1, { shorthand: true });

  return (
    <Content justify="center" alignItems="flex-start">
      {blockLoading && <Loading />}
      {blockSpotlightFailed && !blockLatest.length && <div>Block Spotlight failed to load, refresh page to try again</div>}
      {!blockLoading && !blockSpotlightFailed && (
        <>
          <Group size="30%">
            <BlockPreviewLine>
              <Sprite icon="CUBES" size="1.8rem" /> Block Height
            </BlockPreviewLine>
            <BlockPreviewLine>
              <Link to={`/block/${height}`} size="2rem" weight="900">
                {height}
              </Link>
            </BlockPreviewLine>
            <BlockPreviewLine>
              <BlockImageContainer title={moniker ? moniker : proposerAddress}>
                {icon ? (
                  <img src={icon} alt={moniker ? maxLength(moniker, 16) : '?'} title={moniker ? maxLength(moniker, 16) : '?'} />
                ) : (
                  <BlockImageLetter>{moniker ? moniker[0] : `${proposerAddress}`[0]}</BlockImageLetter>
                )}
              </BlockImageContainer>
            </BlockPreviewLine>
            <BlockPreviewLine title={moniker ? moniker : proposerAddress}>
              <Link to={`/validator/${proposerAddress}`}>{moniker ? maxLength(moniker, 16) : maxLength(proposerAddress, 16, 5)}</Link>
            </BlockPreviewLine>
          </Group>
          <Group size="70%">
            <DataCard icon="ADMIN" title="Transactions">
              <Link to="/txs/">{txTotalCountShorthand}</Link>
              {utcTime}
            </DataCard>
            <DataCard icon="PARTICIPATION" title="Voting Power">
              {votingPowerPercent}
              <Link to={`/block/${height}`}>
                {validatorCountAmount}/{validatorCountTotal} Validators
              </Link>
            </DataCard>
            <DataCard icon="PENDING" title="Avg Block Time">
              {formatSeconds(avgBlockTime, 2)}
              Last 100 Blocks
            </DataCard>
            <DataCard icon="SHARED_POOLS" title="Bonded Tokens">
              {bondedTokensPercent}
              <>
                {nHashtoHash(bondedTokensCount, { shorthand: true, decimal: 2 })} /{' '}
                {nHashtoHash(bondedTokensTotal, { shorthand: true, decimal: 2 })}
              </>
            </DataCard>
          </Group>
        </>
      )}
    </Content>
  );
};

export default BlockSpotlight;
