import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "redux/app/store";
import { FAUCET_URL } from "consts";
import { ajax } from "../api";

/* -----------------
** TYPES
-------------------*/
interface SendFaucetAddressData {
  address: string;
};

interface FaucetRequestStatus {
  faucetRequestStatus: string;
};

export const initialState: FaucetRequestStatus = {
  faucetRequestStatus: 'none',
};

/* -----------------
** ACTIONS
-------------------*/
export const sendFaucetAddress = (data: SendFaucetAddressData) =>
  ajax({ url: FAUCET_URL, method: 'POST', data });

  export const faucetActions = {};
export const noDispatchActions = { sendFaucetAddress };
/* -----------------
** SLICE
-------------------*/
export const faucetSlice = createSlice({
  name: 'faucet',
  initialState,
  reducers: {
    sendFaucetAddress(state, action: PayloadAction<string>) {
      state.faucetRequestStatus = action.payload === 'pending' ?
        'loading' : action.payload === 'fulfilled' ? 'success' : 
        'failure';
    },
  },
})
/* -----------------
SELECTORS
-------------------*/
export const selectFaucet = (state: RootState) => state.faucet;

export default faucetSlice.reducer;