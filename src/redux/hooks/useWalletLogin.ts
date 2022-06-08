import { WalletService } from '@provenanceio/wallet-lib';
import qs from 'query-string';
import { FIGURE_WALLET_URL, PROVENANCE_WALLET_URL } from 'consts';
import { useApp } from '.';

export const useWalletLogin = (walletService: WalletService) => {
  const { setIsLoggedIn, setWalletUrl } = useApp();
  // Get URL Query Parameters
  const { address, keychainAccountName, walletType } = qs.parse(window.location.search);
  const walletUrl = keychainAccountName ? PROVENANCE_WALLET_URL : FIGURE_WALLET_URL;

  // --------------------------------------------
  // Auto-Connect wallet if query params exist
  // --------------------------------------------
  const initiateExistingWallet = () => {
    setWalletUrl(walletUrl as string);
    walletService.setWalletUrl(walletUrl as string);
    walletService.initialize({
      address: address as string,
      keychainAccountName: keychainAccountName as string,
      walletType: walletType as string,
    });
    setIsLoggedIn(true);
  };

  if (address && walletUrl) initiateExistingWallet();
};