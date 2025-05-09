import { useEffect, useState } from 'react';
import styled from 'styled-components';
// @ts-ignore
import useToggle from 'react-tiny-hooks/use-toggle';
import { useChain } from '@cosmos-kit/react';
import { useWalletConnect } from "@provenanceio/walletconnect-js";
import { useApp } from '../hooks';
import OgButton from '../../Components/Button';
import { CHAIN_NAME } from '../../config';

const Button = styled(OgButton)`
  text-transform: capitalize;
`;

export const useProposal = () => {
  const [shouldPull, setShouldPull] = useState(true);
  const { walletConnectState } = useWalletConnect();
  const { address } = useChain(CHAIN_NAME);
  // We are opening a modal, so need this
  const [modalOpen, toggleModalOpen, activateModalOpen, deactivateModalOpen] = useToggle(false);
  // Only show if account has hash and is logged in - has hash determine by Proposal main page
  const { isLoggedIn, setIsLoggedIn } = useApp();
  const [submitted, setSubmitted] = useState(false);

  const walletAddress = address ? address : walletConnectState.address;
  // Yep we need the wallet
  useEffect(() => {
    setIsLoggedIn(!!walletAddress);
  }, [walletAddress, setIsLoggedIn]);

  // Event listeners for wallet messages
  // TODO: Update this if needed
  // useEffect(() => {
  //   wcs.addListener(WINDOW_MESSAGES.SEND_MESSAGE_COMPLETE, (result) => {
  //     setShouldPull(true);
  //     setSubmitted(true);
  //   });

  //   // Fail message for transaction messages
  //   wcs.addListener(WINDOW_MESSAGES.SEND_MESSAGE_FAILED, (result) => {
  //     setSubmitted(false);
  //     deactivateModalOpen();
  //   });

  //   // Remove event listeners when no longer needed
  //   return () => {
  //     wcs.removeListener(WINDOW_MESSAGES.SEND_MESSAGE_COMPLETE, () => {});
  //     wcs.removeListener(WINDOW_MESSAGES.SEND_MESSAGE_FAILED, () => {});
  //   };
  // }, [wcs, deactivateModalOpen]);

  // useEffect(() => {
  //   setShouldPull(true);
  // }, [isLoggedIn]);

  useEffect(() => {
    // @ts-ignore
    let timeout: NodeJS.Timeout;
    if (shouldPull) {
      timeout = setTimeout(() => {
        setShouldPull(false);
      }, 2000);
    }
    return () => timeout && clearTimeout(timeout);
  }, [shouldPull]);

  const handleManageProposalClick = () => {
    activateModalOpen();
  };

  const ManageProposalBtn = () =>
    !isLoggedIn ? null : (
      <Button id="gov-create" onClick={() => handleManageProposalClick()}>
        Submit New Proposal
      </Button>
    );

  return {
    ManageProposalBtn,
    submitted,
    setSubmitted,
    modalFns: {
      modalOpen,
      toggleModalOpen,
      activateModalOpen,
      deactivateModalOpen,
    },
  };
};
