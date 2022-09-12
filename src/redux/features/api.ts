import _axios, { Method } from 'axios';

type Request = {
  config?: object;
  data?: object;
  meta?: any;
  method?: Method;
  url: string;
};

export const axios = _axios.create({
  baseURL: window.location.hostname,
  timeout: 45000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const xhrSetToken = (value: string) =>
  (axios.defaults.headers.Authorization = `Bearer ${value}`);

function errorHandling(error: any) {
  if (error.response) {
    return error.response.data;
  }

  if (error.request) {
    console.error(`Unexpected request error ${error.request}`, error); // eslint-disable-line no-console
  }

  // eslint-disable-next-line no-console
  console.error(`Something happened setting up the request ${error.message}`, error);
  return null;
}

export const ajax = async ({ config, data, method = 'GET', url }: Request) => {
  try {
    const result = await axios(url, { ...config, data, method });

    return Promise.resolve({
      data: result.data,
      responseHeaders: { ...result.headers },
    });
  } catch (error) {
    console.error({ error });
    return Promise.reject(errorHandling(error));
  }
};
