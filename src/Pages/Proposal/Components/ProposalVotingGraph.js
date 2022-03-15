import React from 'react';
import Big from 'big.js';
import { useGovernance } from 'redux/hooks';
import { Content, Loading, Progress } from 'Components';
import { formatDenom, numberFormat } from 'utils';

const ProposalVotingGraph = () => {
  const { proposalVotes, proposalVotesLoading } = useGovernance();

  const { tally } = proposalVotes;
  const total = formatDenom(...Object.values(tally?.total?.amount || {}));

  const getPercent = amt =>
    new Big(amt)
      .div(Number(tally?.total?.amount?.amount) || 1)
      .times(100)
      .toNumber();

  const yesAmount = tally?.yes?.amount;
  const noAmount = tally?.no?.amount;
  const noWithVetoAmount = tally?.noWithVeto?.amount;
  const abstainAmount = tally?.abstain?.amount;

  const yesPercent = getPercent(yesAmount?.amount || 0);
  const noPercent = getPercent(noAmount?.amount || 0);
  const noWithVetoPercent = getPercent(noWithVetoAmount?.amount || 0);
  const abstainPercent = getPercent(abstainAmount?.amount || 0);

  const noStart = yesPercent;
  const noWithVetoStart = noStart + noPercent;
  const abstainStart = noWithVetoStart + noWithVetoPercent;

  const progressData = [
    // yes
    {
      color: 'CHART_PIE_YES',
      content: () => (
        <div>
          <div>Yes</div>
          <div>{numberFormat(yesPercent)}%</div>
          <div>{formatDenom(...Object.values(yesAmount || {}))}</div>
        </div>
      ),
      value: yesPercent,
    },
    // no
    {
      color: 'CHART_PIE_NO',
      content: () => (
        <div>
          <div>No</div>
          <div>{numberFormat(noPercent)}%</div>
          <div>{formatDenom(...Object.values(noAmount || {}))}</div>
        </div>
      ),
      start: noStart,
      value: noPercent,
    },
    // noWithVeto
    {
      color: 'CHART_PIE_NOWITHVETO',
      content: () => (
        <div>
          <div>NoWithVeto</div>
          <div>{numberFormat(noWithVetoPercent)}%</div>
          <div>{formatDenom(...Object.values(noWithVetoAmount || {}))}</div>
        </div>
      ),
      start: noWithVetoStart,
      value: noWithVetoPercent,
    },
    // abstain
    {
      color: 'CHART_PIE_ABSTAIN',
      content: () => (
        <div>
          <div>Abstain</div>
          <div>{numberFormat(abstainPercent)}%</div>
          <div>{formatDenom(...Object.values(abstainAmount || {}))}</div>
        </div>
      ),
      start: abstainStart,
      value: abstainPercent,
    },
  ];

  return (
    <Content title={proposalVotesLoading ? '' : `Total: ${total}`}>
      {proposalVotesLoading && <Loading />}

      {!proposalVotesLoading && <Progress data={progressData} keySquareHeight={70} />}
    </Content>
  );
};

export default ProposalVotingGraph;
