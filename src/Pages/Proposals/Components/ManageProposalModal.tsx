import React, { Fragment, useEffect, useState, useRef } from 'react';
import Big from 'big.js';
import * as yup from 'yup';
import styled, { useTheme } from 'styled-components';
import { useAccounts } from 'redux/hooks';
import { currencyFormat, numberFormat } from 'utils';
import OgButton from 'Components/Button';
import OgInput from 'Components/Input';
import Sprite from 'Components/Sprite';
import Modal from 'Components/Modal';

const Input = styled(OgInput)<{ $large: boolean }>`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  height: ${({ $large }) => $large && '200px'};
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

const Pair = styled.div`
  padding-bottom: 1.6rem;
`;

const PairTitle = styled.div`
  font-size: 1.6rem;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT_BOLD};
  line-height: 1.75;
`;

const PairValue = styled.div`
  display: flex;
  font-size: 1.6rem;
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

const DenomName = styled.span`
  margin: 0;
  padding: 10px 12px;
  border: 1px solid ${({ theme }) => theme.INPUT_BORDER_LIGHT};
  border-left: 0;
  border-top-right-radius: 0.6rem;
  border-bottom-right-radius: 0.6rem;
  color: ${({ theme }) => theme.INPUT_FONT_LIGHT};
  background-color: ${({ theme }) => theme.INPUT_BG_LIGHT};
`;

interface ManageProposalProps {
  isLoggedIn: boolean;
  modalOpen: boolean;
  onClose: Function;
  onProposal: Function;
  proposalId: string,
  description: string,
  proposerId: string,
  title: string,
}

const ManageProposalModal = ({
  isLoggedIn,
  modalOpen,
  onClose,
  onProposal,
  proposalId,
  description,
  proposerId,
  title,
}: ManageProposalProps) => {
  // Add calcs for current number of proposes
  // Add current propose totals to page, perhaps without querying since it's already on the page from ProposalProposalGraph
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [propose, setPropose] = useState('');
  const inputTitle = useRef();
  const inputDescription = useRef();
  const inputDeposit = useRef();
  const { accountAssets } = useAccounts();

  const hashBalance = accountAssets?.find(b => b.denom === 'nhash');
  const { amount: hashAmount, denom: hashDenom } = currencyFormat(
    hashBalance?.amount,
    hashBalance?.denom
  );
  const decimal = 7;


  useEffect(() => {
    if (!modalOpen) setPropose('');
  }, [modalOpen]);

  useEffect(() => {
    setIsOpen(isLoggedIn && modalOpen);
  }, [isLoggedIn, modalOpen]);

  const handleModalClose = () => {
    setPropose('');
    onClose();
  };

  const handleClick = (propose: string) => {
    setPropose(propose);
  };

  const handleProposal = () => {
    onProposal(proposalId, proposerId, propose);
  };

  const validateAmount = async (amount, available) => {
    const schema = yup.object().shape({
      amount: yup.number().min(1).max(available),
    });

    const valid = await schema.isValid({ amount });

    const warningAmt = new Big(available).minus(MIN_HASH_AFTER_STAKING).toNumber();
    setShowWarning(new Big(amount || 0).gt(warningAmt));
    setStakeBtnDisabled(!valid);
  };

  const handleDelegationAmountChange = () => {
    const amount = inputRef.current.value;
    validateAmount(amount, hashAmount);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleModalClose}>
      <Fragment>
        <Info>
          <MainTitle>New Proposal</MainTitle>
          <PairTitle>Proposal ID: {proposalId}</PairTitle>
        </Info>
        <Pair>
          <PairTitle>Title</PairTitle>
          <PairValue>
            <Input
              getInputRef={inputTitle}
              decimalScale={0}
              onChange={handleDelegationAmountChange}
            />
            <DenomName>{hashDenom}</DenomName>
          </PairValue>
        </Pair>
        <Pair>
          <PairTitle>Description</PairTitle>
          <PairValue>
            <Input 
              $large
              getInputRef={inputDescription}
              decimalScale={0}
              //onChange={handleDelegationAmountChange}
            />
            <DenomName>{hashDenom}</DenomName>
          </PairValue>
        </Pair>
        <Pair>
          <PairTitle>Amount to Deposit</PairTitle>
          <PairValue>
            Available Balance: {numberFormat(hashAmount, decimal)} {hashDenom}
          </PairValue>
          <PairValue>
            <Input
              getInputRef={inputDeposit}
              decimalScale={0}
              onChange={handleDelegationAmountChange}
            />
            <DenomName>{hashDenom}</DenomName>
          </PairValue>
        </Pair>
        <ButtonGroup>
          <Button onClick={handleProposal}>Submit Proposal</Button>
        </ButtonGroup>
        {/*{(warning || timeout) && (   ------------>>>>>>!!!!!!!!!!! Set check here for empty fields
          <Disclaimer>
            <DisclaimerIcon>
              <Sprite icon="WARNING" size="3.2rem" color={theme.FONT_ERROR} />
            </DisclaimerIcon>
            <div>
              <DisclaimerTitle>
                {timeout ? 'This propose is now closed. Please exit to continue.' :
                'Please select a valid propose (Yes, No, Abstain, No With Veto) to continue.'}
              </DisclaimerTitle>
            </div>
          </Disclaimer>
        )}*/}
      </Fragment>
    </Modal>
  );
};

export default ManageProposalModal;