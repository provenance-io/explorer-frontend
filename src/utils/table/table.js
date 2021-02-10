import {
  transactionsTable,
  validatorsTable,
  blockValidatorsTable,
  assetHoldersTable,
  blocksTable,
  validatorDelegationsTable,
  validatorUnbondingDelegationsTable,
  validatorDelegationTxsTable,
  validatorTxsTable,
  assetTransactionsTable,
  assetsTable,
} from './tableTypes';

// Format tables based on the table type so that they look correct in the UI.
// This like having a link, capitalizing letters, shortening length are all custom per table type
export const formatTableData = (data = [], type) => {
  if (!data.length) return data;
  switch (type) {
    case 'transactions':
      return transactionsTable(data);
    case 'validators':
      return validatorsTable(data);
    case 'validatorDelegations':
      return validatorDelegationsTable(data);
    case 'validatorDelegationTxs':
      return validatorDelegationTxsTable(data);
    case 'validatorTxs':
      return validatorTxsTable(data);
    case 'validatorUnbondingDelegations':
      return validatorUnbondingDelegationsTable(data);
    case 'blockValidators':
      return blockValidatorsTable(data);
    case 'blocks':
      return blocksTable(data);
    case 'assetHolders':
      return assetHoldersTable(data);
    case 'assets':
      return assetsTable(data);
    case 'assetTransactions':
      return assetTransactionsTable(data);
    default:
      return data;
  }
};
