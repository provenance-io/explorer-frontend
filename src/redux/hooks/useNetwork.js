import useRedux from './useRedux';
import { networkActions } from '../actions';

const useNetwork = () => useRedux('networkReducer', networkActions);

export default useNetwork;
