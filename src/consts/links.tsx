import { Path } from './paths';

interface LinksProps {
  [key: string]: {
    url: string;
    title: string;
    subMenu?: {
      [key: string]: {
        url: string;
        title: string;
      };
    };
  };
};

export const Links: LinksProps = {
  dashboard: {
    url: Path.DASHBOARD_URL,
    title: 'Dashboard',
  },
  staking: {
    url: Path.STAKING_URL,
    title: 'Validators',
  },
  transfer: {
    url: Path.TRANSFER_URL,
    title: 'Transactions',
  },
  assets: {
    url: Path.ASSETS_URL,
    title: 'Assets',
  },
  gov: {
    url: Path.GOV_URL,
    title: 'Gov',
  },
  ibc: {
    url: Path.IBC_URL,
    title: 'IBC',
  },
  contracts: {
    url: Path.CONTRACTS_URL,
    title: 'Contracts',
  },
  // Dropdown menu
  network: {
    url: '',
    title: 'Network',
    subMenu: {
      versions: {
        url: Path.UPGRADES_URL,
        title: 'Upgrades',
      },
      params: {
        url: Path.PARAMS_URL,
        title: 'Chain Parameters',
      },
      gas: {
        url: Path.GAS_URL,
        title: 'Gas Statistics',
      },
      token_stats: {
        url: Path.TOKEN_STATS_URL,
        title: 'Token Statistics',
      },
    },
  },
};
