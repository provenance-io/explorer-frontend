import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useChain } from '@cosmos-kit/react';
import { useWalletConnect } from "@provenanceio/walletconnect-js";
import { Table, Section as BaseSection, Loading } from '../../../Components';
import { isEmpty } from '../../../utils';
import { ManageProposalModal } from '.';
import { useApp, useGovernance, useProposal } from '../../../redux/hooks';
import { CHAIN_NAME } from '../../../config';

const Section = styled(BaseSection)`
  display: flex;
`;

const ProposalsList = () => {
  const { tableCount, isLoggedIn } = useApp();
  const [tableCurrentPage, setTableCurrentPage] = useState(1);
  const {
    getAllProposals,
    proposals,
    proposalsLoading: tableLoading,
    proposalsPages: tablePages,
  } = useGovernance();
  const { address } = useChain(CHAIN_NAME);
  const { walletConnectState } = useWalletConnect();

  const walletAddress = address ? address : walletConnectState.address;
  const { ManageProposalBtn, modalFns, submitted, setSubmitted } = useProposal();
  const [proposalMax, setProposalMax] = useState(1);

  // Calculate the current max proposal ID
  useEffect(() => {
    if (!isEmpty(proposals) && proposalMax === 1) {
      setProposalMax(proposals[0].header.proposalId + 1);
    }
  }, [proposals, proposalMax]);

  const tableData = proposals.map((d: { header: object; timings: object }) => ({
    ...d.header,
    ...d.timings,
  }));

  useEffect(() => {
    getAllProposals({ count: tableCount, page: tableCurrentPage });
  }, [getAllProposals, tableCount, tableCurrentPage]);

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
    <>
      {isLoggedIn && (
        <Section header>
          {!walletAddress ? <Loading /> : <ManageProposalBtn />}
          <ManageProposalModal
            isLoggedIn={isLoggedIn}
            modalOpen={modalFns.modalOpen}
            onClose={modalFns.deactivateModalOpen}
            proposalId={`${proposalMax}`}
            proposerId={String(walletAddress)}
            submitted={submitted}
            setSubmitted={setSubmitted}
          />
        </Section>
      )}
      <Section header={!isLoggedIn}>
        <Table
          tableHeaders={tableHeaders}
          tableData={tableData}
          currentPage={tableCurrentPage}
          changePage={setTableCurrentPage}
          totalPages={tablePages}
          isLoading={tableLoading}
          title="Proposals List"
        />
      </Section>
    </>
  );
};

export default ProposalsList;
