// Check for a docker env override
const isDockerOverride = process.env.EXPLORER_FE_APP_ENV;
// Use the override if it exists, if it doesn't get the value from the build
const reactAppEnv = isDockerOverride ? isDockerOverride : process.env.REACT_APP_ENV;
// Determine current environment
const isLocal = reactAppEnv === 'local';
const isTest = reactAppEnv === 'test' || window.location.href.includes('test.');
const isProd = reactAppEnv === 'production';
// Base URL for all calls to use
let BASE_URL = '';
if (isLocal) {
  BASE_URL = `http://${process.env.REACT_APP_LOCAL_HOSTNAME}/api/v2`;
} else if (isTest) {
  BASE_URL = `https://${process.env.REACT_APP_TEST_SERVER_HOSTNAME}/api/v2`;
} else if (isProd) {
  BASE_URL = `https://${process.env.REACT_APP_PROD_SERVER_HOSTNAME}/secured/api/v2`;
}

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
// -- Faucet
export const FAUCET_URL = `http://localhost:42000`;
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
// -- Validators
export const VALIDATOR_INFO_URL = `${BASE_URL}/validators`;
export const VALIDATORS_RECENT_URL = `${BASE_URL}/validators/recent`;
export const BLOCK_VALIDATORS_URL = `${BASE_URL}/validators/height`;
