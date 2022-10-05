import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useWallet } from '@provenanceio/wallet-lib';
import { MultiTable, Section as BaseSection } from 'Components';
import {
  AccountAssets,
  AccountDelegations,
  AccountDelegationsOwner,
  AccountRewards,
  AccountUnbondings,
  AccountAttributes,
} from './Components';

const Section = styled(BaseSection)`
  max-width: 100%;
`;

export const AccountTables = () => {
  const { walletService } = useWallet();
  const { addressId } = useParams<{ addressId: string }>();
  const {
    state: { address: delegatorAddress },
  } = walletService;
  const [activeTableTab, setActiveTableTab] = useState(0);

  const isOwnAccount = addressId === delegatorAddress;

  return (
    <Section>
      <MultiTable active={activeTableTab} setActive={setActiveTableTab}>
        <AccountAssets key={`Assets`} />
        {isOwnAccount ? (
          <AccountDelegationsOwner key={`Delegations`} />
        ) : (
          <AccountDelegations key={`Delegations`} />
        )}
        <AccountUnbondings key={`Unbondings`} />
        <AccountRewards key={`Rewards`} />
        <AccountAttributes key={`Attributes`} />
      </MultiTable>
    </Section>
  );
};
