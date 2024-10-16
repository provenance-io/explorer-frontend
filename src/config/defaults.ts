import { isProd } from '../consts';
// import { LocalChainAssets, LocalChainConfig } from "./localprovenance";
import { TestnetChainAssets, TestnetChainConfig } from './testnetprovenance';
import { MainnetChainAssets, MainnetChainConfig } from './mainnetprovenance';

export const MAIN_CHAIN_NAME = 'provenance';
export const MAIN_RPC_ENDPOINT = 'https://rpc.provenance.io';
export const MAIN_REST_ENDPOINT = 'https://api.provenance.io';

export const LOCAL_CHAIN_NAME = 'localprovenance';
export const LOCAL_RPC_ENDPOINT = 'http://localhost:26657';

export const TESTNET_CHAIN_NAME = 'provenancetestnet';
export const TESTNET_RPC_ENDPOINT = 'https://rpc.test.provenance.io:443';
export const TESTNET_REST_ENDPOINT = 'https://api.test.provenance.io';

export const CHAIN_NAME = isProd ? MAIN_CHAIN_NAME : TESTNET_CHAIN_NAME;
export const RPC_ENDPOINT = isProd ? MAIN_RPC_ENDPOINT : TESTNET_RPC_ENDPOINT;
export const REST_ENDPOINT = isProd ? MAIN_REST_ENDPOINT : TESTNET_REST_ENDPOINT;
export const CHAIN_CONFIG = isProd ? MainnetChainConfig : TestnetChainConfig;
export const CHAIN_ASSETS = isProd ? MainnetChainAssets : TestnetChainAssets;
