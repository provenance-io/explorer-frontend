import { rest } from 'msw';
import { getState } from '../BackendExplorer/context';

// Handle getting block scroller info
export const search = [
  rest.get(`${process.env.PUBLIC_URL}/search`, (req, res, ctx) => {
    const { blocks, validators, txs } = getState();

    // const { url } = req;
    // const query = url.searchParams;
    // const queryTerm = parseInt(query.get('term'));

    // For dev, initially, I'm just going to fake a couple results no matter what the user searches for
    const blockKeys = Object.keys(blocks);
    const validatorKeys = Object.keys(validators);
    const txKeys = Object.keys(txs);
    const results = {
      items: {
        blocks: [blocks[blockKeys[0]], blocks[blockKeys[1]], blocks[blockKeys[2]]],
        validators: [validators[validatorKeys[0]], validators[validatorKeys[1]], validators[validatorKeys[2]]],
        txs: [txs[txKeys[0]], txs[txKeys[1]], txs[txKeys[2]], txs[txKeys[3]]],
      },
      total: 10,
    };

    return res(ctx.delay(1000), ctx.status(200), ctx.json(results));
  }),
];
