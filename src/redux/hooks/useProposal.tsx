import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useWalletConnect, WINDOW_MESSAGES } from '@provenanceio/walletconnect-js';
// @ts-ignore
import useToggle from 'react-tiny-hooks/use-toggle';
import { useApp } from 'redux/hooks';
import OgButton from 'Components/Button';

const Button = styled(OgButton)`
  text-transform: capitalize;
`;

export const useProposal = () => {
  const [shouldPull, setShouldPull] = useState(true);
  const { walletConnectService: wcs, walletConnectState } = useWalletConnect();
  const { address } = walletConnectState;
  // We are opening a modal, so need this
  const [modalOpen, toggleModalOpen, activateModalOpen, deactivateModalOpen] = useToggle(false);
  // Only show if account has hash and is logged in - has hash determine by Proposal main page
  const { isLoggedIn, setIsLoggedIn } = useApp();
  const [submitted, setSubmitted] = useState(false);

  // Yep we need the wallet
  useEffect(() => {
    setIsLoggedIn(!!address);
  }, [address, setIsLoggedIn]);

  // Event listeners for wallet messages
  useEffect(() => {
    wcs.addListener(WINDOW_MESSAGES.SEND_MESSAGE_COMPLETE, (result) => {
      setShouldPull(true);
      setSubmitted(true);
    });

    // Fail message for transaction messages
    wcs.addListener(WINDOW_MESSAGES.SEND_MESSAGE_FAILED, (result) => {
      setSubmitted(false);
      deactivateModalOpen();
    });

    // Remove event listeners when no longer needed
    return () => {
      wcs.removeListener(WINDOW_MESSAGES.SEND_MESSAGE_COMPLETE, () => {});
      wcs.removeListener(WINDOW_MESSAGES.SEND_MESSAGE_FAILED, () => {});
    };
  }, [wcs, deactivateModalOpen]);

  useEffect(() => {
    setShouldPull(true);
  }, [isLoggedIn]);

  useEffect(() => {
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
      <Button onClick={() => handleManageProposalClick()}>Submit New Proposal</Button>
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
