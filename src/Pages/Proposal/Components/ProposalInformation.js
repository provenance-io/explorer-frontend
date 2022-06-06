import React from 'react';
import { useParams } from 'react-router';
import { useGovernance } from 'redux/hooks';
import { Content, DataMissing, Loading, Summary } from 'Components';
import { camelToSentence, capitalize, formatDenom } from 'utils';

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

  const getDetails = details => {
    let subDetails = [];
    const detailsArray = Object.entries(details).map(([key, value]) => {
      const title = camelToSentence(key);
      if (typeof value === 'object') {
        subDetails = getDetails(value);
        return undefined;
      } else {
        const isLink = value.slice(0, 4) === 'http';
        switch (key) {
          case '@type':
            return undefined;
          case 'amount':
            return {
              title,
              value: formatDenom(value[0].amount, value[0].denom),
            };
          case 'recipient':
            return {
              title,
              value,
              link: `/account/${value}`,
            };
          default:
            return {
              title,
              value,
              externalLink: isLink ? value : '',
            };
        }
      }
    });
    return detailsArray.concat(subDetails);
  };

  const summaryData = [
    { title: 'ID', value: proposalId },
    { title: 'Title', value: title, nobreak: true },
    { title: 'Status', value: capitalize(status?.replace(/proposal_status/gi, '')) },
    { title: 'Proposer', value: moniker || address },
    { title: 'Type', value: type },
    { title: 'Description', value: description, nobreak: true },
  ].filter(sd => sd);

  return (
    <Content title="Proposal Information">
      {proposalLoading ? (
        <Loading />
      ) : proposalId ? (
        <Summary
          data={summaryData.concat(
            getDetails(details).filter(sd => sd) /*detailsObj.filter(sd => sd)*/
          )}
        />
      ) : (
        <DataMissing>No information exists for proposal {linkId}</DataMissing>
      )}
    </Content>
  );
};

export default ProposalInformation;
