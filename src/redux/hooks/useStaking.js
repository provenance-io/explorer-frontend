import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useWallet } from '@provenanceio/wallet-lib';
import { useApp } from 'redux/hooks';
import DropdownBtn from 'Components/DropdownBtn';
import Button from 'Components/Button';
import Modal from 'Components/Modal';
import useToggle from 'react-tiny-hooks/use-toggle';

const useStaking = () => {
  const [validator, setValidator] = useState(null);
  const { walletService, messageService } = useWallet();
  const [modalOpen, toggleModalOpen, activateModalOpen, deactivateModalOpen] = useToggle(true);
  const { isLoggedIn } = useApp();

  const handleStaking = (type) => {
    if (!isLoggedIn) return;
    console.log(type);
    let msgType;
    let msg;

    switch (type) {
      case 'delegation':
        msgType = 'MsgDelegate';
      // msg = { delegatorAddress, validatorAddress, amount };
      default:
        return;
    }
  };

  const handleManageStakingClick = (validator) => {
    setValidator(validator);
    activateModalOpen();
  };

  const StakingOptionsBtn = () =>
    !isLoggedIn ? null : (
      <DropdownBtn options={['Delegate', 'Undelegate', 'Redelegate', 'Claim Rewards']} initial="Delegate" onClick={handleStaking} />
    );

  const ManageStakingBtn = ({ validator }) =>
    !isLoggedIn ? null : (
      <Button onClick={() => handleManageStakingClick(validator)} icon="CHEVRON" iconSize="2rem" iconOptions={{ flipX: true }}>
        Manage
      </Button>
    );

  ManageStakingBtn.propTypes = { validator: PropTypes.object.isRequired };

  const ManageStakingModal = () =>
    !isLoggedIn ? null : (
      <Modal isOpen={modalOpen} onClose={deactivateModalOpen}>
        This is the content
      </Modal>
    );

  return { ManageStakingBtn, ManageStakingModal, StakingOptionsBtn };
};

export default useStaking;
