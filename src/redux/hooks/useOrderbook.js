import useRedux from './useRedux';
import { orderbookActions } from '../actions';

const useOrderbook = () => useRedux('orderbookReducer', orderbookActions);

export default useOrderbook;
