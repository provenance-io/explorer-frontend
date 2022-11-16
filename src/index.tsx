import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { WalletConnectContextProvider } from '@provenanceio/walletconnect-js';
import { store } from 'redux/app/store';
import App from './App';

ReactDOM.render(
  <Provider store={store()}>
    <WalletConnectContextProvider>
      <App />
    </WalletConnectContextProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// NOTE: Commenting out as suggested by Mock Service Worker Docs
// serviceWorker.unregister();
