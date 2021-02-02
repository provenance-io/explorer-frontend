import React, { useEffect, useState } from 'react';
import { Table } from 'Components';
import { useParams } from 'react-router-dom';
import { useValidators, useApp } from 'redux/hooks';
import { formatTableData } from 'utils';

const BlockValidators = () => {
  const [tableCurrentPage, setTableCurrentPage] = useState(1);
  const {
    getBlockValidators: getTableData,
    blockValidators: tableData,
    blockValidatorsLoading: tableLoading,
    blockValidatorsPages: tablePages,
  } = useValidators();
  const { tableCount } = useApp();
  const { blockHeight: pageBlockHeight } = useParams();

  useEffect(() => {
    getTableData({ blockHeight: pageBlockHeight, page: tableCurrentPage, count: tableCount });
  }, [getTableData, tableCount, tableCurrentPage, pageBlockHeight]);

  // Table header values in order
  const tableHeaders = ['Moniker', 'Operator', 'Consensus Address', 'Proposer Priority', 'Voting Power'];
  // Format the raw table data into the form we need it to be displayed
  const formattedTableData = formatTableData(tableData, 'blockValidators');

  return (
    <Table
      tableHeaders={tableHeaders}
      tableData={formattedTableData}
      currentPage={tableCurrentPage}
      changePage={setTableCurrentPage}
      totalPages={tablePages}
      isLoading={tableLoading}
      showIndex
      title="Block Validators"
    />
  );
};

export default BlockValidators;
