import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// @ts-ignore
import useToggle from 'react-tiny-hooks/use-toggle';
import { useChain } from '@cosmos-kit/react';
import { useWalletConnect } from "@provenanceio/walletconnect-js";
import { useApp, useAccounts } from '../hooks';
import OgButton from '../../Components/Button';
import { CHAIN_NAME } from '../../config';

const Button = styled(OgButton)`
  text-transform: capitalize;
`;

export const useVoting = () => {
  // const { walletConnectService: wcs } = useWalletConnect();
  // We are opening a modal, so need this
  const [modalOpen, toggleModalOpen, activateModalOpen, deactivateModalOpen] = useToggle(false);
  // Only show if account has hash and is logged in - has hash determine by Proposal main page
  const { isLoggedIn, setIsLoggedIn } = useApp();
  const { getAccountDelegations } = useAccounts();
  const [voted, setVoted] = useState(false);

  // Get the address
  const { walletConnectState } = useWalletConnect();
  const { address } = useChain(CHAIN_NAME);

  const walletAddress = address ? address : walletConnectState.address;

  // Yep we need the wallet
  useEffect(() => {
    setIsLoggedIn(!!walletAddress);
  }, [walletAddress, setIsLoggedIn]);

  // Event listeners for wallet messages
  // TODO: Add this back in at some point
  // useEffect(() => {
  //   // Success message for transaction messages
  //   const submitSuccess = () => {
  //     setVoted(true);
  //   };
  //   wcs.addListener(WINDOW_MESSAGES.SEND_MESSAGE_COMPLETE, submitSuccess);

  //   // Fail message for transaction messages
  //   const submitFailure = () => {
  //     setVoted(false);
  //     deactivateModalOpen();
  //   };
  //   wcs.addListener(WINDOW_MESSAGES.SEND_MESSAGE_FAILED, submitFailure);

  //   // Remove event listeners when no longer needed
  //   return () => {
  //     wcs.removeListener(WINDOW_MESSAGES.SEND_MESSAGE_COMPLETE, submitSuccess);
  //     wcs.removeListener(WINDOW_MESSAGES.SEND_MESSAGE_FAILED, submitFailure);
  //   };
  // }, [wcs, deactivateModalOpen]);

  const handleManageVotingClick = () => {
    getAccountDelegations({ address: String(walletAddress) });
    activateModalOpen();
  };

  const ManageVotingBtn = ({ title }: { title: string }) =>
    !isLoggedIn ? null : (
      <Button id="gov-voting" onClick={handleManageVotingClick}>
        Vote on {title}
      </Button>
    );

  ManageVotingBtn.propTypes = {
    title: PropTypes.string.isRequired,
  };

  return {
    ManageVotingBtn,
    voted,
    setVoted,
    modalFns: {
      modalOpen,
      toggleModalOpen,
      activateModalOpen,
      deactivateModalOpen,
    },
  };
};
