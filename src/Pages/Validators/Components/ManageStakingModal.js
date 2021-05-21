import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { useTheme } from 'styled-components';
import { useValidators } from 'redux/hooks';
import DropdownBtn from 'Components/DropdownBtn';
import OgButton from 'Components/Button';
import OgInput from 'Components/Input';
import Modal from 'Components/Modal';
import SelectFolders from 'Components/SelectFolders';
import Sprite from 'Components/Sprite';
import { maxLength, numberFormat } from 'utils';

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

const TYPES = {
  DELEGATE: 'delegate',
  REDELEGATE: 'redelegate',
  UNDELEGATE: 'undelegate',
  CLAIM: 'claim rewards',
};

const ManageStakingModal = ({ handleStaking, isLoggedIn, onClose, modalOpen, validator }) => {
  const theme = useTheme();
  const [stakingType, setStakingType] = useState(TYPES.REDELEGATE);
  const [redelegateAddress, setRedelegateAddress] = useState(null);
  const { validators, getValidatorSpotlight, validatorSpotlight, validatorSpotlightLoading } = useValidators();

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

  console.log(stakingType, modalOpen);

  if (!isLoggedIn || !validator || validatorSpotlightLoading) return null;

  const { description, image, moniker, url } = validatorSpotlight;
  const { commission: sCommission } = validator;
  const commission = sCommission * 100;
  // TODO: get delegations
  const delegation = 0;

  console.log(validator);

  const handleClick = (type) => {
    setStakingType(type);
    setRedelegateAddress('');
  };

  const handleRedelegateSelection = (addressId) => {
    setRedelegateAddress(addressId);
  };

  return (
    <Modal isOpen={modalOpen} onClose={handleModalClose}>
      <SpotlightContainer>
        <ImageContainer>
          {image ? <img src={image} alt={moniker} title={moniker} /> : <ImageLetter>{moniker ? moniker[0] : '?'}</ImageLetter>}
        </ImageContainer>
        <div>
          <Title title={moniker}>{maxLength(moniker, 35)}</Title>
          <Description>Commission - {commission < 0.0001 ? '>0.0001' : numberFormat(commission, 4)}%</Description>
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
              <PairValue>{delegation} HASH</PairValue>
            </PairInline>
          </Info>
          <ButtonGroup>
            <DropdownBtn
              options={[TYPES.UNDELEGATE, TYPES.REDELEGATE, TYPES.CLAIM]}
              initial={TYPES.UNDELEGATE}
              onClick={handleClick}
            />
            <Button onClick={() => handleClick('delegate')}>Delegate</Button>
          </ButtonGroup>
        </Fragment>
      )}

      {stakingType === TYPES.DELEGATE && (
        <Info>
          <Disclaimer>
            <DisclaimerIcon>
              <Sprite icon="WARNING" size="3.2rem" color={theme.FONT_WARNING} />
            </DisclaimerIcon>
            <div>
              <DisclaimerTitle>Staking will lock your funds for 21+ days</DisclaimerTitle>
              <DisclaimerText>
                You will need to undelegate in order for your staked assets to be liquid again. This process will take 21 days to
                complete.
              </DisclaimerText>
            </div>
          </Disclaimer>

          <Pair>
            <PairTitle>My Delegation</PairTitle>
            <PairValue>{delegation} HASH</PairValue>
          </Pair>

          <Pair>
            <PairTitle>Available Balance</PairTitle>
            <PairValue>{delegation} HASH</PairValue>
          </Pair>

          <Pair>
            <PairTitle>Amount to Delegate</PairTitle>
            <PairValue>
              <Input decimalScale={0} />
              <DenomName>HASH</DenomName>
            </PairValue>
          </Pair>
          {stakingType}
        </Info>
      )}

      {stakingType === TYPES.UNDELEGATE && (
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
              <DisclaimerText>Use the ‘Redelegate’ feature to instantly stake your assets to another validator.</DisclaimerText>
            </div>
          </Disclaimer>

          <Pair>
            <PairTitle>Available for undelegation: {delegation} HASH </PairTitle>
            <PairValue>
              <Input decimalScale={0} />
              <DenomName>HASH</DenomName>
            </PairValue>
          </Pair>
        </Info>
      )}

      {stakingType === TYPES.REDELEGATE && (
        <Info>
          <Pair>
            <PairTitle>Redelegate to:</PairTitle>
            <PairValue>
              <SelectFolders
                maxHeight="21rem"
                action={handleRedelegateSelection}
                allOptions={validators.reduce(
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
              <PairTitle>Available for redelegation: {delegation} HASH </PairTitle>
              <PairValue>
                <Input decimalScale={0} />
                <DenomName>HASH</DenomName>
              </PairValue>
            </Pair>
          )}
        </Info>
      )}

      {stakingType && (
        <ButtonGroup>
          <Button onClick={() => handleClick('')} color="secondary">
            Back
          </Button>
          <Button onClick={handleStaking} disabled>
            {stakingType}
          </Button>
        </ButtonGroup>
      )}
    </Modal>
  );
};

ManageStakingModal.propTypes = {
  handleStaking: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  modalOpen: PropTypes.bool.isRequired,
  validator: PropTypes.object.isRequired,
};

export default ManageStakingModal;
