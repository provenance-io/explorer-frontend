import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

/**
 * use redux
 * @param {string} reducer - the name of the reducer to use
 * @param {object} actionList - object of action functions
 */
const useRedux = (reducer, actionList) => {
  if (!reducer || !actionList) {
    throw new Error('useRedux requires a reducer and list of actions');
  }

  const dispatch = useDispatch();
  const state = useSelector((state) => state[reducer]);
  const actions = useMemo(() => bindActionCreators(actionList, dispatch), [dispatch, actionList]);

  return {
    ...state,
    ...actions,
  };
};

export default useRedux;
