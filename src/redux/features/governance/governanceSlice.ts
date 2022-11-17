import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import qs from 'query-string';
import { RootState } from 'redux/app/store';
import {
  GOVERNANCE_ADDRESS_URL,
  GOVERNANCE_PROPOSALS_URL,
  GOVERNANCE_VOTES_URL,
  GOVERNANCE_SUBMIT_PROPOSAL_URL,
  GOVERNANCE_PROPOSAL_TYPES_URL,
  GOVERNANCE_SUBMIT_VOTES_URL,
} from 'consts';
import { ajax } from '../api';

interface AddressVotes {
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
  rollupTotals: {
    [key: string]: {
      amount: string;
      denom: string;
    };
  };
  total: number;
}

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
}

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
}

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
}

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
}

export interface SubmitProposalProps {
  content: string;
  description: string;
  initialDeposit: {
    amount: string;
    denom: string;
  }[];
  submitter: string;
  title: string;
  file?: File;
}

export interface SubmitVotesProps {
  proposalId: number;
  voter: string;
  votes: {
    option: string;
    weight: number;
  }[];
}

export type TextProposal = {};

export type ParameterChangeProposal = {
  changes: {
    subspace: string;
    key: string;
    value: string;
  }[];
};

type SoftwareUpgradeProposal = {
  name: string;
  height: number;
  info: string;
};

type CancelUpgradeProposal = {};

type StoreCodeProposal = {
  runAs: string;
  accessConfig: {
    type: string;
    address: string | null;
  };
};

type InstantiateContractProposal = {
  runAs: string;
  admin: string;
  codeId: number;
  label: string;
  msg: string;
  funds: {
    amount: string;
    denom: string;
  }[];
};

export interface ProposalTypes {
  TEXT: TextProposal;
  PARAMETER_CHANGE: ParameterChangeProposal;
  SOFTWARE_UPGRADE: SoftwareUpgradeProposal;
  CANCEL_UPGRADE: CancelUpgradeProposal;
  STORE_CODE: StoreCodeProposal;
  INSTANTIATE_CONTRACT: InstantiateContractProposal;
}

interface GovernanceState {
  // addressVotes
  addressVotes: AddressVotes['results'];
  addressVotesLoading: boolean;
  addressVotesPages: AddressVotes['pages'];
  // proposal
  proposal: Proposal;
  proposalLoading: boolean;
  tally: Proposal['timings']['voting']['tally'];
  params: Proposal['timings']['voting']['params'];
  // proposalDeposits
  proposalDeposits: ProposalDeposits['results'];
  proposalDepositsLoading: boolean;
  proposalDepositsPages: ProposalDeposits['pages'];
  // proposals
  proposals: ProposalAll['results'];
  proposalsLoading: boolean;
  proposalsPages: ProposalAll['pages'];
  // proposalVotes
  proposalVotes: [];
  proposalVotesLoading: boolean;
  proposalVotesPages: number;
  proposalVotesTotal: number;
  // proposalTypes
  proposalTypes: ProposalTypes;
  proposalTypesLoading: boolean;
}

export const initialState: GovernanceState = {
  // addressVotes
  addressVotes: [],
  addressVotesLoading: false,
  addressVotesPages: 0,
  // proposal
  proposal: {
    header: {
      description: '',
      details: {},
      proposalId: 0,
      proposer: {
        address: '',
        moniker: '',
        validatorAddr: '',
      },
      status: '',
      title: '',
      type: '',
    },
    timings: {
      deposit: {
        current: '',
        denom: '',
        initial: '',
        needed: '',
      },
      depositEndTime: '',
      submitTime: '',
      votingTime: {
        endTime: '',
        startTime: '',
      },
      voting: {
        params: {
          passThreshold: '',
          quorumThreshold: '',
          totalEligibleAmount: {
            amount: '',
            denom: '',
          },
          vetoThreshold: '',
        },
        tally: {
          abstain: {
            amount: {
              amount: '',
              denom: '',
            },
            count: 0,
          },
          no: {
            amount: {
              amount: '',
              denom: '',
            },
            count: 0,
          },
          noWithVeto: {
            amount: {
              amount: '',
              denom: '',
            },
            count: 0,
          },
          total: {
            amount: {
              amount: '',
              denom: '',
            },
            count: 0,
          },
          yes: {
            amount: {
              amount: '',
              denom: '',
            },
            count: 0,
          },
        },
      },
    },
  },
  tally: {
    abstain: {
      amount: {
        amount: '',
        denom: '',
      },
      count: 0,
    },
    no: {
      amount: {
        amount: '',
        denom: '',
      },
      count: 0,
    },
    noWithVeto: {
      amount: {
        amount: '',
        denom: '',
      },
      count: 0,
    },
    total: {
      amount: {
        amount: '',
        denom: '',
      },
      count: 0,
    },
    yes: {
      amount: {
        amount: '',
        denom: '',
      },
      count: 0,
    },
  },
  params: {
    passThreshold: '',
    quorumThreshold: '',
    totalEligibleAmount: {
      amount: '',
      denom: '',
    },
    vetoThreshold: '',
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
  // proposalTypes
  proposalTypes: {
    TEXT: {},
    PARAMETER_CHANGE: {
      changes: [],
    },
    SOFTWARE_UPGRADE: {
      name: '',
      height: 0,
      info: '',
    },
    CANCEL_UPGRADE: {},
    STORE_CODE: {
      runAs: '',
      accessConfig: {
        type: '',
        address: '',
      },
    },
    INSTANTIATE_CONTRACT: {
      runAs: '',
      admin: '',
      codeId: 0,
      label: '',
      msg: '',
      funds: [],
    },
  },
  proposalTypesLoading: false,
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
export const GET_PROPOSAL_TYPES = `${NS}::GET_PROPOSAL_TYPES`;

/* -----------------
** ACTIONS
-------------------*/
export const getProposal = createAsyncThunk(GET_PROPOSAL, (proposalId: string) =>
  ajax({
    url: `${GOVERNANCE_PROPOSALS_URL}/${proposalId}`,
  })
);

export const getProposalDeposits = createAsyncThunk(
  GET_PROPOSAL_DEPOSITS,
  ({ proposalId, count = 10, page = 1 }: { proposalId: string; count: number; page: number }) =>
    ajax({
      url: `${GOVERNANCE_PROPOSALS_URL}/${proposalId}/deposits?${qs.stringify({ count, page })}`,
    })
);

export const getAllProposals = createAsyncThunk(
  GET_PROPOSALS,
  ({ count = 10, page = 1 }: { count: number; page: number }) =>
    ajax({
      url: `${GOVERNANCE_PROPOSALS_URL}/all?${qs.stringify({ count, page })}`,
    })
);

export const getVotesByAddress = createAsyncThunk(
  GET_VOTES_BY_ADDRESS,
  ({ address, count = 10, page = 1 }: { address: string; count: number; page: number }) =>
    ajax({
      url: `${GOVERNANCE_ADDRESS_URL}/${address}/votes?${qs.stringify({ count, page })}`,
    })
);

export const getVotesByProposal = createAsyncThunk(
  GET_VOTES_BY_PROPOSAL,
  ({ proposalId, count = 10, page = 1 }: { proposalId: string; count: number; page: number }) =>
    ajax({
      url: `${GOVERNANCE_VOTES_URL}/${proposalId}/votes?${qs.stringify({ count, page })}`,
    })
);

export const getProposalTypes = createAsyncThunk(GET_PROPOSAL_TYPES, () =>
  ajax({
    url: `${GOVERNANCE_PROPOSAL_TYPES_URL}/types/supported`,
  })
);

export const submitVotes = (data: SubmitVotesProps) =>
  ajax({
    url: `${GOVERNANCE_SUBMIT_VOTES_URL}`,
    method: 'POST',
    data,
  });

export const submitProposal = ({
  type,
  data,
  file,
  token,
}: {
  type: string;
  data: SubmitProposalProps;
  file?: File;
  token: string;
}) => {
  // Create a new FormData object
  const formData = new FormData();
  // Blob the data to submit, as type application/json
  formData.append('request', new Blob([JSON.stringify(data)], { type: 'application/json' }));
  // Note this currently only supports wasm file uploads
  if (file && type === 'STORE_CODE') {
    formData.append('wasmFile', file);
  }
  return fetch(`${GOVERNANCE_SUBMIT_PROPOSAL_URL}${type}`, {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((json) => ({ data: json }));
};

export const governanceActions = {
  getProposal,
  getProposalDeposits,
  getAllProposals,
  getVotesByAddress,
  getVotesByProposal,
  getProposalTypes,
};

export const noDispatchActions = {
  submitProposal,
  submitVotes,
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
