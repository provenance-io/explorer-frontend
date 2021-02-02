import React, { useEffect, useState } from 'react';
import { Table } from 'Components';
import { useApp, useBlocks } from 'redux/hooks';
import { formatTableData } from 'utils';

const BlocksList = () => {
  const [tableCurrentPage, setTableCurrentPage] = useState(1);
  const { tableCount } = useApp();
  const {
    getBlocksRecent: getTableData,
    blocks: tableData,
    getBlockHeight,
    blockPages: tablePages,
    blocksRecentLoading: tableLoading,
  } = useBlocks();

  // Initial load, get latest blocks from API
  useEffect(() => {
    getTableData({ page: tableCurrentPage, count: tableCount });
    // Get the latest block height each time the page changes
    getBlockHeight();
  }, [getTableData, tableCount, tableCurrentPage, getBlockHeight]);

  // Table header values in order
  const tableHeaders = ['Block', 'Proposer', 'Transactions', 'Validators', 'Voting Power', 'Timestamp'];
  const formattedTableData = formatTableData(tableData, 'blocks');
  return (
    <Table
      tableHeaders={tableHeaders}
      tableData={formattedTableData}
      currentPage={tableCurrentPage}
      changePage={setTableCurrentPage}
      totalPages={tablePages}
      isLoading={tableLoading}
      title="Blocks List"
      showAge="timestamp"
    />
  );
};

export default BlocksList;
