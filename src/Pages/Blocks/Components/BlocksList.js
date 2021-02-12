import React, { useEffect, useState } from 'react';
import { Table } from 'Components';
import { useApp, useBlocks } from 'redux/hooks';
import { maxLength } from 'utils';

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
  const tableHeaders = ['Block', 'Proposer', 'Transactions', 'Validators', 'Voting Power', 'Timestamp'];
  const formattedTableData = tableData.map((dataObj) => {
    const finalObj = {};
    Object.keys(dataObj).forEach((key) => {
      const value = dataObj[key];
      switch (key) {
        case 'height':
          finalObj['block'] = {
            value,
            link: `/block/${value}`,
          };
          break;
        case 'proposerAddress':
          finalObj['proposer'] = {
            value: maxLength(value, 11, 3),
            hover: value,
            link: `/validator/${value}`,
          };
          break;
        case 'txNum':
          finalObj['transactions'] = { value };
          break;
        case 'validatorsNum':
          finalObj['validators'] = finalObj['validators'] || { value: [] };
          finalObj['validators'].value[0] = value;
          finalObj['validators'].value[1] = ' / ';
          break;
        case 'validatorsTotal':
          finalObj['validators'] = finalObj['validators'] || { value: [] };
          finalObj['validators'].value[2] = value;
          break;
        case 'votingPower':
          finalObj['voting power'] = { value: `${value}%` };
          break;
        case 'time':
          finalObj['timestamp'] = { value };
          break;
        default:
          break;
      }
    });
    return finalObj;
  });

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
