import React, { useState } from 'react';
import styled from 'styled-components';
// @ts-ignore
import { useParams } from 'react-router-dom';
import { Table } from 'Components';
import { useContracts } from 'redux/hooks';

const ContractsByCodeListContainer = styled.div`
  width: 100%;
`;

const ContractsList = () => {
  const [tableCurrentPage, setTableCurrentPage] = useState(1);
  const { codeId } = useParams();

  const {
    contractsByCode: tableData,
    contractsByCodePages: tablePages,
    contractsByCodeLoading: tableLoading,
    getContractsByCode: getTableData,
  } = useContracts();

  // Fetch on page change
  const changePage = (newPage: number) => {
    setTableCurrentPage(newPage);
    getTableData({
      id: codeId,
      page: newPage,
      count: 30,
    });
  };

  // Table header values in order
  const tableHeaders = [
    { displayName: 'Contract', dataName: 'contractAddress' },
    { displayName: 'Creation Height', dataName: 'creationHeight' },
    { displayName: 'Code ID', dataName: 'codeId' },
    { displayName: 'Creator', dataName: 'creator' },
    { displayName: 'Admin', dataName: 'admin'},
    { displayName: 'Description', dataName: 'label' },
  ];

  return (
    <ContractsByCodeListContainer>
      <Table
        tableHeaders={tableHeaders}
        tableData={tableData}
        currentPage={tableCurrentPage}
        changePage={changePage}
        totalPages={tablePages}
        isLoading={tableLoading}
        title="Contracts List"
      />
    </ContractsByCodeListContainer>
  );
};

export default ContractsList;
