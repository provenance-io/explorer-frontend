import useRedux from './useRedux';
import { validatorsActions } from '../actions';

const useValidators = () => useRedux('validatorsReducer', validatorsActions);

export default useValidators;
