import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useApp, useGovernance } from '../../../redux/hooks';
import { Table } from '../../../Components';

const ProposalDeposits = () => {
  const { tableCount } = useApp();
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
      getProposalDeposits({ proposalId, count: tableCount, page: currentPage });
    }
  }, [currentPage, getProposalDeposits, proposalId, tableCount]);

  const tableHeaders = [
    { displayName: 'Depositor', dataName: 'voter' },
    { displayName: 'Deposit Type', dataName: 'depositType' },
    { displayName: 'Amount', dataName: 'amount' },
    { displayName: 'Tx Hash', dataName: 'txHash' },
    { displayName: 'Block Height', dataName: 'blockHeight' },
    { displayName: 'Timestamp', dataName: 'txTimestamp' },
  ];

  const tableData = proposalDeposits.map((d) => ({
    ...d,
    depositType: d.type,
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
