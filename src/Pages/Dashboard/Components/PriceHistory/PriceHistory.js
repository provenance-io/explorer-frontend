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
  const { dailyPrice, priceHistoryLoading, getPriceHistory, priceHistory } = useOrderbook();
  // Make sure we have all the data
  const havePriceHistory = priceHistory.length > 1000;

  // Default view is 30 day history
  const defaultDayFrom = format(subtractDays(today, 29), defaultDateFormat);
  const defaultDayTo = format(today, defaultDateFormat);
  const oldestDate =
    havePriceHistory && new Date(priceHistory[0].trade_timestamp.slice(0, 10).replace(/-/, '/'));

  // There may be cases where there is no priceHistory returned for the current day.
  // If so, use the most recent price as a current value until a new price is
  // available for the current date:
  let data = [...priceHistory];

  if (
    havePriceHistory &&
    // Check if the current date is the last available date in the
    // priceHistory array.
    defaultDayTo !== priceHistory[priceHistory.length - 1].trade_timestamp.slice(0, 10)
  ) {
    const tempData = priceHistory[priceHistory.length - 1];
    // Ensure we get the latest daily price
    tempData.price = dailyPrice.last_price;
    tempData.trade_timestamp = new Date(defaultDayTo).toISOString();
    // If current date is not the last available date in the priceHistory
    // array, then there is no pricing. Add it in temporarily to today.
    data = [...data, tempData];
  }

  const [priceHistoryTo, setPriceHistoryTo] = useState(defaultDayTo);
  const [priceHistoryFrom, setPriceHistoryFrom] = useState(defaultDayFrom);
  const [priceHistoryToGo, setPriceHistoryToGo] = useState(defaultDayTo);
  const [priceHistoryFromGo, setPriceHistoryFromGo] = useState(defaultDayFrom);
  const [filterError, setFilterError] = useState('');

  // Determine/Set Date range in days based on last api search/response
  // 'dayFrom' - 'dayTo' = diff in ms, then 1000ms * 60s * 60min * 24hours = days diff
  const priceHistoryDayRange =
    (new Date(priceHistoryToGo) - new Date(priceHistoryFromGo)) / (1000 * 60 * 60 * 24) + 1;
  const cleanHistoryTo = priceHistoryToGo.replace(/-/g, '/');
  const cleanHistoryFrom = priceHistoryFromGo.replace(/-/g, '/');
  const startDate = new Date(cleanHistoryTo);
  const endDate = new Date(cleanHistoryFrom);

  // On initial load get all the priceHistory
  useEffect(() => {
    getPriceHistory();
  }, [getPriceHistory]);

  // Check for a valid filter before making api call
  const isFilterValid = () => {
    const priceHistoryToDay = new Date(priceHistoryToGo.replace(/-/g, '/'));
    const priceHistoryFromDay = new Date(priceHistoryFromGo.replace(/-/g, '/'));
    // From day must be less than to day and To day must be more than from day
    if (priceHistoryToDay <= priceHistoryFromDay) {
      setFilterError('Filter Error: "To" date must be greater than "From" date.');
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
        onChange: date => date && setPriceHistoryFromGo(format(date, defaultDateFormat)),
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
        onChange: date => date && setPriceHistoryToGo(format(date, defaultDateFormat)),
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
      {havePriceHistory && !priceHistoryLoading ? (
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
