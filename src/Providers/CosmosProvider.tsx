import '@interchain-ui/react/styles';

import { SignerOptions } from 'cosmos-kit';
import { wallets } from '@cosmos-kit/leap-extension';
import { ChainProvider } from '@cosmos-kit/react';
import { assets, chains } from 'chain-registry';
import { Chain } from '@chain-registry/types';
import { GasPrice } from '@cosmjs/stargate';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Box, useColorModeValue, useTheme } from '@interchain-ui/react';
import {
  CHAIN_NAME,
  RPC_ENDPOINT,
  getSigningProvenanceClientOptions,
  CHAIN_CONFIG,
  CHAIN_ASSETS,
} from '../config';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

export const CosmosProvider = ({ children }: { children: React.ReactNode }) => {
  const { themeClass } = useTheme();

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
    <ChainProvider
      chains={[...chains, CHAIN_CONFIG]}
      assetLists={[...assets, CHAIN_ASSETS]}
      wallets={wallets}
      endpointOptions={{
        endpoints: {
          localprovenance: {
            rpc: [RPC_ENDPOINT],
            rest: [],
          },
          provenancetestnet: {
            rpc: [RPC_ENDPOINT],
            rest: [],
          },
        },
      }}
      walletConnectOptions={{
        signClient: {
          projectId: 'a8510432ebb71e6948cfd6cde54b70f7',
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
        <Box
          className={themeClass}
          minHeight="100dvh"
          backgroundColor={useColorModeValue('$white', '$background')}
        >
          {children}
        </Box>
      </QueryClientProvider>
    </ChainProvider>
  );
};
