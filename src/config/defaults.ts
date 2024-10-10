import { LocalChainAssets, LocalChainConfig } from "./localprovenance";
import { TestnetChainAssets, TestnetChainConfig } from "./testnetprovenance";

export const MAIN_CHAIN_NAME = 'provenance';
export const MAIN_RPC_ENDPOINT = 'https://rpc.provenance.io';

export const LOCAL_CHAIN_NAME = 'localprovenance';
export const LOCAL_RPC_ENDPOINT = 'http://localhost:26657';

export const TESTNET_CHAIN_NAME = 'provenancetestnet';
export const TESTNET_RPC_ENDPOINT = 'https://rpc.test.provenance.io:443';

export const CHAIN_NAME = TESTNET_CHAIN_NAME;
export const RPC_ENDPOINT = TESTNET_RPC_ENDPOINT;
export const CHAIN_CONFIG = TestnetChainConfig;
export const CHAIN_ASSETS = TestnetChainAssets;