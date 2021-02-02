import { createAction } from 'redux-actions';
import { CHAINCODE_ID_URL } from 'consts';
import { ajaxGet } from './xhrActions';

// API
export const GET_CHAINCODE_ID = 'GET_CHAINCODE_ID';
// Store
export const SET_THEME = 'SET_THEME';

// API Calls
export const getChaincodeID = () => async (dispatch) => ajaxGet(GET_CHAINCODE_ID, dispatch, CHAINCODE_ID_URL);
// Store
export const setTheme = createAction(SET_THEME);
