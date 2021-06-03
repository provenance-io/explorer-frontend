import { rest } from 'msw';
import { BLOCK_SPOTLIGHT_URL } from 'consts';
import { getState } from '../BackendExplorer/context';

// Handle getting block scroller info
export const spotlight = [
  rest.get(`${BLOCK_SPOTLIGHT_URL}`, (req, res, ctx) => {
    const { blocks, blocksRecent } = getState();
    const latestBlock = blocks[blocksRecent[0]];

    return res(ctx.delay(50), ctx.status(200), ctx.json(latestBlock));
  }),
];
