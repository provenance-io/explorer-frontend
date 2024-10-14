import { createApi, fetchBaseQuery /*retry*/ } from '@reduxjs/toolkit/query/react';
import { RootState } from 'redux/app/store';

/*
Created using:
https://codesandbox.io/s/github/reduxjs/redux-toolkit/tree/master/examples/query/react/kitchen-sink?from-embed=&file=/src/app/store.ts
*/

// Declaring PostProps here for any posts that need it
export interface PostProps {
  base64: string[];
  json: object;
}

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
  baseUrl: '',
  prepareHeaders: (headers, { getState }) => {
    // By default, if we have a token in the store, let's use that for authenticated requests
    // TODO: REMOVE THIS ONCE wcjs IS INTEGRATED
    const token = (getState() as RootState).app.authToken;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

/* If retried are desired, enable this line and replace baseQuery below */
// const baseQueryWithRetry = retry(baseQuery, { maxRetries: 6 });

/**
 * Create a base API to inject endpoints into elsewhere.
 * Components using this API should import from the injected site,
 * in order to get the appropriate types,
 * and to ensure that the file injecting the endpoints is loaded
 */
export const api = createApi({
  reducerPath: 'serviceApi',
  baseQuery,
  /**
   * Tag types must be defined in the original API definition
   * for any tags that would be provided by injected endpoints
   */
  // tagTypes: ['Time', 'Posts', 'Counter'],
  /**
   * This api has endpoints injected in adjacent files,
   * which is why no endpoints are shown below.
   */
  endpoints: () => ({}),
});
