import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { NAME_TREE_URL } from '../../../consts';
import { ajax } from '../api';

export interface NameTree {
  // For name tree map
  segmentName: string;
  fullName: string;
  owner: string;
  restricted: boolean;
  children: NameTree[];
  name: string;
  value: number;
  // For name tree file view
  label: string;
  key: string;
  nodes: NameTree[];
  toggled: boolean;
}

export interface NameTreeState {
  nameTreeLoading: boolean;
  nameTreeDepth: number;
  nameTree: NameTree[];
}

export const initialState: NameTreeState = {
  nameTreeLoading: false,
  nameTreeDepth: 0,
  nameTree: [],
};

/* -----------------
** TYPES
-------------------*/
export const GET_NAME_TREE = 'GET_NAME_TREE';

/* -----------------
** ACTIONS
-------------------*/
export const getNameTree = createAsyncThunk(GET_NAME_TREE, () =>
  ajax({
    url: NAME_TREE_URL,
  })
);

export const nameActions = {
  getNameTree,
};

/* -----------------
** SLICE
-------------------*/
export const nameSlice = createSlice({
  name: 'name',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      /* -----------------
    GET_NAMES_TREE
    -------------------*/
      .addCase(getNameTree.pending, (state) => {
        state.nameTreeLoading = true;
      })
      .addCase(getNameTree.fulfilled, (state, { payload }) => {
        const renameTree = (data: NameTree[]) =>
          data.map((item) => {
            item.name = item.segmentName;
            item.value = item.children.length || 1;
            item.label = item.fullName;
            item.nodes = item.children;
            item.key = item.fullName;
            item.toggled = true;
            if (item.children.length > 0) {
              renameTree(item.children);
            }
            return item;
          });
        state.nameTreeLoading = false;
        state.nameTreeDepth = payload.data.depthCount;
        state.nameTree = renameTree(payload.data.tree);
      })
      .addCase(getNameTree.rejected, (state) => {
        state.nameTreeLoading = false;
      });
  },
});
/* -----------------
SELECTORS
-------------------*/
export const selectName = (state: RootState) => state.name;

export default nameSlice.reducer;
