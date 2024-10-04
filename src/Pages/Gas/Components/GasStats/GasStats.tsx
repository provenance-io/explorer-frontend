// @ts-nocheck
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { Content, Loading, Filters, Section } from 'Components';
import { useNetwork, useMediaQuery, useTxs } from 'redux/hooks';
import { breakpoints, GAS_GRANULARITY_OPTIONS } from 'consts';
import { getUTCTime, subtractDays, capitalize, isEmpty } from 'utils';
import { GasStatsChart } from './Components';

const FiltersWrapper = styled.div`
  position: relative;
  margin-bottom: 20px;
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

const GasStats = () => {
  const defaultDateFormat = 'yyyy-MM-dd';
  const today = new Date();
  const defaultDayTo = format(today, defaultDateFormat);
  const defaultDayFrom = format(subtractDays(today, 14), defaultDateFormat);
  const defaultGranularity = 'day';

  const { networkGasStats, networkGasStatsLoading, getNetworkGasStats } = useNetwork();
  const { txTypes, txTypesLoading, getTxTypes } = useTxs();
  const { matches: sizeSm } = useMediaQuery(breakpoints.down('sm'));
  const { matches: sizeMd } = useMediaQuery(breakpoints.between('sm', 'md'));

  const [gasStatsGran, setGasStatsGran] = useState(defaultGranularity);
  const [gasStatsTo, setGasStatsTo] = useState(defaultDayTo);
  const [gasStatsFrom, setGasStatsFrom] = useState(defaultDayFrom);
  const [filterError, setFilterError] = useState('');
  const [filterType, setFilterType] = useState('send');
  const [plotType, setPlotType] = useState('line');
  const [filterTypeTo, setFilterTypeTo] = useState('send');
  const [plotTypeTo, setPlotTypeTo] = useState('line');

  // Determine/Set Date range in days based on last api search/response
  // 'dayFrom' - 'dayTo' = diff in ms, then 1000ms * 60s * 60min * 24hours = days diff
  const gasStatsDayRange =
    (Number(new Date(gasStatsTo)) - Number(new Date(gasStatsFrom))) / (1000 * 60 * 60 * 24) + 1;
  const cleanHistoryTo = gasStatsTo.replace(/-/g, '/');
  const cleanHistoryFrom = gasStatsFrom.replace(/-/g, '/');
  const startDate = new Date(cleanHistoryTo);
  const endDate = new Date(cleanHistoryFrom);

  // Check if txTypes exist
  const txTypesExist = !isEmpty(txTypes);

  // On initial load get the gasStats for the default time period
  useEffect(() => {
    // Get initial gasStats
    getNetworkGasStats({
      toDate: defaultDayTo,
      fromDate: defaultDayFrom,
      granularity: defaultGranularity,
    });
  }, [getNetworkGasStats, defaultDayTo, defaultDayFrom, defaultGranularity]);

  // Initial Fetch of tx types (filter)
  useEffect(() => {
    // Only need to fetch them if we haven't pulled them already
    if (!txTypesExist) {
      getTxTypes();
    }
  }, [getTxTypes, txTypesExist]);

  // Use this to check for a reset to 'all' where we will pass '' as the type
  const updateFilterType = (newType: string) => {
    const finalType = newType === 'allTxTypes' ? '' : newType;
    setFilterTypeTo(finalType);
  };

  const updatePlotType = (newType: string) => {
    const finalType = newType === 'allTxTypes' ? '' : newType;
    setPlotTypeTo(finalType);
  };

  // Check for a valid filter before making api call
  const isFilterValid = () => {
    const gasStatsToDay = new Date(gasStatsTo);
    const gasStatsFromDay = new Date(gasStatsFrom);
    // From day must be less than to day and To day must be more than from day
    if (gasStatsToDay < gasStatsFromDay) {
      setFilterError('Filter Error: "To" date must be greater than "From" date.');
      return false;
    }
    // Maximum difference between days is 15
    // day - day = diff in ms, (1000ms * 60s * 60min * 24hours = days diff)
    if ((Number(gasStatsToDay) - Number(gasStatsFromDay)) / (1000 * 60 * 60 * 24) > 30) {
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
      const shortToUTC = getUTCTime(`${gasStatsTo}T00:00:00`, 'yyyy-MM-dd');
      const shortFromUTC = getUTCTime(`${gasStatsFrom}T00:00:00`, 'yyyy-MM-dd');
      getNetworkGasStats({
        toDate: shortToUTC,
        fromDate: shortFromUTC,
        granularity: gasStatsGran,
      });
      // Set filterType and plotType
      setFilterType(filterTypeTo);
      setPlotType(plotTypeTo);
    }
  };

  // Set default to transfer
  const gasTxTypes = JSON.parse(JSON.stringify(txTypes)); // create a mutable copy
  if (txTypesExist) {
    gasTxTypes.allTxTypes.isDefault = false;
    gasTxTypes.transfer.isDefault = true;
    if (gasTxTypes.transfer.options) {
      gasTxTypes.transfer.options.send.isDefault = true;
    };
  };

  const filterData = [
    {
      title: 'From:',
      type: 'datepicker',
      options: {
        placeholderText: 'Select From Date',
        onChange: (date: Date) => date && setGasStatsFrom(format(date, defaultDateFormat)),
        selected: endDate,
        dateFormat: defaultDateFormat,
        maxDate: subtractDays(startDate, 1), // 15 Days from the start day is the max length of time
      },
      action: setGasStatsFrom,
    },
    {
      title: 'To:',
      type: 'datepicker',
      options: {
        placeholderText: 'Select To Date',
        onChange: (date: Date) => date && setGasStatsTo(format(date, defaultDateFormat)),
        selected: startDate,
        dateFormat: defaultDateFormat,
        maxDate: today,
      },
      action: setGasStatsTo,
    },
    {
      title: 'Granularity:',
      type: 'dropdown',
      options: GAS_GRANULARITY_OPTIONS,
      action: setGasStatsGran,
    },
    {
      title: 'Message Type:',
      type: 'dropdown',
      maxHeight: '30rem',
      options: gasTxTypes, //txTypesAll,
      setDefaults: {
        Filter: 'Send',
        Folder: 'Transfer',
        FilterTitle: 'Send',
      },
      action: updateFilterType,
    },
    {
      title: 'Plot Type:',
      type: 'dropdown',
      options: {
        line: { title: 'Line', isDefault: true },
        bar: { title: 'Bar' },
      },
      action: updatePlotType,
    },
  ];

  // Ensure message type exists
  let messageDataExists = false;
  for (let i = 0; i < networkGasStats.length; i++) {
    if (networkGasStats[i].messageType === filterType) {
      messageDataExists = true;
    }
  }

  return (
    <Content
      alignItems="flex-start"
      alignContent="flex-start"
      icon="INVENTORY"
      title={`${gasStatsDayRange}-Day ${
        sizeMd || sizeSm
          ? ' Gas Stats'
          : `Gas Stats for 
            ${filterType ? capitalize(filterType) : 'All'} Messages`
      } `}
    >
      {!txTypesLoading && txTypesExist && (
        <FiltersWrapper>
          {filterError && <FilterError>{filterError}</FilterError>}
          <Filters
            filterData={filterData}
            mustApply={{ title: 'Apply', action: applyFilters }}
            flush
          />
        </FiltersWrapper>
      )}
      {networkGasStatsLoading ? (
        <Loading />
      ) : messageDataExists || !filterType ? (
        <GasStatsChart
          gasStatsGran={gasStatsGran}
          data={networkGasStats}
          msgType={filterType}
          plotType={plotType}
        />
      ) : (
        <Section>{`No data exists for ${filterType} message type`}</Section>
      )}
    </Content>
  );
};

export default GasStats;
