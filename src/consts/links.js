import { Path } from './paths';

export const Links = {
  dashboard: {
    url: Path.DASHBOARD_URL,
    title: 'Dashboard',
  },
  staking: {
    url: Path.STAKING_URL,
    title: 'Staking',
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
        title: 'Params',
      },
      token_stats: {
        url: Path.TOKEN_STATS_URL,
        title: 'Token Statistics',
      },
    },
  },
};
