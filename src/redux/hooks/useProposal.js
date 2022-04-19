import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useWallet, WINDOW_MESSAGES } from '@provenanceio/wallet-lib';
import useEvent from 'react-tiny-hooks/use-event';
import useToggle from 'react-tiny-hooks/use-toggle';
import { useApp } from 'redux/hooks';
import OgButton from 'Components/Button';
import { ACCESS_TYPES, PROPOSAL_TYPES } from 'consts';

const Button = styled(OgButton)`
  text-transform: capitalize;
`;

/**
 * @typedef {Object} Proposal
 * @property {function} handleProposal - The function to handle proposal submission
 * @property {function} ManageProposalBtn - React component connected to the modalFns
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

  const handleProposal = (content, initialDepositList, proposer, type) => {
    if (!isLoggedIn) return;
    const proposalType = {
      [PROPOSAL_TYPES.TEXT]: 'TextProposal',
      [PROPOSAL_TYPES.SOFTWARE_UPGRADE]: 'SoftwareUpgradeProposal',
      [PROPOSAL_TYPES.CANCEL_SOFTWARE_UPGRADE]: 'CancelSoftwareUpgradeProposal',
      [PROPOSAL_TYPES.STORE_CODE]: 'StoreCodeProposal',
      [PROPOSAL_TYPES.INSTANTIATE_CODE]: 'InstantiateCodeProposal',
      [PROPOSAL_TYPES.PARAMS_CHANGE]: 'ParameterChangeProposal',
    }[type];
    let msg;

    switch (type) {
      case PROPOSAL_TYPES.TEXT: // fallthrough
      case PROPOSAL_TYPES.CANCEL_SOFTWARE_UPGRADE: // fallthrough
      case PROPOSAL_TYPES.INSTANTIATE_CODE: // fallthrough
      case PROPOSAL_TYPES.PARAMS_CHANGE: // fallthrough
        msg = {
          content,
          initialDepositList,
          proposer,
          proposalType,
        };
        break;
      case PROPOSAL_TYPES.SOFTWARE_UPGRADE: {
        const { title, description, name, height, info } = content;
        const softwareUpgradeContent = {
          title,
          description,
          plan: {
            name,
            height,
            info,
          },
        };
        msg = {
          content: softwareUpgradeContent,
          initialDepositList,
          proposer,
          proposalType,
        };
        break;
      }
      case PROPOSAL_TYPES.STORE_CODE: {
        const { title, description, runAs, wasmByteCode, address, accessType } = content;
        const access = {
          [ACCESS_TYPES.NOBODY]: 1,
          [ACCESS_TYPES.ONLY_ADDRESS]: 2,
          [ACCESS_TYPES.EVERYBODY]: 3,
        }[accessType];
        switch (accessType) {
          case ACCESS_TYPES.NOBODY: // fallthrough
          case ACCESS_TYPES.ONLY_ADDRESS: // fallthrough
          case ACCESS_TYPES.EVERYBODY:
            break;
          default:
            console.warn(
              `Invalid access type. You have selected "${access}", which is not supported`
            );
        }
        const storeCodeContent = {
          title,
          description,
          runAs,
          wasmByteCode,
          instantiatePermission: {
            permission: access,
            address,
          },
        };
        msg = {
          content: storeCodeContent,
          initialDepositList,
          proposer,
          proposalType,
        };
        break;
      }
      default:
        console.warn(`${type} is not supported.`);
    }

    if (proposalType) {
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
