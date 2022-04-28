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

export const FIGURE_WALLET_URL = isProd
  ? process.env.REACT_APP_PROD_FIGURE_WALLET_URL
  : process.env.REACT_APP_TEST_FIGURE_WALLET_URL;
export const PROVENANCE_WALLET_URL = isProd
  ? process.env.REACT_APP_PROD_PROVENANCE_WALLET_URL
  : process.env.REACT_APP_TEST_PROVENANCE_WALLET_URL;

// Actual API URLs
// -- Accounts
export const ACCOUNT_INFO_URL = `${BASE_URL}/accounts`;
// -- Assets
export const ASSET_DETAIL_URL = `${BASE_URL}/assets`;
export const ASSETS_LIST_URL = `${BASE_URL}/assets/all`;
export const ASSETS_DIST_URL = `${BASE_URL}/assets/distribution`;
// -- Blocks
export const BLOCK_HEIGHT_URL = `${BASE_URL}/blocks/height`;
export const BLOCK_INFO_URL = `${BASE_URL}/blocks/height`;
export const BLOCKS_RECENT_URL = `${BASE_URL}/blocks/recent`;
export const BLOCK_SPOTLIGHT_URL = `${BASE_URL}/spotlight`;
// -- Chaincode id
export const CHAINCODE_ID_URL = `${BASE_URL}/chain/id`;
// -- Chain address prefixes
export const CHAINCODE_PREFIXES_URL = `${BASE_URL}/chain/prefixes`;
// -- Contracts
export const CONTRACT_CODE_URL = `${BASE_URL}/smart_contract/code`;
export const CODES_URL = `${BASE_URL}/smart_contract/codes/all`;
export const CONTRACT_DETAILS_URL = `${BASE_URL}/smart_contract/contract`;
export const CONTRACTS_ALL_URL = `${BASE_URL}/smart_contract/contract/all`;
export const CONTRACT_TRANSACTIONS_URL = `${BASE_URL}/txs/module/smart_contract?`;
export const CONTRACT_LABELS_URL = `${BASE_URL}/smart_contract/contract/labels`;
// -- Governance
export const GOVERNANCE_URL = `${BASE_URL}/gov`;
export const GOVERNANCE_ADDRESS_URL = `${BASE_URL}/gov/address`;
export const GOVERNANCE_PROPOSALS_URL = `${BASE_URL}/gov/proposals`;
// -- IBC
export const IBC_CHAIN_URL = `${BASE_URL}/ibc/balances/chain`;
export const IBC_CHANNEL_URL = `${BASE_URL}/ibc/balances/channel`;
export const IBC_BALANCES_DENOM_URL = `${BASE_URL}/ibc/balances/denom`;
export const IBC_CHANNEL_STATUS_URL = `${BASE_URL}/ibc/channels/status`;
export const IBC_DENOMS_ALL_URL = `${BASE_URL}/ibc/denoms/all`;
// -- Order book
export const ORDER_BOOK_URL = 'https://www.dlob.io/gecko/external/api/v1/exchange';
// -- NFT
export const NFT_URL = `${BASE_URL}/nft/scope`;
// -- Social Media/Contact Information
export const SOCIAL_GITHUB_URL = 'https://github.com/provenance-io/explorer-frontend';
export const SOCIAL_SLACK_URL =
  'https://join.slack.com/t/provenanceio/shared_invite/zt-vysymaqb-VqgW3frXoNNXNlyOiP7mog';
export const SOCIAL_PROVENANCE_URL = 'https://provenance.io/';
// --Stats
export const NETWORK_ID_URL = `${BASE_URL}/chain/id`;
export const NETWORK_UPGRADES_URL = `${BASE_URL}/chain/upgrades`;
export const NETWORK_FEES_URL = `${BASE_URL}/gas/fees/statistics`;
export const NETWORK_GAS_STATS_URL = `${BASE_URL}/gas/stats`;
export const NETWORK_GAS_VOL_URL = `${BASE_URL}/gas/volume`;
export const NETWORK_PARAMS_URL = `${BASE_URL}/params`;
export const NETWORK_SPOTLIGHT_URL = `${BASE_URL}/spotlight`;
export const NETWORK_TOKEN_STATS_URL = `${BASE_URL}/token/stats`;
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
export const VALIDATORS_GET_ALL_URL = `${BASE_URL}/validators/recent/abbrev`;
export const BLOCK_VALIDATORS_URL = `${BASE_URL}/validators/height`;
