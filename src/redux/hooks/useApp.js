import useRedux from './useRedux';
import { appActions } from '../actions';

const useApp = () => useRedux('appReducer', appActions);

export default useApp;
