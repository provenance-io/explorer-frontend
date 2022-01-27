import React from 'react';
import { Section } from 'Components';
import { useMediaQuery } from 'redux/hooks';
import { breakpoints } from 'consts';
import {
  AccountAssets,
  AccountDelegations,
  AccountRewards,
  AccountUnbondings,
  AccountAttributes,
} from './Components';

const AccountButtons = () => {
  const { matches: sizeMd } = useMediaQuery(breakpoints.down('md'));

  const getLargeSize = () => (
    <>
      <Section>
        <AccountAssets />
      </Section>
      <Section>
        <AccountDelegations />
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
      <Section>
        <AccountDelegations />
      </Section>
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
