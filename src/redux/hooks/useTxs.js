import useRedux from './useRedux';
import { txsActions } from '../actions';

const useTxs = () => useRedux('txsReducer', txsActions);

export default useTxs;
