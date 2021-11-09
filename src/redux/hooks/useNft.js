import useRedux from './useRedux';
import { nftActions } from '../actions';

const useNft = () => useRedux('nftReducer', nftActions);

export default useNft;
