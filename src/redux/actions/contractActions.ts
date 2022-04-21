import { Dispatch } from 'react';
import { 
  CONTRACT_CODE_URL, 
  CODES_URL, 
  CONTRACT_DETAILS_URL, 
  CONTRACTS_ALL_URL,
  CONTRACT_TRANSACTIONS_URL, 
} from 'consts';
import { ajaxGet } from './xhrActions';

// Block
export const GET_CONTRACT_CODE = 'GET_CONTRACT_CODE';
export const GET_CONTRACTS_BY_CODE = 'GET_CONTRACTS_BY_CODE';
export const GET_CODES = 'GET_CODES';
export const GET_CONTRACT_DETAILS = 'GET_CONTRACT_DETAILS';
export const GET_CONTRACT_HISTORY = 'GET_CONTRACT_HISTORY';
export const GET_CONTRACTS = 'GET_CONTRACTS';
export const GET_CONTRACT_TXS = 'GET_CONTRACT_TXS';

// API Calls
export const getContractCode = ({ id = '' }) => async(dispatch: Dispatch<any>) => 
  ajaxGet(GET_CONTRACT_CODE, dispatch, `${CONTRACT_CODE_URL}/${id}`);

export const getContractsByCode = ({ id = '', page = 1, count = 10 }) => async(dispatch: Dispatch<any>) =>
  ajaxGet(GET_CONTRACTS_BY_CODE, dispatch, `${CONTRACT_CODE_URL}/${id}/contracts/?count=${count}&page=${page}`);

export const getCodes = ({ page = 1, count = 10 }) => async(dispatch: Dispatch<any>) => 
  ajaxGet(GET_CODES, dispatch, `${CODES_URL}/?count=${count}&page=${page}`);

export const getContractDetails = ({ id = '' }) => async(dispatch: Dispatch<any>) => 
  ajaxGet(GET_CONTRACT_DETAILS, dispatch, `${CONTRACT_DETAILS_URL}/${id}`);

export const getContractHistory = ({ id = '' }) => async(dispatch: Dispatch<any>) => 
  ajaxGet(GET_CONTRACT_HISTORY, dispatch, `${CONTRACT_DETAILS_URL}/${id}/history`);

export const getContracts = ({page = 1, count = 10}) => async(dispatch: Dispatch<any>) => 
  ajaxGet(GET_CONTRACTS, dispatch, `${CONTRACTS_ALL_URL}/?count=${count}&page=${page}`);

export const getContractTxs = 
  ({ id = '', page = 1, count = 10, fromDate = '', toDate = '', status = '' }) => 
    async(dispatch: Dispatch<any>) =>
      ajaxGet(GET_CONTRACT_TXS, dispatch,
        `${CONTRACT_TRANSACTIONS_URL}?count=${count}&page=${page}
        &contract=${id}
        ${status ? `&txStatus=${status.toUpperCase()}` : ''}
        ${toDate ? `&toDate=${toDate}` : ''}${fromDate ? `&fromDate=${fromDate}` : ''}`
      );