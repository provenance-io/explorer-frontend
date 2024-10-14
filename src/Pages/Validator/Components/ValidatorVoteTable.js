import React, { useEffect, useState } from 'react';
import { useGovernance, useValidators } from '../../../redux/hooks';
import { Table } from '../../../Components';

const ValidatorVoteTable = () => {
  const [tableCurrentPage, setTableCurrentPage] = useState(1);
  const { validatorSpotlight } = useValidators();
  const {
    getVotesByAddress,
    addressVotes: tableData,
    addressVotesLoading: tableLoading,
    addressVotesPages: tablePages,
  } = useGovernance();

  const { ownerAddress: address } = validatorSpotlight;

  useEffect(() => {
    if (address) {
      getVotesByAddress({ address, count: 10, page: tableCurrentPage });
    }
  }, [address, getVotesByAddress, tableCurrentPage]);

  const tableHeaders = [
    { displayName: 'Proposal ID', dataName: 'proposalId' },
    { displayName: 'Proposal Title', dataName: 'proposalTitle' },
    { displayName: 'Proposal Status', dataName: 'proposalStatus' },
    { displayName: 'Vote/Weight', dataName: 'answer' },
    { displayName: 'TxHash', dataName: 'txHash' },
  ];

  return (
    <Table
      tableHeaders={tableHeaders}
      tableData={tableData}
      currentPage={tableCurrentPage}
      changePage={setTableCurrentPage}
      totalPages={tablePages}
      isLoading={tableLoading}
    />
  );
};

export default ValidatorVoteTable;
