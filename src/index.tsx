import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { WalletConnectContextProvider } from '@provenanceio/walletconnect-js';
import { store } from 'redux/app/store';
import ReactGA from 'react-ga4';
// eslint-disable-next-line
import { Maintenance } from 'Pages';
import { isProd } from 'consts';
import App from './App';

/* Note: during maintenance cycles, update the tests in package.json
         to only run the linter. Show Maintenance component here
         instead of the App component.
*/

const trackingId = isProd && process.env.REACT_APP_PROD_GTM_ID;
if (trackingId) ReactGA.initialize(trackingId);

ReactDOM.render(
  <Provider store={store()}>
    <WalletConnectContextProvider>
      <App />
      {/* <Maintenance /> */}
    </WalletConnectContextProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// NOTE: Commenting out as suggested by Mock Service Worker Docs
// serviceWorker.unregister();
