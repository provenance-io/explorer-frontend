import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { WalletConnectContextProvider } from '@provenanceio/walletconnect-js';
import { store } from './redux/app/store';
// import { Maintenance } from './Pages';
import App from './App';

/* Note: during maintenance cycles, update the tests in package.json
         to only run the linter. Show Maintenance component here
         instead of the App component.
*/
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store()}>
      <WalletConnectContextProvider>
        <App />
        {/* <Maintenance /> */}
      </WalletConnectContextProvider>
    </Provider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// NOTE: Commenting out as suggested by Mock Service Worker Docs
// serviceWorker.unregister();
