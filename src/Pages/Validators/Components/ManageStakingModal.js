import React, { Fragment, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { useTheme } from 'styled-components';
import * as yup from 'yup';
import { useAccounts, useValidators } from 'redux/hooks';
import DropdownBtn from 'Components/DropdownBtn';
import OgButton from 'Components/Button';
import OgInput from 'Components/Input';
import Modal from 'Components/Modal';
import SelectFolders from 'Components/SelectFolders';
import Sprite from 'Components/Sprite';
import { currencyFormat, formatNhash, maxLength, numberFormat } from 'utils';
import { STAKING_TYPES } from 'consts';
import { Loading } from 'Components';

const Input = styled(OgInput)`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
`;

const SpotlightContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  background: ${({ theme }) => theme.BACKGROUND_LIGHT};
  margin-right: 1.5rem;
  height: 75px;
  width: 75px;
  min-width: 75px;
  overflow: hidden;
`;

const ImageLetter = styled.span`
  font-size: 4rem;
  color: ${({ theme }) => theme.FONT_PRIMARY};
  text-transform: uppercase;
`;

const Title = styled.div`
  font-weight: ${({ theme }) => theme.FONT_WEIGHT_BOLD};
  margin: 5px 0;
  font-size: 1.7rem;
`;

const Description = styled.div`
  color: ${({ theme }) => theme.FONT_TITLE_INFO};
  font-style: italic;
  max-width: 500px;
  margin: 0 auto;
  margin-top: 5px;
`;

const Info = styled.div`
  margin: 1.6rem 0;
`;

const Pair = styled.div`
  padding-bottom: 1.6rem;
`;

const PairInline = styled.div`
  display: flex;
  justify-content: space-between;
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
  margin-bottom: 1.6rem;
  padding: 20px;
  border: ${({ theme, help }) => (help ? theme.BORDER_THEME : theme.WARNING_BORDER)} 1px solid;
  border-radius: 0.6rem;
  color: ${({ theme, help }) => (help ? theme.FONT_THEME : theme.FONT_WARNING)};
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

const DisclaimerText = styled.p`
  margin: 0;
  padding: 0;
  line-height: 2.2rem;
  list-style-type: '– ';
`;

const ManageStakingModal = ({
  isDelegate,
  isLoggedIn,
  modalOpen,
  onClose,
  onStaking,
  validator,
}) => {
  const theme = useTheme();
  const inputRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [stakeBtnDisabled, setStakeBtnDisabled] = useState(true);
  const [stakingType, setStakingType] = useState();
  const [redelegateAddress, setRedelegateAddress] = useState(null);
  const { accountAssets } = useAccounts();
  const { allValidators, getValidatorSpotlight, validatorSpotlight, validatorSpotlightLoading } =
    useValidators();

  const hashBalance = accountAssets?.find((b) => b.denom === 'nhash');
  const hashAmount = currencyFormat(hashBalance?.amount, hashBalance?.denom);
  const decimal = 7;

  useEffect(() => {
    if (isDelegate) {
      setStakingType(STAKING_TYPES.DELEGATE);
    }
  }, [isDelegate]);

  useEffect(() => {
    if (!modalOpen) setStakingType('');
  }, [modalOpen]);

  useEffect(() => {
    setIsOpen(isLoggedIn && validator && modalOpen);
  }, [isLoggedIn, modalOpen, validator, validatorSpotlightLoading, validatorSpotlight]);

  useEffect(() => {
    if (validator?.addressId) {
      getValidatorSpotlight(validator?.addressId);
    }
  }, [getValidatorSpotlight, validator?.addressId]);

  const handleModalClose = () => {
    onClose();
    setStakingType('');
    setRedelegateAddress('');
  };

  const { description, image, moniker, url } = validatorSpotlight;
  const { commission: sCommission, amount } = validator;
  const delegation = currencyFormat(amount?.amount, amount?.denom);
  const commission = sCommission * 100;

  const handleClick = (type, e) => {
    // Don't let this event bubble
    e.stopPropagation();
    setStakingType(type);
    setRedelegateAddress('');
  };

  const validateAmount = async (amount, available) => {
    const schema = yup.object().shape({
      amount: yup.number().min(1).max(available),
    });

    const valid = await schema.isValid({ amount });

    setStakeBtnDisabled(!valid);
  };

  const handleStaking = (e) => {
    // Don't let this event bubble
    e.stopPropagation();
    onStaking(stakingType, inputRef.current.value, redelegateAddress);
  };

  const handleRedelegateSelection = (addressId) => {
    setRedelegateAddress(addressId);
  };

  const handleAmountChange = () => {
    const amount = inputRef.current.value;
    validateAmount(amount, delegation);
  };

  const handleDelegationAmountChange = () => {
    const amount = inputRef.current.value;
    validateAmount(amount, hashAmount);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleModalClose}>
      {validatorSpotlightLoading || validator.addressId !== validatorSpotlight.operatorAddress ? (
        <Loading />
      ) : (
        <Fragment>
          <SpotlightContainer>
            <ImageContainer>
              {image ? (
                <img src={image} alt={moniker} title={moniker} />
              ) : (
                <ImageLetter>{moniker ? moniker[0] : '?'}</ImageLetter>
              )}
            </ImageContainer>
            <div>
              <Title title={moniker}>{maxLength(moniker, 35)}</Title>
              <Description>
                Commission - {commission < 0.0001 ? '>0.0001' : numberFormat(commission, 4)}%
              </Description>
            </div>
          </SpotlightContainer>

          {!stakingType && (
            <Fragment>
              <Info>
                {url && (
                  <Pair>
                    <PairTitle>Website</PairTitle>
                    <PairValue>
                      <a href={url}>{url}</a>
                    </PairValue>
                  </Pair>
                )}
                {description && (
                  <Pair>
                    <PairTitle>Description</PairTitle>
                    <PairValue>{description}</PairValue>
                  </Pair>
                )}
                <PairInline>
                  <PairTitle>My Delegation</PairTitle>
                  <PairValue>{numberFormat(delegation, decimal)} HASH</PairValue>
                </PairInline>
              </Info>
              <ButtonGroup>
                <DropdownBtn
                  // TODO: Figure out CLAIM_REWARDS
                  options={[
                    STAKING_TYPES.UNDELEGATE,
                    STAKING_TYPES.REDELEGATE /*STAKING_TYPES.CLAIM*/,
                  ]}
                  initial={STAKING_TYPES.UNDELEGATE}
                  onClick={handleClick}
                />
                <Button onClick={(e) => handleClick('delegate', e)}>Delegate</Button>
              </ButtonGroup>
            </Fragment>
          )}

          {stakingType === STAKING_TYPES.DELEGATE && (
            <Info>
              <Disclaimer>
                <DisclaimerIcon>
                  <Sprite icon="WARNING" size="3.2rem" color={theme.FONT_WARNING} />
                </DisclaimerIcon>
                <div>
                  <DisclaimerTitle>Staking will lock your funds for 21+ days</DisclaimerTitle>
                  <DisclaimerText>
                    You will need to undelegate in order for your staked assets to be liquid again.
                    This process will take 21 days to complete.
                  </DisclaimerText>
                </div>
              </Disclaimer>

              <Pair>
                <PairTitle>My Delegation</PairTitle>
                <PairValue>{numberFormat(delegation, decimal)} HASH</PairValue>
              </Pair>

              <Pair>
                <PairTitle>Available Balance</PairTitle>
                <PairValue>{numberFormat(hashAmount, decimal)} HASH</PairValue>
              </Pair>

              <Pair>
                <PairTitle>Amount to Delegate</PairTitle>
                <PairValue>
                  <Input
                    getInputRef={inputRef}
                    decimalScale={0}
                    onChange={handleDelegationAmountChange}
                  />
                  <DenomName>HASH</DenomName>
                </PairValue>
              </Pair>
            </Info>
          )}

          {stakingType === STAKING_TYPES.UNDELEGATE && (
            <Info>
              <Disclaimer>
                <DisclaimerIcon>
                  <Sprite icon="WARNING" size="3.2rem" color={theme.FONT_WARNING} />
                </DisclaimerIcon>
                <div>
                  <DisclaimerTitle>Once the unbonding period begins you will:</DisclaimerTitle>
                  <DisclaimerText as="ul">
                    <li>not receive staking reward</li>
                    <li>not be able to cancel the unbonding</li>
                    <li>need to wait 21 days for the amount to be liquid</li>
                  </DisclaimerText>
                </div>
              </Disclaimer>

              <Disclaimer help>
                <DisclaimerIcon>
                  <Sprite icon="HELP" size="3.2rem" color={theme.FONT_THEME} />
                </DisclaimerIcon>
                <div>
                  <DisclaimerTitle>Trying to switch validators?</DisclaimerTitle>
                  <DisclaimerText>
                    Use the ‘Redelegate’ feature to instantly stake your assets to another
                    validator.
                  </DisclaimerText>
                </div>
              </Disclaimer>

              <Pair>
                <PairTitle>
                  Available for undelegation: {numberFormat(delegation, decimal)} HASH{' '}
                </PairTitle>
                <PairValue>
                  <Input
                    getInputRef={inputRef}
                    decimalScale={0}
                    onChange={(e) => handleAmountChange(e.target.value, delegation)}
                  />
                  <DenomName>HASH</DenomName>
                </PairValue>
              </Pair>
            </Info>
          )}

          {stakingType === STAKING_TYPES.REDELEGATE && (
            <Info>
              <Pair>
                <PairTitle>Redelegate to:</PairTitle>
                <PairValue>
                  <SelectFolders
                    maxHeight="21rem"
                    action={handleRedelegateSelection}
                    allOptions={allValidators.reduce(
                      (agg, curr) => {
                        if (validator.addressId === curr.addressId) return agg;

                        return {
                          ...agg,
                          [curr.addressId]: {
                            title: curr.moniker,
                          },
                        };
                      },
                      {
                        noop: {
                          isDefault: true,
                          title: '',
                        },
                      }
                    )}
                  />
                </PairValue>
              </Pair>

              {redelegateAddress && (
                <Pair>
                  <PairTitle>
                    Available for redelegation: {numberFormat(delegation, decimal)} HASH{' '}
                  </PairTitle>
                  <PairValue>
                    <Input
                      getInputRef={inputRef}
                      decimalScale={0}
                      onChange={(e) => handleAmountChange(e.target.value, delegation)}
                    />
                    <DenomName>HASH</DenomName>
                  </PairValue>
                </Pair>
              )}
            </Info>
          )}

          {stakingType && (
            <ButtonGroup>
              {!isDelegate && (
                <Button onClick={(e) => handleClick('', e)} color="secondary">
                  Back
                </Button>
              )}
              <Button onClick={handleStaking} disabled={stakeBtnDisabled}>
                {stakingType}
              </Button>
            </ButtonGroup>
          )}
        </Fragment>
      )}
    </Modal>
  );
};

ManageStakingModal.propTypes = {
  isDelegate: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  modalOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onStaking: PropTypes.func.isRequired,
  validator: PropTypes.object.isRequired,
};

export default ManageStakingModal;
