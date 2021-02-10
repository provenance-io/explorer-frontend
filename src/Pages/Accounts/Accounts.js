import React from 'react';
import { Section, Wrapper, Header } from 'Components';
import { useParams } from 'react-router-dom';
import { AccountSpotlight, AccountTxs } from './Components';

const Accounts = () => {
  const { addressId } = useParams();

  return (
    <Wrapper>
      <Section>
        <Header title="Account Details" value={addressId} copyValue={addressId} copyTitle="Copy Address" />
        <AccountSpotlight />
        <AccountTxs />
      </Section>
    </Wrapper>
  );
};

export default Accounts;
