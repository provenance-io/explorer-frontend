import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GRANTS_AUTHZ_URL, GRANTS_FEEGRANT_URL } from 'consts';

export interface AuthzProps {
  authorization: object;
  expiration: string; // ISO date string
  grantee: string;
  granter: string;
  type: string;
}

export interface FeeGrantProps {
  allowance: object;
  grantee: string;
  granter: string;
  type: string;
}

interface AuthzGrantee {
  pages: number;
  results: AuthzProps[];
  rollupTotals: {
    [key: string]: string;
  };
  total: number;
}

interface FeeGrantGrantee {
  pages: number;
  results: FeeGrantProps[];
  rollupTotals: {
    [key: string]: string;
  };
  total: number;
}

export const grantsApi = createApi({
  reducerPath: 'grantsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '',
  }),
  endpoints: (builder) => ({
    getGrants: builder.query<
      AuthzGrantee | FeeGrantGrantee,
      {
        grant: 'feegrant' | 'authz';
        type: 'grantee' | 'granter';
        address: string;
        page?: number;
        count?: number;
      }
    >({
      query: ({ grant, type, address, page = 1, count = 10 }) => {
        const searchParamsObj = new URLSearchParams();
        // Page and count are optional params
        searchParamsObj.append('page', `${page}`);
        searchParamsObj.append('count', `${count}`);
        // Base api url (without page or count)
        const urlObj = new URL(
          `${grant === 'authz' ? GRANTS_AUTHZ_URL : GRANTS_FEEGRANT_URL}/${address}/${type}`
        );
        // Append page/count to url as needed
        urlObj.search = searchParamsObj.toString();

        return urlObj.toString();
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetGrantsQuery } = grantsApi;
