import { createAction } from 'redux-actions';
import { CHAINCODE_ID_URL } from 'consts';
import { ajaxGet } from './xhrActions';

// API
export const GET_CHAINCODE_ID = 'GET_CHAINCODE_ID';
// Store
export const SET_THEME = 'SET_THEME';
export const SET_WALLET_URL = 'SET_WALLET_URL';
export const SET_IS_LOGGED_IN = 'SET_IS_LOGGED_IN';

// API Calls
export const getChaincodeID = () => async (dispatch) => ajaxGet(GET_CHAINCODE_ID, dispatch, CHAINCODE_ID_URL);
// Store
export const setTheme = createAction(SET_THEME);
export const setWalletUrl = createAction(SET_WALLET_URL);
export const setIsLoggedIn = createAction(SET_IS_LOGGED_IN);
