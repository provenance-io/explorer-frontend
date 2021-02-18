import useRedux from './useRedux';
import { accountsActions } from '../actions';

const useAccounts = () => useRedux('accountsReducer', accountsActions);

export default useAccounts;
