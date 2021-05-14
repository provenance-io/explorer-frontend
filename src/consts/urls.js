// Use the override if it exists, if it doesn't get the value from the build
const reactAppEnv = process.env.REACT_APP_ENV;
// We allow
// Determine current environment
const isLocal = reactAppEnv === 'local';
const isTest = reactAppEnv === 'test' || window.location.href.includes('test.');
export const isProd = reactAppEnv === 'production';
// Base URL for all calls to use
let BASE_URL = '';
export let FAUCET_URL = '';
if (isLocal) {
  BASE_URL = `http://${process.env.REACT_APP_LOCAL_HOSTNAME}/api/v2`;
  FAUCET_URL = process.env.REACT_APP_LOCAL_FAUCET_HOSTNAME;
} else if (isTest) {
  BASE_URL = `https://${process.env.REACT_APP_TEST_SERVER_HOSTNAME}/api/v2`;
  FAUCET_URL = process.env.REACT_APP_TEST_FAUCET_HOSTNAME;
} else if (isProd) {
  BASE_URL = `https://${process.env.REACT_APP_PROD_SERVER_HOSTNAME}/api/v2`;
}

export const FIGURE_WALLET_URL = isProd ? process.env.REACT_APP_PROD_FIGURE_WALLET_URL : process.env.REACT_APP_TEST_FIGURE_WALLET_URL;
export const PROVENANCE_WALLET_URL = isProd
  ? process.env.REACT_APP_PROD_PROVENANCE_WALLET_URL
  : process.env.REACT_APP_TEST_PROVENANCE_WALLET_URL;

// Actual API URLs
// -- Accounts
export const ACCOUNT_INFO_URL = `${BASE_URL}/accounts`;
// -- Assets
export const ASSET_DETAIL_URL = `${BASE_URL}/assets`;
export const ASSETS_LIST_URL = `${BASE_URL}/assets/all`;
// -- Blocks
export const BLOCK_HEIGHT_URL = `${BASE_URL}/blocks/height`;
export const BLOCK_INFO_URL = `${BASE_URL}/blocks/height`;
export const BLOCKS_RECENT_URL = `${BASE_URL}/blocks/recent`;
export const BLOCK_SPOTLIGHT_URL = `${BASE_URL}/spotlight`;
// -- Chaincode id
export const CHAINCODE_ID_URL = `${BASE_URL}/chain/id`;
// -- Social Media/Contact Information
export const SOCIAL_GITHUB_URL = 'https://github.com/provenance-io/explorer-frontend';
export const SOCIAL_DISCORD_URL = 'https://discord.com/';
export const SOCIAL_PROVENANCE_URL = 'https://provenance.io/';
// -- Txs
export const TX_INFO_URL = `${BASE_URL}/txs`;
export const TXS_RECENT_URL = `${BASE_URL}/txs/recent`;
export const TX_HISTORY_URL = `${BASE_URL}/txs/history`;
export const TXS_BY_BLOCK_URL = `${BASE_URL}/txs/height`;
export const TXS_BY_ADDRESS_URL = `${BASE_URL}/txs/address`;
export const TX_TYPES_URL = `${BASE_URL}/txs/types`;
// -- Validators
export const VALIDATOR_INFO_URL = `${BASE_URL}/validators`;
export const VALIDATORS_RECENT_URL = `${BASE_URL}/validators/recent`;
export const BLOCK_VALIDATORS_URL = `${BASE_URL}/validators/height`;
