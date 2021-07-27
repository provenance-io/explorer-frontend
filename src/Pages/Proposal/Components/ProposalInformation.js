import React from 'react';
import { useParams } from 'react-router';
import { useGovernance } from 'redux/hooks';
import { Content, DataMissing, Loading, Summary } from 'Components';
import { capitalize } from 'utils';

const ProposalInformation = () => {
  const { proposalId: linkId } = useParams();
  const { proposal, proposalLoading } = useGovernance();

  const {
    header: {
      description,
      details,
      proposalId,
      proposer: { address, moniker },
      status,
      title,
      type,
    },
  } = proposal;

  const summaryData = [
    { title: 'ID', value: proposalId },
    { title: 'Title', value: title, nobreak: true },
    { title: 'Status', value: capitalize(status?.replace(/proposal_status/gi, '')) },
    { title: 'Proposer', value: moniker || address },
    { title: 'Type', value: type },
    { title: 'Description', value: description, nobreak: true },
    details && { title: 'Details', value: JSON.stringify(details), isJson: true },
  ].filter(sd => sd);

  return (
    <Content title="Proposal Information">
      {proposalLoading ? (
        <Loading />
      ) : proposalId ? (
        <Summary data={summaryData} />
      ) : (
        <DataMissing>No information exists for proposal {linkId}</DataMissing>
      )}
    </Content>
  );
};

export default ProposalInformation;
