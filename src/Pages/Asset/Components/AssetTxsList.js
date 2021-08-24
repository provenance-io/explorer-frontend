import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Table, MultiTable } from 'Components';
import { useApp, useAssets } from 'redux/hooks';

const AssetTxsList = () => {
  const [tableCurrentPageA, setTableCurrentPageA] = useState(1);
  const [tableCurrentPageB, setTableCurrentPageB] = useState(1);
  const [activeTableTab, setActiveTableTab] = useState(0);
  const [tablesLoaded, setTablesLoaded] = useState([]);
  const { assetId } = useParams();
  const {
    getAssetAdminTransactions: getTableDataA,
    assetAdminTransactions: tableDataA,
    assetAdminTransactionsLoading: tableLoadingA,
    assetAdminTransactionsPages: tablePagesA,

    getAssetTransferTransactions: getTableDataB,
    assetTransferTransactions: tableDataB,
    assetTransferTransactionsLoading: tableLoadingB,
    assetTransferTransactionsPages: tablePagesB,
  } = useAssets();
  const { tableCount } = useApp();

  // Load in Table A - only if it's active and hasn't been loaded
  useEffect(() => {
    if (activeTableTab === 0 && !tablesLoaded.includes(0)) {
      setTablesLoaded([...tablesLoaded, 0]);
      getTableDataA({
        page: tableCurrentPageA,
        count: tableCount,
        denom: assetId,
      });
    }
  }, [getTableDataA, assetId, tableCount, tableCurrentPageA, activeTableTab, tablesLoaded]);
  // Load in Table B - only if it's active and hasn't been loaded
  useEffect(() => {
    if (activeTableTab === 1 && !tablesLoaded.includes(1)) {
      setTablesLoaded([...tablesLoaded, 1]);
      getTableDataB({
        page: tableCurrentPageB,
        count: tableCount,
        denom: assetId,
      });
    }
  }, [getTableDataB, assetId, tableCount, tableCurrentPageB, activeTableTab, tablesLoaded]);

  const changePageA = page => {
    setTablesLoaded(tablesLoaded.filter(t => t !== 0));
    setTableCurrentPageA(page);
  };
  const changePageB = page => {
    setTablesLoaded(tablesLoaded.filter(t => t !== 1));
    setTableCurrentPageB(page);
  };

  const tableHeadersA = [
    { displayName: 'TxHash', dataName: 'txHash' },
    { displayName: 'Block', dataName: 'block' },
    { displayName: 'TxType', dataName: 'txType' },
    { displayName: 'Fee', dataName: 'fee' },
    { displayName: 'Signer', dataName: 'signers' },
    { displayName: 'Status', dataName: 'status' },
    { displayName: 'Timestamp', dataName: 'time' },
  ];
  const tableHeadersB = [
    { displayName: 'TxHash', dataName: 'txHash' },
    { displayName: 'Block', dataName: 'block' },
    { displayName: 'TxType', dataName: 'txType' },
    { displayName: 'Fee', dataName: 'fee' },
    { displayName: 'Signer', dataName: 'signers' },
    { displayName: 'Status', dataName: 'status' },
    { displayName: 'Timestamp', dataName: 'time' },
  ];

  return (
    <MultiTable active={activeTableTab} setActive={setActiveTableTab}>
      <Table
        key="Admin Transaction List"
        tableHeaders={tableHeadersA}
        tableData={tableDataA}
        currentPage={tableCurrentPageA}
        changePage={changePageA}
        totalPages={tablePagesA}
        isLoading={tableLoadingA}
        showAge="time"
      />
      <Table
        tableHeaders={tableHeadersB}
        tableData={tableDataB}
        currentPage={tableCurrentPageB}
        changePage={changePageB}
        totalPages={tablePagesB}
        isLoading={tableLoadingB}
        key="Transfer Transaction List"
        showAge="time"
      />
    </MultiTable>
  );
};

export default AssetTxsList;
