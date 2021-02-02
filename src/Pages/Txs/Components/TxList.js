import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Table, Filters } from 'Components';
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';
import { TRANSACTION_TYPE_OPTIONS, TRANSACTION_STATUS_OPTIONS, breakpoints } from 'consts';
import { useTxs, useApp } from 'redux/hooks';
import { formatTableData, subtractDays } from 'utils';

const TxListContainer = styled.div`
  width: 100%;
`;
const FiltersWrapper = styled.div`
  position: relative;
  margin-bottom: 18px;
`;
const FilterError = styled.div`
  position: absolute;
  top: -16px;
  left: 0;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT_NORMAL};
  color: ${({ theme }) => theme.FONT_ERROR};
  @media ${breakpoints.between('sm', 'md')} {
    font-size: 1.2rem;
  }
`;

const TxList = () => {
  const defaultDateFormat = 'yyyy-MM-dd';
  const today = new Date();
  const defaultDayTo = format(today, defaultDateFormat);
  const defaultDayFrom = format(subtractDays(today, 13), defaultDateFormat);

  const [tableCurrentPage, setTableCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState('allTxTypes');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterFrom, setFilterFrom] = useState(defaultDayFrom);
  const [filterTo, setFilterTo] = useState(defaultDayTo);
  const [filterError, setFilterError] = useState('');

  const { txs: tableData, txsPages: tablePages, txsRecentLoading: tableLoading, getTxsRecent: getTableData } = useTxs();
  const { tableCount } = useApp();
  const { blockHeight: pageBlockHeight } = useParams();

  const filterToDateClean = filterTo.replace(/-/g, '/');
  const filterFromDateClean = filterFrom.replace(/-/g, '/');
  const startDate = new Date(filterToDateClean);
  const endDate = new Date(filterFromDateClean);

  // Initial Fetch
  useEffect(() => {
    getTableData({
      page: 1,
      count: tableCount,
      type: 'allTxTypes',
      status: 'all',
      toDate: defaultDayTo,
      fromDate: defaultDayFrom,
    });
  }, [getTableData, pageBlockHeight, tableCount, defaultDayFrom, defaultDayTo]);

  // Fetch on page change
  const changePage = (newPage) => {
    setTableCurrentPage(newPage);
    getTableData({
      page: newPage,
      count: tableCount,
      type: filterType,
      status: filterStatus,
      toDate: defaultDayTo,
      fromDate: defaultDayFrom,
    });
  };

  // Check for a valid filter before making api call
  const isFilterValid = () => {
    const filterToDay = new Date(filterTo);
    const filterFromDay = new Date(filterFrom);
    // From day must be less than to day and To day must be more than from day
    if (filterToDay < filterFromDay) {
      setFilterError('Filter Error: "To" date must be greater than "From" date.');
      return false;
    }
    // Maximum difference between days is 15
    // day - day = diff in ms, (1000ms * 60s * 60min * 24hours = days diff)
    if ((filterToDay - filterFromDay) / (1000 * 60 * 60 * 24) > 15) {
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
      // Reset page to 1 for new filtered results
      setTableCurrentPage(1);
      // Fetch new results
      getTableData({
        toDate: filterTo,
        fromDate: filterFrom,
        page: 1,
        count: tableCount,
        type: filterType,
        status: filterStatus,
      });
    }
  };

  // Table header values in order
  const tableHeaders = ['Tx Hash', 'Block', 'Tx Type', 'Fee', 'Signer', 'Status', 'Timestamp'];
  // Format the raw table data into the form we need it to be displayed
  const formattedTableData = formatTableData(tableData, 'transactions');
  // Data to populate table filters
  const filterData = [
    {
      title: 'Type:',
      type: 'dropdown',
      options: TRANSACTION_TYPE_OPTIONS,
      action: setFilterType,
    },
    {
      title: 'Status:',
      type: 'dropdown',
      options: TRANSACTION_STATUS_OPTIONS,
      action: setFilterStatus,
    },
    {
      title: 'From:',
      type: 'datepicker',
      options: {
        placeholderText: 'Select From Date',
        onChange: (date) => setFilterFrom(format(date, defaultDateFormat)),
        selected: endDate,
        dateFormat: defaultDateFormat,
        maxDate: subtractDays(startDate, 1), // 15 Days from the start day is the max length of time
      },
      action: setFilterFrom,
    },
    {
      title: 'To:',
      type: 'datepicker',
      options: {
        placeholderText: 'Select To Date',
        onChange: (date) => setFilterTo(format(date, defaultDateFormat)),
        selected: startDate,
        dateFormat: defaultDateFormat,
        maxDate: today,
      },
      action: setFilterTo,
    },
  ];

  return (
    <TxListContainer>
      <FiltersWrapper>
        {filterError && <FilterError>{filterError}</FilterError>}
        <Filters filterData={filterData} mustApply={{ title: 'Apply', action: applyFilters }} flush />
      </FiltersWrapper>
      <Table
        tableHeaders={tableHeaders}
        tableData={formattedTableData}
        currentPage={tableCurrentPage}
        changePage={changePage}
        totalPages={tablePages}
        isLoading={tableLoading}
        title="Transactions List"
      />
    </TxListContainer>
  );
};

export default TxList;
