import { spotlight, blocks, txs, stake, search } from '../api';

export const handlers = [...blocks, ...spotlight, ...txs, ...stake, ...search];
