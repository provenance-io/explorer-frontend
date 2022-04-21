import useRedux from './useRedux';
import { contractActions } from '../actions';

const useContracts = () => useRedux('contractReducer', contractActions);

export default useContracts;
