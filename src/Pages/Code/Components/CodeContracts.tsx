import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { Table } from '../../../Components';
import { useContracts } from '../../../redux/hooks';

const ContractsByCodeListContainer = styled.div`
  width: 100%;
`;

interface ParamsProps {
  codeId: string;
}

const ContractsList = () => {
  const [tableCurrentPage, setTableCurrentPage] = useState(1);
  const { codeId } = useParams<ParamsProps>();

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
    { displayName: 'Creator', dataName: 'creator' },
    { displayName: 'Code ID', dataName: 'codeId' },
    { displayName: 'Admin', dataName: 'admin' },
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
