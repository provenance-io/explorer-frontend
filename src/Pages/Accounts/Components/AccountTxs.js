import React, { useEffect, useState } from 'react';
import { Table } from 'Components';
import { useParams } from 'react-router-dom';
import { useApp, useAccounts } from 'redux/hooks';
import { formatTableData } from 'utils';

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
  const tableHeaders = ['Tx Hash', 'TxType', 'Fee', 'Signer'];
  // Format the raw table data into the form we need it to be displayed
  const formattedTableData = formatTableData(tableData, 'accountTxs');

  return (
    <Table
      tableHeaders={tableHeaders}
      tableData={formattedTableData}
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
