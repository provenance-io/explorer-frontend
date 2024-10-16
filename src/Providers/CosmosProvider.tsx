import { ChainWalletBase, SignerOptions } from 'cosmos-kit';
import { wallets } from '@cosmos-kit/leap-extension';
import { ChainProvider } from '@cosmos-kit/react';
import { assets, chains } from 'chain-registry';
import { Chain } from '@chain-registry/types';
import { GasPrice } from '@cosmjs/stargate';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ThemeProvider } from '@interchain-ui/react';
import { Button } from '../Components';
import {
  CHAIN_NAME,
  RPC_ENDPOINT,
  getSigningProvenanceClientOptions,
  CHAIN_CONFIG,
  CHAIN_ASSETS,
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
  // const { themeClass } = useTheme();

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

  interface WalletListViewProps {
    onClose: () => void;
    wallets: ChainWalletBase[];
  }

  // const WalletListView = ({ onClose, wallets }: WalletListViewProps) => ({
  //   head: <></>,
  //   content: wallets.map((w) => {
  //     const {
  //       walletInfo: { prettyName, logo },
  //       mainWallet: { connect },
  //     } = w;
  //     return (
  //       <div>
  //         <Button
  //           onClick={() => {
  //             connect();
  //             onClose();
  //           }}
  //         >
  //           {prettyName}{' '}
  //           <img src={typeof logo === 'string' ? logo : logo?.major} alt={prettyName} />
  //         </Button>
  //       </div>
  //     );
  //   }),
  // });

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
        wallets={wallets}
        walletModal={undefined}
        // modalViews={{
          // WalletList: WalletListView,
          // Connecting: "Connecting",
          // Connected: ConnectedView,
          // Error: "Error",
        // }}
        endpointOptions={{
          endpoints: {
            [CHAIN_CONFIG.chain_name]: {
              rpc: [RPC_ENDPOINT],
              rest: ['https://api.test.provenance.io'],
            },
            // localprovenance: {
            //   rpc: [RPC_ENDPOINT],
            //   rest: ['https://api.test.provenance.io'],
            // },
            // provenancetestnet: {
            //   rpc: [RPC_ENDPOINT],
            //   rest: [
            //     'https://api.test.provenance.io',
            //     'https://api.test.provenance.io',
            //     'https://api.test.provenance.io',
            //     'https://api.test.provenance.io',
            //   ],
            // },
            // provenancemainnet: {
            //   rpc: [RPC_ENDPOINT],
            //   rest: ['https://api.provenance.io'],
            // },
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
          {/* <Box
            className={themeClass}
            minHeight="100dvh"
            backgroundColor={useColorModeValue('$white', '$background')}
          > */}
          {children}
          {/* </Box> */}
        </QueryClientProvider>
      </ChainProvider>
    </ThemeProvider>
  );
};
