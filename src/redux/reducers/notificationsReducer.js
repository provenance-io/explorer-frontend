import { handleActions } from 'redux-actions';
import { SUCCESS, REQUEST, FAILURE } from '../actions/xhrActions';
import {
  GET_PROPOSAL_NOTIFICATIONS,
  GET_UPGRADE_NOTIFICATIONS,
  GET_ANNOUNCEMENT_NOTIFICATIONS,
  GET_ANNOUNCEMENT,
  GET_ANNOUNCEMENTS_ALL,
} from '../actions/notificationsActions';

export const initialState = {
  // Proposals
  openProposals: [],
  openProposalsLoading: false,
  // Upgrades
  scheduledUpgrades: [],
  scheduledUpgradesLoading: false,
  // Announcements
  openAnnouncements: [],
  openAnnouncementsLoading: false,
  // Announcement
  announcementInfo: {},
  announcementInfoLoading: false,
  // All Announcements
  allAnnouncementsLoading: false,
  allAnnouncements: [],
  allAnnouncementsPages: 0,
  allAnnouncementsTotal: 0,
};

const reducer = handleActions(
  {
    /* -----------------
    GET_PROPOSAL_NOTIFICATIONS
    -------------------*/
    [`${GET_PROPOSAL_NOTIFICATIONS}_${REQUEST}`](state) {
      return {
        ...state,
        openProposalsLoading: true,
      };
    },

    [`${GET_PROPOSAL_NOTIFICATIONS}_${SUCCESS}`](state, { payload }) {
      const { nonUpgradeOpenList, upgradeOpenList } = payload;
      const isUpgradeList = upgradeOpenList.map(item => {
        const addedItem = { isUpgrade: true, ...item };
        return addedItem;
      });
      return {
        ...state,
        openProposals: nonUpgradeOpenList.concat(isUpgradeList).reverse(),
        openProposalsLoading: false,
      };
    },

    [`${GET_PROPOSAL_NOTIFICATIONS}_${FAILURE}`](state) {
      return {
        ...state,
        openProposalsLoading: false,
      };
    },
    /* -----------------
    GET_UPGRADE_NOTIFICATIONS
    -------------------*/
    [`${GET_UPGRADE_NOTIFICATIONS}_${REQUEST}`](state) {
      return {
        ...state,
        scheduledUpgradesLoading: true,
      };
    },

    [`${GET_UPGRADE_NOTIFICATIONS}_${SUCCESS}`](state, { payload }) {
      return {
        ...state,
        scheduledUpgrades: payload.reverse().map(upgrade => {
          const upgradeInfo = {
            id: upgrade.upgradeVersion,
            timestamp: upgrade.approximateTime,
            title: upgrade.upgradeName,
            body: upgrade.upgradePlan,
          };
          return upgradeInfo;
        }),
        scheduledUpgradesLoading: false,
      };
    },

    [`${GET_UPGRADE_NOTIFICATIONS}_${FAILURE}`](state) {
      return {
        ...state,
        scheduledUpgradesLoading: false,
      };
    },
    /* -----------------
    GET_ANNOUNCEMENT_NOTIFICATIONS
    -------------------*/
    [`${GET_ANNOUNCEMENT_NOTIFICATIONS}_${REQUEST}`](state) {
      return {
        ...state,
        openAnnouncementsLoading: true,
      };
    },

    [`${GET_ANNOUNCEMENT_NOTIFICATIONS}_${SUCCESS}`](state, { payload }) {
      const { results } = payload;
      return {
        ...state,
        openAnnouncements: results,
        openAnnouncementsLoading: false,
      };
    },

    [`${GET_ANNOUNCEMENT_NOTIFICATIONS}_${FAILURE}`](state) {
      return {
        ...state,
        openAnnouncementsLoading: false,
      };
    },
    /* -----------------
    GET_ANNOUNCEMENT
    -------------------*/
    [`${GET_ANNOUNCEMENT}_${REQUEST}`](state) {
      return {
        ...state,
        announcementInfoLoading: true,
      };
    },

    [`${GET_ANNOUNCEMENT}_${SUCCESS}`](state, { payload: announcementInfo }) {
      return {
        ...state,
        announcementInfo,
        announcementInfoLoading: false,
      };
    },

    [`${GET_ANNOUNCEMENT}_${FAILURE}`](state) {
      return {
        ...state,
        announcementInfoLoading: false,
      };
    },
    /* -----------------
    GET_ANNOUNCEMENTS_ALL
    -------------------*/
    [`${GET_ANNOUNCEMENTS_ALL}_${REQUEST}`](state) {
      return {
        ...state,
        allAnnouncementsLoading: true,
      };
    },

    [`${GET_ANNOUNCEMENTS_ALL}_${SUCCESS}`](state, { payload }) {
      const { pages, total, results } = payload;
      return {
        ...state,
        allAnnouncements: results,
        allAnnouncementsPages: pages,
        allAnnouncementsTotal: total,
        allAnnouncementsLoading: false,
      };
    },

    [`${GET_ANNOUNCEMENTS_ALL}_${FAILURE}`](state) {
      return {
        ...state,
        allAnnouncementsLoading: false,
      };
    },
  },
  initialState
);

export default reducer;
