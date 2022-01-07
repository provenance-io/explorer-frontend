import React, { Fragment } from 'react';
import { Section, Wrapper, Header } from 'Components';
import { useParams } from 'react-router-dom';
import { useAccounts, useMediaQuery } from 'redux/hooks';
import { breakpoints } from 'consts';
import { maxLength } from 'utils';
import { AccountSpotlight, AccountTxs, AccountAssets } from './Components';
import { NoMatch404 } from '../';

const Accounts = () => {
  const { addressId } = useParams();
  const { matches } = useMediaQuery(breakpoints.down('sm'));
  const { accountInfoFailure } = useAccounts();

  const headerValue = matches ? maxLength(addressId, 20, 3) : addressId;

  return (
    <Wrapper>
      <Header
        title="Account Details"
        value={headerValue}
        copyValue={addressId}
        copyTitle="Copy Address"
      />
      {accountInfoFailure ? (
        <NoMatch404 message={'No account exists for this address'} />
      ) : (
        <Fragment>
          <Section header>
            <AccountSpotlight />
          </Section>
          <Section>
            <AccountAssets />
          </Section>
          <Section>
            <AccountTxs />
          </Section>
        </Fragment>
      )}
    </Wrapper>
  );
};

export default Accounts;
