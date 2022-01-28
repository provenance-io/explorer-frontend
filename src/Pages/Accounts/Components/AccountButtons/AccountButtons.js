import React from 'react';
import { useParams } from 'react-router-dom';
import { useWallet } from '@provenanceio/wallet-lib';
import { Section } from 'Components';
import { useMediaQuery } from 'redux/hooks';
import { breakpoints } from 'consts';
import {
  AccountAssets,
  AccountDelegations,
  AccountDelegationsOwner,
  AccountRewards,
  AccountUnbondings,
  AccountAttributes,
} from './Components';

const AccountButtons = () => {
  const { matches: sizeMd } = useMediaQuery(breakpoints.down('md'));
  const { walletService } = useWallet();
  const { addressId } = useParams();
  const {
    state: { address: delegatorAddress },
  } = walletService;

  const isOwnAccount = addressId === delegatorAddress;

  const getLargeSize = () => (
    <>
      <Section>
        <AccountAssets />
      </Section>
      <Section>
        {isOwnAccount ? <AccountDelegationsOwner /> : <AccountDelegations />}
        <AccountUnbondings />
      </Section>
      <Section>
        <AccountRewards />
        <AccountAttributes />
      </Section>
    </>
  );

  const getMediumSize = () => (
    <>
      <Section>
        <AccountAssets />
      </Section>
      <Section>{isOwnAccount ? <AccountDelegationsOwner /> : <AccountDelegations />}</Section>
      <Section>
        <AccountUnbondings />
      </Section>
      <Section>
        <AccountRewards />
      </Section>
      <Section>
        <AccountAttributes />
      </Section>
    </>
  );

  return sizeMd ? getMediumSize() : getLargeSize();
};

export default AccountButtons;
