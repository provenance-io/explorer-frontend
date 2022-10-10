import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useAccounts } from 'redux/hooks';
import { DataCard, CopyValue } from 'Components';
import { maxLength, formatDenom } from 'utils';

const Group = styled.div`
  display: flex;
`;

export const AccountSpotlight = () => {
  const { accountInfo, getAccountAssets, getAccountInfo, getAccountRewards } = useAccounts();

  const { addressId } = useParams<{ addressId: string }>();
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
    publicKeys = { pubKey: '', type: '' },
    sequence = '--',
    tokens = { fungibleCount: 0, nonFungibleCount: 0 },
    accountAum = { amount: 0, denom: '' },
  } = accountInfo;

  const { pubKey: publicKey, type: publicKeyType } = publicKeys;

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

  const cardData = [
    {
      title: 'Total AUM',
      value: `$${formatDenom(Number(accountAum.amount), accountAum.denom, {
        decimal: 2,
        minimumFractionDigits: 2,
      })}`,
      popupNote: popupNoteAccountAUM,
    },
    { title: 'Type', value: accountType },
    { title: 'Fungible Tokens', value: tokens.fungibleCount },
    {
      title: 'Non-Fungible Tokens',
      value: tokens.nonFungibleCount,
      link: `/nfts/${addressId}`,
    },
    { title: 'Name', value: accountName || 'N/A' },
    { title: 'Number', value: accountNumber },
    {
      title: 'Public Key',
      value: maxLength(publicKey, 12, '3'),
      copy: publicKey,
      popupNote: popupNoteKeyType,
    },
    { title: 'Sequence', value: sequence },
  ];

  return (
    <>
      {cardData.map((item) => (
        <DataCard title={item.title} popup={item.popupNote} key={item.title}>
          {item.copy ? (
            <Group>
              {item.value}
              <CopyValue value={item.copy} title={`Copy ${item.title}`} size="2rem" />
            </Group>
          ) : (
            `${item.value}`
          )}
        </DataCard>
      ))}
    </>
  );
};
