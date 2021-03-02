import { createAction } from 'redux-actions';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';

const xhrRequest = async (action, dispatch, url, body = null, customConfig = null, meta = null) => {
  dispatch(createAction(`${action}_${REQUEST}`)());

  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig?.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await window.fetch(url, config);
    const data = await response.json();
    if (response.ok) {
      const responseHeaders = [...response.headers.entries()].reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
      dispatch(createAction(`${action}_${SUCCESS}`, null, () => ({ responseHeaders, ...meta, ...body }))(data));
      return Promise.resolve(data);
    } else {
      return Promise.reject(data.message);
    }
  } catch (error) {
    if (error.message) {
      dispatch(createAction(`${action}_${FAILURE}`)(error.message));
      return Promise.reject(error.message);
    }

    if (error.request) {
      console.error(`Unexpected request error ${error.request}`, error); // eslint-disable-line no-console
    }

    // eslint-disable-next-line no-console
    console.error(`Something happened setting up the request ${error.message}`, error);
    return Promise.reject(error.message);
  }
};

export default xhrRequest;

export const ajaxGet = async (action, dispatch, url, config = null, meta = null) =>
  xhrRequest(action, dispatch, url, null, config, meta);

export const ajaxPost = async (action, dispatch, url, data, config = null, meta = null) =>
  xhrRequest(action, dispatch, url, data, config, meta);
