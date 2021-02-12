import React, { useEffect, useState } from 'react';
import { Table } from 'Components';
import { useParams } from 'react-router-dom';
import { useApp, useTxs } from 'redux/hooks';
import { maxLength, capitalize, numberFormat } from 'utils';

const BlockTxs = () => {
  const [tableCurrentPage, setTableCurrentPage] = useState(1);
  const {
    getTxsByBlock: getTableData,
    txsByBlock: tableData,
    txsByBlockPages: tablePages,
    txsByBlockLoading: tableLoading,
  } = useTxs();
  const { blockHeight: pageBlockHeight } = useParams();
  const { tableCount } = useApp();

  useEffect(() => {
    getTableData(pageBlockHeight);
  }, [getTableData, pageBlockHeight, tableCount, tablePages]);

  // Table header values in order
  const tableHeaders = ['Tx Hash', 'Tx Type', 'Fee', 'Signer'];
  // Format the raw table data into the form we need it to be displayed
  const formattedTableData = tableData.map((dataObj) => {
    const finalObj = {};
    Object.keys(dataObj).forEach((key) => {
      const value = dataObj[key];
      switch (key) {
        case 'txHash':
          finalObj['tx hash'] = {
            value: maxLength(value, 11, 3),
            link: `/tx/${value}`,
          };
          break;
        case 'txType':
          finalObj['tx type'] = { value: capitalize(value) };
          break;
        case 'fee':
          finalObj['fee'] = { value: numberFormat(value) };
          break;
        case 'signer':
          finalObj['signer'] = {
            value: maxLength(value, 11, 3),
            link: `validator/${value}`,
          };
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
      showIndex
      title="Block Transactions"
      noResults={`Block ${pageBlockHeight} has no transactions`}
    />
  );
};

export default BlockTxs;
