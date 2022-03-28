import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useWallet, WINDOW_MESSAGES } from '@provenanceio/wallet-lib';
import useEvent from 'react-tiny-hooks/use-event';
import useToggle from 'react-tiny-hooks/use-toggle';
import { useApp } from 'redux/hooks';
import OgButton from 'Components/Button';

const Button = styled(OgButton)`
  text-transform: capitalize;
`;

/**
 * @typedef {Object} Proposal
 * @property {function} handleProposal - The function to handle proposal submission
 * @property {function} ManageVotingBtn - React component connected to the modalFns
 * @property {object} modalFns - The items to handle the modal
 * @property {boolean} modalFns.modalOpen - If modal should be open
 * @property {function} modalFns.toggleOpen - Function to toggle the modalOpen boolean
 * @property {function} modalFns.activateModalOpen - Function to set modalOpen to true
 * @property {function} modalFns.deactivateModalOpen - Function to set modalOpen to false
 */

/**
 * Hook that provides components and state for voting
 * @return {Proposal}
 */
const useProposal = () => {
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

  const handleProposal = (content, initialDeposit, proposalId) => {
    if (!isLoggedIn) return;
    let msg;
    if (content) {
      msg = {
        content,
        initialDeposit,
        proposalId,
      };
    } else {
      console.warn(`A description of the proposal must be provided.`);
    }

    if (msg) {
      const builtMsg = messageService.buildMessage('MsgSubmitProposal', msg);
      const msgAnyB64 = messageService.createAnyMessageBase64('MsgSubmitProposal', builtMsg);
      walletService.transaction({ msgAnyB64 });
    }
  };

  const handleManageProposalClick = () => {
    activateModalOpen();
  };

  const ManageProposalBtn = () =>
    !isLoggedIn ? null : (
      <Button onClick={() => handleManageProposalClick()}>Submit New Proposal</Button>
    );

  return {
    handleProposal,
    ManageProposalBtn,
    modalFns: {
      modalOpen,
      toggleModalOpen,
      activateModalOpen,
      deactivateModalOpen,
    },
  };
};

export default useProposal;
