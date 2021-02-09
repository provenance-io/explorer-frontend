import appReducer from './appReducer';
import blocksReducer from './blocksReducer';
import txsReducer from './txsReducer';
import validatorsReducer from './validatorsReducer';
import accountsReducer from './accountsReducer';
import assetsReducer from './assetsReducer';

const rootReducer = {
  appReducer,
  blocksReducer,
  txsReducer,
  validatorsReducer,
  accountsReducer,
  assetsReducer,
};

export default rootReducer;
