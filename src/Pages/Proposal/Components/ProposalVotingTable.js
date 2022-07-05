import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Table } from 'Components';
import { useGovernance, useApp } from 'redux/hooks';

const ProposalTiming = () => {
  const { proposalId } = useParams();
  const tableCount = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const {
    getVotesByProposal,
    proposalVotes: tableData,
    proposalVotesPages: tablePages,
    proposalVotesTotal,
    proposalVotesLoading: tableLoading,
  } = useGovernance();

  useEffect(() => {
    if (proposalId) {
      getVotesByProposal({
        proposalId,
        count: tableCount,
        page: currentPage,
      });
    }
  }, [getVotesByProposal, proposalId, tableCount, currentPage]);

  const tableHeaders = [
    { displayName: 'Voter', dataName: 'voter' },
    { displayName: 'Tx Hash', dataName: 'txHash' },
    { displayName: 'Vote/Weight', dataName: 'answer' },
    { displayName: 'Block Height', dataName: 'blockHeight' },
    { displayName: 'Timestamp', dataName: 'txTimestamp' },
  ];

  return (
    <Table
      tableHeaders={tableHeaders}
      tableData={tableData}
      currentPage={currentPage}
      changePage={setCurrentPage}
      totalPages={tablePages}
      isLoading={tableLoading}
      title={`Proposal Votes (${proposalVotesTotal})`}
    />
  );
};

export default ProposalTiming;
