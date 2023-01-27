import { useEffect, useState, useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { useWalletConnect, WINDOW_MESSAGES } from '@provenanceio/walletconnect-js';
import { BroadcastResult } from '@provenanceio/walletconnect-js/lib/types';
// @ts-ignore
import useToggle from 'react-tiny-hooks/use-toggle';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  selectStaking as selector,
  stakingActions as actionsList,
  noDispatchActions,
} from '../features/staking/stakingSlice';
import { useApp, useAccounts } from '../hooks';
import OgButton from '../../Components/Button';

const Button = styled(OgButton)`
  text-transform: capitalize;
`;

export interface CurrentValidator {
  addressId: string;
  bondedTokens?: {
    count: string;
    denom: string;
    total: string;
  };
  commission: string;
  consensusAddress?: string;
  delegators?: number;
  hr24Change?: string;
  imgUrl: string;
  moniker: string;
  proposerPriority?: number;
  status?: string;
  unbondingHeight?: number;
  uptime?: number;
  reward?: {
    amount: string;
    denom: string;
    pricePerToken: {
      amount: string;
      denom: string;
    };
    totalBalancePrice: {
      amount: string;
      denom: string;
    };
  }[];
  totalBalancePrice?: string;
  votingPower?: {
    count: number;
    total: number;
  };
  amount?: {
    amount: string;
    denom: string;
  };
  block?: number;
  delegatorAddr?: string;
  endTime?: string;
  initialBal?: {
    amount: string;
    denom: string;
  };
  shares?: string;
  validatorDstAddr?: string;
  validatorSrcAddr?: string;
}

export const useStaking = () => {
  // This pulls in the staking actions in the staking slice
  const dispatch = useAppDispatch();
  const state = useAppSelector(selector);
  const actions = useMemo(() => bindActionCreators(actionsList, dispatch), [dispatch]);

  const [shouldPull, setShouldPull] = useState(true);
  const [isDelegate, setIsDelegate] = useState(false);
  const [validator, setValidator] = useState<CurrentValidator>();
  const { walletConnectService: wcs, walletConnectState } = useWalletConnect();
  const { address: delegatorAddress } = walletConnectState;
  const {
    getAccountDelegations,
    getAccountAssets,
    getAccountRedelegations,
    getAccountRewards,
    getAccountUnbonding,
  } = useAccounts();
  const [modalOpen, toggleModalOpen, activateModalOpen, deactivateModalOpen] = useToggle(false);
  const { isLoggedIn, setIsLoggedIn } = useApp();

  useEffect(() => {
    setIsLoggedIn(!!delegatorAddress);
  }, [delegatorAddress, setIsLoggedIn]);

  // Event listeners for wallet messages
  useEffect(() => {
    // Success message for transaction messages
    const submitSuccess = (result: BroadcastResult) => {
      setShouldPull(true);
      deactivateModalOpen();
    };
    wcs.addListener(WINDOW_MESSAGES.SEND_MESSAGE_COMPLETE, submitSuccess);

    // Fail message for transaction messages
    const submitFailure = (result: BroadcastResult) => {
      setShouldPull(false);
    };
    wcs.addListener(WINDOW_MESSAGES.SEND_MESSAGE_FAILED, submitFailure);

    // Remove event listeners when no longer needed
    return () => {
      wcs.removeListener(WINDOW_MESSAGES.SEND_MESSAGE_COMPLETE, submitSuccess);
      wcs.removeListener(WINDOW_MESSAGES.SEND_MESSAGE_FAILED, submitFailure);
      wcs.removeAllListeners();
    };
  }, [wcs, deactivateModalOpen]);

  // TODO: Need to improve flexibility to not have to pull 100+ delegators and assets
  useEffect(() => {
    (async () => {
      try {
        if (shouldPull && isLoggedIn) {
          getAccountAssets({ address: delegatorAddress, count: 100, page: 1 });
          getAccountDelegations({ address: delegatorAddress, count: 100, page: 1 });
          getAccountRedelegations(delegatorAddress);
          getAccountUnbonding(delegatorAddress);
          getAccountRewards(delegatorAddress);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setShouldPull(false);
      }
    })();
  }, [
    shouldPull,
    isLoggedIn,
    delegatorAddress,
    getAccountAssets,
    getAccountDelegations,
    getAccountRewards,
    getAccountRedelegations,
    getAccountUnbonding,
  ]);

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

  useEffect(() => {
    if (!modalOpen) {
      setIsDelegate(false);
    }
  }, [modalOpen]);

  const handleManageStakingClick = (validator: CurrentValidator, delegate: boolean) => {
    setValidator(validator);
    activateModalOpen();
    setIsDelegate(delegate);
  };

  const ManageStakingBtn = ({
    delegate,
    validator,
  }: {
    delegate: boolean;
    validator: CurrentValidator;
  }) =>
    !isLoggedIn ? null : (
      <Button onClick={() => handleManageStakingClick(validator, delegate)}>
        {delegate ? 'Delegate' : 'Manage'}
      </Button>
    );

  return {
    ...state,
    ...actions,
    ...noDispatchActions,
    isDelegate,
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
