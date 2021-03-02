import { Section, Wrapper } from 'Components';
import { BlockSpotlight, TopValidators, TxHistory, RecentBlocks, RecentTxs } from './Components';

const Dashboard = () => (
  <Wrapper noHeader data-testid="dashboard">
    <Section>
      <BlockSpotlight />
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
