import { ADDRESS_INFO_URL } from 'consts';
import { ajaxGet } from './xhrActions';

// Address
export const GET_ADDRESS_INFO = 'GET_ADDRESS_INFO';

// API Calls
//  * Address
export const getAddressInfo = (id) => async (dispatch) => ajaxGet(GET_ADDRESS_INFO, dispatch, `${ADDRESS_INFO_URL}?id=${id}`);
