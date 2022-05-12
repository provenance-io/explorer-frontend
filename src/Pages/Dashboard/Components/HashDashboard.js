import React, { useEffect } from 'react';
import Big from 'big.js';
import { format } from 'date-fns';
import styled, { useTheme } from 'styled-components';
import { Content, Loading, DataCard } from 'Components';
import { formatDenom, subtractDays } from 'utils';
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
    dailyVolume,
    dailyPrice,
    dailyPriceLoading,
    dailyPriceFailed,
    priceHistory,
    priceHistoryLoading,
    priceHistoryFailed,
    getDailyPrice,
    getPriceHistory,
    getDailyVolume,
  } = useOrderbook();

  const theme = useTheme();

  const { matches: isSmall } = useMediaQuery(breakpoints.down('sm'));

  // Find all the prev day's prices and get the average price for the previous day
  const prevDayPrices = priceHistory.filter(i => isYesterday(new Date(i.trade_timestamp)));

  // It's possible the previous day has no data, which results in an error.
  if (prevDayPrices.length === 0) {
    const today = format(new Date(), 'yyyy-MM-dd');
    // Starting from the end of priceHistory, find the next date with data
    for (let i = priceHistory.length - 1; i >= 0; i--) {
      const recentDate = priceHistory[i].trade_timestamp.slice(0, 10);
      // Once the date is not equal to today
      if (recentDate !== today) {
        // For each of the previous date with data, add to prevDayPrices,
        // then exit the loop.
        while (priceHistory[i].trade_timestamp.slice(0, 10) === recentDate) {
          prevDayPrices.push(priceHistory[i]);
          i--;
        }
        break;
      }
    }
  }

  const prevDayAverage = prevDayPrices
    .reduce((acc, curr) => acc.add(curr.price), new Big(0))
    .div(prevDayPrices.length || 1);

  const latestDisplayPrice = dailyPrice.last_price || 1;
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

  const defaultDateFormat = 'dd-MM-yyyy';
  const today = format(new Date(), defaultDateFormat);
  const weekAgo = format(subtractDays(new Date(), 7), defaultDateFormat);
  // Initial load, get most recent blocks
  useEffect(() => {
    getDailyPrice();
    getPriceHistory(weekAgo, today);
    getDailyVolume();
  }, [getDailyPrice, getPriceHistory, today, weekAgo, getDailyVolume]);

  const latestPrice = new Big(dailyPrice.last_price || 0);
  const twentyFourHourVolume = latestPrice.times(dailyVolume || 0);
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
              {`$${formatDenom(dailyPrice.last_price, 'USD', {
                minimumFractionDigits: 3,
              })}    `}
              <HashSpan>
                (
                <PercentChange
                  color={priceIncrease ? theme.POSITIVE_CHANGE : theme.NEGATIVE_CHANGE}
                >
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
