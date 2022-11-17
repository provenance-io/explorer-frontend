let token: string;

type Request = {
  config?: {
    headers?: {
      [key: string]: string;
    };
  };
  data?: object;
  meta?: any;
  method?: RequestInit['method'];
  url: string;
};

export const xhrSetToken = (value: string) => {
  token = value;
};

function errorHandling(error: any) {
  if (error.statusText) {
    return console.error(`Error: ${error.statusText}`, error);
  }

  // eslint-disable-next-line no-console
  console.error(`Something happened setting up the request to ${error.url}`, error);
  return null;
}

export const ajax = async ({ config, data, method = 'GET', url }: Request) => {
  try {
    let headers: HeadersInit = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    if (config?.headers) {
      headers = { ...headers, ...config.headers };
    }

    const result = await fetch(url, {
      ...config,
      body: JSON.stringify(data),
      headers,
      method,
    });

    if (!result.ok) {
      return Promise.reject(errorHandling(result));
    }

    const json = await result.json();

    return Promise.resolve({
      data: json,
      responseHeaders: { ...result.headers },
    });
  } catch (error) {
    console.error({ error });
    return Promise.reject(errorHandling(error));
  }
};
