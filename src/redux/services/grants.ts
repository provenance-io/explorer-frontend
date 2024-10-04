import { GRANTS_AUTHZ_URL, GRANTS_FEEGRANT_URL } from '../../consts';
import qs from 'query-string';
import { api } from './serviceApi';

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

export const grantsApi = api.injectEndpoints({
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
      query: ({ grant, type, address, page = 1, count = 10 }) =>
        `${
          grant === 'authz' ? GRANTS_AUTHZ_URL : GRANTS_FEEGRANT_URL
        }/${address}/${type}?${qs.stringify({ page, count })}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetGrantsQuery } = grantsApi;
