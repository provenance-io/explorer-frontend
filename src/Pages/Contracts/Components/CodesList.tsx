import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Table } from 'Components';
import { useContracts } from 'redux/hooks';

const CodesListContainer = styled.div`
  width: 100%;
`;

const CodesList = () => {
  const [tableCurrentPage, setTableCurrentPage] = useState(1);

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
    { displayName: 'Code ID', dataName: 'codeId' },
    { displayName: 'Creation Height', dataName: 'creationHeight' },
    { displayName: 'Creator', dataName: 'creator' },
    { displayName: 'Data Hash', dataName: 'dataHash' },
  ];

  return (
    <CodesListContainer>
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
