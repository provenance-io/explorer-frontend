import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const middleware = [thunk];
const enhancers = [];

if (process.env.NODE_ENV === 'development') {
  // Setup redux dev-tools extension https://github.com/zalmoxisus/redux-devtools-extension
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__; // eslint-disable-line no-underscore-dangle
  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

const store = createStore(combineReducers({ ...rootReducer }), composedEnhancers);

export default store;
