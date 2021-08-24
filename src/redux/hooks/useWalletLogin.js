import qs from 'query-string';
import { FIGURE_WALLET_URL, PROVENANCE_WALLET_URL } from 'consts';
import useApp from './useApp';

const useWalletLogin = walletService => {
  const { setIsLoggedIn, setWalletUrl } = useApp();
  // Get URL Query Parameters
  const { address, keychainAccountName, walletType } = qs.parse(window.location.search);
  const walletUrl = keychainAccountName ? PROVENANCE_WALLET_URL : FIGURE_WALLET_URL;

  // --------------------------------------------
  // Auto-Connect wallet if query params exist
  // --------------------------------------------
  const initiateExistingWallet = () => {
    setWalletUrl(walletUrl);
    walletService.setWalletUrl(walletUrl);
    walletService.initialize({
      address,
      keychainAccountName,
      walletType,
    });
    setIsLoggedIn(true);
  };

  if (address && walletUrl) initiateExistingWallet();
};

export default useWalletLogin;
