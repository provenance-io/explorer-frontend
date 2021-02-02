// Should be a better (safer) way to do this...
const isDev = process.env.NODE_ENV === 'development';
const isLocal = process.env.REACT_APP_ENV === 'local';
const isTest = window.location.href.includes('test.');
// Base path setup
// Default
export let ENVIRONMENT = `www.${process.env.REACT_APP_PROD_HOSTNAME}`;
// Local (have BE spun up locally on another port)
if (isLocal) {
  ENVIRONMENT = `${process.env.REACT_APP_LOCAL_HOSTNAME}`;
}
// Test
if (!isLocal && (isDev || isTest)) {
  ENVIRONMENT = `${process.env.REACT_APP_TEST_HOSTNAME}`;
}

export const BASE_URL = isLocal ? `http://${ENVIRONMENT}/api/v1` : `https://${ENVIRONMENT}/explorer/secured/api/v1`;

// Actual API URLs
// -- Blocks
export const BLOCK_INFO_URL = `${BASE_URL}/block`;
export const BLOCKS_RECENT_URL = `${BASE_URL}/recent/blocks`;
export const BLOCK_SPOTLIGHT_URL = `${BASE_URL}/spotlight`;
// -- Txs
export const TX_INFO_URL = `${BASE_URL}/tx`;
export const TXS_RECENT_URL = `${BASE_URL}/recent/txs`;
export const TX_HISTORY_URL = `${BASE_URL}/txs/history`;
export const TXS_BY_BLOCK_URL = `${BASE_URL}/txs`;
export const TXS_BY_ADDRESS_URL = `${BASE_URL}/txs`;
// -- Validators
export const VALIDATOR_INFO_URL = `${BASE_URL}/validator`;
export const VALIDATORS_RECENT_URL = `${BASE_URL}/recent/validators`;
export const BLOCK_VALIDATORS_URL = `${BASE_URL}/validators`;
export const VALIDATOR_COMMISSION_URL = `${BASE_URL}/validator/commission`;
export const VALIDATOR_DELEGATIONS_URL = `${BASE_URL}/validator/delegations`;
export const VALIDATOR_UNBONDING_DELEGATIONS_URL = `${BASE_URL}/validator/delegations/unbonding`;
export const VALIDATOR_DELEGATION_TXS_URL = `${BASE_URL}/validator/delegations/txs`;
export const VALIDATOR_TXS_URL = `${BASE_URL}/validator/txs`;
// -- Address
export const ADDRESS_INFO_URL = `${BASE_URL}/address`;
// -- Chaincode id
export const CHAINCODE_ID_URL = `${BASE_URL}/chain/id`;
// -- Assets
export const ASSET_INFO_URL = `${BASE_URL}/asset`;
export const ASSET_TRANSACTIONS_URL = `${BASE_URL}/asset/transactions`;
export const ASSET_HOLDERS_URL = `${BASE_URL}/asset/holders`;
// -- Social Media/Contact Information
export const SOCIAL_GITHUB_URL = 'https://github.com/provenance-io/explorer-frontend';
export const SOCIAL_DISCORD_URL = 'https://discord.com/';
export const SOCIAL_PROVENANCE_URL = 'https://provenance.io/';