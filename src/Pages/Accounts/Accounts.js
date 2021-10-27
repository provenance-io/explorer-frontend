import React from 'react';
import { Section, Wrapper, Header } from 'Components';
import { useParams } from 'react-router-dom';
import { useMediaQuery } from 'redux/hooks';
import { breakpoints } from 'consts';
import { maxLength } from 'utils';
import { AccountSpotlight, AccountTxs, AccountAssets, AccountNft } from './Components';

const Accounts = () => {
  const { addressId } = useParams();
  const { matches } = useMediaQuery(breakpoints.down('sm'));

  const headerValue = matches ? maxLength(addressId, 20, 3) : addressId;

  return (
    <Wrapper>
      <Header
        title="Account Details"
        value={headerValue}
        copyValue={addressId}
        copyTitle="Copy Address"
      />
      <Section header>
        <AccountSpotlight />
      </Section>
      <Section>
        <AccountAssets />
      </Section>
      <Section>
        <AccountNft />
      </Section>
      <Section>
        <AccountTxs />
      </Section>
    </Wrapper>
  );
};

export default Accounts;
