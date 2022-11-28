import { useWalletConnect } from '@provenanceio/walletconnect-js';
import { Themes } from 'theme';
import { useApp, useMediaQuery } from '.';

const rainbowWallets: string[] = process.env.REACT_APP_SPECIAL?.split(',') || [];

export const useColorScheme = () => {
  const { theme } = useApp();
  const { walletConnectState: wcs } = useWalletConnect();
  // Support OS theme settings if the user hasn't clicked the switch at the top
  const { matches: dark } = useMediaQuery('(prefers-color-scheme: dark)');
  const isSpecial = rainbowWallets.includes(wcs.address);
  const themeName = isSpecial ? 'rainbow' : theme ? theme : dark ? 'night' : 'default';
  const activeTheme = Themes[themeName as keyof typeof Themes];

  return { activeTheme, isSpecial, themeName };
};
