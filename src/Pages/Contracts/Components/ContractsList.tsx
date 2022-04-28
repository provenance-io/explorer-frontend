import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Table, Filters } from 'Components';
import { useContracts } from 'redux/hooks';

const ContractsListContainer = styled.div`
  width: 100%;
`;
const FiltersWrapper = styled.div`
  position: relative;
  margin-bottom: 18px;
`;

const ContractsList = () => {
  const [tableCurrentPage, setTableCurrentPage] = useState(1);
  const [filterLabel, setFilterLabel] = useState('');
  const [filterCreator, setFilterCreator] = useState('');
  const [filterAdmin, setFilterAdmin] = useState('');

  const {
    contracts: tableData,
    contractsPages: tablePages,
    contractsLoading: tableLoading,
    getContracts: getTableData,
    getContractLabels,
    contractLabels,
  } = useContracts();

  // Initial Fetch of contracts
  useEffect(() => {
    getTableData({
      page: 1,
      count: 30,
      label: '',
      creator: '',
      admin: '',
    });
    getContractLabels();
    // eslint-disable-next-line
  }, [getTableData]);

  // Fetch on page change
  const changePage = (newPage: number) => {
    setTableCurrentPage(newPage);
    getTableData({
      page: newPage,
      count: 30,
      label: filterLabel,
      creator: filterCreator,
      admin: filterAdmin,
    });
  };

  // Apply filters
  const applyFilters = () => {
    setTableCurrentPage(1);
    // Fetch new results
    getTableData({
      page: tableCurrentPage,
      count: 30,
      label: filterLabel,
      creator: filterCreator,
      admin: filterAdmin,
    });
  };

  // Table header values in order
  const tableHeaders = [
    { displayName: 'Address', dataName: 'contractAddress' },
    { displayName: 'Creator', dataName: 'creator' },
    { displayName: 'Creation Height', dataName: 'creationHeight' },
    { displayName: 'Code ID', dataName: 'codeId' },
    { displayName: 'Admin', dataName: 'admin' },
    { displayName: 'Label', dataName: 'label' },
  ];

  // Data to populate table filters
  const filterData = [
    {
      title: 'Creator:',
      type: 'text',
      action: setFilterCreator,
      value: filterCreator,
    },
    {
      title: 'Admin:',
      type: 'text',
      action: setFilterAdmin,
      value: filterAdmin,
    },
    {
      title: 'Label:',
      type: 'text',
      list: contractLabels,
      action: setFilterLabel,
      value: filterLabel,
    },
  ];

  return (
    <ContractsListContainer>
      {!tableLoading && (
        <FiltersWrapper>
          <Filters
            filterData={filterData}
            mustApply={{ title: 'Apply', action: applyFilters }}
            flush
          />
        </FiltersWrapper>
      )}
      <Table
        tableHeaders={tableHeaders}
        tableData={tableData}
        currentPage={tableCurrentPage}
        changePage={changePage}
        totalPages={tablePages}
        isLoading={tableLoading}
        title="Contracts List"
      />
    </ContractsListContainer>
  );
};

export default ContractsList;
