import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useWalletConnect, WINDOW_MESSAGES } from '@provenanceio/walletconnect-js';
import { BroadcastResults } from '@provenanceio/walletconnect-js/lib/types';
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
    // Success message for transaction messages
    const submitSuccess = (result: BroadcastResults) => {
      setShouldPull(true);
      setSubmitted(true);
    };
    wcs.addListener(WINDOW_MESSAGES.CUSTOM_ACTION_COMPLETE, submitSuccess);

    // Fail message for transaction messages
    const submitFailure = (result: BroadcastResults) => {
      setSubmitted(false);
      deactivateModalOpen();
    };
    wcs.addListener(WINDOW_MESSAGES.CUSTOM_ACTION_FAILED, submitFailure);

    // Remove event listeners when no longer needed
    return () => {
      wcs.removeListener(WINDOW_MESSAGES.CUSTOM_ACTION_COMPLETE, submitSuccess);
      wcs.removeListener(WINDOW_MESSAGES.CUSTOM_ACTION_FAILED, submitFailure);
      wcs.removeAllListeners();
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
