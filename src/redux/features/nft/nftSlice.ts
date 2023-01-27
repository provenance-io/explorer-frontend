import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import qs from 'query-string';
import { RootState } from '../../app/store';
import { NFT_URL } from '../../../consts';
import { ajax } from '../api';

interface NftDetail {
  attributes: {
    attribute: string;
    data: string;
  }[];
  dataAccess: string[];
  description: {
    description: string;
    iconUrl: string;
    name: string;
    websiteUrl: string;
  };
  owners: {
    party: string;
    role: string;
  }[];
  scopeAddr: string;
  scopeUuid: string;
  specAddr: string;
  specName: string;
  valueOwner: string;
}

interface NftRecords {
  record: {
    lastModified: string;
    outputs: {
      hash: string;
      name: string;
      status: string;
    }[];
    recordAddr: string;
    recordSpecAddr: string;
    responsibleParties: {
      party: string;
      role: string;
    }[];
  };
  recordName: string;
  specList: {
    contractSpecAddr: string;
    recordSpecAddr: string;
    responsibleParties: string[];
  }[];
  status: string;
}

interface NftByOwner {
  pages: number;
  results: {
    isDataAccess: boolean;
    isOwner: boolean;
    isValueOwner: boolean;
    lastUpdated: string;
    scopeAddr: string;
    scopeUuid: string;
    specAddr: string;
    specName: string;
  }[];
  rollupTotals: {
    [key: string]: {
      amount: string;
      denom: string;
    };
  };
  total: number;
}

export interface NftState {
  nftDetailLoading: boolean;
  nftRecordsLoading: boolean;
  nftByOwnerLoading: boolean;
  nftByOwnerPages: NftByOwner['pages'];
  nftDetail: NftDetail;
  nftRecords: NftRecords[];
  nftByOwner: NftByOwner['results'];
}

export const initialState: NftState = {
  nftDetailLoading: false,
  nftRecordsLoading: false,
  nftByOwnerLoading: false,
  nftByOwnerPages: 1,
  nftDetail: {
    attributes: [],
    dataAccess: [],
    description: {
      description: '',
      iconUrl: '',
      name: '',
      websiteUrl: '',
    },
    owners: [],
    scopeAddr: '',
    scopeUuid: '',
    specAddr: '',
    specName: '',
    valueOwner: '',
  },
  nftRecords: [],
  nftByOwner: [],
};

/* -----------------
** TYPES
-------------------*/
export const GET_NFT_DETAIL = 'NFT::GET_NFT_DETAIL';
export const GET_NFT_RECORDS = 'NFT::GET_NFT_RECORDS';
export const GET_NFT_BY_OWNER = 'NFT::GET_NFT_BY_OWNER';

/* -----------------
** ACTIONS
-------------------*/
export const getNftDetail = createAsyncThunk(GET_NFT_DETAIL, (addr: string) =>
  ajax({
    url: `${NFT_URL}/${addr}`,
  })
);

export const getNftRecords = createAsyncThunk(GET_NFT_RECORDS, (addr: string) =>
  ajax({
    url: `${NFT_URL}/${addr}/records`,
  })
);

export const getNftsByOwner = createAsyncThunk(
  GET_NFT_BY_OWNER,
  ({ addr, page = 1, count = 50 }: { addr: string; page: number; count: number }) =>
    ajax({
      url: `${NFT_URL}/owner/${addr}?${qs.stringify({ page, count })}`,
    })
);

export const nftActions = {
  getNftDetail,
  getNftRecords,
  getNftsByOwner,
};
/* -----------------
** SLICE
-------------------*/
export const nftSlice = createSlice({
  name: 'nft',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      /* -----------------
    GET_NFT_DETAIL
    -------------------*/
      .addCase(getNftDetail.pending, (state) => {
        state.nftDetailLoading = true;
      })
      .addCase(getNftDetail.fulfilled, (state, { payload }) => {
        state.nftDetailLoading = false;
        state.nftDetail = payload.data;
      })
      .addCase(getNftDetail.rejected, (state) => {
        state.nftDetailLoading = false;
      })
      /* -----------------
    GET_NFT_RECORDS
    -------------------*/
      .addCase(getNftRecords.pending, (state) => {
        state.nftRecordsLoading = true;
      })
      .addCase(getNftRecords.fulfilled, (state, { payload }) => {
        state.nftRecordsLoading = false;
        state.nftRecords = payload.data.filter(
          (record: NftRecords) => !record.status.match(/NON_CONFORMING|ORPHAN/)
        );
      })
      .addCase(getNftRecords.rejected, (state) => {
        state.nftRecordsLoading = false;
      })
      /* -----------------
    GET_NFT_BY_OWNER
    -------------------*/
      .addCase(getNftsByOwner.pending, (state) => {
        state.nftByOwnerLoading = true;
      })
      .addCase(getNftsByOwner.fulfilled, (state, { payload }) => {
        state.nftByOwnerLoading = false;
        state.nftByOwner = payload.data.results;
        state.nftByOwnerPages = payload.data.pages;
      })
      .addCase(getNftsByOwner.rejected, (state) => {
        state.nftByOwnerLoading = false;
      });
  },
});

/* -----------------
SELECTORS
-------------------*/
export const selectNft = (state: RootState) => state.nft;

export default nftSlice.reducer;
