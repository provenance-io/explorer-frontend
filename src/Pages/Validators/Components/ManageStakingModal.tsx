import React, { useState, useEffect } from 'react';
import styled, { useTheme } from 'styled-components';
import { Formik } from 'formik';
import * as yup from 'yup';
import {
  DelegateProps,
  RedelegateProps,
  UndelegateProps,
  WithdrawRewardsProps,
} from 'redux/features/staking/stakingSlice';
import Big from 'big.js';
import { useWalletConnect } from '@provenanceio/walletconnect-js';
import { CHAIN_NAME } from '../../../config';
import {
  CurrentValidator,
  useAccounts,
  useApp,
  useStaking,
  useValidators,
} from '../../../redux/hooks';
import {
  Button,
  DropdownBtn,
  Forms,
  Loading,
  Modal,
  SelectFolders,
  Sprite,
} from '../../../Components';
import { capitalize, currencyFormat, formatDenom, maxLength, numberFormat } from '../../../utils';
import { MIN_HASH_AFTER_STAKING, STAKING_TYPES } from '../../../consts';
import { useTx } from '../../../hooks/useTxs';

// Styled Components
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
  margin-right: 0.938rem;
  height: 75px;
  width: 75px;
  min-width: 75px;
  overflow: hidden;
`;

const ImageLetter = styled.span`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.FONT_PRIMARY};
  text-transform: uppercase;
`;

const Title = styled.div`
  font-weight: ${({ theme }) => theme.FONT_WEIGHT_BOLD};
  margin: 5px 0;
  font-size: 1.063rem;
`;

const Description = styled.div`
  color: ${({ theme }) => theme.FONT_TITLE_INFO};
  font-style: italic;
  max-width: 500px;
  margin: 0 auto;
  margin-top: 5px;
`;

const Info = styled.div`
  margin: 1rem 0;
`;

const Pair = styled.div`
  padding-bottom: 1rem;
`;

const PairInline = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PairTitle = styled.div`
  font-size: 1rem;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT_BOLD};
  line-height: 1.75;
`;

const PairValue = styled.div`
  display: flex;
  font-size: 1rem;
  line-height: 1.75;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.625rem;
  margin-top: 40px;
`;

const Disclaimer = styled.div<{ help?: boolean }>`
  display: flex;
  margin-bottom: 1rem;
  padding: 20px;
  border: ${({ theme, help, color }) =>
      color ? color : help ? theme.BORDER_THEME : theme.WARNING_BORDER}
    1px solid;
  border-radius: 0.375rem;
  color: ${({ theme, help, color }) =>
    color ? color : help ? theme.FONT_THEME : theme.FONT_WARNING};
`;

const DisclaimerIcon = styled.div`
  margin: 5px 20px 0 0;
`;

const DisclaimerTitle = styled.h3`
  && {
    margin: 0;
    font-size: 0.938rem;
    font-weight: ${({ theme }) => theme.FONT_WEIGHT_BOLD};
    line-height: 1.5rem;
  }
`;

const DisclaimerText = styled.p`
  margin: 0;
  padding: 0;
  line-height: 1.375rem;
  list-style-type: '– ';
`;

interface StakingModalProps {
  isDelegate: boolean;
  isLoggedIn: boolean;
  modalOpen: boolean;
  onClose: () => void;
  validator: CurrentValidator;
}

interface DelegationFormProps {
  amount: number;
}

export const ManageStakingModal = ({
  isDelegate,
  isLoggedIn,
  modalOpen,
  onClose,
  validator,
}: StakingModalProps) => {
  // Hooks
  const { tx } = useTx(CHAIN_NAME);
  const { walletConnectService: wcs, walletConnectState } = useWalletConnect();
  const {
    allValidators,
    getValidatorSpotlight,
    validatorSpotlight,
    validatorSpotlightLoading,
    getAllValidators,
  } = useValidators();
  const theme = useTheme();
  const { accountAssets } = useAccounts();
  const { delegateAction, redelegateAction, undelegateAction, withdrawRewardsAction } =
    useStaking();
  const { walletAddress: delegatorAddress } = useApp();
  // State variables
  const [isOpen, setIsOpen] = useState(false); // Is the modal open
  const [stakingType, setStakingType] = useState(''); // Sets staking type for managing delegations
  const [redelegateAddress, setRedelegateAddress] = useState(''); // For redelegations

  // useEffects
  // Ensure modal doesn't open if these conditions aren't met
  useEffect(() => {
    setIsOpen(isLoggedIn && validator && modalOpen);
  }, [isLoggedIn, modalOpen, validator, validatorSpotlightLoading, validatorSpotlight]);
  // Pull validator spotlight info
  useEffect(() => {
    if (validator?.addressId) {
      getValidatorSpotlight(validator?.addressId);
    }
  }, [getValidatorSpotlight, validator?.addressId]);

  // Modal functions
  // Select actions
  const actionSelector = (amount?: number) => {
    // Convert hash to nhash
    const { amount: delAmount, denom } = currencyFormat(amount, 'hash', true);
    // Set initial data value to default (i.e. delegate)
    let data: DelegateProps | RedelegateProps | UndelegateProps | WithdrawRewardsProps = {
      amount: {
        amount: String(delAmount),
        denom,
      },
      delegator: String(delegatorAddress),
      validator: validator.addressId,
    };
    switch (stakingType) {
      case STAKING_TYPES.UNDELEGATE:
        // Uses default data values
        return { action: undelegateAction, data };
      case STAKING_TYPES.REDELEGATE:
        data = {
          amount: {
            amount: String(delAmount),
            denom,
          },
          delegator: String(delegatorAddress),
          validatorDst: redelegateAddress,
          validatorSrc: validator.addressId,
        };
        return { action: redelegateAction, data };
      case STAKING_TYPES.CLAIM:
        data = {
          delegator: String(delegatorAddress),
          validator: validator.addressId,
        };
        return { action: withdrawRewardsAction, data };
      default:
        // Uses default data values
        return { action: delegateAction, data };
    }
  };
  // Submission function
  const handleSubmit = async (amount?: number) => {
    const { action, data: submissionData } = actionSelector(amount);
    const { data } = await action(submissionData as any);
    const typeUrl = data.json.messages[0]['@type'];
    delete data.json.messages[0]['@type'];
    const value = data.json.messages[0];
    // If we are connected with Figure Wallet, then just send that one
    if (walletConnectState.connected) {
      wcs.sendMessage({
        description: 'Submit Delegation',
        message: data.base64,
      });
    } else {
      const response = await tx([
        {
          typeUrl,
          value,
        },
      ]);
      if (response.isSuccess) {
        alert('Delegation succeeded');
        // Wait a few seconds until refreshing the validators list
        getAllValidators({
          page: 1,
          count: 100,
          status: 'all',
        });
      } else {
        alert(`Delegation failed ${response.error?.message || 'Unknown Error'}`);
      }
    }
  };
  // Close Modal
  const handleModalClose = () => {
    onClose();
    setStakingType('');
    setRedelegateAddress('');
  };
  // Change redelegation address if needed
  const handleRedelegateSelection = (addressId: string) => {
    setRedelegateAddress(addressId);
  };
  // Handle when setting staking type
  const handleClick = (type: string, e: React.ChangeEvent<any>) => {
    // Don't let this event bubble
    e.stopPropagation();
    setStakingType(type);
    setRedelegateAddress('');
  };

  // Set variables
  const minAmount = new Big(1e-9).toNumber();
  const { description, imgUrl, moniker, siteUrl } = validatorSpotlight;
  const { commission: sCommission, amount } = validator;
  // Multiply commission to show percentage
  const commission = Number(sCommission) * 100;
  // Calculate current delegation if managing
  const { amount: delegation, denom: delegationDenom } = currencyFormat(
    Number(amount?.amount),
    amount?.denom || ''
  );
  // Set constant for number of decimals
  const decimal = 7;
  // Hash amount in users wallet
  const hashBalance = accountAssets?.find((b) => b.denom === 'nhash');
  const { amount: hashAmount, denom: hashDenom } = currencyFormat(
    Number(hashBalance?.amount),
    hashBalance?.denom || ''
  );

  return (
    <Modal isOpen={isOpen} onClose={handleModalClose} largeModal>
      {validatorSpotlightLoading || validator.addressId !== validatorSpotlight.operatorAddress ? (
        <Loading />
      ) : (
        <Formik
          enableReinitialize
          initialValues={{
            amount: 0,
          }}
          validationSchema={yup.object().shape({
            amount:
              stakingType === STAKING_TYPES.DELEGATE
                ? yup
                    .number()
                    .min(minAmount, 'Min delegation amount is 1e-9 hash')
                    .max(
                      new Big(hashAmount || 0).toNumber(),
                      `Maximum delegation amount is ${hashAmount} hash`
                    )
                    .required('A delegation amount is required')
                : stakingType === STAKING_TYPES.UNDELEGATE
                ? yup
                    .number()
                    .min(minAmount, 'Minimum undelegation amount is 1e-9 hash')
                    .max(
                      new Big(delegation || 0).toNumber(),
                      `Maximum amount is ${numberFormat(delegation, decimal)} hash`
                    )
                    .required('Please specify an amount to undelegate')
                : stakingType === STAKING_TYPES.REDELEGATE
                ? yup
                    .number()
                    .min(minAmount, 'Minimum redelegation amount is 1e-9 hash')
                    .max(
                      new Big(delegation || 0).toNumber(),
                      `Maximum amount is ${numberFormat(delegation, decimal)} hash`
                    )
                    .required('Please specify an amount to redelegate')
                : yup.number(),
          })}
          onSubmit={async (values: DelegationFormProps, { resetForm }) => {
            handleSubmit(values.amount);
            handleModalClose();
            resetForm();
          }}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              {/* Modal Header Info */}
              <SpotlightContainer>
                <ImageContainer>
                  {imgUrl ? (
                    <img src={imgUrl} alt={moniker} title={moniker} width="46.875rem" />
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
              {/* If Managing Delegations Selected and Staking Type Not Set */}
              {!stakingType && (
                <>
                  <Info>
                    {siteUrl && (
                      <Pair>
                        <PairTitle>Website</PairTitle>
                        <PairValue>
                          <a href={siteUrl}>{siteUrl}</a>
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
                      <PairTitle>Current Delegation</PairTitle>
                      <PairValue>
                        {delegation ? numberFormat(delegation, decimal) : '0'} Hash
                      </PairValue>
                    </PairInline>
                  </Info>
                  <ButtonGroup>
                    {/* This modal is from a manage button selection. It allows you
                  to undelegate, redelegate, claim rewards, or delegate more
                  to the selected validator. Don't show claim rewards option if
                  no rewards exist to be claimed. Don't show dropdown if not
                  currently delegating with the validator. */}
                    {delegation ? (
                      <DropdownBtn
                        type="button"
                        options={
                          validator.reward && validator.reward.length > 0
                            ? [
                                STAKING_TYPES.UNDELEGATE,
                                STAKING_TYPES.REDELEGATE,
                                STAKING_TYPES.CLAIM,
                              ]
                            : [STAKING_TYPES.UNDELEGATE, STAKING_TYPES.REDELEGATE]
                        }
                        initial={STAKING_TYPES.UNDELEGATE}
                        onClick={handleClick} // Sets action to take. If claim, immediately processes claim reward action
                      />
                    ) : null}
                    {/* If this is selected, takes you to the delegate screen */}
                    <Button type="button" onClick={(e) => handleClick('delegate', e)}>
                      Delegate
                    </Button>
                  </ButtonGroup>
                </>
              )}
              {/* Delegating to a Validator */}
              {stakingType === STAKING_TYPES.DELEGATE && (
                <Info>
                  <Disclaimer>
                    <DisclaimerIcon>
                      <Sprite icon="WARNING" size="2rem" color={theme.FONT_WARNING} />
                    </DisclaimerIcon>
                    <div>
                      <DisclaimerTitle>Staking will lock your funds for 21+ days</DisclaimerTitle>
                      <DisclaimerText>
                        You will need to undelegate in order for your staked assets to be liquid
                        again. This process will take 21 days to complete.
                      </DisclaimerText>
                    </div>
                  </Disclaimer>
                  {validator.votingPower &&
                    numberFormat(
                      (validator.votingPower.count / (validator.votingPower.total || 1)) * 100,
                      0
                    ) === Math.floor(Number(32)).toString() && (
                      <Disclaimer>
                        <DisclaimerIcon>
                          <Sprite icon="WARNING" size="2rem" color={theme.FONT_WARNING} />
                        </DisclaimerIcon>
                        <div>
                          <DisclaimerTitle>
                            {validator.moniker} is close to voting capacity
                          </DisclaimerTitle>
                          <DisclaimerText>
                            This validator is near the maximum staking concentration limits.
                            Depending on the size of your delegation it may not be possible to
                            delegate. Please consider choosing one of the lower ranked validators
                            for your delegation to improve the decentralization of the network.
                          </DisclaimerText>
                        </div>
                      </Disclaimer>
                    )}
                  {/* Pops a warning if you'll only have 5 hash left, otherwise you might get stuck */}
                  {new Big(formik.values.amount || 0).gt(
                    new Big(hashAmount || 0).minus(MIN_HASH_AFTER_STAKING).toNumber()
                  ) && (
                    <Disclaimer color={theme.FONT_ERROR}>
                      <DisclaimerIcon>
                        <Sprite icon="WARNING" size="2rem" color={theme.FONT_ERROR} />
                      </DisclaimerIcon>
                      <div>
                        <DisclaimerTitle>Warning: Account will lock</DisclaimerTitle>
                        <DisclaimerText>
                          In order to undelegate funds back into this account, the account will need
                          to be able to pay the required fees. Delegating the specified amount of
                          funds from this account will result in it being locked until another
                          account sends it funds.
                        </DisclaimerText>
                      </div>
                    </Disclaimer>
                  )}

                  <Pair>
                    <PairTitle>My Delegation</PairTitle>
                    <PairValue>
                      {delegation ? numberFormat(delegation, decimal) : '0'} {delegationDenom}
                    </PairValue>
                  </Pair>

                  <Pair>
                    <PairTitle>Available Balance</PairTitle>
                    <PairValue>
                      {numberFormat(hashAmount, decimal)} {hashDenom}
                    </PairValue>
                  </Pair>

                  <Pair>
                    <Forms
                      config={[
                        {
                          type: 'number',
                          label: 'amount to delegate (hash)',
                          field: 'amount',
                        },
                      ]}
                      formik={formik}
                    />
                  </Pair>
                </Info>
              )}

              {/* Undelegating */}
              {stakingType === STAKING_TYPES.UNDELEGATE && (
                <Info>
                  <Disclaimer>
                    <DisclaimerIcon>
                      <Sprite icon="WARNING" size="2rem" color={theme.FONT_WARNING} />
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
                      <Sprite icon="HELP" size="2rem" color={theme.FONT_THEME} />
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
                      <Forms
                        config={[
                          {
                            type: 'number',
                            label: 'amount to undelegate (hash)',
                            field: 'amount',
                          },
                        ]}
                        formik={formik}
                      />
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
                        maxHeight="13.125rem"
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
                        <Forms
                          config={[
                            {
                              type: 'number',
                              label: 'amount to redelegate (hash)',
                              field: 'amount',
                            },
                          ]}
                          formik={formik}
                        />
                      </PairValue>
                    </Pair>
                  )}
                </Info>
              )}

              {/* Buttons for submission */}
              {stakingType && (
                <>
                  {stakingType === STAKING_TYPES.CLAIM && validator.reward && (
                    <Info>
                      <Pair>
                        <PairTitle>Total Rewards Available</PairTitle>
                        <PairValue>
                          {formatDenom(
                            Number(validator.reward[0].amount),
                            validator.reward[0].denom
                          )}
                        </PairValue>
                      </Pair>
                    </Info>
                  )}
                  <ButtonGroup>
                    {!isDelegate && (
                      <Button type="button" onClick={(e) => handleClick('', e)} color="secondary">
                        Back
                      </Button>
                    )}
                    <Button type="submit">{capitalize(stakingType)}</Button>
                  </ButtonGroup>
                </>
              )}
            </form>
          )}
        </Formik>
      )}
    </Modal>
  );
};
