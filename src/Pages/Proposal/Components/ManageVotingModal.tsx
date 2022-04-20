import React, { Fragment, useEffect, useState, useRef } from 'react';
import styled, { useTheme } from 'styled-components';
import SelectFolders from 'Components/SelectFolders';
import OgButton from 'Components/Button';
import OgInput from 'Components/Input';
import Sprite from 'Components/Sprite';
import Modal from 'Components/Modal';
import { useGovernance } from 'redux/hooks';
import { MY_VOTE_OPTIONS } from 'consts';
import { isEmpty } from 'utils';
import VotingChart from "./VotingChart";

const Input = styled(OgInput)`
  display: flex;
  justify-content: flex-end;
  width: 75px;
  color: ${({ theme }) => theme.FONT_PRIMARY};
`;

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

const Pair = styled.div<{ grid: boolean }>`
  padding-bottom: 1rem;
  display: ${({ grid }) => grid && 'grid'};
  grid-template-columns: ${({ grid }) => grid && '3fr 0.5fr 0.25fr'};
`;

const PairTitle = styled.div`
  font-size: 1.6rem;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT_BOLD};
  line-height: 1.75;
`;

const PairValue = styled.div`
  display: flex;
  align-self: center;
  margin-right: 10px;
  text-align: right;
  font-size: 1.6rem;
  line-height: 1.75;
  color: ${({ color }) => color && color};
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const MenuEnd = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-self: center;
`;

const Checkbox = styled.input`
  margin: 0 5px 0 2px;
  width: 2rem;
  height: 2rem;
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
  const [checked, setChecked] = useState(false);

  // Input refs for weighted votes
  const yesRef = useRef<HTMLInputElement>();
  const noRef = useRef<HTMLInputElement>();
  const noWithVetoRef = useRef<HTMLInputElement>();
  const abstainRef = useRef<HTMLInputElement>();

  // State for weighted votes
  const [yesAmount, setYesAmount] = useState('');
  const [noAmount, setNoAmount] = useState('');
  const [noWithVetoAmount, setNoWithVetoAmount] = useState('');
  const [abstainAmount, setAbstainAmount] = useState('');
  const [totalPercent, setTotalPercent] = useState(0);
  const [votes, setVotes] = useState([
    { option: 1, weight: "0" }, // yes
    { option: 2, weight: "0" }, // abstain
    { option: 3, weight: "0" }, // no
    { option: 4, weight: "0" }, // no with veto
  ]);

  useEffect(() => {
    if (!modalOpen) setVote('');
  }, [modalOpen]);

  useEffect(() => {
    setIsOpen(isLoggedIn && modalOpen);
  }, [isLoggedIn, modalOpen]);

  const handleModalClose = () => {
    setVote('');
    setYesAmount('');
    setNoAmount('');
    setNoWithVetoAmount('');
    setAbstainAmount('');
    setTotalPercent(0);
    onClose();
  };

  const handleClick = (vote: string) => {
    setVote(vote);
  };

  const handleVoting = () => {
    if (!isEmpty(timings) && (new Date().getTime()) > (new Date(timings.votingEndTime).getTime())) {
      setTimeout(true);
    }
    else if (!checked && (!vote || vote === "--" )) {
      setWarning(true);
    }
    else if (checked && totalPercent !== 100) {
      setWarning(true);
    }
    else {
      setWarning(false);
      if (!checked) {
        onVoting(proposalId, voterId, vote, false);
      }
      else {
        onVoting(proposalId, voterId, votes, true);
      }
    }
  };

  const handleCheckbox = () => {
    setChecked(!checked);
  };
  
  const handleChange = () => {
    if (yesRef.current &&
        noRef.current &&
        noWithVetoRef.current &&
        abstainRef.current) {
      setYesAmount(yesRef.current.value);
      setNoAmount(noRef.current.value);
      setNoWithVetoAmount(noWithVetoRef.current.value);
      setAbstainAmount(abstainRef.current.value);

      setTotalPercent(
        Number(yesRef.current.value) +
        Number(noRef.current.value) +
        Number(noWithVetoRef.current.value) +
        Number(abstainRef.current.value)
      );

      setVotes([
        { option: 1, weight: (Number(yesRef.current.value)*1e16).toString() },
        { option: 2, weight: (Number(abstainRef.current.value)*1e16).toString() },
        { option: 3, weight: (Number(noRef.current.value)*1e16).toString() },
        { option: 4, weight: (Number(noWithVetoRef.current.value)*1e16).toString() },
      ]);
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
        <Pair grid={false}>
          <PairTitle>Current Vote Tallies:</PairTitle>
        </Pair>
        {!isEmpty(tally) && <VotingChart voteData={tally} proposalId={proposalId} />}
        {checked &&
          <>
          <Info>
            <Pair grid>
              <PairValue>
                Option 1: Yes
              </PairValue>
              <PairValue>
                <Input
                  getInputRef={yesRef}
                  decimalScale={0}
                  onChange={handleChange}
                  value={yesAmount}
                />
              </PairValue>
              <PairValue>
                %
              </PairValue>
            </Pair>
            <Pair grid>
              <PairValue>
                Option 2: Abstain
              </PairValue>
              <PairValue>
                <Input
                  getInputRef={abstainRef}
                  decimalScale={0}
                  onChange={handleChange}
                  value={abstainAmount}
                />
              </PairValue>
              <PairValue>
                %
              </PairValue>
            </Pair>
            <Pair grid>
              <PairValue>
                Option 3: No
              </PairValue>
              <PairValue>
                <Input
                  getInputRef={noRef}
                  decimalScale={0}
                  onChange={handleChange}
                  value={noAmount}
                />
              </PairValue>
              <PairValue>
                %
              </PairValue>
            </Pair>
            <Pair grid>
              <PairValue>
                Option 4: No With Veto
              </PairValue>
              <PairValue>
                <Input
                  getInputRef={noWithVetoRef}
                  decimalScale={0}
                  onChange={handleChange}
                  value={noWithVetoAmount}
                />
              </PairValue>
              <PairValue>
                %
              </PairValue>
            </Pair>
            <hr />
            <Pair grid>
              <PairValue>
                Total (must be 100%):
              </PairValue>
              <PairValue
                color={totalPercent !== 100 ? theme.NEGATIVE_CHANGE : theme.POSITIVE_CHANGE}
              >
                {totalPercent}
              </PairValue>
              <PairValue>
                %
              </PairValue>
            </Pair>
          </Info>
          </>
        }
        <MenuEnd>
          <CheckboxLabel>
            <Checkbox
              type="checkbox"
              checked={checked}
              onChange={handleCheckbox}
            />
            Submit weighted votes
          </CheckboxLabel>
          <ButtonGroup>
            {!checked && <SelectFolders
              allOptions={MY_VOTE_OPTIONS}
              action={handleClick}
            />}
            <Button onClick={handleVoting}>{`Submit Vote${checked ? 's' : ''}`}</Button>
          </ButtonGroup>
        </MenuEnd>
        {(warning || timeout) && (
          <Disclaimer>
            <DisclaimerIcon>
              <Sprite icon="WARNING" size="3.2rem" color={theme.FONT_ERROR} />
            </DisclaimerIcon>
            <div>
              <DisclaimerTitle>
                {timeout ? 'This vote is now closed. Please exit to continue.' :
                 checked && totalPercent !== 100 ?
                 'Total percentage must equal 100. Please adjust and resubmit.' :
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