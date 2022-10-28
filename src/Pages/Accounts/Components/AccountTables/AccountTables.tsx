import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useWalletConnect } from '@provenanceio/walletconnect-js';
import { MultiTable, Section as BaseSection } from 'Components';
import { breakpoints } from 'consts';
import { useMediaQuery } from 'redux/hooks';
import {
  AccountAssets,
  AccountDelegations,
  AccountDelegationsOwner,
  AccountGrants,
  AccountRewards,
  AccountUnbondings,
  AccountAttributes,
  AccountRedelegations,
  AccountTxs,
} from './Components';

const Section = styled(BaseSection)`
  max-width: 100%;
`;

export const AccountTables = () => {
  const { matches: isSmall } = useMediaQuery(breakpoints.down('lg'));
  const { walletConnectState: wcs } = useWalletConnect();
  const { addressId } = useParams<{ addressId: string }>();
  const [activeTableTab, setActiveTableTab] = useState(0);

  const isOwnAccount = addressId === wcs.address;

  return (
    <Section>
      <MultiTable active={activeTableTab} setActive={setActiveTableTab} isSmall={isSmall}>
        <AccountAssets key="Assets" />
        {isOwnAccount ? (
          <AccountDelegationsOwner key="Delegations" />
        ) : (
          <AccountDelegations key="Delegations" />
        )}
        <AccountRedelegations key="Redelegations" />
        <AccountUnbondings key="Unbondings" />
        <AccountRewards key="Rewards" />
        <AccountAttributes key="Attributes" />
        <AccountTxs key="Transactions" />
        <AccountGrants key="Grants" />
      </MultiTable>
    </Section>
  );
};
