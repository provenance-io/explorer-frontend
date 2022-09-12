import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Content, Loading, Filters } from 'Components';
import { useOrderbook } from 'redux/hooks';
import { subtractDays } from 'utils';
import styled from 'styled-components';
import { breakpoints } from 'consts';
import { PriceChart } from './Components';

const FiltersWrapper = styled.div`
  position: relative;
`;

const FilterError = styled.div`
  position: relative;
  top: -16px;
  left: 0;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT_NORMAL};
  color: ${({ theme }) => theme.FONT_ERROR};
  @media ${breakpoints.between('sm', 'md')} {
    font-size: 1.2rem;
  }
`;

const PriceHistory = () => {
  const today = new Date();
  const defaultDateFormat = 'yyyy-MM-dd';
  const {
    getHistoricalPricing,
    historicalPricing,
    historicalPricingLoading,
    getCurrentPricing,
    currentPricing,
    currentPricingLoading,
  } = useOrderbook();
  // Make sure we have all the data
  const havePriceHistory = historicalPricing.length > 0;

  // Default view is 14 day history
  const defaultDayFrom = format(subtractDays(today, 13), defaultDateFormat);
  const defaultDayTo = format(today, defaultDateFormat);
  const oldestDate =
    havePriceHistory &&
    new Date((historicalPricing[0].time_close as string).slice(0, 10).replace(/-/, '/'));

  // Build the current price to resemble the historical price format
  let currPrice = {};
  if (!currentPricingLoading && currentPricing.last_updated) {
    currPrice = {
      quote: {
        USD: {
          close: currentPricing.quote.USD?.price,
          high: currentPricing.quote.USD?.price,
          low: currentPricing.quote.USD?.price,
          market_cap: currentPricing.quote.USD?.market_cap,
          open: currentPricing.quote.USD?.price,
          timestamp: new Date(currentPricing.last_updated).toISOString(),
          volume: currentPricing.quote.USD?.volume_change_24h,
        },
      },
      time_close: new Date(currentPricing.last_updated).toISOString(),
      time_high: new Date(currentPricing.last_updated).toISOString(),
      time_low: new Date(currentPricing.last_updated).toISOString(),
      time_open: new Date(currentPricing.last_updated).toISOString(),
    };
  }

  // Add the current pricing to the historical pricing array
  const data = JSON.parse(JSON.stringify(historicalPricing));
  if (havePriceHistory && !currentPricingLoading) {
    data.push(currPrice);
  }

  const [priceHistoryTo, setPriceHistoryTo] = useState(defaultDayTo);
  const [priceHistoryFrom, setPriceHistoryFrom] = useState(defaultDayFrom);
  const [priceHistoryToGo, setPriceHistoryToGo] = useState(defaultDayTo);
  const [priceHistoryFromGo, setPriceHistoryFromGo] = useState(defaultDayFrom);
  const [filterError, setFilterError] = useState('');

  // Determine/Set Date range in days based on last api search/response
  // 'dayFrom' - 'dayTo' = diff in ms, then 1000ms * 60s * 60min * 24hours = days diff
  const priceHistoryDayRange =
    (Number(new Date(priceHistoryToGo)) - Number(new Date(priceHistoryFromGo))) /
      (1000 * 60 * 60 * 24) +
    1;
  const cleanHistoryTo = priceHistoryToGo.replace(/-/g, '/');
  const cleanHistoryFrom = priceHistoryFromGo.replace(/-/g, '/');
  const startDate = new Date(cleanHistoryTo);
  const endDate = new Date(cleanHistoryFrom);

  // On initial load get all the historical pricing
  useEffect(() => {
    getHistoricalPricing({
      startTime: '',
      endTime: '',
    });
    getCurrentPricing();
  }, [getHistoricalPricing, getCurrentPricing]);

  // Check for a valid filter before making api call
  const isFilterValid = () => {
    const priceHistoryToDay = new Date(priceHistoryToGo.replace(/-/g, '/'));
    const priceHistoryFromDay = new Date(priceHistoryFromGo.replace(/-/g, '/'));
    // From day must be less than to day and To day must be more than from day
    if (priceHistoryToDay <= priceHistoryFromDay) {
      setFilterError('Filter Error: "To" date must be greater than "From" date.');
      return false;
    }
    if (subtractDays(priceHistoryToDay, 7) < priceHistoryFromDay) {
      setFilterError('Filter Error: "Date range must be at least 7 days.');
      return false;
    }
    return true;
  };

  // Change filters and select apply to see new data
  const applyFilters = () => {
    // Clear out any previous errors
    setFilterError('');
    if (isFilterValid()) {
      setPriceHistoryFrom(priceHistoryFromGo);
      setPriceHistoryTo(priceHistoryToGo);
      return true;
    }
    return false;
  };

  const filterData = [
    {
      title: 'From:',
      type: 'datepicker',
      options: {
        placeholderText: 'Select From Date',
        onChange: (date: Date) => date && setPriceHistoryFromGo(format(date, defaultDateFormat)),
        selected: endDate,
        dateFormat: defaultDateFormat,
        minDate: havePriceHistory ? oldestDate : endDate,
        maxDate: subtractDays(startDate, 1),
      },
      action: setPriceHistoryFromGo,
    },
    {
      title: 'To:',
      type: 'datepicker',
      options: {
        placeholderText: 'Select To Date',
        onChange: (date: Date) => date && setPriceHistoryToGo(format(date, defaultDateFormat)),
        selected: startDate,
        dateFormat: defaultDateFormat,
        minDate: havePriceHistory ? subtractDays(oldestDate, -1) : endDate,
        maxDate: today,
      },
      action: setPriceHistoryToGo,
    },
  ];

  return (
    <Content
      alignItems="flex-start"
      alignContent="flex-start"
      icon="HASH"
      title={filterError ? 'Hash Price History' : `${priceHistoryDayRange}-Day Hash Price History`}
    >
      {havePriceHistory && !historicalPricingLoading && !currentPricingLoading ? (
        <>
          <FiltersWrapper>
            {filterError && <FilterError>{filterError}</FilterError>}
            <Filters
              filterData={filterData}
              mustApply={{ title: 'Apply', action: applyFilters }}
              flush
            />
          </FiltersWrapper>
          <PriceChart startDate={priceHistoryTo} endDate={priceHistoryFrom} data={data} />
        </>
      ) : (
        <Loading />
      )}
    </Content>
  );
};

export default PriceHistory;
