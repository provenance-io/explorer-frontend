import React, { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useMediaQuery } from 'redux/hooks';
import { useAccounts } from 'redux/new_hooks';
import { Summary, Sprite, Loading } from 'Components';
import { breakpoints } from 'consts';
import { maxLength, formatDenom } from 'utils';

const Column = styled.div`
  ${({ flexBasis }) => flexBasis && `flex-basis: ${flexBasis};`}
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  margin-bottom: 20px;
`;

const TokenIcon = styled.div``;

const AccountSpotlight = () => {
  const { accountInfo, accountInfoLoading, getAccountAssets, getAccountInfo, getAccountRewards } =
    useAccounts();

  const { addressId } = useParams();
  const { matches } = useMediaQuery(breakpoints.down('xl'));
  const { matches: matchesLong } = useMediaQuery(breakpoints.down('xl'));
  const [showKeyPopup, setShowKeyPopup] = useState(false);
  const [showAUMPopup, setShowAUMPopup] = useState(false);

  useEffect(() => {
    getAccountAssets({ address: addressId });
    getAccountInfo(addressId);
    getAccountRewards(addressId);
  }, [getAccountAssets, getAccountInfo, getAccountRewards, addressId]);

  const {
    accountName = '--',
    accountNumber = '--',
    accountType = '--',
    publicKeys = {},
    publicKey = publicKeys.pubKey,
    publicKeyType = publicKeys.type,
    sequence = '--',
    tokens = {},
    accountAum = {},
  } = accountInfo;

  const popupNoteKeyType = {
    visibility: { visible: showKeyPopup, setVisible: setShowKeyPopup },
    icon: { name: 'HELP_OUTLINE', size: '1.7rem' },
    method: ['click', 'hover'],
    fontColor: 'FONT_WHITE',
    data: [
      {
        title: 'Key Type:',
        value: publicKeyType,
      },
    ],
    titleMinWidth: '70px',
    noteMinWidth: '70px',
  };

  const popupNoteAccountAUM = {
    visibility: { visible: showAUMPopup, setVisible: setShowAUMPopup },
    icon: { name: 'HELP_OUTLINE', size: '1.7rem' },
    method: ['click', 'hover'],
    fontColor: 'FONT_WHITE',
    data: [
      {
        title: '',
        value: 'Total value of all account assets under management (AUM)',
      },
    ],
    titleMinWidth: '0px',
    noteMinWidth: '150px',
  };

  const summaryData = [
    { title: 'Address', value: matches ? maxLength(addressId, 20, 3) : addressId, copy: addressId },
    { title: 'Account Type', value: accountType },
    { title: 'Account Name', value: accountName || '--' },
    { title: 'Account Number', value: accountNumber },
    {
      title: 'Public Key',
      value: matchesLong ? maxLength(publicKey, 20, 3) : publicKey,
      copy: publicKey,
      popupNote: popupNoteKeyType,
    },
    { title: 'Sequence', value: sequence },
    { title: 'Fungible Tokens', value: tokens.fungibleCount },
    {
      title: 'Non-Fungible Tokens',
      value: tokens.nonFungibleCount,
      link: `/nfts/${addressId}`,
    },
    {
      title: 'Account AUM',
      value: `$${formatDenom(accountAum.amount, accountAum.denom, {
        decimal: 2,
        minimumFractionDigits: 2,
      })}`,
      popupNote: popupNoteAccountAUM,
    },
  ];

  return accountInfoLoading ? (
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
  );
};

export default AccountSpotlight;
