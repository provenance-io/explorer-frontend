import React, { Fragment, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useAccounts, useMediaQuery } from 'redux/hooks';
import { Content, Summary, Sprite, Loading } from 'Components';
import { breakpoints } from 'consts';
import { maxLength } from 'utils';

const Column = styled.div`
  ${({ flexBasis }) => flexBasis && `flex-basis: ${flexBasis};`}
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
`;

const TokenIcon = styled.div``;

const AccountSpotlight = () => {
  const { accountInfo, accountInfoLoading, getAccountAssets, getAccountInfo } = useAccounts();
  const { addressId } = useParams();
  const { matches } = useMediaQuery(breakpoints.down('sm'));
  const { matches: matchesList } = useMediaQuery(breakpoints.down('xl'));

  useEffect(() => {
    getAccountAssets(addressId);
    getAccountInfo(addressId);
  }, [getAccountAssets, getAccountInfo, addressId]);

  const {
    accountName = '--',
    accountNumber = '--',
    accountType = '--',
    publicKeys = {},
    sequence = '--',
    tokens = {},
  } = accountInfo;
  const publicKey = publicKeys.pubKey;
  const publicKeyType = publicKeys.type;

  const summaryData = [
    { title: 'Address', value: matches ? maxLength(addressId, 20, 3) : addressId, copy: addressId },
    { title: 'Account Type', value: accountType },
    { title: 'Account Name', value: accountName || '--' },
    { title: 'Account Number', value: accountNumber },
    {
      title: 'Public Key',
      value: [
        [`Type:`, `${publicKeyType}`],
        [`Key:`, `${matchesList ? maxLength(publicKey, 20, 3) : publicKey}`],
      ],
      copy: publicKey,
      list: true,
    },
    { title: 'Sequence', value: sequence },
    { title: 'Fungible Tokens', value: tokens.fungibleCount },
    {
      title: 'Non-Fungible Tokens',
      value: tokens.nonFungibleCount,
      link: `/nfts/${addressId}`,
    },
  ];

  return (
    <Content justify="flex-start">
      {accountInfoLoading ? (
        <Loading />
      ) : (
        <Fragment>
          <Column flexBasis="10%">
            <TokenIcon>{<Sprite size="8rem" icon="HASH" />}</TokenIcon>
          </Column>
          <Column flexBasis="90%">
            <Summary data={summaryData} />
          </Column>
        </Fragment>
      )}
    </Content>
  );
};

export default AccountSpotlight;
