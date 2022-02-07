import accountsReducer from './accountsReducer';
import appReducer from './appReducer';
import assetsReducer from './assetsReducer';
import blocksReducer from './blocksReducer';
import faucetReducer from './faucetReducer';
import governanceReducer from './governanceReducer';
import ibcReducer from './ibcReducer';
import txsReducer from './txsReducer';
import validatorsReducer from './validatorsReducer';
import orderbookReducer from './orderbookReducer';
import nftReducer from './nftReducer';
import statsReducer from './statsReducer';

const rootReducer = {
  accountsReducer,
  appReducer,
  assetsReducer,
  blocksReducer,
  faucetReducer,
  governanceReducer,
  ibcReducer,
  txsReducer,
  validatorsReducer,
  orderbookReducer,
  nftReducer,
  statsReducer,
};

export default rootReducer;
