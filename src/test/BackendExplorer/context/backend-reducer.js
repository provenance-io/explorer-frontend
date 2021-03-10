// CONSTANTS

// Other
export const RESET_STORE_STORAGE = 'RESET_STORE_STORAGE';
export const SET_RECENT_COUNT = 'SET_RECENT_COUNT';
// Block
export const SET_BLOCK_HEIGHT = 'SET_BLOCK_HEIGHT';
export const ADD_BLOCK = 'ADD_BLOCK';
// Tx
export const ADD_TX = 'ADD_TX';
export const SET_TRANSACTION_HISTORY = 'SET_TRANSACTION_HISTORY';
// Validators
export const SET_TOP_VALIDATORS = 'SET_TOP_VALIDATORS';
export const SET_VALIDATORS = 'SET_VALIDATORS';

// INITIAL STATE

export const initialState = {
  blocksTotalPower: 8675309,
  recentCount: 10,
  topCount: 10,
  historyCount: 14,
  transactionHistory: [],
  blockHeight: 8675308,
  blocks: {},
  blocksRecent: [],
  txs: {},
  blockValidators: {},
  txsOrdered: [],
  topValidators: [],
  validators: {},
};

// REDUCER

const actionHandlers = {
  [RESET_STORE_STORAGE](state, { payload }) {
    return {
      ...initialState,
    };
  },
  [SET_RECENT_COUNT](state, { payload: recentCount }) {
    return {
      ...state,
      recentCount,
    };
  },
  [ADD_BLOCK](state, { payload }) {
    const { newBlock, blockValidators: newBlockValidators } = payload;
    const blocks = JSON.parse(JSON.stringify(state.blocks));
    const blockHeight = state.blockHeight + 1;
    blocks[blockHeight] = newBlock;
    const blocksRecent = Object.keys(blocks).sort().reverse().slice(0, state.recentCount);
    // Create validatorSet (100 validators) for this block
    const blockValidators = JSON.parse(JSON.stringify(state.blockValidators));
    blockValidators[blockHeight] = newBlockValidators;

    return {
      ...state,
      blocks,
      blockHeight,
      blocksRecent,
      blockValidators,
    };
  },
  [ADD_TX](state, { payload: tx }) {
    const txs = JSON.parse(JSON.stringify(state.txs));
    const { txId } = tx;
    txs[txId] = tx;
    const txsOrdered = JSON.parse(JSON.stringify(state.txsOrdered));
    txsOrdered.unshift(txId);

    return {
      ...state,
      txs,
      txsOrdered,
    };
  },
  [SET_TOP_VALIDATORS](state, { payload: topValidators }) {
    return {
      ...state,
      topValidators,
    };
  },
  [SET_TRANSACTION_HISTORY](state, { payload: transactionHistory }) {
    return {
      ...state,
      transactionHistory,
    };
  },
  [SET_VALIDATORS](state, { payload: validators }) {
    return {
      ...state,
      validators,
    };
  },
};

export const reducer = (state = initialState, action) => {
  const newState = actionHandlers?.[action.type](state, action) || state;

  window.localStorage.setItem('backend-reducer', JSON.stringify(newState));

  return newState;
};
