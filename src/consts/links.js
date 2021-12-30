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
  stats: {
    url: Path.VERSIONS_URL,
    title: 'Stats',
    subMenu: {
      versions: {
        url: Path.VERSIONS_URL,
        title: 'Versions',
      },
    },
  },
};
