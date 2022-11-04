import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Section, Wrapper, Header, Content } from 'Components';
import { useParams } from 'react-router-dom';
import { useMediaQuery, useAccounts } from 'redux/hooks';
import { breakpoints } from 'consts';
import { formatDenom, maxLength, accountHashTotals } from 'utils';
import { HashDataProps, useGetHashDataQuery } from 'redux/services';
import { TxHistory } from 'Pages/Dashboard/Components';
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
  const { accountInfoFailure } = useAccounts();
  const { data: accountHashData, isLoading: accountHashDataLoading } = useGetHashDataQuery({
    address: addressId,
    denom: 'nhash',
  });

  const hashData = accountHashTotals(accountHashData as unknown as HashDataProps);

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
                title={`Total Hash: ${formatDenom(Number(hashData.hashTotal), 'nhash', {
                  decimal: 2,
                })}`}
              >
                <HashChart hashData={hashData} isLoading={accountHashDataLoading} />
                <HashTable hashData={hashData} isLoading={accountHashDataLoading} />
              </Content>
            )}
          </Section>
          {isMd && (
            <Section>
              <Content
                justify="center"
                alignItems="center"
                size="100%"
                title={`Total Hash: ${formatDenom(Number(hashData.hashTotal), 'nhash', {
                  decimal: 2,
                })}`}
              >
                <Group isMdSm={isMdSm}>
                  <HashChart hashData={hashData} isLoading={accountHashDataLoading} />
                  <HashTable hashData={hashData} isLoading={accountHashDataLoading} />
                </Group>
              </Content>
            </Section>
          )}
          <Section>
            <TxHistory address={addressId} />
          </Section>
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
