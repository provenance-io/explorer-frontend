import { SignerOptions, wallets } from 'cosmos-kit';
import { wallets as arculus } from '@cosmos-kit/arculus';
import { ChainProvider } from '@cosmos-kit/react';
import { assets, chains } from 'chain-registry';
import { Chain } from '@chain-registry/types';
import { GasPrice } from '@cosmjs/stargate';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ThemeProvider } from '@interchain-ui/react';
import {
  CHAIN_NAME,
  RPC_ENDPOINT,
  getSigningProvenanceClientOptions,
  CHAIN_CONFIG,
  CHAIN_ASSETS,
  REST_ENDPOINT,
} from '../config';

import '@interchain-ui/react/styles';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

export const CosmosProvider = ({ children }: { children: React.ReactNode }) => {
  const signerOptions: SignerOptions = {
    // @ts-ignore
    signingStargate: (chain: Chain) => {
      if (chain.chain_name === CHAIN_NAME) {
        return {
          ...getSigningProvenanceClientOptions,
          gasPrice: GasPrice.fromString(import.meta.env.VITE_APP_BASE_GAS_PRICE),
        };
      }

      return {
        ...getSigningProvenanceClientOptions,
      };
    },

    // @ts-ignore
    preferredSignType: (chain: Chain) => {
      if (chain.chain_name === CHAIN_NAME) {
        return 'direct';
      }
      return 'amino';
    },
  };

  // filter wallets we know for certain work with the provenance chain
  const walletRegex = /(leap|arculus|keplr|cosmostation-extension)/i;
  const supportedWallets = wallets.filter( w=> {
    return walletRegex.test(w.walletInfo.name);
  });
  return (
    <ThemeProvider
      themeDefs={[
        {
          name: 'Provenance',
          vars: {
            font: {
              body: 'font-size: 100px;',
            },
            fontSize: {
              sm: '200px',
              md: '240px',
              lg: '200px',
            },
          },
        },
      ]}
      customTheme="Provenance"
    >
      <ChainProvider
        throwErrors={true}
        chains={[...chains, CHAIN_CONFIG]}
        assetLists={[...assets, CHAIN_ASSETS]}
        wallets={[...supportedWallets, ...arculus]}
        endpointOptions={{
          isLazy: true,
          endpoints: {
            provenance: {
              rpc: ['https://rpc.provenance.io/'],
              rest: [REST_ENDPOINT],
            },
            [CHAIN_CONFIG.chain_name]: {
              rpc: [RPC_ENDPOINT],
              rest: [REST_ENDPOINT],
            },
          },
        }}
        modalOptions={{
          mobile: { displayQRCodeEveryTime: true },
        }}
        walletConnectOptions={{
          signClient: {
            projectId: '6451479b4eb6d2967465521cb99ff677',
            relayUrl: 'wss://relay.walletconnect.org',
            metadata: {
              name: 'Provenance Explorer',
              description: 'Navigate and interact with the Provenance Blockchain.',
              url: 'https://explorer.provenance.io/',
              icons: [],
            }
          },
        }}
        // @ts-ignore
        signerOptions={signerOptions}
      >
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </ChainProvider>
    </ThemeProvider>
  );
};
