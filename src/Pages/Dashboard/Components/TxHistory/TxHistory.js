import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { Content, Loading, Filters } from 'Components';
import { useTxs, useMediaQuery, useNetwork } from 'redux/hooks';
import { breakpoints, TRANSACTION_HISTORY_GRANULARITY_OPTIONS } from 'consts';
import { getUTCTime, subtractDays } from 'utils';
import { TxChart } from './Components';

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

const TxHistory = () => {
  const defaultDateFormat = 'yyyy-MM-dd';
  const today = new Date();
  const defaultDayTo = format(today, defaultDateFormat);
  const defaultDayFrom = format(subtractDays(today, 13), defaultDateFormat);
  const defaultGranularity = 'day';

  const [txHistoryGran, setTxHistoryGran] = useState(defaultGranularity);
  const [txHistoryTo, setTxHistoryTo] = useState(defaultDayTo);
  const [txHistoryFrom, setTxHistoryFrom] = useState(defaultDayFrom);
  const [filterError, setFilterError] = useState('');

  const { txHistoryLoading, getTxHistory } = useTxs();
  const { getNetworkGasVolume } = useNetwork();
  const { matches: sizeSm } = useMediaQuery(breakpoints.down('sm'));
  const { matches: sizeMd } = useMediaQuery(breakpoints.between('sm', 'md'));

  // Determine/Set Date range in days based on last api search/response
  // 'dayFrom' - 'dayTo' = diff in ms, then 1000ms * 60s * 60min * 24hours = days diff
  const txHistoryDayRange =
    (new Date(txHistoryTo) - new Date(txHistoryFrom)) / (1000 * 60 * 60 * 24) + 1;
  const cleanHistoryTo = txHistoryTo.replace(/-/g, '/');
  const cleanHistoryFrom = txHistoryFrom.replace(/-/g, '/');
  const startDate = new Date(cleanHistoryTo);
  const endDate = new Date(cleanHistoryFrom);

  // On initial load get the txHistory for the default time period
  useEffect(() => {
    // Get initial txHistory
    getTxHistory({
      toDate: defaultDayTo,
      fromDate: defaultDayFrom,
      granularity: defaultGranularity,
    });
    // Get initial gasVolume
    getNetworkGasVolume({
      toDate: defaultDayTo,
      fromDate: defaultDayFrom,
      granularity: defaultGranularity,
    });
  }, [getTxHistory, getNetworkGasVolume, defaultDayTo, defaultDayFrom, defaultGranularity]);

  // Check for a valid filter before making api call
  const isFilterValid = () => {
    const txHistoryToDay = new Date(txHistoryTo);
    const txHistoryFromDay = new Date(txHistoryFrom);
    // From day must be less than to day and To day must be more than from day
    if (txHistoryToDay < txHistoryFromDay) {
      setFilterError('Filter Error: "To" date must be greater than "From" date.');
      return false;
    }
    // Maximum difference between days is 15
    // day - day = diff in ms, (1000ms * 60s * 60min * 24hours = days diff)
    if ((txHistoryToDay - txHistoryFromDay) / (1000 * 60 * 60 * 24) > 15) {
      setFilterError('Filter Error: Maximum date range is 15 days.');
      return false;
    }
    return true;
  };

  // Change filters and select apply to see new data
  const applyFilters = () => {
    // Clear out any previous errors
    setFilterError('');
    if (isFilterValid()) {
      // Convert the toDate and fromDate from local time to UTC time
      const shortToUTC = getUTCTime(`${txHistoryTo}T00:00:00`, 'yyyy-MM-dd');
      const shortFromUTC = getUTCTime(`${txHistoryFrom}T00:00:00`, 'yyyy-MM-dd');
      getTxHistory({ toDate: shortToUTC, fromDate: shortFromUTC, granularity: txHistoryGran });
      getNetworkGasVolume({
        toDate: shortToUTC,
        fromDate: shortFromUTC,
        granularity: txHistoryGran,
      });
    }
  };

  const filterData = [
    {
      title: 'From:',
      type: 'datepicker',
      options: {
        placeholderText: 'Select From Date',
        onChange: date => date && setTxHistoryFrom(format(date, defaultDateFormat)),
        selected: endDate,
        dateFormat: defaultDateFormat,
        maxDate: subtractDays(startDate, 1), // 15 Days from the start day is the max length of time
      },
      action: setTxHistoryFrom,
    },
    {
      title: 'To:',
      type: 'datepicker',
      options: {
        placeholderText: 'Select To Date',
        onChange: date => date && setTxHistoryTo(format(date, defaultDateFormat)),
        selected: startDate,
        dateFormat: defaultDateFormat,
        maxDate: today,
      },
      action: setTxHistoryTo,
    },
    {
      title: 'Granularity:',
      type: 'dropdown',
      options: TRANSACTION_HISTORY_GRANULARITY_OPTIONS,
      action: setTxHistoryGran,
    },
  ];

  return (
    <Content
      alignItems="flex-start"
      alignContent="flex-start"
      size={sizeMd || sizeSm ? '100%' : '50%'}
      icon="INVENTORY"
      title={`${txHistoryDayRange}-Day ${sizeMd || sizeSm ? 'Tx' : 'Transaction'} History`}
      link={{ to: '/txs', title: 'View All' }}
    >
      <FiltersWrapper>
        {filterError && <FilterError>{filterError}</FilterError>}
        <Filters
          filterData={filterData}
          mustApply={{ title: 'Apply', action: applyFilters }}
          flush
        />
      </FiltersWrapper>
      {txHistoryLoading ? <Loading /> : <TxChart txHistoryGran={txHistoryGran} />}
    </Content>
  );
};

export default TxHistory;
