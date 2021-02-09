import React from 'react';
import { Section, Wrapper, Header } from 'Components';
import { AccountHeader, AccountSpotlight, AccountTxs } from './Components';

const Accounts = () => (
  <Wrapper>
    <Section>
      <Header title="Account Details">
        <AccountHeader />
      </Header>
      <AccountSpotlight />
      <AccountTxs />
    </Section>
  </Wrapper>
);

export default Accounts;
