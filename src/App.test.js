/* eslint-disable */
// disable lint while figuring out the server
import { render } from 'test/test-utils';
import { initialState } from 'redux/reducers/appReducer';
import { appActions } from 'redux/actions';
import useApp from 'redux/hooks/useApp';
import { BLOCK_SPOTLIGHT_URL } from 'consts';
import App from './App';

jest.mock('redux/hooks/useApp');
const appState = { ...initialState, ...appActions };

it.todo('stuff');
// describe('App', () => {
//   it('should render', async () => {
//     useApp.mockReturnValue(appState);
//     render(<App />);
//   });

//   it('should default the theme', () => {
//     useApp.mockReturnValue({ ...appState, theme: 'asdf' });
//     render(<App />);
//   });
// });
