import useRedux from './useRedux';
import { governanceActions } from '../actions';

const useGovernance = () => useRedux('governanceReducer', governanceActions);

export default useGovernance;
