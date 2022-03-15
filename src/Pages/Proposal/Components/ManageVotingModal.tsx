import React, { Fragment, useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import SelectFolders from 'Components/SelectFolders';
import OgButton from 'Components/Button';
import Sprite from 'Components/Sprite';
import Modal from 'Components/Modal';
import { useGovernance } from 'redux/hooks';
import { MY_VOTE_OPTIONS } from 'consts';
import { isEmpty } from 'utils';
import VotingChart from "./VotingChart";

const MainTitle = styled.div`
  font-weight: ${({ theme }) => theme.FONT_WEIGHT_BOLD};
  margin: 5px 0 20px 0;
  font-size: 2.0rem;
  text-align: center;
`;

const Description = styled.div`
  color: ${({ theme }) => theme.FONT_TITLE_INFO};
  font-style: italic;
  max-width: 500px;
  margin: 0 auto;
  margin-bottom: 5px;
`;

const Info = styled.div`
  margin: 1.6rem 0;
`;

const Pair = styled.div`
  padding-bottom: 1.6rem;
`;

const PairTitle = styled.div`
  font-size: 1.6rem;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT_BOLD};
  line-height: 1.75;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const Button = styled(OgButton)`
  text-transform: capitalize;
`;

const Disclaimer = styled.div`
  display: flex;
  margin: 1.6rem 0;
  padding: 20px;
  border: ${({ theme }) => theme.FONT_ERROR}
    1px solid;
  border-radius: 0.6rem;
  color: ${({ theme }) => theme.FONT_ERROR};
`;

const DisclaimerIcon = styled.div`
  margin: 5px 20px 0 0;
`;

const DisclaimerTitle = styled.h3`
  && {
    margin: 0;
    font-size: 1.5rem;
    font-weight: ${({ theme }) => theme.FONT_WEIGHT_BOLD};
    line-height: 2.4rem;
  }
`;

interface ManageVotingProps {
  isLoggedIn: boolean;
  modalOpen: boolean;
  onClose: Function;
  onVoting: Function;
  proposalId: string,
  description: string,
  voterId: string,
  title: string,
}

const ManageVotingModal = ({
  isLoggedIn,
  modalOpen,
  onClose,
  onVoting,
  proposalId,
  description,
  voterId,
  title,
}: ManageVotingProps) => {
  // Add calcs for current number of votes
  // Add current vote totals to page, perhaps without querying since it's already on the page from ProposalVotingGraph
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [vote, setVote] = useState('');
  const { proposalVotes, proposal } = useGovernance();
  const { timings } = proposal;
  const { tally } = proposalVotes;
  const [warning, setWarning] = useState(false);
  const [timeout, setTimeout] = useState(false);

  useEffect(() => {
    if (!modalOpen) setVote('');
  }, [modalOpen]);

  useEffect(() => {
    setIsOpen(isLoggedIn && modalOpen);
  }, [isLoggedIn, modalOpen]);

  const handleModalClose = () => {
    setVote('');
    onClose();
  };

  const handleClick = (vote: string) => {
    setVote(vote);
  };

  const handleVoting = () => {
    if (!isEmpty(timings) && (new Date().getTime()) > (new Date(timings.depositEndTime).getTime())) {
      setTimeout(true);
    }
    else if (!vote || vote === "--") {
      setWarning(true);
    }
    else {
      setWarning(false);
      onVoting(proposalId, voterId, vote);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleModalClose}>
      <Fragment>
        <Info>
          <MainTitle>Voting on: <b>{title}</b></MainTitle>
          <PairTitle>Proposal ID</PairTitle>
          <Description>{proposalId}</Description>
          <PairTitle>Description</PairTitle>
          <Description>{description}</Description>
        </Info>
        <Pair>
          <PairTitle>Current Vote Tallies:</PairTitle>
        </Pair>
        {!isEmpty(tally) && <VotingChart voteData={tally} proposalId={proposalId} />}
        <ButtonGroup>
          <SelectFolders
            allOptions={MY_VOTE_OPTIONS}
            action={handleClick}
          />
          <Button onClick={handleVoting}>Submit Vote</Button>
        </ButtonGroup>
        {(warning || timeout) && (
          <Disclaimer>
            <DisclaimerIcon>
              <Sprite icon="WARNING" size="3.2rem" color={theme.FONT_ERROR} />
            </DisclaimerIcon>
            <div>
              <DisclaimerTitle>
                {timeout ? 'This vote is now closed. Please exit to continue.' :
                'Please select a valid vote (Yes, No, Abstain, No With Veto) to continue.'}
              </DisclaimerTitle>
            </div>
          </Disclaimer>
        )}
      </Fragment>
    </Modal>
  );
};

export default ManageVotingModal;