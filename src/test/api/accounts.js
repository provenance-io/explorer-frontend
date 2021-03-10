import { rest } from 'msw';
import { ACCOUNT_INFO_URL } from 'consts';
import { getState } from '../BackendExplorer/context';

// Handle getting data
export const accounts = [
  rest.get(`${ACCOUNT_INFO_URL}/:address`, (req, res, ctx) => {
    const {
      params: { address },
    } = req;
    const { addresses } = getState();
    const data = addresses.find((a) => a.address === address);
    return res(ctx.delay(50), ctx.status(200), ctx.json(data));
  }),
];
