import React from 'react';
import { Table } from '../../../Components';
import { useGovernance } from '../../../redux/hooks';

const ProposalTiming = () => {
  const { proposal, proposalLoading } = useGovernance();

  const { timings } = proposal;

  const tableHeaders = [
    { displayName: 'Submit Time', dataName: 'submitTime' },
    { displayName: 'Deposit End Time', dataName: 'depositEndTime' },
    { displayName: 'Voting Start Time', dataName: 'votingTime.startTime' },
    { displayName: 'Voting End Time', dataName: 'votingTime.endTime' },
  ];

  return (
    <Table
      tableHeaders={tableHeaders}
      tableData={[timings]}
      isLoading={proposalLoading}
      title="Proposal Timing"
    />
  );
};

export default ProposalTiming;
