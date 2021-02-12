import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
// import { Table, Filters } from 'Components';
import { TableV2 } from 'Components';
import { useValidators, useApp } from 'redux/hooks';
import { newTableBuilder } from 'utils';
// import { VALIDATOR_STATUS_OPTIONS } from 'consts';

const ValidatorListContainer = styled.div`
  width: 100%;
`;

const ValidatorList = () => {
  const [tableCurrentPage, setTableCurrentPage] = useState(1);
  // const [tableFilterStatus, setTableFilterStatus] = useState('active');
  const {
    validators: tableData,
    validatorsPages: tablePages,
    validatorsRecentLoading: tableLoading,
    getValidatorsRecent: getTableData,
  } = useValidators();
  const { tableCount } = useApp();

  useEffect(() => {
    // getTableData({ page: tableCurrentPage, count: tableCount, status: tableFilterStatus });
    getTableData({ page: tableCurrentPage, count: tableCount });
  }, [getTableData, tableCount, tableCurrentPage]);

  // Table header values in order
  const tableHeaders = {
    Moniker: 'moniker',
    Operator: 'operator',
    Commission: 'commission',
    'Bonded Tokens': 'bondedTokens',
    'Voting Power': 'votingPower',
    Uptime: 'uptime',
    'Self Bonded': 'selfBonded',
    Delegators: 'delegators',
    'Bond Height': 'bondHeight',
  };
  // Format the raw table data into the form we need it to be displayed
  const formattedTableData = newTableBuilder(tableData);
  // Data to populate table filters
  // const filterData = [
  //   {
  //     title: 'Validator Status:',
  //     type: 'dropdown',
  //     options: VALIDATOR_STATUS_OPTIONS,
  //     action: setTableFilterStatus,
  //   },
  // ];

  return (
    <ValidatorListContainer>
      {/* <Filters filterData={filterData} /> */}
      <TableV2
        tableHeaders={tableHeaders}
        tableData={formattedTableData}
        currentPage={tableCurrentPage}
        changePage={setTableCurrentPage}
        totalPages={tablePages}
        isLoading={tableLoading}
        title="Validators List"
        showIndex
      />
    </ValidatorListContainer>
  );
};

export default ValidatorList;
