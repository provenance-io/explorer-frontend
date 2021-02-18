import React, { useEffect, useState } from 'react';
import { Table } from 'Components';
import { useParams } from 'react-router-dom';
import { useApp, useAccounts } from 'redux/hooks';

const AccountTxs = () => {
  const [tableCurrentPage, setTableCurrentPage] = useState(1);
  const {
    getAccountTxs: getTableData,
    accountTxsLoading: tableLoading,
    accountTxs: tableData,
    accountTxsPages: tablePages,
  } = useAccounts();
  const { addressId } = useParams();
  const { tableCount } = useApp();

  useEffect(() => {
    getTableData(addressId);
  }, [getTableData, addressId, tableCount, tablePages]);

  // Table header values in order
  const tableHeaders = [
    { displayName: 'Tx Hash', dataName: 'txHash' },
    { displayName: 'TxType', dataName: 'txType' },
    { displayName: 'Fee', dataName: 'fee' },
    { displayName: 'Signer', dataName: 'signer' },
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
      title="Account Transactions"
    />
  );
};

export default AccountTxs;
