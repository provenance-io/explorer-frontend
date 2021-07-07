import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useGovernance } from 'redux/hooks';
import { Table } from 'Components';

const RESULTS_PER_PAGE = 10;

const ProposalDeposits = () => {
  const { proposalId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const {
    getProposalDeposits,
    proposalDeposits,
    proposalDepositsLoading: tableLoading,
    proposalDepositsPages: tablePages,
  } = useGovernance();

  useEffect(() => {
    if (proposalId) {
      getProposalDeposits({ proposalId, count: RESULTS_PER_PAGE, page: currentPage });
    }
  }, [currentPage, getProposalDeposits, proposalId]);

  const tableHeaders = [
    { displayName: 'Depositor', dataName: 'moniker' },
    { displayName: 'Deposit Type', dataName: 'depositType' },
    { displayName: 'Amount', dataName: 'amount' },
    { displayName: 'Tx Hash', dataName: 'txHash' },
    { displayName: 'Block Height', dataName: 'blockHeight' },
    { displayName: 'Timestamp', dataName: 'txTimestamp' },
  ];

  const tableData = proposalDeposits.map(d => ({
    ...d,
    depositType: d.type,
    moniker: d.voter.moniker || d.voter.address,
  }));

  return (
    <Table
      tableHeaders={tableHeaders}
      tableData={tableData}
      currentPage={currentPage}
      changePage={setCurrentPage}
      totalPages={tablePages}
      isLoading={tableLoading}
      title="Proposal Deposits"
    />
  );
};

export default ProposalDeposits;
