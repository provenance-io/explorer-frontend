import useRedux from './useRedux';
import { notificationsActions } from '../actions';

const useNotifications = () => useRedux('notificationsReducer', notificationsActions);

export default useNotifications;
