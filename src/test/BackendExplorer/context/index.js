import { createContext, useMemo, useReducer } from 'react';
import { createAction } from 'redux-actions';
import { bindActionCreators } from 'redux';
import * as backendReducer from './backend-reducer';

const { initialState, reducer, ...rest } = backendReducer;
export const BackendContext = createContext();

export const getState = () => JSON.parse(window.localStorage.getItem('backend-reducer'));

const camelCased = (str) => str.toLowerCase().replace(/_([a-z])/g, (g) => g[1].toUpperCase());
const actionList = Object.keys(rest).reduce((acc, action) => ({ ...acc, [camelCased(action)]: createAction(action) }), {});

const BackendContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = useMemo(() => bindActionCreators(actionList, dispatch), [dispatch]);

  return <BackendContext.Provider {...props} value={{ ...state, ...actions }} />;
};

export default BackendContextProvider;
