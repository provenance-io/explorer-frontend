import React, { useEffect } from 'react';
import styled, { useTheme } from 'styled-components';
import { Content, Loading, DataCard } from 'Components';
import { formatDenom } from 'utils';
import { useInterval, useMediaQuery, useOrderbook } from 'redux/hooks';
import { breakpoints, polling } from 'consts';

const HashSpan = styled.p`
  margin: 0;
  padding: 0;
  margin-top: 5px;
`;
const PercentChange = styled.span`
  color: ${({ color }) => color};
  font-weight: bold;
`;

const HashDashboard = () => {
  const {
    getCurrentPricing,
    currentPricing,
    historicalPricingLoading,
    currentPricingLoading,
    historicalPricingFailed,
    currentPricingFailed,
  } = useOrderbook();

  const theme = useTheme();

  const { matches: isSmall } = useMediaQuery(breakpoints.down('sm'));

  // Initial load, get most recent blocks
  useEffect(() => {
    getCurrentPricing();
  }, [getCurrentPricing]);

  // Pull current pricing every 5 minutes
  useInterval(() => getCurrentPricing(), polling.latestPrice, currentPricingFailed);

  const latestPrice = currentPricing.quote.USD?.price || 0;
  const priceChange = currentPricing.quote.USD?.percent_change_24h || 0;
  const twentyFourHourVolume = currentPricing.quote.USD?.volume_24h;
  const marketCap = currentPricing.quote.USD?.market_cap_by_total_supply;

  return (
    <Content
      justify="center"
      alignItems="flex-start"
      icon="HASH"
      title="Hash Value"
      size={isSmall ? '100%' : '40%'}
    >
      {currentPricingLoading &&
        historicalPricingLoading &&
        !currentPricing.last_updated &&
        !priceChange && <Loading />}
      {currentPricingFailed && historicalPricingFailed && (
        <div>Hash data failed to load, refresh page to try again</div>
      )}
      {!currentPricingLoading && !currentPricingFailed ? (
        <>
          <DataCard icon="PRICE" title="Latest Price (USD)" width="100%">
            <>
              {`$${formatDenom(latestPrice, '', {
                minimumFractionDigits: 3,
              })}    `}
              <HashSpan>
                24 hour change:{' '}
                <PercentChange
                  color={priceChange >= 0 ? theme.POSITIVE_CHANGE : theme.NEGATIVE_CHANGE}
                >
                  {priceChange ? priceChange.toFixed(1) : 0}%
                </PercentChange>
              </HashSpan>
            </>
          </DataCard>
          <DataCard icon="LINE_CHART" title="Hash Market Cap" width="100%">
            {`$${formatDenom(Number(marketCap), 'USD', {
              shorthand: true,
              decimal: 2,
            })}`}
          </DataCard>
          <DataCard icon="CALENDAR" title="24hr Volume (USD)" width="100%">
            {`$${formatDenom(Number(twentyFourHourVolume), '', {
              shorthand: true,
              decimal: 2,
            })}`}
          </DataCard>
        </>
      ) : (
        <Loading />
      )}
    </Content>
  );
};

export default HashDashboard;
