import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "redux/app/store";
import { 
  PROPOSAL_NOTIFICATIONS_URL,
  UPGRADE_NOTIFICATIONS_URL,
  ANNOUNCEMENT_NOTIFICATIONS_URL,
  ANNOUNCEMENT_URL,
} from 'consts';
import { ajax } from "../api";

interface Notification {
  body: string;
  id: number;
  timestamp: string;
  title: string;
};

interface UpgradeNotification {
  approximateTime: string;
  proposalId: number;
  upgradeHeight: number;
  upgradeName: string;
  upgradePlan: string;
  upgradeVersion: string;
}

interface NotificationState {
  // Proposals
  openProposals: Notification[];
  openProposalsLoading: boolean;
  // Upgrades
  scheduledUpgrades: Notification[];
  scheduledUpgradesLoading: boolean;
  // Announcements
  openAnnouncements: Notification[];
  openAnnouncementsLoading: boolean;
  // Announcement
  announcementInfo: Notification;
  announcementInfoLoading: boolean;
};

export const initialState: NotificationState = {
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
  announcementInfo: {
    body: "",
    id: 0,
    timestamp: "",
    title: "",
  },
  announcementInfoLoading: false,
};

/* -----------------
** TYPES
-------------------*/
export const GET_PROPOSAL_NOTIFICATIONS = 'GET_PROPOSAL_NOTIFICATIONS';
export const GET_UPGRADE_NOTIFICATIONS = 'GET_UPGRADE_NOTIFICATIONS';
export const GET_ANNOUNCEMENT_NOTIFICATIONS = 'GET_ANNOUNCEMENT_NOTIFICATIONS';
export const GET_ANNOUNCEMENT_INFO = 'GET_ANNOUNCEMENT_INFO';

/* -----------------
** ACTIONS
-------------------*/
export const getProposalNotifications = createAsyncThunk(
  GET_PROPOSAL_NOTIFICATIONS,
  () => 
    ajax({
      url: PROPOSAL_NOTIFICATIONS_URL,
    })
);

export const getUpgradeNotifications = createAsyncThunk(
  GET_UPGRADE_NOTIFICATIONS,
  () => 
    ajax({
      url: UPGRADE_NOTIFICATIONS_URL,
    })
);

export const getAnnouncementNotifications = createAsyncThunk(
  GET_ANNOUNCEMENT_NOTIFICATIONS,
  ({
    fromDate = '',
  } : {
    fromDate: string,
  }) => 
    ajax({
      url: `${ANNOUNCEMENT_NOTIFICATIONS_URL}${fromDate ? `?fromDate=${fromDate}` : ''}`,
    })
);

export const getAnnouncementInfo = createAsyncThunk(
  GET_ANNOUNCEMENT_INFO,
  ({
    id
  } : {
    id: string,
  }) => 
    ajax({
      url: `${ANNOUNCEMENT_URL}/${id}`,
    })
);
export const notificationActions = {
  getProposalNotifications,
  getUpgradeNotifications,
  getAnnouncementNotifications,
  getAnnouncementInfo,
};

/* -----------------
** SLICE
-------------------*/
export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    /* -----------------
    GET_PROPOSAL_NOTIFICATIONS
    -------------------*/
    .addCase(getProposalNotifications.pending, (state) => {
      state.openProposalsLoading = true;
    })
    .addCase(getProposalNotifications.fulfilled, (state, { payload }) => {
      state.openProposalsLoading = false;
      state.openProposals = payload.data.nonUpgradeOpenList.reverse();
    })
    .addCase(getProposalNotifications.rejected, (state) => {
      state.openProposalsLoading = false;
    })
    /* -----------------
    GET_UPGRADE_NOTIFICATIONS
    -------------------*/
    .addCase(getUpgradeNotifications.pending, (state) => {
      state.scheduledUpgradesLoading = true;
    })
    .addCase(getUpgradeNotifications.fulfilled, (state, { payload }) => {
      state.scheduledUpgradesLoading = false;
      state.scheduledUpgrades = payload.data.reverse().map((upgrade: UpgradeNotification) => {
        const upgradeInfo = {
          id: upgrade.upgradeVersion,
          timestamp: upgrade.approximateTime,
          title: upgrade.upgradeName,
          body: upgrade.upgradePlan,
        };
        return upgradeInfo;
      });
    })
    .addCase(getUpgradeNotifications.rejected, (state) => {
      state.scheduledUpgradesLoading = false;
    })
    /* -----------------
    GET_ANNOUNCEMENT_NOTIFICATIONS
    -------------------*/
    .addCase(getAnnouncementNotifications.pending, (state) => {
      state.openAnnouncementsLoading = true;
    })
    .addCase(getAnnouncementNotifications.fulfilled, (state, { payload }) => {
      state.openAnnouncementsLoading = false;
      state.openAnnouncements = payload.data;
    })
    .addCase(getAnnouncementNotifications.rejected, (state) => {
      state.openAnnouncementsLoading = false;
    })
    /* -----------------
    GET_ANNOUNCEMENT
    -------------------*/
    .addCase(getAnnouncementInfo.pending, (state) => {
      state.announcementInfoLoading = true;
    })
    .addCase(getAnnouncementInfo.fulfilled, (state, { payload }) => {
      state.announcementInfoLoading = false;
      state.announcementInfo = payload.data;
    })
    .addCase(getAnnouncementInfo.rejected, (state) => {
      state.announcementInfoLoading = false;
    });
  },
});

/* -----------------
SELECTORS
-------------------*/
export const selectNotification = (state: RootState) => state.notification;

export default notificationSlice.reducer;