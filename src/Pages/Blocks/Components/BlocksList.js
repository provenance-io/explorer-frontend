import React, { useEffect, useState } from 'react';
import { Table } from '../../../Components';
import { useApp, useBlocks } from '../../../redux/hooks';

const BlocksList = () => {
  const [tableCurrentPage, setTableCurrentPage] = useState(1);
  const { tableCount } = useApp();
  const {
    getBlocksRecent: getTableData,
    blocks: tableData,
    getBlocksHeight,
    blockPages: tablePages,
    blocksRecentLoading: tableLoading,
  } = useBlocks();

  // Initial load, get latest blocks from API
  useEffect(() => {
    getTableData({ page: tableCurrentPage, count: tableCount });
    // Get the latest block height each time the page changes
    getBlocksHeight();
  }, [getTableData, tableCount, tableCurrentPage, getBlocksHeight]);

  // Table header values in order
  const tableHeaders = [
    { displayName: 'Block', dataName: 'height' },
    { displayName: 'Proposer', dataName: 'moniker' },
    { displayName: 'Transactions', dataName: 'txNum' },
    { displayName: 'Validators', dataName: 'validatorCount' },
    { displayName: 'Voting Power', dataName: 'votingPower' },
    { displayName: 'Timestamp', dataName: 'time' },
  ];

  return (
    <Table
      tableHeaders={tableHeaders}
      tableData={tableData}
      currentPage={tableCurrentPage}
      changePage={setTableCurrentPage}
      totalPages={tablePages}
      isLoading={tableLoading}
      title="Blocks List"
      showAge="time"
    />
  );
};

export default BlocksList;
