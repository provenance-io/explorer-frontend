import React, { useEffect, useState } from 'react';
import { useTxs, useValidators } from 'redux/hooks';
import { Table } from 'Components';

const ValidatorGovernanceTxTable = () => {
  const [tableCurrentPage, setTableCurrentPage] = useState(1);
  const { validatorSpotlight } = useValidators();
  const {
    getTxByModule,
    txByModule: tableData,
    txByModuleLoading: tableLoading,
    txByModulePages: tablePages,
  } = useTxs();

  const { ownerAddress: address } = validatorSpotlight;

  useEffect(() => {
    if (address) {
      getTxByModule({ module: 'GOVERNANCE', address, count: 10, page: tableCurrentPage });
    }
  }, [address, getTxByModule, tableCurrentPage]);

  const tableHeaders = [
    { displayName: 'Tx Hash', dataName: 'txHash' },
    { displayName: 'Block', dataName: 'block' },
    { displayName: 'Status', dataName: 'status' },
    { displayName: 'Fee', dataName: 'fee' },
    { displayName: 'Signer', dataName: 'signers ' },
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
      title="Gov Txs"
    />
  );
};

export default ValidatorGovernanceTxTable;
