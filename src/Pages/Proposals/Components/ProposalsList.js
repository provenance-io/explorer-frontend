import React, { useState, useEffect } from 'react';
import { Table } from 'Components';
import { useGovernance } from 'redux/hooks';

const ProposalsList = () => {
  const [tableCurrentPage, setTableCurrentPage] = useState(1);
  const {
    getAllProposals,
    proposals,
    proposalsLoading: tableLoading,
    proposalsPages: tablePages,
  } = useGovernance();

  const tableData = proposals.map(d => ({ ...d.header, ...d.timings }));

  useEffect(() => {
    getAllProposals();
  }, [getAllProposals]);

  const tableHeaders = [
    { displayName: 'ID', dataName: 'proposalId' },
    { displayName: 'Title', dataName: 'title' },
    { displayName: 'Status', dataName: 'status' },
    { displayName: 'Deposit Percentage', dataName: 'deposit' },
    { displayName: 'Submit Time', dataName: 'submitTime' },
    { displayName: 'Deposit End Time', dataName: 'depositEndTime' },
    { displayName: 'Voting End Time', dataName: 'votingTime.endTime' },
  ];

  return (
    <Table
      tableHeaders={tableHeaders}
      tableData={tableData}
      currentPage={tableCurrentPage}
      changePage={setTableCurrentPage}
      totalPages={tablePages}
      isLoading={tableLoading}
      title="Proposals List"
    />
  );
};

export default ProposalsList;
