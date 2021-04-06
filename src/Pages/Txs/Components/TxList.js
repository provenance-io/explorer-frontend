import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Table, Filters } from 'Components';
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';
import { TRANSACTION_STATUS_OPTIONS, breakpoints } from 'consts';
import { useTxs, useApp } from 'redux/hooks';
import { getUTCTime } from 'utils';

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

  const [tableCurrentPage, setTableCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterFrom, setFilterFrom] = useState('');
  const [filterTo, setFilterTo] = useState('');
  const [filterError, setFilterError] = useState('');

  const {
    txs: tableData,
    txsPages: tablePages,
    txsRecentLoading: tableLoading,
    getTxsRecent: getTableData,
    txTypes,
    getTxTypes,
    txTypesLoading,
  } = useTxs();
  const { tableCount } = useApp();
  const { blockHeight: pageBlockHeight } = useParams();

  const filterToDateClean = filterTo.replace(/-/g, '/');
  const filterFromDateClean = filterFrom.replace(/-/g, '/');
  const startDate = filterTo ? new Date(filterToDateClean) : '';
  const endDate = filterFrom ? new Date(filterFromDateClean) : '';
  const txTypesExist = Object.keys(txTypes).length > 0;

  // Initial Fetch of tx types (filter)
  useEffect(() => {
    // Only need to fetch them if we haven't pulled them already
    if (!txTypesExist) {
      getTxTypes();
    }
  }, [getTxTypes, txTypesExist]);

  // Initial Fetch of txs
  useEffect(() => {
    getTableData({
      page: 1,
      count: tableCount,
      type: '',
      status: '',
    });
  }, [getTableData, pageBlockHeight, tableCount]);

  // Fetch on page change
  const changePage = (newPage) => {
    setTableCurrentPage(newPage);
    getTableData({
      page: newPage,
      count: tableCount,
      type: filterType,
      status: filterStatus,
      toDate: filterTo,
      fromDate: filterFrom,
    });
  };

  // Use this to check for a reset to 'all' where we will pass '' as the type
  const updateFilterType = (newType) => {
    const finalType = newType === 'allTxTypes' ? '' : newType;
    setFilterType(finalType);
  };
  // Use this to check for a reset to 'all' where we will pass '' as the status
  const updateFilterStatus = (newStatus) => {
    const finalStatus = newStatus === 'all' ? '' : newStatus;
    setFilterStatus(finalStatus);
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
      // Convert the toDate and fromDate from local time to UTC time
      const filterToUTC = filterTo ? getUTCTime(`${filterTo}:00:00:00`, 'yyyy-MM-dd') : '';
      const filterFromUTC = filterFrom ? getUTCTime(`${filterFrom}:00:00:00`, 'yyyy-MM-dd') : '';
      // Fetch new results
      getTableData({
        toDate: filterToUTC,
        fromDate: filterFromUTC,
        page: 1,
        count: tableCount,
        type: filterType,
        status: filterStatus,
      });
    }
  };

  // Table header values in order
  const tableHeaders = [
    { displayName: 'Tx Hash', dataName: 'txHash' },
    { displayName: 'Block', dataName: 'block' },
    { displayName: 'Tx Type', dataName: 'txType' },
    { displayName: 'Fee', dataName: 'fee' },
    { displayName: 'Signer', dataName: 'signers' },
    { displayName: 'Status', dataName: 'status' },
    { displayName: 'Timestamp', dataName: 'time' },
  ];
  // Data to populate table filters
  const filterData = [
    {
      title: 'Type:',
      type: 'dropdown',
      options: txTypes,
      action: updateFilterType,
    },
    {
      title: 'Status:',
      type: 'dropdown',
      options: TRANSACTION_STATUS_OPTIONS,
      action: updateFilterStatus,
    },
    {
      title: 'From:',
      type: 'datepicker',
      options: {
        placeholderText: 'Pick From Date',
        onChange: (date) => setFilterFrom(date ? format(date, defaultDateFormat) : ''),
        selected: endDate,
        dateFormat: defaultDateFormat,
      },
      action: setFilterFrom,
    },
    {
      title: 'To:',
      type: 'datepicker',
      options: {
        placeholderText: 'Pick To Date',
        onChange: (date) => setFilterTo(date ? format(date, defaultDateFormat) : ''),
        selected: startDate,
        dateFormat: defaultDateFormat,
      },
      action: setFilterTo,
    },
  ];

  return (
    <TxListContainer>
      {!txTypesLoading && txTypesExist && (
        <FiltersWrapper>
          {filterError && <FilterError>{filterError}</FilterError>}
          <Filters filterData={filterData} mustApply={{ title: 'Apply', action: applyFilters }} flush />
        </FiltersWrapper>
      )}
      <Table
        tableHeaders={tableHeaders}
        tableData={tableData}
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
