import React from 'react';
import { Section } from 'Components';
import { useMediaQuery } from 'redux/hooks';
import { breakpoints } from 'consts';
import { AccountAssets, AccountDelegations, AccountRewards, AccountUnbondings } from './Components';

const AccountButtons = () => {
  const { matches: sizeMd } = useMediaQuery(breakpoints.down('md'));

  const getLargeSize = () => (
    <>
      <Section>
        <AccountAssets />
        <AccountDelegations />
      </Section>
      <Section>
        <AccountUnbondings />
        <AccountRewards />
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
    </>
  );

  return sizeMd ? getMediumSize() : getLargeSize();
};

export default AccountButtons;
