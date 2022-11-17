import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'redux/app/store';
import { getCookie, setCookie } from 'utils';
import { xhrSetToken } from '../api';

export interface AppState {
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

/* -----------------
** ACTIONS
-------------------*/

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
