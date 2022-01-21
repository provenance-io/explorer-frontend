import React from 'react';
import Helmet from 'react-helmet';
import { Section, Wrapper } from 'Components';
import {
  BlockSpotlight,
  TopValidators,
  TxHistory,
  RecentBlocks,
  RecentTxs,
  PriceHistory,
  HashDashboard,
} from './Components';

const Dashboard = () => (
  <Wrapper noHeader>
    <Helmet>
      <title>Provenance Blockchain Explorer - Dashboard</title>
    </Helmet>
    <Section>
      <BlockSpotlight />
    </Section>
    <Section>
      <HashDashboard />
      <PriceHistory />
    </Section>
    <Section>
      <TopValidators />
      <TxHistory />
    </Section>
    <Section>
      <RecentBlocks />
      <RecentTxs />
    </Section>
  </Wrapper>
);

export default Dashboard;
