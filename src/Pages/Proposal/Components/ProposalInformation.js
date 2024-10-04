import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { useGovernance } from '../../../redux/hooks';
import { Content, DataMissing, Loading, Summary } from '../../../Components';
import { camelToSentence, capitalize, formatDenom, maxLength } from '../../../utils';

const Key = styled.div`
  font-weight: bold;
`;

const Value = styled.span``;

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

  const getDetails = (details, type) => {
    let subDetails = [];
    const detailsArray = Object.entries(details).map(([key, value]) => {
      const title = camelToSentence(key);
      // Remove Type since we take care of it below
      if (title === 'Type') return undefined;
      if (typeof value === 'object' && !Array.isArray(value)) {
        subDetails = getDetails(value);
        return undefined;
      } else {
        const isLink = value.toString().slice(0, 4) === 'http';
        switch (key) {
          case '@type':
            return undefined;
          case 'status':
            return {
              title: 'Marker Status',
              value,
            };
          case 'recipient':
          case 'manager':
            return {
              title,
              value,
              link: `/account/${value}`,
            };
          case 'accessList':
            return {
              title,
              value: JSON.stringify(value),
              isJson: true,
            };
          case 'amount':
            return type === 'CommunityPoolSpend'
              ? {
                  title,
                  value: formatDenom(value[0].amount, value[0].denom),
                }
              : {
                  title,
                  value: maxLength(value, 24, '6'),
                  externalLink: isLink ? value : '',
                };
          case 'changes':
            return {
              title,
              value,
              list: value.map((v) =>
                Object.keys(v).map((item) => (
                  <Key key={v[item]}>
                    {item}:<Value> {v[item]}</Value>
                  </Key>
                ))
              ),
            };
          default:
            return {
              title,
              value: maxLength(value, 24, '6'),
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
    { title: 'Proposal Status', value: capitalize(status?.replace(/proposal_status/gi, '')) },
    { title: 'Proposer', value: moniker || address, link: `/accounts/${address}` },
    { title: 'Type', value: type },
    { title: 'Description', value: description, nobreak: true },
  ].filter((sd) => sd);

  return (
    <Content title="Proposal Information">
      {proposalLoading ? (
        <Loading />
      ) : proposalId ? (
        <Summary
          data={summaryData.concat(
            getDetails(details, type).filter((sd) => sd) /*detailsObj.filter(sd => sd)*/
          )}
        />
      ) : (
        <DataMissing>No information exists for proposal {linkId}</DataMissing>
      )}
    </Content>
  );
};

export default ProposalInformation;
