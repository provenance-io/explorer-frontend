import { AssetList, Chain } from '@chain-registry/types';

export const MainnetChainConfig: Chain = {
  chain_type: 'cosmos',
  chain_name: 'provenancemainnet',
  chain_id: 'pio-mainnet-1',
  status: 'live',
  network_type: 'testnet',
  pretty_name: 'Provenance Mainnet',
  bech32_prefix: 'tp',
  slip44: 505,
  key_algos: ['secp256k1'],
  staking: {
    staking_tokens: [
      {
        denom: 'nhash',
      },
    ],
  },
  fees: {
    fee_tokens: [
      {
        denom: 'nhash',
        fixed_min_gas_price: 1905000,
        low_gas_price: 1905000,
        average_gas_price: 2100000,
        high_gas_price: 2500000,
      },
    ],
  },
  logo_URIs: {
    png: '/prov.png',
    svg: '/prov.svg',
  },
  images: [
    {
      png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/provenance/images/prov.png',
      svg: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/provenance/images/prov.svg',
    },
  ],
};

export const MainnetChainAssets: AssetList = {
  chain_name: 'provenancemainnet',
  assets: [
    {
      description: 'Hash is the staking token of the Provenance Blockchain',
      denom_units: [
        {
          denom: 'nhash',
          exponent: 0,
        },
        {
          denom: 'hash',
          exponent: 9,
        },
      ],
      base: 'nhash',
      name: 'Hash',
      display: 'hash',
      symbol: 'HASH',
      logo_URIs: {
        png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/provenance/images/prov.png',
        svg: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/provenance/images/prov.svg',
      },
      coingecko_id: 'provenance-blockchain',
      images: [
        {
          png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/provenance/images/prov.png',
          svg: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/provenance/images/prov.svg',
          theme: {
            primary_color_hex: '#4c7cdc',
          },
        },
      ],
      type_asset: 'sdk.coin',
    },
  ],
};
