import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Table } from 'Components';
import { useContracts } from 'redux/hooks';

const ContractsListContainer = styled.div`
  width: 100%;
`;

const ContractsList = () => {
  const [tableCurrentPage, setTableCurrentPage] = useState(1);

  const {
    contracts: tableData,
    contractsPages: tablePages,
    contractsLoading: tableLoading,
    getContracts: getTableData,
  } = useContracts();

  // Initial Fetch of contracts
  useEffect(() => {
    getTableData({
      page: 1,
      count: 30,
    });
  }, [getTableData]);

  // Fetch on page change
  const changePage = (newPage: number) => {
    setTableCurrentPage(newPage);
    getTableData({
      page: newPage,
      count: 30,
    });
  };

  // Table header values in order
  const tableHeaders = [
    { displayName: 'Address', dataName: 'contractAddress' },
    { displayName: 'Creation Height', dataName: 'creationHeight' },
    { displayName: 'Code ID', dataName: 'codeId' },
    { displayName: 'Creator', dataName: 'creator' },
    { displayName: 'Description', dataName: 'label' },
  ];

  return (
    <ContractsListContainer>
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
