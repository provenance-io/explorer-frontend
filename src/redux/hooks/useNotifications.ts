import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  selectNotification as selector,
  notificationActions as actionsList,
  NotificationState,
} from '../features/notification/notificationSlice';

export const useNotifications = () => {
  const dispatch = useAppDispatch();
  const state: NotificationState = useAppSelector(selector);
  const actions = useMemo(() => bindActionCreators(actionsList, dispatch), [dispatch]);

  return { ...state, ...actions };
};
