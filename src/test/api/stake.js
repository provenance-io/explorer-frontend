import { rest } from 'msw';
import { getState } from '../BackendExplorer/context';

// Handle getting block scroller info
export const stake = [
  rest.get(`${process.env.PUBLIC_URL}/stake/validatorsTop`, (req, res, ctx) => {
    const { validators, topValidators: topValidatorIds } = getState();
    // topValidators are stored as just an array of IDs, take those IDs and get the full objects to return
    const topValidators = topValidatorIds.map((id) => validators[id]);

    return res(ctx.delay(50), ctx.status(200), ctx.json(topValidators));
  }),

  rest.get(`${process.env.PUBLIC_URL}/stake/blockValidators/:blockHeight`, (req, res, ctx) => {
    const { params, url } = req;
    const query = url.searchParams;
    const size = parseInt(query.get('size'));
    const page = parseInt(query.get('page'));
    const { blockHeight } = params;
    const { blockValidators } = getState();
    const fullValidatorsSet = blockValidators[blockHeight];
    const finalValidatorsSet = {};
    if (fullValidatorsSet) {
      // Check the size we want to get back (typically 10) and page - return appropriate results
      const itemIndex = page * size;
      const sliceStart = itemIndex - size;
      const sliceEnd = sliceStart + size;
      finalValidatorsSet.items = fullValidatorsSet.items.slice(sliceStart, sliceEnd) || {};
      finalValidatorsSet.total = fullValidatorsSet.total;
    }

    return res(ctx.delay(50), ctx.status(200), ctx.json(finalValidatorsSet));
  }),

  rest.get(`${process.env.PUBLIC_URL}/stake/validator/:validatorId`, (req, res, ctx) => {
    const { params } = req;
    const { validatorId } = params;
    const { validators } = getState();
    const targetValidator = validators[validatorId] || {};

    return res(ctx.delay(50), ctx.status(200), ctx.json(targetValidator));
  }),
];
