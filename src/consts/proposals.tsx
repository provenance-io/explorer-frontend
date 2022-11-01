export const PROPOSAL_TYPES: { [key: string]: string } = {
  TEXT: 'text',
  SOFTWARE_UPGRADE: 'software upgrade',
  CANCEL_SOFTWARE_UPGRADE: 'cancel upgrade',
  STORE_CODE: 'store code',
  INSTANTIATE_CODE: 'instantiate contract',
  PARAMS_CHANGE: 'parameter change',
  //TO-DOS:
  //COMMUNITY_POOL_SPEND: 'community pool spend',
  //COMMUNITY_POOL_SPEND_WITH_DEPOSIT: 'community pool spend with deposit',
};

export const ACCESS_TYPES = {
  NOBODY: 'nobody',
  ONLY_ADDRESS: 'only address',
  EVERYBODY: 'everybody',
};
