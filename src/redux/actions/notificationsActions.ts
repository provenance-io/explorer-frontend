import { Dispatch } from 'react';
import { 
  PROPOSAL_NOTIFICATIONS_URL,
  UPGRADE_NOTIFICATIONS_URL,
  ANNOUNCEMENT_NOTIFICATIONS_URL,
  ANNOUNCEMENT_URL,
} from 'consts';
import { ajaxGet } from './xhrActions';

// Block
export const GET_PROPOSAL_NOTIFICATIONS = 'GET_PROPOSAL_NOTIFICATIONS';
export const GET_UPGRADE_NOTIFICATIONS = 'GET_UPGRADE_NOTIFICATIONS';
export const GET_ANNOUNCEMENT_NOTIFICATIONS = 'GET_ANNOUNCEMENT_NOTIFICATIONS';
export const GET_ANNOUNCEMENT = 'GET_ANNOUNCEMENT';
export const GET_ANNOUNCEMENTS_ALL = 'GET_ANNOUNCEMENTS_ALL';

// API Calls
export const getProposalNotifications = () => async(dispatch: Dispatch<any>) => 
  ajaxGet(GET_PROPOSAL_NOTIFICATIONS, dispatch, `${PROPOSAL_NOTIFICATIONS_URL}`);

export const getUpgradeNotifications = () => async(dispatch: Dispatch<any>) => 
  ajaxGet(GET_UPGRADE_NOTIFICATIONS, dispatch, `${UPGRADE_NOTIFICATIONS_URL}`);

export const getAnnouncementNotifications = ({ fromDate = '' }: { fromDate?: string }) => async(dispatch: Dispatch<any>) => 
  ajaxGet(GET_ANNOUNCEMENT_NOTIFICATIONS, dispatch, `${ANNOUNCEMENT_NOTIFICATIONS_URL}${fromDate ? `?fromDate=${fromDate}` : ''}`);

export const getAnnouncementsAll = 
({ 
  fromDate = '',
  count = 10,
  page = 1, 
}: { 
  fromDate?: string,
  count: number,
  page: number, 
}) => async(dispatch: Dispatch<any>) => 
  ajaxGet(GET_ANNOUNCEMENTS_ALL, dispatch, `${ANNOUNCEMENT_NOTIFICATIONS_URL}?page=${page}&count=${count}${fromDate ? `?fromDate=${fromDate}` : ''}`);

export const getAnnouncementInfo = ({ id }: { id: string }) => async(dispatch: Dispatch<any>) => 
  ajaxGet(GET_ANNOUNCEMENT, dispatch, `${ANNOUNCEMENT_URL}/${id}`);