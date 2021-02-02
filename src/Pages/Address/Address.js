import React from 'react';
import { Section, Wrapper, Header } from 'Components';
import { AddressHeader, AddressSpotlight, AddressTxs } from './Components';

const Address = () => (
  <Wrapper>
    <Section>
      <Header title="Address Details">
        <AddressHeader />
      </Header>
      <AddressSpotlight />
      <AddressTxs />
    </Section>
  </Wrapper>
);

export default Address;
