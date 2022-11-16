import { useEffect, useState } from 'react';
import { Formik, FormikProps } from 'formik';
import styled, { useTheme } from 'styled-components';
import { Button, Modal, Forms } from 'Components';
import { isEmpty, votingData as data, votingValidations as validations } from 'utils';
import { useWalletConnect } from '@provenanceio/walletconnect-js';
import { useGovernance, useAccounts } from 'redux/hooks';
import { VotingChart, Countdown } from './Components';

const ModalContainer = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'inherit' : 'none')};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background: rgba(0, 0, 0, 0.5);
`;

const Title = styled.div`
  text-align: center;
  font-size: 2rem;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT_BOLD};
  margin-bottom: 20px;
  margin-right: 10px;
`;
const Description = styled.div`
  color: ${({ theme }) => theme.FONT_TITLE_INFO};
  font-style: italic;
  max-width: 500px;
  margin: 0 auto;
  margin-bottom: 20px;
`;
const PairTitle = styled.div`
  font-size: 1.6rem;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT_BOLD};
  line-height: 1.75;
`;
const ThisField = styled.div`
  padding-top: 1.6rem;
`;
const Label = styled.label`
  font-size: 1.6rem;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT_BOLD};
  line-height: 1.75;
`;
const MenuEnd = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;
const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding-top: 1.6rem;
`;
const VoteWarning = styled.div<{ color?: string }>`
  display: flex;
  margin: 1.6rem 0;
  padding: 20px;
  border: ${({ theme, color }) =>
    color ? `${color} 1px solid` : `${theme.ORANGE_PRIMARY} 1px solid`};
  border-radius: 0.6rem;
  color: ${({ theme, color }) => (color ? color : theme.ORANGE_PRIMARY)};
  flex-direction: column;
  text-align: justify;
  line-height: 1.3;
`;
const WarningTitle = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;
const WarningButton = styled.div`
  align-self: center;
  margin-top: 20px;
`;
const CheckboxLabel = styled.label`
  display: flex;
  align-self: center;
  padding-top: 1.8rem;
`;
const Checkbox = styled.input`
  margin-right: 5px;
  width: 2rem;
  height: 2rem;
`;
const Total = styled.div`
  padding: 1.6rem 0 1.6rem 0;
  font-size: 1.8rem;
  line-height: 1.75;
  display: grid;
  grid-template-columns: 3fr 0.5fr;
`;
const Value = styled.div`
  display: flex;
  align-self: center;
  margin-right: 10px;
  text-align: right;
  font-size: 1.6rem;
  line-height: 1.75;
  color: ${({ color }) => color && color};
`;

interface ManageVotingProps {
  isLoggedIn: boolean;
  modalOpen: boolean;
  onClose: Function;
  proposalId: number;
  description: string;
  voterId: string;
  title: string;
  voted: boolean;
  setVoted: (arg: boolean) => void;
}

interface VotingProps {
  [x: string]: string | [{}];
}

const ManageVotingModal = ({
  isLoggedIn,
  modalOpen,
  onClose,
  proposalId,
  description,
  voterId,
  title,
  voted,
  setVoted,
}: ManageVotingProps) => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [voteType, setVoteType] = useState('');
  const { tally, submitVotes } = useGovernance();
  const { accountDelegationsTotal } = useAccounts();
  // Delegations are pulled when the vote button is clicked
  const hasDelegations = parseInt(accountDelegationsTotal.amount) > 0;
  const [voteAnyway, setVoteAnyway] = useState(false);
  const { walletConnectService: wcs } = useWalletConnect();

  useEffect(() => {
    setIsOpen(isLoggedIn && modalOpen);
  }, [isLoggedIn, modalOpen]);

  const handleModalClose = () => {
    setVoteAnyway(false);
    setVoteType('');
    setVoted(false);
    onClose();
  };

  const handleWeightedVoting = () => {
    setVoteType(voteType === 'weighted' ? '' : 'weighted');
  };

  // Get initial values
  const getInitialValues = (type: string) => {
    const initialValues: { [key: string]: string | [{}] } = {};
    data(type).map((item) => {
      if (!item.subFields) {
        initialValues[item.field] = item.initialValue || '';
      } else {
        const subValues: { [key: string]: string | string[] } = {};
        item.subFields.map((subItem) => (subValues[subItem.field] = item.initialValue || ''));
        initialValues[item.field] = [subValues];
      }
      return initialValues;
    });
    return initialValues;
  };

  const getVals = (formik: FormikProps<any>, colors: boolean) => {
    const total =
      parseInt(formik.getFieldProps('yes').value || '0') +
      parseInt(formik.getFieldProps('no').value || '0') +
      parseInt(formik.getFieldProps('abstain').value || '0') +
      parseInt(formik.getFieldProps('noWithVeto').value || '0');

    if (colors) {
      return total !== 100 ? theme.NEGATIVE_CHANGE : theme.POSITIVE_CHANGE;
    } else {
      return `${total}`;
    }
  };

  const votingMessage = (
    <>
      Your vote has been submitted.
      <br />
      <br />
      {!hasDelegations && (
        <>
          Since you have no delegations, your vote will not count towards the vote totals, but will
          be visible in the "Proposal Votes" table below.
          <br />
          <br />
        </>
      )}
      Results may take up to 30 seconds to post to Explorer. Please be patient.
      <br />
      <br />
      To continue, either wait for the timer to time out, at which point the page will refresh.
      Otherwise, exit this popup and refresh the page to see voting results.
    </>
  );

  return (
    <ModalContainer isOpen={isOpen}>
      <Modal isOpen={isOpen} onClose={handleModalClose} largeModal={true}>
        <Formik
          enableReinitialize
          initialValues={{
            ...getInitialValues(voteType),
          }}
          validationSchema={validations(voteType)}
          onSubmit={async (values: VotingProps, { resetForm }) => {
            // Format votes into correct array format
            let votes;
            if (voteType === 'weighted') {
              votes = Object.keys(values).map((item) => ({
                option:
                  item === 'noWithVeto'
                    ? 'VOTE_OPTION_NO_WITH_VETO'
                    : `VOTE_OPTION_${item.toUpperCase().replace(/ /g, '_')}`,
                weight: Number(values[item]),
              }));
            } else {
              votes = [
                {
                  option: `VOTE_OPTION_${(values.vote as string).toUpperCase().replace(/ /g, '_')}`,
                  weight: 100,
                },
              ];
            }
            // Submit proposal message
            if (!voted) {
              const { data } = await submitVotes({
                proposalId,
                voter: voterId,
                votes,
              });
              wcs.sendMessage({
                description: 'Submit Proposal',
                message: data.base64,
              });
            }
            // Clear the form
            resetForm();
          }}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              {!hasDelegations && !voteAnyway && !voted && (
                <ThisField>
                  <VoteWarning>
                    <WarningTitle>
                      <Label>Voting Notice</Label>
                    </WarningTitle>
                    You currently have no delegated hash in your account. While you are still able
                    to submit a vote, your vote will not be counted towards the vote totals on this
                    proposal. To have your votes counted, you must either delegate hash or log in to
                    an account with delegated hash. Note that fees are assessed to any votes that
                    are submitted regardless of delegation status.
                    <WarningButton>
                      <Button onClick={() => setVoteAnyway(true)}>Vote Anyway</Button>
                    </WarningButton>
                  </VoteWarning>
                </ThisField>
              )}
              {(hasDelegations || voteAnyway) && !voted && (
                <>
                  <Title>
                    Vote on <b>{title}</b>
                  </Title>
                  <PairTitle>Proposal ID</PairTitle>
                  <Description>{proposalId}</Description>
                  <PairTitle>Description</PairTitle>
                  <Description>{description}</Description>
                  <PairTitle>Vote Tally</PairTitle>
                  {!isEmpty(tally) && <VotingChart voteData={tally} />}
                  <Forms config={data(voteType)} formik={formik} grid={voteType === 'weighted'} />
                  {voteType === 'weighted' && (
                    <Total>
                      <Value>Total (must be 100%):</Value>
                      <Value color={getVals(formik, true)}>{getVals(formik, false)}%</Value>
                    </Total>
                  )}
                  <MenuEnd>
                    <CheckboxLabel>
                      <Checkbox type="checkbox" onChange={handleWeightedVoting} />
                      Submit weighted votes
                    </CheckboxLabel>
                    <ButtonGroup>
                      <Button
                        type="submit"
                        disabled={voteType === 'weighted' && getVals(formik, false) !== '100'}
                      >
                        Submit
                      </Button>
                    </ButtonGroup>
                  </MenuEnd>
                </>
              )}
              {voted && (
                <Countdown
                  onClick={handleModalClose}
                  seconds={30}
                  title="Vote Submitted"
                  message={votingMessage}
                />
              )}
            </form>
          )}
        </Formik>
      </Modal>
    </ModalContainer>
  );
};

export default ManageVotingModal;
