import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'redux/app/store';
import { CHAINCODE_ID_URL, CHAINCODE_PREFIXES_URL } from 'consts';
import { getCookie, setCookie } from 'utils';
import { ajax } from '../api';
import { xhrSetToken } from '../api';

export interface AppState {
  chaincodeId: string;
  chaincodeIdLoading: boolean;
  chaincodePrefixes: {
    prefix: string;
    type: string;
  }[];
  chaincodePrefixesLoading: boolean;
  topCount: number;
  tableCount: number;
  validatorCount: number;
  theme: string;
  walletUrl: string;
  isLoggedIn: boolean;
  proposalNotifications: boolean;
  upgradeNotifications: boolean;
  announcementNotifications: boolean;
  // New wallet auth items
  authToken: string;
  changeOwnerData: {
    currentOwnerAddress: string;
    selected: string;
  };
}

export const initialState: AppState = {
  chaincodeId: '',
  chaincodePrefixes: [],
  chaincodeIdLoading: false,
  chaincodePrefixesLoading: false,
  topCount: 10,
  tableCount: 30,
  validatorCount: 100,
  theme: getCookie('theme') || '',
  walletUrl: getCookie('walletUrl', true) || '',
  isLoggedIn: false,
  // Notification states
  proposalNotifications: localStorage.getItem('proposalNotificationsOn') === 'true' || false,
  upgradeNotifications: localStorage.getItem('upgradeNotificationsOn') === 'true' || false,
  announcementNotifications:
    localStorage.getItem('announcementNotificationsOn') === 'true' || false,
  // New Wallet auth items
  authToken: '',
  changeOwnerData: {
    currentOwnerAddress: '',
    selected: '',
  },
};

/* -----------------
** TYPES
-------------------*/
// API
const GET_CHAINCODE_ID = 'GET_CHAINCODE_ID';
const GET_CHAINCODE_PREFIXES = 'GET_CHAINCODE_PREFIXES';

/* -----------------
** ACTIONS
-------------------*/
export const getChaincodeId = createAsyncThunk(GET_CHAINCODE_ID, () =>
  ajax({
    url: CHAINCODE_ID_URL,
  })
);

export const getChaincodePrefixes = createAsyncThunk(GET_CHAINCODE_PREFIXES, () =>
  ajax({
    url: CHAINCODE_PREFIXES_URL,
  })
);

/* -----------------
** SLICE
-------------------*/
export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<string>) {
      setCookie('theme', action.payload);
      state.theme = action.payload;
    },

    setWalletUrl(state, action: PayloadAction<string>) {
      setCookie('walletUrl', action.payload);
      state.walletUrl = action.payload;
    },

    setIsLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },

    setProposalNotifications(state, action: PayloadAction<boolean>) {
      localStorage.setItem('proposalNotificationsOn', action.payload.toString());
      state.proposalNotifications = action.payload;
    },

    setUpgradeNotifications(state, action: PayloadAction<boolean>) {
      localStorage.setItem('upgradeNotificationsOn', action.payload.toString());
      state.upgradeNotifications = action.payload;
    },

    setAnnouncementNotifications(state, action: PayloadAction<boolean>) {
      localStorage.setItem('announcementNotificationsOn', action.payload.toString());
      state.announcementNotifications = action.payload;
    },

    setAuthToken(state, action: PayloadAction<string>) {
      xhrSetToken(action.payload);
      state.authToken = action.payload;
      state.isLoggedIn = true;
    },

    setChangeOwnerData(state, action: PayloadAction<object>) {
      state.changeOwnerData = { ...state.changeOwnerData, ...action.payload };
    },
  },
  extraReducers(builder) {
    builder
      /* -----------------
      GET_CHAINCODE_ID
      -------------------*/
      .addCase(getChaincodeId.pending, (state) => {
        state.chaincodeIdLoading = true;
      })
      .addCase(getChaincodeId.fulfilled, (state, { payload }) => {
        state.chaincodeIdLoading = false;
        state.chaincodeId = payload.data;
      })
      .addCase(getChaincodeId.rejected, (state) => {
        state.chaincodeIdLoading = false;
      })
      /* -----------------
      GET_CHAINCODE_PREFIXES
      -------------------*/
      .addCase(getChaincodePrefixes.pending, (state) => {
        state.chaincodePrefixesLoading = true;
      })
      .addCase(getChaincodePrefixes.fulfilled, (state, { payload }) => {
        state.chaincodePrefixesLoading = false;
        state.chaincodePrefixes = payload.data;
      })
      .addCase(getChaincodePrefixes.rejected, (state) => {
        state.chaincodePrefixesLoading = false;
      });
  },
});

/* -----------------
** BUILD ACTIONS
-------------------*/
const {
  setTheme,
  setWalletUrl,
  setIsLoggedIn,
  setProposalNotifications,
  setAnnouncementNotifications,
  setUpgradeNotifications,
  setAuthToken,
} = appSlice.actions;

export const appActions = {
  getChaincodeId,
  getChaincodePrefixes,
  setTheme,
  setWalletUrl,
  setIsLoggedIn,
  setProposalNotifications,
  setAnnouncementNotifications,
  setUpgradeNotifications,
  setAuthToken,
};

/* -----------------
SELECTORS
-------------------*/
export const selectApp = (state: RootState) => state.app;

export default appSlice.reducer;
