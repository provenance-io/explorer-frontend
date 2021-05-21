import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useWallet } from '@provenanceio/wallet-lib';
import { useApp } from 'redux/hooks';
import OgButton from 'Components/Button';
import useToggle from 'react-tiny-hooks/use-toggle';

const Button = styled(OgButton)`
  text-transform: capitalize;
`;

/**
 * @typedef {Object} Staking
 * @property {function} handleStaking - The function to handle staking
 * @property {function} ManageStakingBtn - React component connected to the modalFns
 * @property {object} modalFns - The items to handle the modal
 * @property {boolean} modalFns.modalOpen - If modal should be open
 * @property {function} modalFns.toggleOpen - Function to toggle the modalOpen boolean
 * @property {function} modalFns.activateModalOpen - Function to set modalOpen to true
 * @property {function} modalFns.deactivateModalOpen - Function to set modalOpen to false
 * @property {object} validator - The selected validator
 */

/**
 *
 * @return {Staking}
 */
const useStaking = () => {
  const [validator, setValidator] = useState(null);
  const { walletService, messageService } = useWallet();
  const [modalOpen, toggleModalOpen, activateModalOpen, deactivateModalOpen] = useToggle(false);
  const { isLoggedIn } = useApp();

  const {
    state: { address: delegatorAddress },
  } = walletService;

  const handleStaking = (type) => {
    if (!isLoggedIn) return;
    console.log(type);
    let msgType;
    let msg;

    switch (type) {
      case 'delegation':
        msgType = 'MsgDelegate';
      // msg = { delegatorAddress, validatorAddress: validator., amount };
      default:
        return;
    }
  };

  const handleManageStakingClick = (validator) => {
    setValidator(validator);
    activateModalOpen();
  };

  const ManageStakingBtn = ({ validator }) =>
    !isLoggedIn ? null : (
      <Button onClick={() => handleManageStakingClick(validator)} icon="CHEVRON" iconSize="2rem" iconOptions={{ flipX: true }}>
        Manage
      </Button>
    );

  ManageStakingBtn.propTypes = { validator: PropTypes.object.isRequired };

  return {
    handleStaking,
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
