import useRedux from './useRedux';
import { ibcActions } from '../actions';

const useIbc = () => useRedux('ibcReducer', ibcActions);

export default useIbc;
