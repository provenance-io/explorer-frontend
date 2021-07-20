import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Content, Loading } from 'Components';
import { useGovernance } from 'redux/hooks';
import { breakpoints } from 'consts';
import { formatDenom } from 'utils';

const ProgressBar = styled.div`
  position: relative;
  margin-bottom: 8px;
  width: 100%;
  height: 20px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.5) inset;
  background-color: ${({ theme }) => theme.BACKGROUND_LIGHT};
`;

const ProgressValue = styled.span`
  position: absolute;
  left: 0;
  display: block;
  width: ${({ value }) => (value > 100 ? 100 : value)}%;
  height: ${({ initial }) => initial && '50%'};
  max-height: 100%;
  text-indent: -9999px;
  background-color: ${({ initial, theme }) => (initial ? theme.CHART_PIE_A : theme.CHART_PIE_F)};
`;

const Key = styled.p`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin: 0;
  margin-bottom: 0.8rem;

  &:last-child() {
    margin-bottom: 0;
  }

  @media ${breakpoints.up('sm')} {
    margin-right: 1.6rem;

    &:last-child() {
      margin-right: 0;
    }
  }
`;

const KeySquare = styled.span`
  height: 30px;
  width: 30px;
  background-color: ${({ initial, theme }) => (initial ? theme.CHART_PIE_A : theme.CHART_PIE_F)};
`;

const ProposalTiming = () => {
  const { proposal, proposalLoading } = useGovernance();

  const { timings } = proposal;
  const current = timings?.deposit?.current;
  const initial = timings?.deposit?.initial;
  const needed = timings?.deposit?.needed;
  const denom = timings?.deposit?.denom;

  return (
    <Content title={`Needed - ${formatDenom(needed, denom)}`}>
      {proposalLoading && <Loading />}

      {!proposalLoading && (
        <Fragment>
          <ProgressBar>
            <ProgressValue value={(current / needed) * 100 || 0}>
              {formatDenom(current, denom)}
            </ProgressValue>
            <ProgressValue initial value={(initial / needed) * 100 || 0}>
              {formatDenom(initial, denom)}
            </ProgressValue>
          </ProgressBar>
          <Key>
            <KeySquare initial /> Initial - {formatDenom(initial, denom)}
          </Key>
          <Key>
            <KeySquare /> Current - {formatDenom(current, denom)}
          </Key>
        </Fragment>
      )}
    </Content>
  );
};

export default ProposalTiming;
