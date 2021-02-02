import useRedux from './useRedux';
import { addressActions } from '../actions';

const useAddress = () => useRedux('addressReducer', addressActions);

export default useAddress;
