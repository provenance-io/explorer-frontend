export const isProd = import.meta.env.VITE_APP_ENV === 'production';

export const BASE_URL = `https://${import.meta.env.VITE_APP_SERVER_HOSTNAME}/api/v2`;
export const BASE_URL_V3 = `https://${import.meta.env.VITE_APP_SERVER_HOSTNAME}/api/v3`;

export const FAUCET_URL = import.meta.env.VITE_APP_FAUCET_HOSTNAME;

// Wallets
export const FIGURE_WALLET_URL = import.meta.env.VITE_APP_FIGURE_WALLET_URL;
export const PROVENANCE_WALLET_URL = import.meta.env.VITE_APP_PROVENANCE_WALLET_URL;

// Actual API URLs
// -- Accounts
export const ACCOUNT_INFO_URL = `${BASE_URL}/accounts`;
export const ACCOUNT_INFO_V3_URL = `${BASE_URL_V3}/accounts`;
// -- Assets
export const ASSET_DETAIL_URL = `${BASE_URL}/assets`;
export const ASSETS_LIST_URL = `${BASE_URL}/assets/all`;
export const ASSETS_DIST_URL = `${BASE_URL_V3}/utility_token/distribution`;
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
export const GOVERNANCE_VOTES_URL = `${BASE_URL_V3}/gov/proposals`;
export const GOVERNANCE_SUBMIT_PROPOSAL_URL = `${BASE_URL_V3}/gov/submit/`;
export const GOVERNANCE_SUBMIT_VOTES_URL = `${BASE_URL_V3}/gov/vote`;
export const GOVERNANCE_PROPOSAL_TYPES_URL = `${BASE_URL_V3}/gov/types/supported`;
// -- Grants
export const GRANTS_AUTHZ_URL = `${BASE_URL_V3}/grants/authz`;
export const GRANTS_FEEGRANT_URL = `${BASE_URL_V3}/grants/feegrant`;
// -- IBC
export const IBC_CHAIN_URL = `${BASE_URL}/ibc/balances/chain`;
export const IBC_CHANNEL_URL = `${BASE_URL}/ibc/balances/channel`;
export const IBC_BALANCES_DENOM_URL = `${BASE_URL}/ibc/balances/denom`;
export const IBC_RELAYERS_URL = `${BASE_URL}/ibc/channels/src_port/`;
export const IBC_CHANNEL_STATUS_URL = `${BASE_URL}/ibc/channels/status`;
export const IBC_DENOMS_ALL_URL = `${BASE_URL}/ibc/denoms/all`;
// -- Utility Token (i.e., CMC pricing data)
export const UTILITY_TOKEN_HISTORICAL_URL = `${BASE_URL_V3}/utility_token/historical_pricing`;
export const UTILITY_TOKEN_CURRENT_URL = `${BASE_URL_V3}/utility_token/latest_pricing`;
// -- Name
export const NAME_TREE_URL = `${BASE_URL}/names/tree`;
// -- NFT
export const NFT_URL = `${BASE_URL}/nft/scope`;
// -- Notification
export const PROPOSAL_NOTIFICATIONS_URL = `${BASE_URL}/notifications/proposals`;
export const UPGRADE_NOTIFICATIONS_URL = `${BASE_URL}/notifications/upgrades`;
export const ANNOUNCEMENT_NOTIFICATIONS_URL = `${BASE_URL}/notifications/announcement/all`;
export const ANNOUNCEMENT_URL = `${BASE_URL}/notifications/announcement`;
// -- Social Media/Contact Information
export const SOCIAL_GITHUB_URL = 'https://github.com/provenance-io/explorer-frontend';
export const SOCIAL_SLACK_URL =
  'https://join.slack.com/t/provenanceio/shared_invite/zt-vysymaqb-VqgW3frXoNNXNlyOiP7mog';
export const SOCIAL_PROVENANCE_URL = 'https://provenance.io/';
export const SOCIAL_DISCORD_URL = 'https://discord.com/invite/kNZC8nwCFP';
// --Staking
export const STAKING_DELEGATE_URL = `${BASE_URL_V3}/staking/delegate`;
export const STAKING_REDELEGATE_URL = `${BASE_URL_V3}/staking/redelegate`;
export const STAKING_UNDELEGATE_URL = `${BASE_URL_V3}/staking/undelegate`;
export const STAKING_WITHDRAW_COMMISSION_URL = `${BASE_URL_V3}/staking/withdraw_commission`;
export const STAKING_WITHDRAW_REWARDS_URL = `${BASE_URL_V3}/staking/withdraw_rewards`;
// --Stats
export const NETWORK_ID_URL = `${BASE_URL}/chain/id`;
export const NETWORK_UPGRADES_URL = `${BASE_URL}/chain/upgrades`;
export const NETWORK_FEES_URL = `${BASE_URL}/gas/fees/statistics`;
export const NETWORK_GAS_STATS_URL = `${BASE_URL}/gas/stats`;
export const NETWORK_GAS_VOL_URL = `${BASE_URL}/gas/volume`;
export const NETWORK_PARAMS_URL = `${BASE_URL}/params`;
export const NETWORK_SPOTLIGHT_URL = `${BASE_URL}/spotlight`;
export const NETWORK_TOKEN_STATS_URL = `${BASE_URL_V3}/utility_token/stats`;
export const NETWORK_TOTAL_SUPPLY_URL = `${BASE_URL_V3}/utility_token/total_supply`;
// -- Txs
export const TX_INFO_URL = `${BASE_URL}/txs`;
export const TX_V3_URL = `${BASE_URL_V3}/txs`;
export const TXS_RECENT_URL = `${BASE_URL}/txs/recent`;
export const TX_HISTORY_URL = `${BASE_URL}/txs/history`;
export const TXS_BY_BLOCK_URL = `${BASE_URL}/txs/height`;
export const TXS_BY_ADDRESS_URL = `${BASE_URL}/txs/address`;
export const TX_TYPES_URL = `${BASE_URL}/txs/types`;
export const TX_HEATMAP_URL = `${BASE_URL}/txs/heatmap`;
// -- Validators
export const VALIDATOR_INFO_URL = `${BASE_URL}/validators`;
export const VALIDATORS_RECENT_URL = `${BASE_URL}/validators/recent`;
export const VALIDATORS_GET_ALL_URL = `${BASE_URL}/validators/recent/abbrev`;
export const VALIDATORS_V3_URL = `${BASE_URL_V3}/validators`;
export const BLOCK_VALIDATORS_URL = `${BASE_URL}/validators/height`;
