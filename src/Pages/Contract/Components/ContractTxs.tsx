import React, { useState } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';
import { Table, Filters } from '../../../Components';
import { TRANSACTION_STATUS_OPTIONS, breakpoints } from '../../../consts';
import { useContracts } from '../../../redux/hooks';
import { getUTCTime } from '../../../utils';

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
    font-size: 0.75rem;
  }
`;

interface ParamsProps {
  contractId: string;
}

const ContractTxs = () => {
  const defaultDateFormat = 'yyyy-MM-dd';

  const [tableCurrentPage, setTableCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterFrom, setFilterFrom] = useState('');
  const [filterTo, setFilterTo] = useState('');
  const [filterError, setFilterError] = useState('');

  const {
    contractTxs: tableData,
    contractTxsPages: tablePages,
    contractTxsLoading: tableLoading,
    getContractTxs: getTableData,
  } = useContracts();
  const { contractId } = useParams<ParamsProps>();

  const filterToDateClean = filterTo.replace(/-/g, '/');
  const filterFromDateClean = filterFrom.replace(/-/g, '/');
  const startDate = filterTo ? new Date(filterToDateClean) : '';
  const endDate = filterFrom ? new Date(filterFromDateClean) : '';

  // Fetch on page change
  const changePage = (newPage: number) => {
    setTableCurrentPage(newPage);
    getTableData({
      id: contractId,
      page: newPage,
      count: 30,
      status: filterStatus,
      toDate: filterTo,
      fromDate: filterFrom,
    });
  };

  // Use this to check for a reset to 'all' where we will pass '' as the status
  const updateFilterStatus = (newStatus: string) => {
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
      const filterToUTC = filterTo ? getUTCTime(`${filterTo}T00:00:00`, 'yyyy-MM-dd') : '';
      const filterFromUTC = filterFrom ? getUTCTime(`${filterFrom}T00:00:00`, 'yyyy-MM-dd') : '';
      // Fetch new results
      getTableData({
        id: contractId,
        toDate: filterToUTC,
        fromDate: filterFromUTC,
        page: 1,
        count: 30,
        status: filterStatus,
      });
    }
  };

  // Table header values in order
  const tableHeaders = [
    { displayName: 'Tx Hash', dataName: 'txHash' },
    { displayName: 'Tx Type', dataName: 'txMsgType' },
    { displayName: 'Block', dataName: 'block' },
    { displayName: 'Fee', dataName: 'txFee' },
    { displayName: 'Signer', dataName: 'signers' },
    { displayName: 'Status', dataName: 'txStatus' },
    { displayName: 'Timestamp', dataName: 'txTime' },
  ];
  // Data to populate table filters
  const filterData = [
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
        onChange: (date: Date) => setFilterFrom(date ? format(date, defaultDateFormat) : ''),
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
        onChange: (date: Date) => setFilterTo(date ? format(date, defaultDateFormat) : ''),
        selected: startDate,
        dateFormat: defaultDateFormat,
      },
      action: setFilterTo,
    },
  ];

  return (
    <TxListContainer>
      {!tableLoading && (
        <FiltersWrapper>
          {filterError && <FilterError>{filterError}</FilterError>}
          <Filters
            filterData={filterData}
            mustApply={{ title: 'Apply', action: applyFilters }}
            flush
          />
        </FiltersWrapper>
      )}
      <Table
        tableHeaders={tableHeaders}
        tableData={tableData}
        currentPage={tableCurrentPage}
        changePage={changePage}
        totalPages={tablePages}
        isLoading={tableLoading}
        title="Contract Transactions List"
      />
    </TxListContainer>
  );
};

export default ContractTxs;