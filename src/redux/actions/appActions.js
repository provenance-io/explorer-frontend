import { createAction } from 'redux-actions';
import { CHAINCODE_ID_URL, CHAINCODE_PREFIXES_URL } from 'consts';
import { ajaxGet } from './xhrActions';

// API
export const GET_CHAINCODE_ID = 'GET_CHAINCODE_ID';
export const GET_CHAINCODE_PREFIXES = 'GET_CHAINCODE_PREFIXES';
// Store
export const SET_THEME = 'SET_THEME';
export const SET_WALLET_URL = 'SET_WALLET_URL';
export const SET_IS_LOGGED_IN = 'SET_IS_LOGGED_IN';
export const SET_PROPOSAL_NOTIFICATIONS = 'SET_PROPOSAL_NOTIFICATIONS';
export const SET_UPGRADE_NOTIFICATIONS = 'SET_UPGRADE_NOTIFICATIONS';
export const SET_ANNOUNCEMENT_NOTIFICATIONS = 'SET_ANNOUNCEMENT_NOTIFICATIONS';

// API Calls
export const getChaincodeID = () => async dispatch =>
  ajaxGet(GET_CHAINCODE_ID, dispatch, CHAINCODE_ID_URL);
export const getChaincodePrefixes = () => async dispatch =>
  ajaxGet(GET_CHAINCODE_PREFIXES, dispatch, CHAINCODE_PREFIXES_URL);
// Store
export const setTheme = createAction(SET_THEME);
export const setWalletUrl = createAction(SET_WALLET_URL);
export const setIsLoggedIn = createAction(SET_IS_LOGGED_IN);
export const setProposalNotifications = createAction(SET_PROPOSAL_NOTIFICATIONS);
export const setUpgradeNotifications = createAction(SET_UPGRADE_NOTIFICATIONS);
export const setAnnouncementNotifications = createAction(SET_ANNOUNCEMENT_NOTIFICATIONS);
