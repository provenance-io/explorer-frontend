import React, { useEffect } from 'react';
import Big from 'big.js';
import styled from 'styled-components';
import { Content, Loading, DataCard } from 'Components';
import { formatDenom } from 'utils';
import { useMediaQuery } from 'redux/hooks';
import useOrderbook from 'redux/hooks/useOrderbook';
import isYesterday from 'date-fns/isYesterday';
import { breakpoints } from 'consts';

const HashSpan = styled.span`
  font-size: 1.8rem;
  margin-left: 5%;
`;
const PercentChange = styled.span`
  color: ${({ color }) => color};
  font-size: 1.8rem;
  font-weight: bold;
`;

const HashDashboard = () => {
  const {
    dailyPrice,
    dailyPriceLoading,
    dailyPriceFailed,
    priceHistory,
    priceHistoryLoading,
    priceHistoryFailed,
    getDailyPrice,
    getPriceHistory,
  } = useOrderbook();

  const { matches: isSmall } = useMediaQuery(breakpoints.down('sm'));

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
    getDailyPrice();
    getPriceHistory('WEEK');
  }, [getDailyPrice, getPriceHistory]);

  const latestPrice = new Big(dailyPrice.latestDisplayPricePerDisplayUnit || 0);
  const twentyFourHourVolume = latestPrice.times(dailyPrice.displayVolumeTraded || 0);
  const marketCap = latestPrice.times(100000000000);

  return (
    <Content
      justify="center"
      alignItems="flex-start"
      icon="HASH"
      title="Hash Value"
      size={isSmall ? '100%' : '40%'}
    >
      {dailyPriceLoading && priceHistoryLoading && <Loading />}
      {priceHistoryFailed && dailyPriceFailed && !priceHistory.length && (
        <div>Hash data failed to load, refresh page to try again</div>
      )}
      {!dailyPriceLoading && !dailyPriceFailed && (
        <>
          <DataCard icon="PRICE" title="Latest Price" width="100%" fontWeight="true">
            <>
              {`$${formatDenom(dailyPrice.latestDisplayPricePerDisplayUnit, 'USD', {
                minimumFractionDigits: 3,
              })}    `}
              <HashSpan>
                (
                <PercentChange color={priceIncrease ? 'rgb(78, 210, 44)' : 'red'}>
                  {priceChangePercent}
                </PercentChange>
                )
              </HashSpan>
            </>
          </DataCard>
          <DataCard icon="LINE_CHART" title="Hash Market Cap" width="100%">
            {`$${formatDenom(marketCap, 'USD', {
              shorthand: true,
              decimal: 2,
            })}`}
          </DataCard>
          <DataCard icon="CALENDAR" title="24hr Volume" width="100%">
            {`$${formatDenom(twentyFourHourVolume, 'USD', {
              shorthand: true,
              decimal: 2,
            })}`}
          </DataCard>
        </>
      )}
    </Content>
  );
};

export default HashDashboard;
