import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Section, Wrapper, Header, Content } from 'Components';
import { useParams } from 'react-router-dom';
import { useMediaQuery, useAccounts } from 'redux/hooks';
import { breakpoints } from 'consts';
import { formatDenom, maxLength } from 'utils';
import Big from 'big.js';
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

  const availableHash = accountHashData.assets.results?.find(
    (b: { amount: string; denom: string }) => b.denom === 'nhash'
  ) as { amount: string; denom: string };
  const theseDels = new Big(
    Number(accountHashData?.delegations?.rollupTotals?.bondedTotal?.amount || 0)
  ).toNumber();
  const theseRedels = new Big(
    accountHashData?.redelegations?.rollupTotals?.redelegationTotal?.amount || 0
  ).toNumber();
  const theseUnbonds = new Big(
    accountHashData?.unbonding?.rollupTotals?.unbondingTotal?.amount || 0
  ).toNumber();
  const theseRewards = new Big(accountHashData?.rewards?.total[0]?.amount || 0).toNumber();
  const available = new Big(Number(availableHash?.amount || 0)).toNumber();
  const totalHash = available + theseDels + theseRedels + theseUnbonds + theseRewards;

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
                title={`Total Hash: ${formatDenom(Number(totalHash), 'hash', {
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
                title={`Total Hash: ${formatDenom(Number(totalHash), 'hash', {
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
