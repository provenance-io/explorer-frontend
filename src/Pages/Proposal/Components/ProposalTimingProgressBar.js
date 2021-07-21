import React from 'react';
import { Content, Loading, Progress } from 'Components';
import { useGovernance } from 'redux/hooks';
import { formatDenom } from 'utils';
import Big from 'big.js';

const ProposalTiming = () => {
  const { proposal, proposalLoading } = useGovernance();

  const { timings } = proposal;
  const current = timings?.deposit?.current;
  const initial = timings?.deposit?.initial;
  const needed = timings?.deposit?.needed;
  const denom = timings?.deposit?.denom;

  const getPercentage = (num = 0, den = 1) => new Big(num).div(den).times(100).toNumber();

  const progressData = [
    {
      color: 'CHART_PIE_C',
      content: () => <span>Current - {formatDenom(current, denom)}</span>,
      value: getPercentage(current, needed),
    },
    {
      color: 'CHART_PIE_F',
      content: () => <span>Initial - {formatDenom(initial, denom)}</span>,
      height: 50,
      value: getPercentage(initial, needed),
    },
  ];

  return (
    <Content title={`Needed - ${formatDenom(needed, denom)}`}>
      {proposalLoading && <Loading />}

      {!proposalLoading && <Progress data={progressData} />}
    </Content>
  );
};

export default ProposalTiming;
