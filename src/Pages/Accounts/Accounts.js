import React from 'react';
import { Section, Wrapper, Header } from 'Components';
import { useParams } from 'react-router-dom';
import { AccountSpotlight, AccountTxs, AccountAssets } from './Components';

const Accounts = () => {
  const { addressId } = useParams();

  return (
    <Wrapper>
      <Header title="Account Details" value={addressId} copyValue={addressId} copyTitle="Copy Address" />
      <Section header>
        <AccountSpotlight />
      </Section>
      <Section>
        <AccountAssets />
      </Section>
      <Section>
        <AccountTxs />
      </Section>
    </Wrapper>
  );
};

export default Accounts;
