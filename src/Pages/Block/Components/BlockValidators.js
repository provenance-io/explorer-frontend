import React, { useEffect, useState } from 'react';
import { Table } from 'Components';
import { useParams } from 'react-router-dom';
import { useValidators, useApp } from 'redux/hooks';
import { maxLength } from 'utils';

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
  const formattedTableData = tableData.map((dataObj) => {
    const finalObj = {};
    Object.keys(dataObj).forEach((key) => {
      const value = dataObj[key];
      switch (key) {
        case 'moniker':
          finalObj['moniker'] = {
            value,
            link: `/validator/${dataObj.addressId}`,
          };
          break;
        case 'addressId':
          finalObj['operator'] = {
            value: maxLength(value, 11, 3),
            hover: value,
            link: `/validator/${value}`,
          };
          break;
        case 'consensusAddress':
          finalObj['consensus address'] = { value: maxLength(value, 11, 3), hover: value };
          break;
        case 'proposerPriority':
          finalObj['proposer priority'] = { value };
          break;
        case 'votingPower':
          finalObj['voting power'] = { value };
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
      title="Block Validators"
      noResults={`Block ${pageBlockHeight} has no validators`}
    />
  );
};

export default BlockValidators;
