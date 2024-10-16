import { AssetList, Chain } from '@chain-registry/types';

export const MainnetChainConfig: Chain = {
  chain_name: 'provenance',
  status: 'live',
  network_type: 'mainnet',
  website: 'https://provenance.io/',
  pretty_name: 'Provenance',
  chain_type: 'cosmos',
  chain_id: 'pio-mainnet-1',
  bech32_prefix: 'pb',
  daemon_name: 'provenanced',
  node_home: '$HOME/Provenance',
  key_algos: ['secp256k1'],
  slip44: 505,
  fees: {
    fee_tokens: [{
        denom: 'nhash',
        fixed_min_gas_price: 1905,
        low_gas_price: 1905,
        average_gas_price: 2100,
        high_gas_price: 2500
      }]
  },
  staking: {
    staking_tokens: [{
        denom: 'nhash'
      }]
  },
  codebase: {
    git_repo: 'https://github.com/provenance-io/provenance',
    recommended_version: 'v1.17.0',
    compatible_versions: ['v1.17.0'],
    cosmos_sdk_version: '0.46.13',
    consensus: {
      type: 'tendermint',
      version: '0.34.29'
    },
    cosmwasm_version: '0.30',
    cosmwasm_enabled: true,
    binaries: {
      "linux/amd64": 'https://github.com/provenance-io/provenance/releases/download/v1.17.0/provenance-linux-amd64-v1.17.0.zip'
    },
    genesis: {
      name: 'v1.0.1',
      genesis_url: 'https://raw.githubusercontent.com/provenance-io/mainnet/main/pio-mainnet-1/genesis.json'
    },
    versions: [
      {
        name: 'v1.0.1',
        tag: 'v1.0.1',
        height: 0,
        next_version_name: 'bluetiful'
      },
      {
        name: 'bluetiful',
        tag: 'v1.3.1',
        height: 352000,
        recommended_version: 'v1.3.1',
        compatible_versions: ['v1.3.0', 'v1.3.1'],
        next_version_name: 'citrine'
      },
      {
        name: 'citrine',
        tag: 'v1.4.1',
        height: 940500,
        recommended_version: 'v1.4.1',
        compatible_versions: ['v1.4.0', 'v1.4.1'],
        next_version_name: 'desert'
      },
      {
        name: 'desert',
        tag: 'v1.5.0',
        height: 1442070,
        recommended_version: 'v1.5.0',
        compatible_versions: ['v1.5.0'],
        next_version_name: 'desert'
      },
      {
        name: 'usdf.c-hotfix',
        tag: 'v1.6.0',
        height: 2000000,
        recommended_version: 'v1.6.0',
        compatible_versions: ['v1.6.0'],
        next_version_name: 'feldgrau'
      },
      {
        name: 'feldgrau',
        tag: 'v1.7.6',
        height: 2641250,
        recommended_version: 'v1.7.6',
        compatible_versions: [
          'v1.7.0',
          'v1.7.1',
          'v1.7.2',
          'v1.7.3',
          'v1.7.4',
          'v1.7.5',
          'v1.7.6'
        ],
        next_version_name: 'green'
      },
      {
        name: 'green',
        tag: 'v1.8.2',
        height: 4808400,
        recommended_version: 'v1.8.2',
        compatible_versions: [
          'v1.8.0',
          'v1.8.1',
          'v1.8.2'
        ],
        next_version_name: 'lava'
      },
      {
        name: 'lava',
        tag: 'v1.10.0',
        height: 5689885,
        recommended_version: 'v1.10.0',
        compatible_versions: ['v1.10.0'],
        next_version_name: 'mango'
      },
      {
        name: 'mango',
        tag: 'v1.11.1',
        height: 6512577,
        recommended_version: 'v1.11.1',
        compatible_versions: ['v1.11.0', 'v1.11.1'],
        next_version_name: 'neoncarrot'
      },
      {
        name: 'neoncarrot',
        tag: 'v1.12.2',
        height: 7334444,
        recommended_version: 'v1.12.2',
        compatible_versions: [
          'v1.12.0',
          'v1.12.1',
          'v1.12.2'
        ],
        next_version_name: 'ochre'
      },
      {
        name: 'ochre',
        tag: 'v1.13.1',
        height: 8485555,
        recommended_version: 'v1.13.1',
        compatible_versions: ['v1.13.0', 'v1.13.1'],
        next_version_name: 'paua'
      },
      {
        name: 'paua',
        tag: 'v1.14.1',
        height: 9828888,
        recommended_version: 'v1.14.1',
        compatible_versions: ['v1.14.0', 'v1.14.1'],
        cosmos_sdk_version: '0.46.10',
        consensus: {
          type: 'tendermint',
          version: '0.34.26'
        },
        cosmwasm_version: '0.30',
        cosmwasm_enabled: true,
        binaries: {
          "linux/amd64": 'https://github.com/provenance-io/provenance/releases/download/v1.14.1/provenance-linux-amd64-v1.14.1.zip'
        },
        next_version_name: 'quicksilver',
        sdk: {
          type: 'cosmos',
          version: '0.46.10'
        },
        cosmwasm: {
          version: '0.30',
          enabled: true
        },
        ibc: {
          type: 'go',
          version: '6.1.0',
          ics_enabled: ['ics20-1']
        }
      },
      {
        name: 'quicksilver',
        tag: 'v1.15.2',
        height: 11130222,
        recommended_version: 'v1.15.2',
        compatible_versions: [
          'v1.15.0',
          'v1.15.1',
          'v1.15.2'
        ],
        cosmos_sdk_version: '0.46.10',
        consensus: {
          type: 'tendermint',
          version: '0.34.26'
        },
        binaries: {
          "linux/amd64": 'https://github.com/provenance-io/provenance/releases/download/v1.15.2/provenance-linux-amd64-v1.15.2.zip'
        },
        next_version_name: 'rust',
        sdk: {
          type: 'cosmos',
          version: '0.46.10'
        },
        ibc: {
          type: 'go',
          version: '6.1.1',
          ics_enabled: ['ics20-1']
        }
      },
      {
        name: 'rust',
        tag: 'v1.16.0',
        height: 11842000,
        recommended_version: 'v1.16.0',
        compatible_versions: ['v1.16.0'],
        cosmos_sdk_version: '0.46.13',
        consensus: {
          type: 'tendermint',
          version: '0.34.28'
        },
        cosmwasm_version: '0.30',
        cosmwasm_enabled: true,
        binaries: {
          "linux/amd64": 'https://github.com/provenance-io/provenance/releases/download/v1.16.0/provenance-linux-amd64-v1.16.0.zip'
        },
        sdk: {
          type: 'cosmos',
          version: '0.46.13'
        },
        cosmwasm: {
          version: '0.30',
          enabled: true
        },
        ibc: {
          type: 'go',
          version: '6.2.0',
          ics_enabled: ['ics20-1', 'ics27-1']
        }
      },
      {
        name: 'saffron',
        tag: 'v1.17.0',
        height: 13736000,
        recommended_version: 'v1.17.0',
        compatible_versions: ['v1.17.0'],
        cosmos_sdk_version: '0.46.13',
        consensus: {
          type: 'tendermint',
          version: '0.34.29'
        },
        cosmwasm_version: '0.30',
        cosmwasm_enabled: true,
        binaries: {
          "linux/amd64": 'https://github.com/provenance-io/provenance/releases/download/v1.17.0/provenance-linux-amd64-v1.17.0.zip'
        },
        sdk: {
          type: 'cosmos',
          version: '0.46.13'
        },
        cosmwasm: {
          version: '0.30',
          enabled: true
        },
        ibc: {
          type: 'go',
          version: '6.2.0',
          ics_enabled: ['ics20-1', 'ics27-1']
        }
      }
    ],
    sdk: {
      type: 'cosmos',
      version: '0.46.13'
    },
    ibc: {
      type: 'go',
      version: '6.2.0',
      ics_enabled: ['ics20-1', 'ics27-1']
    },
    cosmwasm: {
      version: '0.30',
      enabled: true
    }
  },
  logo_URIs: {
    png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/provenance/images/prov.png',
    svg: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/provenance/images/prov.svg'
  },
  apis: {
    rpc: [
      {
        address: 'https://rpc-provenance.takeshi.team/',
        provider: 'TAKESHI'
      },
      {
        address: 'https://rpc.provenance.io/',
        provider: 'Figure'
      },
      {
        address: 'https://rpc-provenance-ia.cosmosia.notional.ventures/',
        provider: 'Notional'
      },
      {
        address: 'https://provenance-mainnet-rpc.autostake.com:443',
        provider: 'AutoStake 🛡️ Slash Protected'
      },
      {
        address: 'https://provenance-rpc.ibs.team',
        provider: 'Inter Blockchain Services'
      },
      {
        address: 'https://provenance-rpc.highstakes.ch',
        provider: 'High Stakes 🇨🇭'
      },
      {
        address: 'https://rpc.provenance.blockval.io/',
        provider: 'Blockval'
      },
      {
        address: 'https://provenance-rpc.panthea.eu',
        provider: 'Panthea EU'
      },
      {
        address: 'https://provenance_mainnet_rpc.chain.whenmoonwhenlambo.money',
        provider: '🚀 WHEN MOON 🌕 WHEN LAMBO 🔥'
      },
      {
        address: 'https://rpc.pio-mainnet-1.provenance.aviaone.com',
        provider: 'AVIAONE 🟢'
      }
    ],
    rest: [
      {
        address: 'https://api-provenance.takeshi.team',
        provider: 'TAKESHI'
      },
      {
        address: 'https://provenance-mainnet-lcd.autostake.com:443',
        provider: 'AutoStake 🛡️ Slash Protected'
      },
      {
        address: 'https://api.provenance.io',
        provider: 'Figure'
      },
      {
        address: 'https://provenance.api.m.stavr.tech',
        provider: '🔥STAVR🔥'
      },
      {
        address: 'https://api-provenance-ia.cosmosia.notional.ventures/',
        provider: 'Notional'
      },
      {
        address: 'https://provenance-api.ibs.team',
        provider: 'Inter Blockchain Services'
      },
      {
        address: 'https://provenance-api.highstakes.ch',
        provider: 'High Stakes 🇨🇭'
      },
      {
        address: 'https://api.provenance.blockval.io',
        provider: 'Blockval'
      },
      {
        address: 'https://provenance-api.panthea.eu',
        provider: 'Panthea EU'
      },
      {
        address: 'https://provenance_mainnet_api.chain.whenmoonwhenlambo.money',
        provider: '🚀 WHEN MOON 🌕 WHEN LAMBO 🔥'
      },
      {
        address: 'https://api.pio-mainnet-1.provenance.aviaone.com',
        provider: 'AVIAONE 🟢'
      }
    ],
    grpc: [
      {
        address: 'grpc-provenance.takeshi.team:443',
        provider: 'TAKESHI'
      },
      {
        address: 'provenance-mainnet-grpc.autostake.com:443',
        provider: 'AutoStake 🛡️ Slash Protected'
      },
      {
        address: 'grpc-provenance-ia.cosmosia.notional.ventures:443',
        provider: 'Notional'
      },
      {
        address: 'grpc.provenance.blockval.io:9290',
        provider: 'Blockval'
      },
      {
        address: 'provenance-grpc.panthea.eu:16780',
        provider: 'Panthea EU'
      },
      {
        address: 'grpc.pio-mainnet-1.provenance.aviaone.com:9231',
        provider: 'AVIAONE 🟢'
      }
    ]
  },
  images: [{
      png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/provenance/images/prov.png',
      svg: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/provenance/images/prov.svg',
      theme: {
        primary_color_hex: '#4c7cdc'
      }
    }]
}

// export const MainnetChainConfig: Chain = {
//   chain_type: 'cosmos',
//   chain_name: 'provenancemainnet',
//   chain_id: 'pio-mainnet-1',
//   status: 'live',
//   network_type: 'mainnet',
//   pretty_name: 'Provenance Mainnet',
//   bech32_prefix: 'pb',
//   slip44: 505,
//   key_algos: ['secp256k1'],
//   staking: {
//     staking_tokens: [
//       {
//         denom: 'nhash',
//       },
//     ],
//   },
//   fees: {
//     fee_tokens: [
//       {
//         denom: 'nhash',
//         fixed_min_gas_price: 1905000,
//         low_gas_price: 1905000,
//         average_gas_price: 2100000,
//         high_gas_price: 2500000,
//       },
//     ],
//   },
//   logo_URIs: {
//     png: '/prov.png',
//     svg: '/prov.svg',
//   },
//   images: [{
//     png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/provenance/images/prov.png',
//     svg: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/provenance/images/prov.svg',
//     theme: {
//       primary_color_hex: '#4c7cdc'
//     }
//   }]
// };

export const MainnetChainAssets: AssetList = {
  chain_name: 'provenance',
  assets: [{
      description: 'Hash is the staking token of the Provenance Blockchain',
      denom_units: [{
          denom: 'nhash',
          exponent: 0
        }, {
          denom: 'hash',
          exponent: 9
        }],
      base: 'nhash',
      name: 'Hash',
      display: 'hash',
      symbol: 'HASH',
      logo_URIs: {
        png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/provenance/images/prov.png',
        svg: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/provenance/images/prov.svg'
      },
      coingecko_id: 'provenance-blockchain',
      images: [{
          png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/provenance/images/prov.png',
          svg: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/provenance/images/prov.svg',
          theme: {
            primary_color_hex: '#4c7cdc'
          }
        }],
      type_asset: 'sdk.coin'
    }]
};
