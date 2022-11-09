import { ACCOUNT_INFO_URL, ACCOUNT_INFO_V3_URL } from 'consts';
import { api } from './serviceApi';

export interface VestingInfo {
  dataAsOfDate: string;
  endTime: string;
  originalVestingList: {
    amount: string;
    denom: string;
  }[];
  periodicVestingList: {
    coins: {
      amount: string;
      denom: string;
    }[];
    isVested: boolean;
    length: number;
    vestingDate: string;
  }[];
  startTime: string;
}

interface DenomProps {
  amount: string;
  denom: string;
  pricePerToken: {
    amount: string;
    denom: string;
  };
  totalBalancePrice: {
    amount: string;
    denom: string;
  };
}

export interface AccountDenomBalance {
  total: DenomProps;
  spendable: DenomProps;
  locked: DenomProps;
}

export interface AccountUnbondings {
  records: {
    amount: {
      amount: string;
      denom: string;
    };
    block: number;
    delegatorAddr: string;
    endTime: {
      millis: string;
    };
    initialBal: {
      amount: string;
      denom: string;
    };
    shares: string;
    validatorDstAddr: string;
    validatorSrcAddr: string;
  }[];
  rollupTotals: {
    unbondingTotal: {
      amount: string;
      denom: string;
    };
  };
}

export interface AccountDelegations {
  pages: number;
  results: {
    amount: {
      amount: string;
      denom: string;
    };
    block: number;
    delegatorAddr: string;
    endTime: string;
    initialBal: {
      amount: string;
      denom: string;
    };
    shares: string;
    validatorDstAddr: string;
    validatorSrcAddr: string;
  }[];
  total: number;
  rollupTotals: {
    bondedTotal: {
      amount: string;
      denom: string;
    };
  };
}

export interface AccountRedelegations {
  records: {
    amount: {
      amount: string;
      denom: string;
    };
    block: number;
    delegatorAddr: string;
    endTime: {
      millis: string;
    };
    initialBal: {
      amount: string;
      denom: string;
    };
    shares: string;
    validatorDstAddr: string;
    validatorSrcAddr: string;
  }[];
  rollupTotals: {
    redelegationTotal: {
      amount: string;
      denom: string;
    };
  };
}

export interface AccountRewards {
  rewards: {
    reward: {
      amount: string;
      denom: string;
      pricePerToken: {
        amount: string;
        denom: string;
      };
      totalBalancePrice: {
        amount: string;
        denom: string;
      };
    }[];
    validatorAddress: string;
  }[];
  total: {
    amount: string;
    denom: string;
    pricePerToken: {
      amount: string;
      denom: string;
    };
    totalBalancePrice: {
      amount: string;
      denom: string;
    };
  }[];
}

export interface HashDataProps {
  assets: AccountDenomBalance;
  delegations: AccountDelegations;
  redelegations: AccountRedelegations;
  unbonding: AccountUnbondings;
  rewards: AccountRewards;
}

export const accountsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Returns balance for the queried denom
    getVestingData: builder.query<
      VestingInfo,
      {
        address: string;
      }
    >({
      query: ({ address }) => `${ACCOUNT_INFO_V3_URL}/${address}/vesting`,
    }),
    // Returns balance for the queried denom
    getDenomAmount: builder.query<
      AccountDenomBalance,
      {
        address: string;
        denom: string;
      }
    >({
      query: ({ address, denom }) => `${ACCOUNT_INFO_V3_URL}/${address}/balances/${denom}`,
    }),
    // Returns balance for the blockchain utility token
    getUtilityTokenAmount: builder.query<
      AccountDenomBalance,
      {
        address: string;
        denom: string;
      }
    >({
      query: ({ address }) => `${ACCOUNT_INFO_V3_URL}/${address}/balances/utility_token`,
    }),
    // Returns unbonding balance for account
    getUnbondings: builder.query<
      AccountUnbondings,
      {
        address: string;
      }
    >({
      query: ({ address }) => `${ACCOUNT_INFO_URL}/${address}/unbonding`,
    }),
    // Returns delegation balance for account
    getDelegations: builder.query<
      AccountDelegations,
      {
        address: string;
      }
    >({
      query: ({ address }) => `${ACCOUNT_INFO_URL}/${address}/delegations`,
    }),
    // Returns redelegation balance for account
    getRedelegations: builder.query<
      AccountRedelegations,
      {
        address: string;
      }
    >({
      query: ({ address }) => `${ACCOUNT_INFO_URL}/${address}/redelegations`,
    }),
    // Returns rewards balance for account
    getRewards: builder.query<
      AccountRewards,
      {
        address: string;
      }
    >({
      query: ({ address }) => `${ACCOUNT_INFO_URL}/${address}/rewards`,
    }),
    // Returns object of all utility token balances (available, delegated,
    // redelegated, unbonding, and rewards balances). This runs five
    // queries on 5 different endpoints based on the address provided
    getHashData: builder.query<
      HashDataProps,
      {
        address: string;
      }
    >({
      async queryFn({ address }, _queryApi, _extraOptions, baseQuery) {
        const { data: hashData, error: hashDataError } = await baseQuery(
          `${ACCOUNT_INFO_V3_URL}/${address}/balances/utility_token`
        );
        const { data: delegationsData, error: delegationsError } = await baseQuery(
          `${ACCOUNT_INFO_URL}/${address}/delegations`
        );
        const { data: redelegationsData, error: redelegationsError } = await baseQuery(
          `${ACCOUNT_INFO_URL}/${address}/redelegations`
        );
        const { data: unbondingsData, error: unbondingsError } = await baseQuery(
          `${ACCOUNT_INFO_URL}/${address}/unbonding`
        );
        const { data: rewardsData, error: rewardsError } = await baseQuery(
          `${ACCOUNT_INFO_URL}/${address}/rewards`
        );
        const hashAccountData = {
          assets: { ...(hashData as AccountDenomBalance) },
          delegations: { ...(delegationsData as AccountDelegations) },
          redelegations: { ...(redelegationsData as AccountRedelegations) },
          unbonding: { ...(unbondingsData as AccountUnbondings) },
          rewards: { ...(rewardsData as AccountRewards) },
        };
        return !hashDataError &&
          !delegationsError &&
          !redelegationsError &&
          !unbondingsError &&
          !rewardsError
          ? { data: hashAccountData }
          : {
              error: {
                status: 500,
                statusText: 'Internal Server Error',
                data: {
                  delegationsError,
                  hashDataError,
                  redelegationsError,
                  unbondingsError,
                  rewardsError,
                },
              },
            };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetVestingDataQuery,
  useGetDenomAmountQuery,
  useGetUtilityTokenAmountQuery,
  useGetUnbondingsQuery,
  useGetDelegationsQuery,
  useGetRedelegationsQuery,
  useGetRewardsQuery,
  useGetHashDataQuery,
} = accountsApi;
