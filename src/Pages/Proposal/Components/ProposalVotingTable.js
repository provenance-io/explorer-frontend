import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { Table } from 'Components';
import { useGovernance } from 'redux/hooks';

const ProposalTiming = () => {
  const { proposalId } = useParams();
  const { getProposalVotes, proposalVotes, proposalVotesLoading: tableLoading } = useGovernance();

  useEffect(() => {
    if (proposalId) {
      getProposalVotes(proposalId);
    }
  }, [getProposalVotes, proposalId]);

  const { votes: tableData } = proposalVotes;

  const tableHeaders = [
    { displayName: 'Voter', dataName: 'voter' },
    { displayName: 'Tx Hash', dataName: 'txHash' },
    { displayName: 'Answer', dataName: 'answer' },
    { displayName: 'Block Height', dataName: 'blockHeight' },
    { displayName: 'Timestamp', dataName: 'txTimestamp' },
  ];

  return (
    <Table
      tableHeaders={tableHeaders}
      tableData={tableData}
      isLoading={tableLoading}
      title="Proposal Votes"
    />
  );
};

export default ProposalTiming;
