import React, { useEffect, useState } from 'react';
import { Table } from 'Components';
import { useParams } from 'react-router-dom';
import { useValidators, useApp } from 'redux/hooks';

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
  const tableHeaders = [
    { displayName: 'Moniker', dataName: 'moniker' },
    { displayName: 'Operator', dataName: 'addressId' },
    { displayName: 'Consensus Address', dataName: 'consensusAddress' },
    { displayName: 'Proposer Priority', dataName: 'proposerPriority' },
    { displayName: 'Voting Power', dataName: 'votingPower' },
  ];

  return (
    <Table
      tableHeaders={tableHeaders}
      tableData={tableData}
      currentPage={tableCurrentPage}
      changePage={setTableCurrentPage}
      totalPages={tablePages}
      isLoading={tableLoading}
      showIndex
      title="Block Validators"
      noResults={`Block ${pageBlockHeight} has no validators`}
    />
  );
};

export default BlockValidators;
