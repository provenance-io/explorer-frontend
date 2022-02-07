import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useWallet } from '@provenanceio/wallet-lib';
import { Section as BaseSection } from 'Components';
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

const Section = styled(BaseSection)`
  max-width: 100%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

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
        <ButtonWrapper>
          <AccountAssets />
        </ButtonWrapper>
      </Section>
      <Section>
        <ButtonWrapper>
          {isOwnAccount ? <AccountDelegationsOwner /> : <AccountDelegations />}
        </ButtonWrapper>
        <ButtonWrapper>
          <AccountUnbondings />
        </ButtonWrapper>
      </Section>
      <Section>
        <ButtonWrapper>
          <AccountRewards />
        </ButtonWrapper>
        <ButtonWrapper>
          <AccountAttributes />
        </ButtonWrapper>
      </Section>
    </>
  );

  const getMediumSize = () => (
    <>
      <Section>
        <ButtonWrapper>
          <AccountAssets />
        </ButtonWrapper>
      </Section>
      <Section>
        <ButtonWrapper>
          {isOwnAccount ? <AccountDelegationsOwner /> : <AccountDelegations />}
        </ButtonWrapper>
      </Section>
      <Section>
        <ButtonWrapper>
          <AccountUnbondings />
        </ButtonWrapper>
      </Section>
      <Section>
        <ButtonWrapper>
          <AccountRewards />
        </ButtonWrapper>
      </Section>
      <Section>
        <ButtonWrapper>
          <AccountAttributes />
        </ButtonWrapper>
      </Section>
    </>
  );

  return sizeMd ? getMediumSize() : getLargeSize();
};

export default AccountButtons;
