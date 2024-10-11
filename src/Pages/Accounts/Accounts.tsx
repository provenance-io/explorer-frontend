import React, { Fragment } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { Section, Wrapper, Header, Content } from '../../Components';
import { useMediaQuery, useAccounts } from '../../redux/hooks';
import { breakpoints } from '../../consts';
import { maxLength } from '../../utils';
import { TxHistory } from '../../Pages/Dashboard/Components';
import { AccountCharts, AccountSpotlight } from './Components';
import { AccountTables } from './Components/AccountTables/AccountTables';
import { NoMatch404 } from '..';

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
            {isLg && !exactlyMd && <AccountCharts />}
          </Section>
          {isMd && (
            <Section>
              <Group isMdSm={isMdSm}>
                <AccountCharts />
              </Group>
            </Section>
          )}
          <Section>
            <TxHistory address={addressId} size="100%" />
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
