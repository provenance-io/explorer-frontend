import { Chain } from '@chain-registry/types';

export const LocalChainConfig: Chain = {
  chain_type: 'cosmos',
  chain_name: 'localprovenance',
  chain_id: 'testing',
  status: 'live',
  network_type: 'testnet',
  pretty_name: 'Provenance Local',
  bech32_prefix: 'tp',
  slip44: 505,
  fees: {
    fee_tokens: [
      {
        denom: 'nhash',
        fixed_min_gas_price: 1905,
        low_gas_price: 1905,
        average_gas_price: 2100,
        high_gas_price: 2500,
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

export const LocalChainAssets = {
  chain_name: 'localprovenance',
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
        },
      ],
    },
  ],
};
