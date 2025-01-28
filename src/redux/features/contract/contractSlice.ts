import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import qs from 'query-string';
import { RootState } from "redux/app/store";
import {
  CONTRACT_CODE_URL,
  CODES_URL,
  CONTRACT_DETAILS_URL,
  CONTRACTS_ALL_URL,
  CONTRACT_TRANSACTIONS_URL,
  CONTRACT_LABELS_URL,
} from '../../../consts';
import { TransactionsModule } from '../asset/assetSlice';
import { ajax } from "../api";

interface ContractCode {
  codeId: number;
  creationHeight: number;
  creator: string;
  dataHash: string;
};

interface ContractDetails {
  admin: string;
  codeId: number;
  contractAddress: string;
  creationHeight: number;
  creator: string;
  label: string;
};

interface ContractsByCode {
  pages: number;
  results: ContractDetails[];
  rollupTotals: {};
  total: number;
};

interface Codes {
  pages: number;
  results: {
    codeId: number;
    contractCount: number;
    creationHeight: number;
    creator: string;
    dataHash: string;
  }[];
  rollupTotals: {};
  total: number;
};

interface ContractHistory {
  operation?: string;
  codeId?: string;
  msg?: {
    name?: string;
    bind_name?: string;
    base_denom?: string;
    convertible_base_denom?: string[];
    supported_quote_denoms?: string[];
    executors?: string[];
    approvers?: string[];
    ask_required_attributes?: string[];
    bid_required_attributesv: string[];
    price_precision?: string;
    size_increment?: string;
    fee_rate?: string;
    fee_account?: string;
    dcc_denom?: string;
    quorum_pct?: string;
    vote_duration?: string;
    kyc_attrs?: string[];
    admin_weight?: string;
    admin?: string;
    capital?: {
      denom: string;
      amount: string;
    };
    lp_capital_source?: string;
    shares?: {
      denom: string;
      amount: string;
    };
  };
};

interface ContractsAll {
  pages: number;
  results: ContractDetails[];
  rollupTotals: {};
  total: number;
};

type CodeAndContractTxs = TransactionsModule;

interface ContractState {
  // Contract Code
  contractCode: ContractCode,
  contractCodeLoading: boolean;
  // Contracts by code
  contractsByCode: ContractsByCode["results"],
  contractsByCodePages: ContractsByCode["pages"];
  contractsByCodeLoading: boolean;
  contractsByCodeTotal: ContractsByCode["total"];
  // Codes
  codes: Codes["results"],
  codesPages: Codes["pages"];
  codesLoading: boolean;
  codesTotal: Codes["total"];
  // Contract Details
  contractDetails: ContractDetails,
  contractDetailsLoading: boolean;
  // Contract History
  contractHistory: ContractHistory[],
  contractHistoryLoading: boolean;
  // Contracts
  contracts: ContractsAll["results"],
  contractsPages: ContractsAll["pages"];
  contractsLoading: boolean;
  contractsTotal: ContractsAll["total"];
  // Contract Transactions
  contractTxs: CodeAndContractTxs["results"],
  contractTxsLoading: boolean;
  contractTxsPages: number;
  contractTxsTotal: number;
  // Code Transactions
  codeTxs: CodeAndContractTxs["results"],
  codeTxsLoading: boolean;
  codeTxsPages: number;
  codeTxsTotal: number;
  // Contract Labels
  contractLabels: string[];
  contractLabelsLoading: boolean;
}

export const initialState: ContractState = {
  // Contract Code
  contractCode: {
    codeId: 0,
    creationHeight: 0,
    creator: '',
    dataHash: '',
  },
  contractCodeLoading: false,
  // Contracts by code
  contractsByCode: [],
  contractsByCodePages: 0,
  contractsByCodeLoading: false,
  contractsByCodeTotal: 0,
  // Codes
  codes: [],
  codesPages: 0,
  codesLoading: false,
  codesTotal: 0,
  // Contract Details
  contractDetails: {
    admin: '',
    codeId: 0,
    contractAddress: '',
    creationHeight: 0,
    creator: '',
    label: '',
  },
  contractDetailsLoading: false,
  // Contract History
  contractHistory: [],
  contractHistoryLoading: false,
  // Contracts
  contracts: [],
  contractsPages: 0,
  contractsLoading: false,
  contractsTotal: 0,
  // Contract Transactions
  contractTxs: [],
  contractTxsLoading: false,
  contractTxsPages: 0,
  contractTxsTotal: 0,
  // Code Transactions
  codeTxs: [],
  codeTxsLoading: false,
  codeTxsPages: 0,
  codeTxsTotal: 0,
  // Contract Labels
  contractLabels: [],
  contractLabelsLoading: false,
};

/* -----------------
** TYPES
-------------------*/
export const GET_CONTRACT_CODE = 'GET_CONTRACT_CODE';
export const GET_CONTRACTS_BY_CODE = 'GET_CONTRACTS_BY_CODE';
export const GET_CODES = 'GET_CODES';
export const GET_CONTRACT_DETAILS = 'GET_CONTRACT_DETAILS';
export const GET_CONTRACT_HISTORY = 'GET_CONTRACT_HISTORY';
export const GET_CONTRACTS = 'GET_CONTRACTS';
export const GET_CONTRACT_TXS = 'GET_CONTRACT_TXS';
export const GET_CODE_TXS = 'GET_CODE_TXS';
export const GET_CONTRACT_LABELS = 'GET_CONTRACT_LABELS';

/* -----------------
** ACTIONS
-------------------*/
export const getContractCode = createAsyncThunk(
  GET_CONTRACT_CODE,
  ({
    id = '',
  }: {
    id: string
  }) =>
    ajax({
      url: `${CONTRACT_CODE_URL}/${id}`,
    })
);

export const getContractsByCode = createAsyncThunk(
  GET_CONTRACTS_BY_CODE,
  ({
    id = '',
    page = 1,
    count = 10,
  }: {
    id: string,
    page: number,
    count: number,
  }) =>
    ajax({
      url: `${CONTRACT_CODE_URL}/${id}/contracts/?${qs.stringify({ page, count })}`,
    })
);

export const getCodes = createAsyncThunk(
  GET_CODES,
  ({
    page = 1,
    count = 10,
    creator = '',
    hasContracts = '',
  }: {
    page: number,
    count: number,
    creator: string,
    hasContracts: string,
  }) =>
    ajax({
      url: `${CODES_URL}?count=${count}&page=${page}${creator && `&creator=${creator}`}${hasContracts && `&has_contracts=${hasContracts}`}`,
    })
);

export const getContractDetails = createAsyncThunk(
  GET_CONTRACT_DETAILS,
  ({
    id = '',
  }: {
    id: string,
  }) =>
    ajax({
      url: `${CONTRACT_DETAILS_URL}/${id}`,
    })
);

export const getContractHistory = createAsyncThunk(
  GET_CONTRACT_HISTORY,
  ({
    id = '',
  }: {
    id: string,
  }) =>
    ajax({
      url: `${CONTRACT_DETAILS_URL}/${id}/history`,
    })
);

export const getContracts = createAsyncThunk(
  GET_CONTRACTS,
  ({
    page = 1,
    count = 10,
    creator = '',
    admin = '',
    label = '',
  }: {
    page: number,
    count: number,
    creator: string,
    admin: string,
    label: string,
  }) =>
    ajax({
      url: `${CONTRACTS_ALL_URL}?count=${count}&page=${page}${creator ? `&creator=${creator}` : ''}${admin ? `&admin=${admin}` : ''}${label ? `&label=${label}` : ''}`,
    })
);

export const getContractTxs = createAsyncThunk(
  GET_CONTRACT_TXS,
  ({
    id = '',
    page = 1,
    count = 10,
    fromDate = '',
    toDate = '',
    status = '',
  }: {
    id: string,
    page: number,
    count: number,
    fromDate: string,
    toDate: string,
    status: string,
  }) =>
    ajax({
      url: `${CONTRACT_TRANSACTIONS_URL}?count=${count}&page=${page}&contract=${id}${status ? `&txStatus=${status.toUpperCase()}` : ''}${toDate ? `&toDate=${toDate}` : ''}${fromDate ? `&fromDate=${fromDate}` : ''}`
    })
);

export const getCodeTxs = createAsyncThunk(
  GET_CODE_TXS,
  ({
    id = '',
    page = 1,
    count = 10,
    fromDate = '',
    toDate = '',
    status = '',
  }: {
    id: string,
    page: number,
    count: number,
    fromDate: string,
    toDate: string,
    status: string,
  }) =>
    ajax({
      url: `${CONTRACT_TRANSACTIONS_URL}?count=${count}&page=${page}&code=${id}${status ? `&txStatus=${status.toUpperCase()}` : ''}${toDate ? `&toDate=${toDate}` : ''}${fromDate ? `&fromDate=${fromDate}` : ''}`
    })
);

export const getContractLabels = createAsyncThunk(
  GET_CONTRACT_LABELS,
  () =>
    ajax({
      url: CONTRACT_LABELS_URL,
    })
);

export const contractActions = {
  getContractCode,
  getContractsByCode,
  getCodes,
  getContractDetails,
  getContractHistory,
  getContracts,
  getContractTxs,
  getCodeTxs,
  getContractLabels,
};
/* -----------------
** SLICE
-------------------*/
export const contractSlice = createSlice({
  name: 'contract',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      /* -----------------
      GET_CONTRACT_CODE
      -------------------*/
      .addCase(getContractCode.pending, (state) => {
        state.contractCodeLoading = true;
      })
      .addCase(getContractCode.fulfilled, (state, { payload }) => {
        state.contractCodeLoading = false;
        state.contractCode = payload.data;
      })
      .addCase(getContractCode.rejected, (state) => {
        state.contractCodeLoading = false;
      })
      /* -----------------
      GET_CONTRACTS_BY_CODE
      -------------------*/
      .addCase(getContractsByCode.pending, (state) => {
        state.contractsByCodeLoading = true;
      })
      .addCase(getContractsByCode.fulfilled, (state, { payload }) => {
        state.contractsByCodeLoading = false;
        state.contractsByCode = payload.data.results;
        state.contractsByCodePages = payload.data.pages;
        state.contractsByCodeTotal = payload.data.total;
      })
      .addCase(getContractsByCode.rejected, (state) => {
        state.contractsByCodeLoading = false;
      })
      /* -----------------
      GET_CODES
      -------------------*/
      .addCase(getCodes.pending, (state) => {
        state.codesLoading = true;
      })
      .addCase(getCodes.fulfilled, (state, { payload }) => {
        state.codesLoading = false;
        state.codes = payload.data.results;
        state.codesPages = payload.data.pages;
        state.codesTotal = payload.data.total;
      })
      .addCase(getCodes.rejected, (state) => {
        state.codesLoading = false;
      })
      /* -----------------
      GET_CONTRACT_DETAILS
      -------------------*/
      .addCase(getContractDetails.pending, (state) => {
        state.contractDetailsLoading = true;
      })
      .addCase(getContractDetails.fulfilled, (state, { payload }) => {
        state.contractDetailsLoading = false;
        state.contractDetails = payload.data;
      })
      .addCase(getContractDetails.rejected, (state) => {
        state.contractDetailsLoading = false;
      })
      /* -----------------
      GET_CONTRACT_HISTORY
      -------------------*/
      .addCase(getContractHistory.pending, (state) => {
        state.contractHistoryLoading = true;
      })
      .addCase(getContractHistory.fulfilled, (state, { payload }) => {
        state.contractHistoryLoading = false;
        state.contractHistory = payload.data;
      })
      .addCase(getContractHistory.rejected, (state) => {
        state.contractHistoryLoading = false;
      })
      /* -----------------
      GET_CONTRACTS
      -------------------*/
      .addCase(getContracts.pending, (state) => {
        state.contractsLoading = true;
      })
      .addCase(getContracts.fulfilled, (state, { payload }) => {
        state.contractsLoading = false;
        state.contracts = payload.data.results;
        state.contractsPages = payload.data.pages;
        state.contractsTotal = payload.data.total;
      })
      .addCase(getContracts.rejected, (state) => {
        state.contractsLoading = false;
      })
      /* -----------------
      GET_CONTRACT_TXS
      -------------------*/
      .addCase(getContractTxs.pending, (state) => {
        state.contractTxsLoading = true;
      })
      .addCase(getContractTxs.fulfilled, (state, { payload }) => {
        state.contractTxsLoading = false;
        state.contractTxs = payload.data.results;
        state.contractTxsPages = payload.data.pages;
        state.contractTxsTotal = payload.data.total;
      })
      .addCase(getContractTxs.rejected, (state) => {
        state.contractTxsLoading = false;
      })
      /* -----------------
      GET_CODE_TXS
      -------------------*/
      .addCase(getCodeTxs.pending, (state) => {
        state.codeTxsLoading = true;
      })
      .addCase(getCodeTxs.fulfilled, (state, { payload }) => {
        state.codeTxsLoading = false;
        state.codeTxs = payload.data.results;
        state.codeTxsPages = payload.data.pages;
        state.codeTxsTotal = payload.data.total;
      })
      .addCase(getCodeTxs.rejected, (state) => {
        state.codeTxsLoading = false;
      })
      /* -----------------
      GET_CONTRACT_LABELS
      -------------------*/
      .addCase(getContractLabels.pending, (state) => {
        state.contractLabelsLoading = true;
      })
      .addCase(getContractLabels.fulfilled, (state, { payload }) => {
        state.contractLabelsLoading = false;
        state.contractLabels = payload.data;
      })
      .addCase(getContractLabels.rejected, (state) => {
        state.contractLabelsLoading = false;
      });
  },
});
/* -----------------
SELECTORS
-------------------*/
export const selectContract = (state: RootState) => state.contract;

export default contractSlice.reducer;