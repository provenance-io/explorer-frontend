import appReducer from './appReducer';
import blocksReducer from './blocksReducer';
import txsReducer from './txsReducer';
import validatorsReducer from './validatorsReducer';
import addressReducer from './addressReducer';
import assetsReducer from './assetsReducer';

const rootReducer = {
  appReducer,
  blocksReducer,
  txsReducer,
  validatorsReducer,
  addressReducer,
  assetsReducer,
};

export default rootReducer;
