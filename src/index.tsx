import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from '../src/redux/app/store';
import { AppKitProvider } from './Providers';
import ReactGA from 'react-ga4';
import TagManager from 'react-gtm-module';
// eslint-disable-next-line
import { Maintenance } from 'Pages';
import { isProd } from '../src/consts';
import App from './App';

/* Note: during maintenance cycles, update the tests in package.json
         to only run the linter. Show Maintenance component here
         instead of the App component.
*/

const trackingId = isProd && import.meta.env.VITE_APP_PROD_GA4_ID;
const gtmId = isProd && import.meta.env.VITE_APP_PROD_GTM_ID;
if (trackingId) ReactGA.initialize(trackingId);
if (gtmId) TagManager.initialize({ gtmId });

ReactDOM.render(
  <Provider store={store()}>
    <AppKitProvider>
      <App />
      {/* <Maintenance /> */}
    </AppKitProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// NOTE: Commenting out as suggested by Mock Service Worker Docs
// serviceWorker.unregister();
