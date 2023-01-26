// TO-DO: Re-allow Instantiate/Params when available

export const PROPOSAL_TYPES: { [key: string]: string } = {
  TEXT: 'text',
  SOFTWARE_UPGRADE: 'software upgrade',
  CANCEL_SOFTWARE_UPGRADE: 'cancel upgrade',
  STORE_CODE: 'store code',
  // INSTANTIATE_CODE: 'instantiate contract',
  // PARAMS_CHANGE: 'parameter change',
  //TO-DOS:
  //COMMUNITY_POOL_SPEND: 'community pool spend',
  //COMMUNITY_POOL_SPEND_WITH_DEPOSIT: 'community pool spend with deposit',
};

export const ACCESS_TYPES = {
  ACCESS_TYPE_UNSPECIFIED: 'ACCESS_TYPE_UNSPECIFIED',
  ACCESS_TYPE_NOBODY: 'ACCESS_TYPE_NOBODY',
  ACCESS_TYPE_ONLY_ADDRESS: 'ACCESS_TYPE_ONLY_ADDRESS',
  ACCESS_TYPE_EVERYBODY: 'ACCESS_TYPE_EVERYBODY',
  // TO-DO: incorporate this option
  // ACCESS_TYPE_ANY_OF_ADDRESSES: '',
};
