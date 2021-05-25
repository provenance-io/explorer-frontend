import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Big from 'big.js';
import { useWallet, WINDOW_MESSAGES } from '@provenanceio/wallet-lib';
import useEvent from 'react-tiny-hooks/use-event';
import useToggle from 'react-tiny-hooks/use-toggle';
import { useApp } from 'redux/hooks';
import { STAKING_TYPES } from 'consts';
import OgButton from 'Components/Button';
import useAccounts from './useAccounts';

const Button = styled(OgButton)`
  text-transform: capitalize;
`;

/**
 * @typedef {Object} Staking
 * @property {function} handleStaking - The function to handle staking
 * @property {boolean} isDelegate - Whether or not delegate only
 * @property {function} ManageStakingBtn - React component connected to the modalFns
 * @property {object} modalFns - The items to handle the modal
 * @property {boolean} modalFns.modalOpen - If modal should be open
 * @property {function} modalFns.toggleOpen - Function to toggle the modalOpen boolean
 * @property {function} modalFns.activateModalOpen - Function to set modalOpen to true
 * @property {function} modalFns.deactivateModalOpen - Function to set modalOpen to false
 * @property {object} validator - The selected validator
 */

/**
 * Hook that provides components and state for staking
 * @return {Staking}
 */
const useStaking = () => {
  const [shouldPull, setShouldPull] = useState(true);
  const [isDelegate, setIsDelegate] = useState(false);
  const [validator, setValidator] = useState(null);
  const { walletService, messageService } = useWallet();
  const { accountInfo, getAccountDelegations, getAccountInfo, getAccountRedelegations, getAccountUnbonding } = useAccounts();
  const [modalOpen, toggleModalOpen, activateModalOpen, deactivateModalOpen] = useToggle(false);
  const { isLoggedIn, setIsLoggedIn } = useApp();

  useEffect(() => {
    setIsLoggedIn(!!walletService.state.address);
  }, [walletService.state.address, setIsLoggedIn]);

  useEvent('message', (evt) => {
    if (walletService.walletUrl?.match(evt.origin)) {
      switch (evt.data.message) {
        case WINDOW_MESSAGES.TRANSACTION_COMPLETE:
          deactivateModalOpen();
          setShouldPull(true);
          break;
        default:
          deactivateModalOpen();
      }
    }
  });

  const {
    state: { address: delegatorAddress },
  } = walletService;

  useEffect(() => {
    if (delegatorAddress && delegatorAddress !== accountInfo.address) {
      getAccountInfo(delegatorAddress);
    }
  }, [delegatorAddress, getAccountInfo, accountInfo.address]);

  useEffect(() => {
    if (shouldPull && isLoggedIn) {
      getAccountDelegations(delegatorAddress);
      getAccountRedelegations(delegatorAddress);
      getAccountUnbonding(delegatorAddress);
      setShouldPull(false);
    }
  }, [shouldPull, isLoggedIn, delegatorAddress, getAccountDelegations, getAccountRedelegations, getAccountUnbonding]);

  useEffect(() => {
    setShouldPull(true);
  }, [isLoggedIn]);

  useEffect(() => {
    if (!modalOpen) {
      setIsDelegate(false);
    }
  }, [modalOpen]);

  const handleStaking = (type, amt, validatorDstAddress) => {
    if (!isLoggedIn) return;
    const amount = { denom: 'nhash', amount: new Big(amt).times(new Big(10).pow(9)).toFixed() };
    const msgType = {
      [STAKING_TYPES.DELEGATE]: 'MsgDelegate',
      [STAKING_TYPES.UNDELEGATE]: 'MsgUndelegate',
      [STAKING_TYPES.REDELEGATE]: 'MsgBeginRedelegate',
    }[type];
    let msg;

    switch (type) {
      case STAKING_TYPES.DELEGATE:
      case STAKING_TYPES.UNDELEGATE:
        msg = { delegatorAddress, validatorAddress: validator.addressId, amount };
        break;
      case STAKING_TYPES.REDELEGATE:
        msg = { delegatorAddress, validatorSrcAddress: validator.addressId, validatorDstAddress, amount };
        break;
      default:
        console.warn(`${type} is not supported`);
    }

    if (msgType) {
      const builtMsg = messageService.buildMessage(msgType, msg);
      const msgAnyB64 = encodeURIComponent(messageService.createAnyMessageBase64(msgType, builtMsg));
      walletService.transaction({ msgAnyB64 });
    }
  };

  const handleManageStakingClick = (validator, delegate) => {
    setValidator(validator);
    activateModalOpen();
    setIsDelegate(delegate);
  };

  const ManageStakingBtn = ({ delegate, validator }) =>
    !isLoggedIn ? null : (
      <Button
        onClick={() => handleManageStakingClick(validator, delegate)}
        icon="CHEVRON"
        iconSize="2rem"
        iconOptions={{ flipX: true }}
      >
        {delegate ? 'Delegate' : 'Manage'}
      </Button>
    );

  ManageStakingBtn.propTypes = { delegate: PropTypes.bool.isRequired, validator: PropTypes.object.isRequired };

  return {
    handleStaking,
    isDelegate,
    ManageStakingBtn,
    modalFns: {
      modalOpen,
      toggleModalOpen,
      activateModalOpen,
      deactivateModalOpen,
    },
    validator,
  };
};

export default useStaking;