import useRedux from './useRedux';
import { faucetActions } from '../actions';

const useFaucet = () => useRedux('faucetReducer', faucetActions);

export default useFaucet;
