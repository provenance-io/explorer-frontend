import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Table, Filters } from 'Components';
import { useContracts } from 'redux/hooks';

const CodesListContainer = styled.div`
  width: 100%;
`;
const FiltersWrapper = styled.div`
  position: relative;
  margin-bottom: 18px;
`;

const CodesList = () => {
  const [tableCurrentPage, setTableCurrentPage] = useState(1);
  const [filterHasContracts, setFilterHasContracts] = useState('');
  const [filterCreator, setFilterCreator] = useState('');

  const {
    codes: tableData,
    codesPages: tablePages,
    codesLoading: tableLoading,
    getCodes: getTableData,
  } = useContracts();

  // Initial Fetch of codes
  useEffect(() => {
    getTableData({
      page: 1,
      count: 30,
      hasContracts: '',
      creator: '',
    });
  }, [getTableData]);

  // Fetch on page change
  const changePage = (newPage: number) => {
    setTableCurrentPage(newPage);
    getTableData({
      page: newPage,
      count: 30,
      hasContracts: filterHasContracts,
      creator: filterCreator,
    });
  };

  // Use this to transform value of contract status
  const updateFilterHasContracts = (newStatus: string) => {
    const finalStatus = newStatus === 'all' ? '' : newStatus;
    setFilterHasContracts(finalStatus);
  };

  // Apply filters
  const applyFilters = () => {
    setTableCurrentPage(1);
    // Fetch new results
    getTableData({
      page: tableCurrentPage,
      count: 30,
      hasContracts: filterHasContracts,
      creator: filterCreator,
    });
  };

  // Data to populate table filters
  const filterData = [
    {
      title: 'Creator:',
      type: 'text',
      action: setFilterCreator,
      value: filterCreator,
    },
    {
      title: 'Status:',
      type: 'dropdown',
      options: {
        all: { title: 'All', isDefault: filterHasContracts === '' },
        true: { title: 'Has Contracts', isDefault: filterHasContracts === 'true' },
        false: { title: 'No Contracts', isDefault: filterHasContracts === 'false' },
      },
      action: updateFilterHasContracts,
    },
  ];

  // Table header values in order
  const tableHeaders = [
    { displayName: 'Code ID', dataName: 'codeId' },
    { displayName: 'Creation Height', dataName: 'creationHeight' },
    { displayName: 'Creator', dataName: 'creator' },
    { displayName: 'Contracts', dataName: 'contractCount' },
    { displayName: 'Data Hash', dataName: 'dataHash' },
  ];

  return (
    <CodesListContainer>
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
        title="Codes List"
      />
    </CodesListContainer>
  );
};

export default CodesList;
