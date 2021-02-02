import useRedux from './useRedux';
import { assetsActions } from '../actions';

const useAssets = () => useRedux('assetsReducer', assetsActions);

export default useAssets;
