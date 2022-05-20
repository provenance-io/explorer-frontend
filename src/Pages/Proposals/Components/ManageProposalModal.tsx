import React, { useEffect, useState } from 'react';
import { Formik, Field as BaseField } from "formik";
import styled from 'styled-components';
import { Button, Modal, Forms } from 'Components';
import { capitalize, proposalData, proposalValidations } from 'utils';
import { PROPOSAL_TYPES } from 'consts';
import { useBlocks } from '../../../redux/hooks';

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
  onProposal: Function;
  proposalId: string,
  proposerId: string,
}

interface ProposalProps {
  [key: string]: string;
  dropdown: string;
}

interface ItemProps {
  [key: string]: string | number;
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
  onProposal,
  proposalId,
  proposerId,
}: NewModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [blockNumber, setBlockNumber] = useState(0);
  const { blocksHeight, getBlocksHeight } = useBlocks();
  const [proposalType, setProposalType] = useState('text');

  // Get content for proposal message
  const getContent = (values: ProposalProps) => {
    const emptyObj: ItemProps = {};
    proposalData(values.dropdown).forEach((item) => {
      if (item.field !== 'initialDeposit') {
        emptyObj[item.field] = values[item.field]
      }
    });
    return emptyObj;
  }

  useEffect(() => {
    setIsOpen(isLoggedIn && modalOpen);
  }, [isLoggedIn, modalOpen]);

  useEffect(() => {
    getBlocksHeight();
    setBlockNumber(blocksHeight as number);
    // eslint-disable-next-line
  },[]);

  const handleModalClose = () => {
    onClose();
  };

  const handleChange = (e: EventProps) => {
    setProposalType(e.target.value);
  }

  // Get initial values
  const getInitialValues = (type: string) => {
    const initialValues: { [key: string]: string | [{}] } = {};
    proposalData(type).map((item) => {
      if (!item.subFields) {
        initialValues[item.field] = item.initialValue || "";
      }
      else {
        const subValues: { [key: string]: string | string[] } = {};
        item.subFields.map(subItem =>
          subValues[subItem.field] = item.initialValue || ""
        );
        initialValues[item.field] = [subValues];
      }
      return initialValues;
    });
    return initialValues;
  };

  return (
    <Modal isOpen={isOpen} onClose={handleModalClose} largeModal={true}>
      <Formik
        enableReinitialize
        initialValues={{
          dropdown: proposalType,
          ...getInitialValues(proposalType),
        }}
        validationSchema={proposalValidations(proposalType, blockNumber)}
        onSubmit={(values: ProposalProps, { resetForm }) => {
          // Submit proposal message
          // If initial deposit is blank, assume it's 0
          onProposal(getContent(values), [{amount: (parseFloat(values.initialDeposit ? values.initialDeposit : '0')*1e9).toFixed(), denom: 'nhash'}], proposerId, proposalType)
          // Clear the form
          resetForm();
          // Close modal
          handleModalClose();
        }}
      >
        {formik => (
          <form onSubmit={formik.handleSubmit}>
            <Title>{`Proposal ${proposalId}`}</Title>
            <ThisField>
              <Label htmlFor="dropdown">Proposal Type</Label>
              <Field 
                as="select"
                name="dropdown"
                onChange={handleChange}
              >
                {Object.keys(PROPOSAL_TYPES).map((key) => {
                  const proposal = PROPOSAL_TYPES[key];
                  return (
                    <Option key={proposal} value={proposal}>{capitalize(proposal)}</Option>
                  )
                })}
              </Field>
            </ThisField>
            <Forms config={proposalData(proposalType)} formik={formik} />
            <ButtonGroup>
              <Button type="submit">Submit</Button>
            </ButtonGroup>
          </form>
        )}
      </Formik>
    </Modal>
  );
};

export default ManageProposalModal;