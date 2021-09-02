import React, { useState, useEffect, Fragment } from 'react';
import styled from 'styled-components';
import { useBlocks, useInterval } from 'redux/hooks';
import { Link as BaseLink } from 'react-router-dom';
import Big from 'big.js';
import { BlockImage, Content, Loading, Sprite as BaseSprite, DataCard } from 'Components';
import { maxLength, getUTCTime, numberFormat, formatSeconds, formatDenom } from 'utils';
import { polling } from 'consts';
import useOrderbook from 'redux/hooks/useOrderbook';
import isYesterday from 'date-fns/isYesterday';

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
  const { blockLatest, getBlockSpotlight, blockSpotlightFailed, blockSpotlightLoading } =
    useBlocks();
  const { dailyPrice, priceHistory, getDailyPrice, getPriceHistory } = useOrderbook();

  // Find all the prev day's prices and get the average price for the previous day
  const prevDayPrices = priceHistory.filter(i => isYesterday(new Date(i.dateTime)));
  const prevDayAverage = prevDayPrices
    .reduce((acc, curr) => acc.add(curr.displayPricePerDisplayUnit), new Big(0))
    .div(prevDayPrices.length || 1);

  const latestDisplayPrice = dailyPrice.latestDisplayPricePerDisplayUnit || 1;
  // Check if the price increased from yesterday
  const priceIncrease = prevDayAverage.lte(latestDisplayPrice);
  // figure out the price change from yesterday
  const priceChange = priceIncrease
    ? prevDayAverage.div(latestDisplayPrice)
    : new Big(latestDisplayPrice).div(prevDayAverage);
  // create percentage based on the change
  const priceChangePercent = `${priceIncrease ? `+` : `-`}${new Big(1)
    .minus(priceChange)
    .times(100)
    .toFixed(0)}%`;

  // Initial load, get most recent blocks
  useEffect(() => {
    (async () => {
      if (initialLoad) {
        setBlockLoading(true);
        setInitialLoad(false);
        // Get initial blocks
        try {
          await Promise.all([getBlockSpotlight(), getDailyPrice(), getPriceHistory('WEEK')]);
          setBlockLoading(false);
        } catch (e) {
          setBlockLoading(false);
        }
      }
    })();
  }, [getBlockSpotlight, getDailyPrice, getPriceHistory, initialLoad]);

  // Poll the API for new data every 5s
  useInterval(
    () => !blockSpotlightLoading && getBlockSpotlight(),
    polling.blockSpotlight,
    blockSpotlightFailed
  );

  // Dropping in '--' to know which values are missing from the tendermintRPC and need to be added by a BE API
  const { avgBlockTime, bondedTokens = {}, latestBlock = {}, totalTxCount } = blockLatest;
  const { count: bondedTokensCount, denom, total: bondedTokensTotal } = bondedTokens;
  const {
    height,
    icon,
    moniker,
    proposerAddress,
    time,
    validatorCount = {},
    votingPower = {},
  } = latestBlock;
  const { count: validatorCountAmount, total: validatorCountTotal } = validatorCount;
  const { count: votingPowerCount, total: votingPowerTotal } = votingPower;

  const utcTime = time ? `${getUTCTime(time)}+UTC` : '--';
  const votingPowerPercent = `${numberFormat((votingPowerCount / votingPowerTotal) * 100, 2)}%`;
  const bondedTokensPercent = `${numberFormat((bondedTokensCount / bondedTokensTotal) * 100, 4, {
    minimumFractionDigits: 2,
  })}%`;
  const txTotalCountShorthand = numberFormat(totalTxCount, 1, { shorthand: true });

  const latestPrice = new Big(dailyPrice.latestDisplayPricePerDisplayUnit || 0);
  const twentyFourHourVolume = latestPrice.times(dailyPrice.displayVolumeTraded || 0);
  const marketCap = latestPrice.times(100000000000);

  return (
    <Content justify="center" alignItems="flex-start">
      {blockLoading && <Loading />}
      {blockSpotlightFailed && !blockLatest.length && (
        <div>Block Spotlight failed to load, refresh page to try again</div>
      )}
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
              <BlockImage icon={icon} moniker={moniker} address={proposerAddress} />
            </BlockPreviewLine>
            <BlockPreviewLine title={moniker ? moniker : proposerAddress}>
              <Link to={`/validator/${proposerAddress}`}>
                {moniker ? maxLength(moniker, 16) : maxLength(proposerAddress, 16, 5)}
              </Link>
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
              <Fragment>
                {formatDenom(bondedTokensCount, denom, { shorthand: true, decimal: 2 })} /{' '}
                {formatDenom(bondedTokensTotal, denom, { shorthand: true, decimal: 2 })}
              </Fragment>
            </DataCard>
            <DataCard icon="CALENDAR" title="24hr Volume">
              {`$${formatDenom(twentyFourHourVolume, 'USD', {
                shorthand: true,
                decimal: 2,
              })}`}
            </DataCard>
            <DataCard icon="PRICE" title="Latest Price">
              {`$${formatDenom(dailyPrice.latestDisplayPricePerDisplayUnit, 'USD', {
                decimal: 2,
              })} (${priceChangePercent})`}
            </DataCard>
            <DataCard icon="LINE_CHART" title="Market Cap">
              {`$${formatDenom(marketCap, 'USD', {
                shorthand: true,
                decimal: 2,
              })}`}
            </DataCard>
          </Group>
        </>
      )}
    </Content>
  );
};

export default BlockSpotlight;
