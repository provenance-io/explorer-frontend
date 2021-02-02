import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Table, Filters } from 'Components';
import { useValidators, useApp } from 'redux/hooks';
import { formatTableData } from 'utils';
import { VALIDATOR_TYPE_OPTIONS } from 'consts';

const ValidatorListContainer = styled.div`
  width: 100%;
`;

const ValidatorList = () => {
  const [tableCurrentPage, setTableCurrentPage] = useState(1);
  const [tableFilterType, setTableFilterType] = useState('active');
  const {
    validators: tableData,
    validatorsPages: tablePages,
    validatorsRecentLoading: tableLoading,
    getValidatorsRecent: getTableData,
  } = useValidators();
  const { tableCount } = useApp();

  useEffect(() => {
    getTableData({ page: tableCurrentPage, count: tableCount, type: tableFilterType });
  }, [getTableData, tableCount, tableCurrentPage, tableFilterType]);

  // Table header values in order
  const tableHeaders = [
    'Moniker',
    'Operator',
    'Commission',
    'Bonded Tokens',
    'Voting Power',
    'Uptime',
    'Self Bonded',
    'Delegators',
    'Bond Height',
  ];
  // Format the raw table data into the form we need it to be displayed
  const formattedTableData = formatTableData(tableData, 'validators');
  // Data to populate table filters
  const filterData = [
    {
      title: 'Validator Type:',
      type: 'dropdown',
      options: VALIDATOR_TYPE_OPTIONS,
      action: setTableFilterType,
    },
  ];

  return (
    <ValidatorListContainer>
      <Filters filterData={filterData} />
      <Table
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
