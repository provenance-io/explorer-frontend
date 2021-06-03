import { rest } from 'msw';
import { BLOCK_HEIGHT_URL } from 'consts';
import { getState } from '../BackendExplorer/context';

// Handle getting data
export const blocks = [
  // Get back blocks of a certain count, type, status, and/or page
  rest.get(`${process.env.PUBLIC_URL}/blocks/all`, (req, res, ctx) => {
    const { url } = req;
    const { blocks: storageBlocks, blockHeight: storageBlockHeight } = getState();
    const query = url.searchParams;
    const queryCount = parseInt(query.get('count'));
    const queryPage = parseInt(query.get('page'));
    // Initial index to start searching at
    const blockOrderStart = queryPage * queryCount - queryCount;
    const blockOrderEnd = blockOrderStart + queryCount;
    // Get all the block IDs, sort them by newest
    const allBlockIds = Object.keys(storageBlocks).sort().reverse().slice(blockOrderStart, blockOrderEnd);
    const finalBlocks = allBlockIds.map((id) => storageBlocks[id]);

    const blockData = {
      blockHeight: storageBlockHeight,
      blocks: finalBlocks,
    };

    return res(ctx.delay(50), ctx.status(200), ctx.json(blockData));
  }),

  // Get Current Block Height
  rest.get(`${BLOCK_HEIGHT_URL}`, (req, res, ctx) => {
    const { blockHeight } = getState();

    return res(ctx.delay(50), ctx.status(200), ctx.json(blockHeight));
  }),

  // Get Current Total Block Power
  rest.get(`${process.env.PUBLIC_URL}/blocks/totalPower`, (req, res, ctx) => {
    const { blocksTotalPower } = getState();

    return res(ctx.delay(50), ctx.status(200), ctx.json(blocksTotalPower));
  }),

  // Get specific block info based on its height
  rest.get(`${process.env.PUBLIC_URL}/blocks/blockInfo/:blockHeight`, (req, res, ctx) => {
    const { params } = req;
    const { blockHeight } = params;
    const { blocks } = getState();
    const targetBlock = blocks[blockHeight] || {};

    return res(ctx.delay(50), ctx.status(200), ctx.json(targetBlock));
  }),
];
