import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { Content, Loading, Filters } from '../../../../Components';
import { useNetwork, useMediaQuery } from '../../../../redux/hooks';
import { breakpoints, GAS_GRANULARITY_OPTIONS } from '../../../../consts';
import { getUTCTime, subtractDays } from '../../../../utils';
import { GasVolumeChart } from './Components';

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

const GasVolume = () => {
  const defaultDateFormat = 'yyyy-MM-dd';
  const today = new Date();
  const defaultDayTo = format(today, defaultDateFormat);
  const defaultDayFrom = format(subtractDays(today, 14), defaultDateFormat);
  const defaultGranularity = 'day';

  const [gasVolumeGran, setGasVolumeGran] = useState(defaultGranularity);
  const [gasVolumeTo, setGasVolumeTo] = useState(defaultDayTo);
  const [gasVolumeFrom, setGasVolumeFrom] = useState(defaultDayFrom);
  const [filterError, setFilterError] = useState('');

  const { networkGasVolume, networkGasVolumeLoading, getNetworkGasVolume } = useNetwork();
  const { matches: sizeSm } = useMediaQuery(breakpoints.down('sm'));
  const { matches: sizeMd } = useMediaQuery(breakpoints.between('sm', 'md'));

  // Determine/Set Date range in days based on last api search/response
  // 'dayFrom' - 'dayTo' = diff in ms, then 1000ms * 60s * 60min * 24hours = days diff
  const gasVolumeDayRange =
    (new Date(gasVolumeTo) - new Date(gasVolumeFrom)) / (1000 * 60 * 60 * 24) + 1;
  const cleanHistoryTo = gasVolumeTo.replace(/-/g, '/');
  const cleanHistoryFrom = gasVolumeFrom.replace(/-/g, '/');
  const startDate = new Date(cleanHistoryTo);
  const endDate = new Date(cleanHistoryFrom);

  // On initial load get the gasVolume for the default time period
  useEffect(() => {
    // Get initial gasVolume
    getNetworkGasVolume({
      toDate: defaultDayTo,
      fromDate: defaultDayFrom,
      granularity: defaultGranularity,
    });
  }, [getNetworkGasVolume, defaultDayTo, defaultDayFrom, defaultGranularity]);

  // Check for a valid filter before making api call
  const isFilterValid = () => {
    const gasVolumeToDay = new Date(gasVolumeTo);
    const gasVolumeFromDay = new Date(gasVolumeFrom);
    // From day must be less than to day and To day must be more than from day
    if (gasVolumeToDay < gasVolumeFromDay) {
      setFilterError('Filter Error: "To" date must be greater than "From" date.');
      return false;
    }
    // Maximum difference between days is 15
    // day - day = diff in ms, (1000ms * 60s * 60min * 24hours = days diff)
    if ((gasVolumeToDay - gasVolumeFromDay) / (1000 * 60 * 60 * 24) > 15) {
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
      const shortToUTC = getUTCTime(`${gasVolumeTo}T00:00:00`, 'yyyy-MM-dd');
      const shortFromUTC = getUTCTime(`${gasVolumeFrom}T00:00:00`, 'yyyy-MM-dd');
      getNetworkGasVolume({
        toDate: shortToUTC,
        fromDate: shortFromUTC,
        granularity: gasVolumeGran,
      });
    }
  };

  const filterData = [
    {
      title: 'From:',
      type: 'datepicker',
      options: {
        placeholderText: 'Select From Date',
        onChange: (date) => date && setGasVolumeFrom(format(date, defaultDateFormat)),
        selected: endDate,
        dateFormat: defaultDateFormat,
        maxDate: subtractDays(startDate, 1), // 15 Days from the start day is the max length of time
      },
      action: setGasVolumeFrom,
    },
    {
      title: 'To:',
      type: 'datepicker',
      options: {
        placeholderText: 'Select To Date',
        onChange: (date) => date && setGasVolumeTo(format(date, defaultDateFormat)),
        selected: startDate,
        dateFormat: defaultDateFormat,
        maxDate: today,
      },
      action: setGasVolumeTo,
    },
    {
      title: 'Granularity:',
      type: 'dropdown',
      options: GAS_GRANULARITY_OPTIONS,
      action: setGasVolumeGran,
    },
  ];

  return (
    <Content
      alignItems="flex-start"
      alignContent="flex-start"
      icon="INVENTORY"
      title={`${gasVolumeDayRange}-Day ${sizeMd || sizeSm ? ' Gas Vol' : 'Gas Volume'} History`}
    >
      <FiltersWrapper>
        {filterError && <FilterError>{filterError}</FilterError>}
        <Filters
          filterData={filterData}
          mustApply={{ title: 'Apply', action: applyFilters }}
          flush
        />
      </FiltersWrapper>
      {networkGasVolumeLoading ? (
        <Loading />
      ) : (
        <GasVolumeChart gasVolumeGran={gasVolumeGran} data={networkGasVolume} />
      )}
    </Content>
  );
};

export default GasVolume;
