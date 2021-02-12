import React, { useEffect, useState } from 'react';
import { Table } from 'Components';
import { useParams } from 'react-router-dom';
import { useValidators } from 'redux/hooks';
import { maxLength, numberFormat, capitalize } from 'utils';

const ValidationTxs = () => {
  const [tableCurrentPage, setTableCurrentPage] = useState(1);
  const {
    getValidatorTxs: getTableData,
    validatorTxs: tableData,
    validatorTxsLoading: tableLoading,
    validatorTxsPages: tablePages,
  } = useValidators();
  const { validatorId } = useParams();
  // Results to display per page of table
  const tableCount = 5;
  // Fetch table data
  useEffect(() => {
    getTableData({ id: validatorId, page: tableCurrentPage, count: tableCount });
  }, [getTableData, tableCount, tableCurrentPage, validatorId]);
  // Table header values in order
  const tableHeaders = ['TxHash', 'Block', 'Moniker', 'Operator', 'Self Bonded', 'TxType', 'Fee', 'Signer', 'Status', 'Timestamp'];
  // Format the raw table data into the form we need it to be displayed
  const formattedTableData = tableData.map((dataObj) => {
    const finalObj = {};
    Object.keys(dataObj).forEach((key) => {
      const value = dataObj[key];
      switch (key) {
        case 'txHash':
          finalObj['txhash'] = {
            value: maxLength(value, 11, 3),
            link: `/tx/${value}`,
          };
          break;
        case 'block':
          finalObj['block'] = { value, link: `/block/${value}` };
          break;
        case 'moniker':
          finalObj['moniker'] = { value };
          break;
        case 'operator':
          finalObj['operator'] = {
            value: maxLength(value, 11, 3),
          };
          break;
        case 'selfBonded':
          finalObj['self bonded'] = finalObj['self bonded'] || { value: [] };
          finalObj['self bonded'].value[0] = numberFormat(value, 2);
          break;
        case 'selfBondedDenomination':
          finalObj['self bonded'] = finalObj['self bonded'] || { value: [] };
          finalObj['self bonded'].value[1] = value;
          break;
        case 'txType':
          finalObj['txtype'] = { value: capitalize(value) };
          break;
        case 'fee':
          finalObj['fee'] = finalObj['fee'] || { value: [] };
          finalObj['fee'].value[0] = numberFormat(value, 6);
          break;
        case 'feeDenomination':
          finalObj['fee'] = finalObj['fee'] || { value: [] };
          finalObj['fee'].value[1] = value;
          break;
        case 'signer':
          finalObj['signer'] = {
            value: maxLength(value, 11, 3),
            link: `/accounts/${value}`,
          };
          break;
        case 'status':
          finalObj['status'] = { value: capitalize(value) };
          break;
        case 'timestamp':
          finalObj['timestamp'] = { value: `${value}+UTC` };
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
      title="Validation Transactions"
    />
  );
};

export default ValidationTxs;
