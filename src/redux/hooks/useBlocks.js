import useRedux from './useRedux';
import { blocksActions } from '../actions';

const useBlocks = () => useRedux('blocksReducer', blocksActions);

export default useBlocks;
