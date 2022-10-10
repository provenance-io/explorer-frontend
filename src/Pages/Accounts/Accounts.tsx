import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Section, Wrapper, Header, Content } from 'Components';
import { useParams } from 'react-router-dom';
import { useMediaQuery, useAccounts } from 'redux/hooks';
import { breakpoints } from 'consts';
import { formatDenom, maxLength } from 'utils';
import { AccountSpotlight, HashChart } from './Components';
import { AccountTables } from './Components/AccountTables/AccountTables';
import { NoMatch404 } from '..';
import { HashTable } from './Components/HashTable';

const Group = styled.div<{ isMdSm?: boolean }>`
  display: ${({ isMdSm }) => (isMdSm ? 'block' : 'flex')};
  align-items: center;
  width: 100%;
`;

const Accounts = () => {
  const { addressId } = useParams<{ addressId: string }>();
  const { matches: sizeSm } = useMediaQuery(breakpoints.down('sm'));
  const { matches: isMd } = useMediaQuery(breakpoints.down('md'));
  const { matches: exactlyMd } = useMediaQuery(breakpoints.only('md'));
  const { matches: isMdSm } = useMediaQuery(`(max-width: 780px)`);
  const { matches: isLg } = useMediaQuery(breakpoints.up('md'));
  const { accountInfoFailure, accountHashData } = useAccounts();

  const totalHash = accountHashData.assets.results?.find(
    (b: { amount: string; denom: string }) => b.denom === 'nhash'
  ) as { amount: string; denom: string };

  const headerValue = sizeSm ? maxLength(addressId, 20, '3') : addressId;

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
            <Content justify="flex-start" alignItems="center">
              <AccountSpotlight />
            </Content>
            {isLg && !exactlyMd && (
              <Content
                justify="center"
                alignItems="center"
                size="50%"
                title={`Total Hash: ${formatDenom(Number(totalHash.amount), totalHash.denom, {
                  decimal: 2,
                })}`}
              >
                <HashChart />
                <HashTable />
              </Content>
            )}
          </Section>
          {isMd && (
            <Section>
              <Content
                justify="center"
                alignItems="center"
                size="100%"
                title={`Total Hash: ${formatDenom(Number(totalHash.amount), totalHash.denom, {
                  decimal: 2,
                })}`}
              >
                <Group isMdSm={isMdSm}>
                  <HashChart />
                  <HashTable />
                </Group>
              </Content>
            </Section>
          )}
          {/* <AccountTxs /> */}
          <Section>
            <AccountTables />
          </Section>
        </Fragment>
      )}
    </Wrapper>
  );
};

export default Accounts;
