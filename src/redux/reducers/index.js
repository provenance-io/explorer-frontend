import accountsReducer from './accountsReducer';
import appReducer from './appReducer';
import assetsReducer from './assetsReducer';
import blocksReducer from './blocksReducer';
import contractReducer from './contractReducer';
import faucetReducer from './faucetReducer';
import governanceReducer from './governanceReducer';
import ibcReducer from './ibcReducer';
import txsReducer from './txsReducer';
import validatorsReducer from './validatorsReducer';
import orderbookReducer from './orderbookReducer';
import nftReducer from './nftReducer';
import networkReducer from './networkReducer';
import notificationsReducer from './notificationsReducer';

const rootReducer = {
  accountsReducer,
  appReducer,
  assetsReducer,
  blocksReducer,
  contractReducer,
  faucetReducer,
  governanceReducer,
  ibcReducer,
  txsReducer,
  validatorsReducer,
  orderbookReducer,
  nftReducer,
  networkReducer,
  notificationsReducer,
};

export default rootReducer;
