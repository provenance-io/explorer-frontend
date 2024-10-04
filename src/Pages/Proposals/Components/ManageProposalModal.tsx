import { useEffect, useState } from 'react';
import { Formik, Field as BaseField } from 'formik';
import styled from 'styled-components';
import { Button, Modal, Forms } from '../../../Components';
import {
  capitalize,
  proposalData,
  proposalValidations,
  proposalContent,
  ContentProps,
} from '../../../utils';
import { PROPOSAL_TYPES } from '../../../consts';
import { useApp, useBlocks, useGovernance } from '../../../redux/hooks';
import { Countdown } from '../../Proposal/Components/ManageVotingModal/Components';

const Title = styled.div`
  text-align: center;
  font-size: 2rem;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT_BOLD};
`;

const Option = styled.option`
  background: ${({ theme }) => theme.INPUT_BG_LIGHT};
  font-weight: initial;
  white-space: nowrap;
  &:hover {
    color: ${({ theme }) => theme.FONT_THEME};
  }
`;

const Field = styled(BaseField)`
  margin-top: 10px;
  padding: 10px;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.INPUT_BORDER_LIGHT};
  border-radius: 4px;
  color: ${({ theme }) => theme.INPUT_FONT_LIGHT};
  font-size: 1.4rem;
  line-height: 2.2rem;
  background-color: ${({ theme }) => theme.INPUT_BG_LIGHT};

  &:focus {
    outline: none;
    box-shadow: 0 0 1px 1px ${({ theme }) => theme.INPUT_OUTLINE_LIGHT};
  }

  &::placeholder {
    color: ${({ theme }) => theme.INPUT_PLACEHOLDER_LIGHT};
  }
`;

const ThisField = styled.div`
  padding-top: 1.6rem;
`;

const Label = styled.label`
  font-size: 1.6rem;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT_BOLD};
  line-height: 1.75;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding-top: 1.6rem;
`;

interface NewModalProps {
  isLoggedIn: boolean;
  modalOpen: boolean;
  onClose: Function;
  proposalId: string;
  proposerId: string;
  submitted: boolean;
  setSubmitted: (arg: boolean) => void;
}

interface ProposalProps {
  [key: string]: string;
  dropdown: string;
}

interface EventProps {
  target: {
    value: string;
  };
}

const ManageProposalModal = ({
  isLoggedIn,
  modalOpen,
  onClose,
  proposalId,
  proposerId,
  submitted,
  setSubmitted,
}: NewModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [blockNumber, setBlockNumber] = useState(0);
  const { blocksHeight, getBlocksHeight } = useBlocks();
  const [proposalType, setProposalType] = useState('text');
  const { submitProposal } = useGovernance();
  // const { walletConnectService: wcs } = useWalletConnect();
  const { authToken } = useApp();

  useEffect(() => {
    setIsOpen(isLoggedIn && modalOpen);
  }, [isLoggedIn, modalOpen]);

  useEffect(() => {
    getBlocksHeight();
    // Note we are requiring at least 20 blocks from the
    // time of rendering to increase the probability of a
    // successful submission in the case of a Software
    // Upgrade proposal
    setBlockNumber((blocksHeight as number) + 20);
  }, [blocksHeight, getBlocksHeight]);

  const handleModalClose = () => {
    setSubmitted(false);

    onClose();
    setProposalType('text');
  };

  const handleChange = (e: EventProps) => {
    setProposalType(e.target.value);
  };

  // Get initial values
  const getInitialValues = (type: string) => {
    const initialValues: { [key: string]: string | [{}] } = {};
    proposalData(type).map((item) => {
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

  const proposalMessage = (
    <>
      Your proposal has been submitted.
      <br />
      <br />
      Results may take up to 30 seconds to post to Explorer. Please be patient.
      <br />
      <br />
      To continue, either wait for the timer to time out, at which point the page will refresh.
      Otherwise, exit this popup and refresh the page to view your proposal.
    </>
  );

  return (
    <Modal isOpen={isOpen} onClose={handleModalClose} largeModal={true}>
      <Formik
        enableReinitialize
        initialValues={{
          dropdown: proposalType,
          submitter: proposerId,
          ...getInitialValues(proposalType),
        }}
        validationSchema={proposalValidations(proposalType, blockNumber)}
        onSubmit={async (values: ProposalProps, { resetForm }) => {
          // Remove the file from values to send separately
          const file = values?.file;
          if (file) delete values.file;
          // Format values as needed
          const { data } = await submitProposal({
            // Format the type string to match the query
            type: values.dropdown.toUpperCase().replace(/ /g, '_'),
            // Get the proposal content as a string
            data: proposalContent(values as unknown as ContentProps),
            file: (file as unknown as File) || undefined,
            token: authToken,
          });

          // Submit via walletconnect-js
          // TODO: Update this to send a proposal
          // wcs.sendMessage({
          //   description: 'Submit Proposal',
          //   message: data.base64,
          // });
          // Set proposal type back to default
          setProposalType('text');
          // Clear the form
          // Set initial deposit back to zero.
          proposalContent(values as unknown as ContentProps).initialDeposit = [
            { amount: '0', denom: 'nhash' },
          ];
          resetForm();
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            {!submitted && (
              <>
                <Title>{`Proposal ${proposalId}`}</Title>
                <ThisField>
                  <Label htmlFor="dropdown">Proposal Type</Label>
                  <Field as="select" name="dropdown" onChange={handleChange} value={proposalType}>
                    {Object.keys(PROPOSAL_TYPES).map((key) => {
                      const proposal = PROPOSAL_TYPES[key];
                      return (
                        <Option key={proposal} value={proposal}>
                          {capitalize(proposal)}
                        </Option>
                      );
                    })}
                  </Field>
                </ThisField>
                <Forms
                  config={proposalData(proposalType)}
                  formik={formik}
                  blockNumber={blockNumber}
                />
                <ButtonGroup>
                  <Button type="submit">Submit</Button>
                </ButtonGroup>
              </>
            )}
            {submitted && (
              <Countdown
                onClick={handleModalClose}
                seconds={30}
                title="Proposal Submitted"
                message={proposalMessage}
              />
            )}
          </form>
        )}
      </Formik>
    </Modal>
  );
};

export default ManageProposalModal;
