import React, { Fragment } from 'react';
import { Section, Wrapper, Header, Content } from 'Components';
import { useParams } from 'react-router-dom';
import { useMediaQuery } from 'redux/hooks';
import { useAccounts } from 'redux/new_hooks';
import { breakpoints } from 'consts';
import { maxLength } from 'utils';
import { AccountSpotlight, AccountTxs, AccountButtons } from './Components';
import { NoMatch404 } from '../';

const Accounts = () => {
  const { addressId } = useParams();
  const { matches: sizeSm } = useMediaQuery(breakpoints.down('sm'));
  const { accountInfoFailure } = useAccounts();

  const headerValue = sizeSm ? maxLength(addressId, 20, 3) : addressId;

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
            <Content justify="flex-start">
              <AccountSpotlight />
              <AccountButtons />
            </Content>
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
