import appReducer from './appReducer';
import blocksReducer from './blocksReducer';
import txsReducer from './txsReducer';
import validatorsReducer from './validatorsReducer';
import accountsReducer from './accountsReducer';
import assetsReducer from './assetsReducer';
import faucetReducer from './faucetReducer';

const rootReducer = {
  appReducer,
  blocksReducer,
  txsReducer,
  validatorsReducer,
  accountsReducer,
  assetsReducer,
  faucetReducer,
};

export default rootReducer;
