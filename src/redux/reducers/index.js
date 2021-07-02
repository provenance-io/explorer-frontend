import accountsReducer from './accountsReducer';
import appReducer from './appReducer';
import assetsReducer from './assetsReducer';
import blocksReducer from './blocksReducer';
import faucetReducer from './faucetReducer';
import governanceReducer from './governanceReducer';
import txsReducer from './txsReducer';
import validatorsReducer from './validatorsReducer';

const rootReducer = {
  accountsReducer,
  appReducer,
  assetsReducer,
  blocksReducer,
  faucetReducer,
  governanceReducer,
  txsReducer,
  validatorsReducer,
};

export default rootReducer;
