import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Table, Filters } from 'Components';
import { useParams } from 'react-router-dom';
import { useApp, useTxs } from 'redux/hooks';
import { TRANSACTION_TYPE_OPTIONS, TRANSACTION_STATUS_OPTIONS } from 'consts';

const TxContainer = styled.div`
  width: 100%;
`;

const AccountTxs = () => {
  const [tableCurrentPage, setTableCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const { addressId: address } = useParams();
  const { tableCount } = useApp();
  const {
    getTxsByAddress: getTableData,
    txsByAddressLoading: tableLoading,
    txsByAddress: tableData,
    txsByAddressPages: tablePages,
  } = useTxs();

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

  // Change filters and select apply to see new data
  const applyFilters = () => {
    // Reset page to 1 for new filtered results
    setTableCurrentPage(1);
    // Fetch new results
    getTableData({
      page: 1,
      count: tableCount,
      type: filterType,
      status: filterStatus,
      address,
    });
  };

  // Initial Fetch
  useEffect(() => {
    getTableData({
      page: 1,
      count: tableCount,
      type: '',
      status: '',
      address,
    });
  }, [getTableData, tableCount, address]);
  // Fetch on page change
  const changePage = (newPage) => {
    setTableCurrentPage(newPage);
    getTableData({
      page: newPage,
      count: tableCount,
      type: filterType,
      status: filterStatus,
      address,
    });
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
      options: TRANSACTION_TYPE_OPTIONS,
      action: updateFilterType,
    },
    {
      title: 'Status:',
      type: 'dropdown',
      options: TRANSACTION_STATUS_OPTIONS,
      action: updateFilterStatus,
    },
  ];

  return (
    <TxContainer>
      <Filters filterData={filterData} mustApply={{ title: 'Apply', action: applyFilters }} />
      <Table
        tableHeaders={tableHeaders}
        tableData={tableData}
        currentPage={tableCurrentPage}
        changePage={changePage}
        totalPages={tablePages}
        isLoading={tableLoading}
        showIndex
        title="Account Transactions"
      />
    </TxContainer>
  );
};

export default AccountTxs;
