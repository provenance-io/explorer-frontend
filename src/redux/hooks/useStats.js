import useRedux from './useRedux';
import { statsActions } from '../actions';

const useStats = () => useRedux('statsReducer', statsActions);

export default useStats;
