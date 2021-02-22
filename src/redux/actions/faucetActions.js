import { FAUCET_URL } from 'consts';
import { ajaxPost } from './xhrActions';

// API
export const SEND_FAUCET_ADDRESS = 'SEND_FAUCET_ADDRESS';

// API Calls
export const sendFaucetAddress = (address) => async (dispatch) => ajaxPost(SEND_FAUCET_ADDRESS, dispatch, FAUCET_URL, address);
