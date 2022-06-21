import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { WalletContextProvider } from '@provenanceio/wallet-lib';
import { useApp, useAssets, useColorScheme } from 'redux/hooks';
import { Navigation, Footer, SpriteSheet, BaseStyle } from 'Components';
import { GlobalStyle } from 'theme';
import { isProd } from 'consts';
import { isEmpty } from 'utils';
import {
  Accounts,
  Announcement,
  Announcements,
  Asset,
  Assets,
  Block,
  Blocks,
  Code,
  Contract,
  Contracts,
  Dashboard,
  Faucet,
  Gas,
  Ibc,
  Icons,
  NameTree,
  Nft,
  Nfts,
  NoMatch404,
  Params,
  Proposal,
  Proposals,
  TokenStats,
  Tx,
  Txs,
  Upgrades,
  Validator,
  Validators,
} from 'Pages';

const App = () => {
  const { walletUrl } = useApp();
  const { activeTheme } = useColorScheme();

  const { assetMetadata, assetMetadataLoading, getAssetMetadata, assetMetadataFailed } =
    useAssets();

  useEffect(() => {
    if (isEmpty(assetMetadata) && !assetMetadataLoading && !assetMetadataFailed) {
      getAssetMetadata();
    }
  }, [assetMetadata, assetMetadataLoading, getAssetMetadata, assetMetadataFailed]);

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL || ''}>
      <WalletContextProvider walletUrl={walletUrl}>
        <GlobalStyle theme={activeTheme} />
        <SpriteSheet />
        <ThemeProvider theme={activeTheme}>
          <BaseStyle>
            <Navigation />
            <Switch>
              <Route exact path="/">
                <Redirect to="/dashboard" />
              </Route>
              <Route path="/accounts/:addressId" component={Accounts} />
              <Route path="/announcement/:announcementId" component={Announcement} />
              <Route path="/announcements" component={Announcements} />
              <Route path="/asset/:assetId" component={Asset} />
              <Route path="/assets" component={Assets} />
              <Route path="/blocks" component={Blocks} />
              <Route path="/block/:blockHeight" component={Block} />
              <Route path="/code/:codeId" component={Code} />
              <Route path="/contract/:contractId" component={Contract} />
              <Route path="/contracts" component={Contracts} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route path="/faucet">{isProd ? <Redirect to="/dashboard" /> : <Faucet />}</Route>
              <Route path="/ibc" component={Ibc} />
              <Route path="/icons">{isProd ? <Redirect to="/dashboard" /> : <Icons />}</Route>
              <Route path="/network/name-tree" component={NameTree}></Route>
              <Route path="/nft/:addr" component={Nft} />
              <Route path="/nfts/:addr" component={Nfts} />
              <Route path="/proposal/:proposalId" component={Proposal} />
              <Route path="/proposals" component={Proposals} />
              <Route path="/network/token-stats" component={TokenStats} />
              <Route path="/network/gas" component={Gas} />
              <Route path="/network/upgrades" component={Upgrades} />
              <Route path="/network/params" component={Params} />
              <Route path="/tx/:txHash" component={Tx} />
              <Route path="/txs" component={Txs} />
              <Route path="/validator/:validatorId" component={Validator} />
              <Route path="/validators" component={Validators} />
              <Route component={NoMatch404} />
            </Switch>
            <Footer />
          </BaseStyle>
        </ThemeProvider>
      </WalletContextProvider>
    </BrowserRouter>
  );
};

export default App;
