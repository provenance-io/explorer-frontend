import { SignerOptions } from 'cosmos-kit';
import { wallets as extension } from '@cosmos-kit/leap-extension';
import { wallets as mobile } from '@cosmos-kit/leap-mobile';
import { ChainProvider } from '@cosmos-kit/react';
import { assets, chains } from 'chain-registry';
import { Chain } from '@chain-registry/types';
import { GasPrice } from '@cosmjs/stargate';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ThemeProvider, ConnectModal } from '@interchain-ui/react';
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
          gasPrice: GasPrice.fromString('1905000nhash'),
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
        chains={[...chains, CHAIN_CONFIG]}
        assetLists={[...assets, CHAIN_ASSETS]}
        wallets={[...extension, ...mobile]}
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
        walletConnectOptions={{
          signClient: {
            projectId: '6451479b4eb6d2967465521cb99ff677',
            relayUrl: 'wss://relay.walletconnect.org',
            metadata: {
              name: 'CosmosKit Template',
              description: 'CosmosKit dapp template',
              url: 'https://docs.cosmology.zone/cosmos-kit/',
              icons: [],
            },
          },
        }}
        // @ts-ignore
        signerOptions={signerOptions}
      >
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ChainProvider>
    </ThemeProvider>
  );
};
