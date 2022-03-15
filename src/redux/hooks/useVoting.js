import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useWallet, WINDOW_MESSAGES } from '@provenanceio/wallet-lib';
import useEvent from 'react-tiny-hooks/use-event';
import useToggle from 'react-tiny-hooks/use-toggle';
import { useApp } from 'redux/hooks';
import { VOTING_TYPES } from 'consts';
import OgButton from 'Components/Button';

const Button = styled(OgButton)`
  text-transform: capitalize;
`;

/**
 * @typedef {Object} Voting
 * @property {function} handleVoting - The function to handle staking
 * @property {function} ManageVotingBtn - React component connected to the modalFns
 * @property {object} modalFns - The items to handle the modal
 * @property {boolean} modalFns.modalOpen - If modal should be open
 * @property {function} modalFns.toggleOpen - Function to toggle the modalOpen boolean
 * @property {function} modalFns.activateModalOpen - Function to set modalOpen to true
 * @property {function} modalFns.deactivateModalOpen - Function to set modalOpen to false
 */

/**
 * Hook that provides components and state for voting
 * @return {Voting}
 */
const useVoting = () => {
  const [shouldPull, setShouldPull] = useState(true);
  const { walletService, messageService } = useWallet();
  // We are opening a modal, so need this
  const [modalOpen, toggleModalOpen, activateModalOpen, deactivateModalOpen] = useToggle(false);
  // Only show if account has hash and is logged in - has hash determine by Proposal main page
  const { isLoggedIn, setIsLoggedIn } = useApp();

  // Yep we need the wallet
  useEffect(() => {
    setIsLoggedIn(!!walletService.state.address);
  }, [walletService.state.address, setIsLoggedIn]);

  useEvent('message', evt => {
    if (walletService.walletUrl?.match(evt.origin)) {
      if (evt.data.message === WINDOW_MESSAGES.TRANSACTION_COMPLETE) {
        setShouldPull(true);
        deactivateModalOpen();
      }
    }
  });

  useEffect(() => {
    setShouldPull(true);
  }, [isLoggedIn]);

  useEffect(() => {
    let timeout;
    if (shouldPull) {
      timeout = setTimeout(() => {
        setShouldPull(false);
      }, 2000);
    }
    return () => timeout && clearTimeout(timeout);
  }, [shouldPull]);

  const handleVoting = (proposalId, voter, option) => {
    if (!isLoggedIn) return;
    const optionType = {
      [VOTING_TYPES.YES]: 1, // 1 "OptionYes"
      [VOTING_TYPES.ABSTAIN]: 2, // 2 "OptionAbstain"
      [VOTING_TYPES.NO]: 3, // 3 "OptionNo"
      [VOTING_TYPES.NO_WITH_VETO]: 4, // 4 "OptionNoWithVeto"
    }[option];
    let msg;

    switch (option) {
      case VOTING_TYPES.YES: // fallthrough
      case VOTING_TYPES.ABSTAIN: // fallthrough
      case VOTING_TYPES.NO: // fallthrough
      case VOTING_TYPES.NO_WITH_VETO: // fallthrough
        msg = {
          proposalId,
          voter,
          option: optionType,
        };
        break;
      default:
        console.warn(
          `An option must be selected. You have selected -${option}-, which is not supported`
        );
    }

    if (optionType) {
      const builtMsg = messageService.buildMessage('MsgVote', msg);
      const msgAnyB64 = messageService.createAnyMessageBase64('MsgVote', builtMsg);
      walletService.transaction({ msgAnyB64 });
    }
  };

  const handleManageVotingClick = () => {
    activateModalOpen();
  };

  const ManageVotingBtn = ({ title }) =>
    !isLoggedIn ? null : <Button onClick={() => handleManageVotingClick()}>Vote on {title}</Button>;

  ManageVotingBtn.propTypes = {
    title: PropTypes.string.isRequired,
  };

  return {
    handleVoting,
    ManageVotingBtn,
    modalFns: {
      modalOpen,
      toggleModalOpen,
      activateModalOpen,
      deactivateModalOpen,
    },
  };
};

export default useVoting;
