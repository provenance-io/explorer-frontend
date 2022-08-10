import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useWalletConnect, WINDOW_MESSAGES } from '@provenanceio/walletconnect-js';
import useEvent from 'react-tiny-hooks/use-event';
import useToggle from 'react-tiny-hooks/use-toggle';
import { useApp, useAccounts } from 'redux/hooks';
import { VOTING_TYPES } from 'consts';
import OgButton from 'Components/Button';
import { MsgCreateVestingAccountResponse } from '@provenanceio/wallet-lib/lib/proto/cosmos/vesting/v1beta1/tx_pb';

const Button = styled(OgButton)`
  text-transform: capitalize;
`;

/**
 * @typedef {Object} Voting
 * @property {function} handleVoting - The function to handle voting
 * @property {function} ManageVotingBtn - React component connected to the modalFns
 * @property {boolean} voted - Whether the user successfully voted or not
 * @property {() => void} setVoted - controls voting state
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
export const useVoting = () => {
  const { walletConnectService, walletConnectState } = useWalletConnect();
  // We are opening a modal, so need this
  const [modalOpen, toggleModalOpen, activateModalOpen, deactivateModalOpen] = useToggle(false);
  // Only show if account has hash and is logged in - has hash determine by Proposal main page
  const { isLoggedIn, setIsLoggedIn } = useApp();
  const { getAccountDelegations } = useAccounts();
  const [voted, setVoted] = useState(false);

  // Get the address
  const { address } = walletConnectState;

  // Yep we need the wallet
  useEffect(() => {
    setIsLoggedIn(!!address);
  }, [address, setIsLoggedIn]);

  useEvent('message', (evt) => {
    if (walletConnectService.walletUrl?.match(evt.origin)) {
      if (evt.data.message === WINDOW_MESSAGES.TRANSACTION_COMPLETE) {
        setVoted(true);
      } else if (evt.data.message === WINDOW_MESSAGES.TRANSACTION_FAILED) {
        setVoted(false);
        deactivateModalOpen();
      }
    }
  });

  const getOptionType = (option) => {
    if (option === 'noWithVeto') option = 'no with veto';
    const optionType = {
      [VOTING_TYPES.YES]: 'VOTE_OPTION_YES', // 1 "OptionYes"
      [VOTING_TYPES.ABSTAIN]: 'VOTE_OPTION_ABSTAIN', // 2 "OptionAbstain"
      [VOTING_TYPES.NO]: 'VOTE_OPTION_NO', // 3 "OptionNo"
      [VOTING_TYPES.NO_WITH_VETO]: 'VOTE_OPTION_NO_WITH_VETO', // 4 "OptionNoWithVeto"
    }[option];
    switch (option) {
      case VOTING_TYPES.YES: // fallthrough
      case VOTING_TYPES.ABSTAIN: // fallthrough
      case VOTING_TYPES.NO: // fallthrough
      case VOTING_TYPES.NO_WITH_VETO: // fallthrough
        return optionType;
      default:
        console.warn(
          `An option must be selected. You have selected -${option}-, which is not supported`
        );
    }
    return optionType;
  };

  const handleVoting = async (proposalId, voter, option, weighted) => {
    const votes = [];
    if (!isLoggedIn) return;
    if (weighted) {
      Object.keys(option).forEach((k) => {
        if (option[k] > 0) {
          votes.push({ option: getOptionType(k), weight: option[k].toString() });
        }
        return;
      });
    } else {
      // If weighted vote not selected, just send it in as 100% for user submission
      votes.push({ option: getOptionType(option.vote), weight: (100).toString() });
    }

    try {
      const { data } = await MsgCreateVestingAccountResponse({
        proposalId,
        voter,
        votes,
      });
      await walletConnectService.customAction({
        description: 'Submit Vote',
        message: data.base64,
      });
    } catch (e) {
      console.log('Some errors');
    }
  };

  console.log('address: ', walletConnectService);

  const handleManageVotingClick = () => {
    getAccountDelegations({ address });
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
