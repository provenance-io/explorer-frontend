import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import qs from 'query-string';
import { RootState } from "redux/app/store";
import { 
  GOVERNANCE_ADDRESS_URL, 
  GOVERNANCE_PROPOSALS_URL,
  GOVERNANCE_VOTES_URL, 
} from 'consts';
import { ajax } from "../api";

interface AddressVotes {
  pages: number;
  results: {
    answer: {
      [key: string]: number;
    };
    blockHeight: number;
    proposalId: number;
    proposalStatus: string,
    proposalTitle: string,
    txHash: string,
    txTimestamp: string,
    voter: {
      address: string,
      moniker: string,
      validatorAddr: string
    };
  }[];
  rollupTotals: {
    [key: string]: {
      amount: string,
      denom: string
    };
  };
  total: number;
};

interface Proposal {
  header: {
    description: string;
    details: {
      [key: string]: string;
    };
    proposalId: number;
    proposer: {
      address: string;
      moniker: string;
      validatorAddr: string;
    };
    status: string;
    title: string;
    type: string;
  };
  timings: {
    deposit: {
      current: string;
      denom: string;
      initial: string;
      needed: string;
    };
    depositEndTime: string;
    submitTime: string;
    voting: {
      params: {
        passThreshold: string;
        quorumThreshold: string;
        totalEligibleAmount: {
          amount: string;
          denom: string;
        };
        vetoThreshold: string;
      };
      tally: {
        abstain: {
          amount: {
            amount: string;
            denom: string;
          };
          count: number;
        };
        no: {
          amount: {
            amount: string;
            denom: string;
          };
          count: number;
        };
        noWithVeto: {
          amount: {
            amount: string;
            denom: string;
          };
          count: number;
        };
        total: {
          amount: {
            amount: string;
            denom: string;
          };
          count: number;
        };
        yes: {
          amount: {
            amount: string;
            denom: string;
          };
          count: number;
        };
      };
    };
    votingTime: {
      endTime: string;
      startTime: string;
    };
  };
};

interface ProposalDeposits {
  pages: number;
  results: {
    amount: {
      amount: string;
      denom: string;
    };
    blockHeight: number;
    txHash: string;
    txTimestamp: string;
    type: string;
    voter: {
      address: string;
      moniker: string;
      validatorAddr: string;
    };
  }[];
  rollupTotals: {
    [key: string]: {
      amount: string;
      denom: string;
    };
  };
  total: number;
};

export interface ProposalVotes {
  pages: number;
  results: {
    answer: {
      [key: string]: number;
    };
    blockHeight: number;
    proposalId: number;
    proposalStatus: string;
    proposalTitle: string;
    txHash: string;
    txTimestamp: string;
    voter: {
      address: string;
      moniker: string;
      validatorAddr: string;
    };
  }[];
  total: number;
};

interface ProposalAll {
  pages: number;
  results: Proposal[];
  rollupTotals: {
    [key: string]: {
      amount: string;
      denom: string;
    };
  };
  total: number;
};

interface GovernanceState {
  // addressVotes
  addressVotes: AddressVotes["results"];
  addressVotesLoading: boolean;
  addressVotesPages: AddressVotes["pages"];
  // proposal
  proposal: Proposal;
  proposalLoading: boolean;
  tally: Proposal["timings"]["voting"]["tally"];
  params: Proposal["timings"]["voting"]["params"];
  // proposalDeposits
  proposalDeposits: ProposalDeposits["results"]
  proposalDepositsLoading: boolean;
  proposalDepositsPages: ProposalDeposits["pages"];
  // proposals
  proposals: ProposalAll["results"];
  proposalsLoading: boolean;
  proposalsPages: ProposalAll["pages"];
  // proposalVotes
  proposalVotes: [],
  proposalVotesLoading: boolean;
  proposalVotesPages: number;
  proposalVotesTotal: number;
};

export const initialState: GovernanceState = {
  // addressVotes
  addressVotes: [],
  addressVotesLoading: false,
  addressVotesPages: 0,
  // proposal
  proposal: {
    header: {
      description: "",
      details: {},
      proposalId: 0,
      proposer: {
        address: "",
        moniker: "",
        validatorAddr: "",
      },
      status: "",
      title: "",
      type: "",
    },
    timings: {
      deposit: {
        current: "",
        denom: "",
        initial: "",
        needed: "",
      },
      depositEndTime: "",
      submitTime: "",
      votingTime: {
        endTime: "",
        startTime: "",
      },
      voting: {
        params: {
          passThreshold: "",
          quorumThreshold: "",
          totalEligibleAmount: {
            amount: "",
            denom: "",
          },
          vetoThreshold: "",
        },
        tally: {
          abstain: {
            amount: {
              amount: "",
              denom: "",
            },
            count: 0,
          },
          no: {
            amount: {
              amount: "",
              denom: "",
            },
            count: 0,
          },
          noWithVeto: {
            amount: {
              amount: "",
              denom: "",
            },
            count: 0,
          },
          total: {
            amount: {
              amount: "",
              denom: "",
            },
            count: 0,
          },
          yes: {
            amount: {
              amount: "",
              denom: "",
            },
            count: 0,
          },
        },
      }
    },
  },
  tally: {
    abstain: {
      amount: {
        amount: "",
        denom: "",
      },
      count: 0,
    },
    no: {
      amount: {
        amount: "",
        denom: "",
      },
      count: 0,
    },
    noWithVeto: {
      amount: {
        amount: "",
        denom: "",
      },
      count: 0,
    },
    total: {
      amount: {
        amount: "",
        denom: "",
      },
      count: 0,
    },
    yes: {
      amount: {
        amount: "",
        denom: "",
      },
      count: 0,
    },
  },
  params: {
    passThreshold: "",
    quorumThreshold: "",
    totalEligibleAmount: {
      amount: "",
      denom: "",
    },
    vetoThreshold: "",
  },
  proposalLoading: false,
  // proposalDeposits
  proposalDeposits: [],
  proposalDepositsLoading: false,
  proposalDepositsPages: 0,
  // proposals
  proposals: [],
  proposalsLoading: false,
  proposalsPages: 0,
  // proposalVotes
  proposalVotes: [],
  proposalVotesLoading: false,
  proposalVotesPages: 0,
  proposalVotesTotal: 0,
};

/* -----------------
** TYPES
-------------------*/
const NS = 'GOV';
export const GET_PROPOSAL = `${NS}::GET_PROPOSAL`;
export const GET_PROPOSAL_DEPOSITS = `${NS}::GET_PROPOSAL_DEPOSITS`;
export const GET_PROPOSALS = `${NS}::GET_PROPOSALS`;
export const GET_VOTES_BY_ADDRESS = `${NS}::GET_VOTES_BY_ADDRESS`;
export const GET_VOTES_BY_PROPOSAL = `${NS}::GET_VOTES_BY_PROPOSAL`;

/* -----------------
** ACTIONS
-------------------*/
export const getProposal = createAsyncThunk(
  GET_PROPOSAL,
  (proposalId: string) =>
    ajax({
      url: `${GOVERNANCE_PROPOSALS_URL}/${proposalId}`,
    })
);

export const getProposalDeposits = createAsyncThunk(
  GET_PROPOSAL_DEPOSITS,
  ({
    proposalId,
    count = 10,
    page = 1
  } : {
    proposalId: string;
    count: number;
    page: number;
  }) => 
    ajax({
      url: `${GOVERNANCE_PROPOSALS_URL}/${proposalId}/deposits?${qs.stringify({ count, page })}`,
    })
);

export const getAllProposals = createAsyncThunk(
  GET_PROPOSALS,
  ({
    count = 10,
    page = 1
  } : {
    count: number;
    page: number;
  }) => 
    ajax({
      url: `${GOVERNANCE_PROPOSALS_URL}/all?${qs.stringify({ count, page })}`,
    })
);

export const getVotesByAddress = createAsyncThunk(
  GET_VOTES_BY_ADDRESS,
  ({
    address,
    count = 10,
    page = 1
  } : {
    address: string;
    count: number;
    page: number;
  }) => 
    ajax({
      url: `${GOVERNANCE_ADDRESS_URL}/${address}/votes?${qs.stringify({ count, page })}`,
    })
);

export const getVotesByProposal = createAsyncThunk(
  GET_VOTES_BY_PROPOSAL,
  ({
    proposalId,
    count = 10,
    page = 1
  } : {
    proposalId: string;
    count: number;
    page: number;
  }) =>
    ajax({
      url: `${GOVERNANCE_VOTES_URL}/${proposalId}/votes?${qs.stringify({ count, page })}`,
    })
);

export const governanceActions = {
  getProposal,
  getProposalDeposits,
  getAllProposals,
  getVotesByAddress,
  getVotesByProposal,
};
/* -----------------
** SLICE
-------------------*/
export const governanceSlice = createSlice({
  name: 'governance',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    /* -----------------
    GET_PROPOSAL
    -------------------*/
    .addCase(getProposal.pending, (state) => {
      state.proposalLoading = true;
    })
    .addCase(getProposal.fulfilled, (state, { payload }) => {
      state.proposalLoading = false;
      state.proposal = payload.data;
      state.tally = payload.data.timings.voting.tally;
      state.params = payload.data.timings.voting.params;
    })
    .addCase(getProposal.rejected, (state) => {
      state.proposalLoading = false;
    })
    /* -----------------
    GET_PROPOSAL_DEPOSITS
    -------------------*/
    .addCase(getProposalDeposits.pending, (state) => {
      state.proposalDepositsLoading = true;
    })
    .addCase(getProposalDeposits.fulfilled, (state, { payload }) => {
      state.proposalDepositsLoading = false;
      state.proposalDeposits = payload.data.results;
      state.proposalDepositsPages = payload.data.pages;
    })
    .addCase(getProposalDeposits.rejected, (state) => {
      state.proposalDepositsLoading = false;
    })
    /* -----------------
    GET_PROPOSALS
    -------------------*/
    .addCase(getAllProposals.pending, (state) => {
      state.proposalsLoading = true;
    })
    .addCase(getAllProposals.fulfilled, (state, { payload }) => {
      state.proposalsLoading = false;
      state.proposals = payload.data.results;
      state.proposalsPages = payload.data.pages;
    })
    .addCase(getAllProposals.rejected, (state) => {
      state.proposalsLoading = false;
    })
    /* -----------------
    GET_VOTES_BY_ADDRESS
    -------------------*/
    .addCase(getVotesByAddress.pending, (state) => {
      state.addressVotesLoading = true;
    })
    .addCase(getVotesByAddress.fulfilled, (state, { payload }) => {
      state.addressVotesLoading = false;
      state.addressVotes = payload.data.results;
      state.addressVotesPages = payload.data.pages;
    })
    .addCase(getVotesByAddress.rejected, (state) => {
      state.addressVotesLoading = false;
    })
    /* -----------------
    GET_VOTES_BY_PROPOSAL
    -------------------*/
    .addCase(getVotesByProposal.pending, (state) => {
      state.proposalVotesLoading = true;
    })
    .addCase(getVotesByProposal.fulfilled, (state, { payload }) => {
      state.proposalVotesLoading = false;
      state.proposalVotes = payload.data.results;
      state.proposalVotesPages = payload.data.pages;
      state.proposalVotesTotal = payload.data.total;
    })
    .addCase(getVotesByProposal.rejected, (state) => {
      state.proposalVotesLoading = false;
    });
  },
});

/* -----------------
SELECTORS
-------------------*/
export const selectGovernance = (state: RootState) => state.governance;

export default governanceSlice.reducer;