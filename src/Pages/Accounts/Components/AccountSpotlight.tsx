import { useEffect, useState } from 'react';
import styled from 'styled-components';
// @ts-ignore
import useToggle from 'react-tiny-hooks/use-toggle';
import { Link, useParams } from 'react-router-dom';
import { useAccounts } from 'redux/hooks';
import { DataCard, CopyValue, Button as BaseButton } from 'Components';
import { PopupDataProps } from 'Components/Summary/Summary';
import { maxLength, formatDenom } from 'utils';
import { AccountMultiSigModal } from './AccountTables/Components';

const Button = styled(BaseButton)`
  margin: 0;
`;

const Group = styled.div`
  display: flex;
`;

export const AccountSpotlight = () => {
  const { accountInfo, getAccountAssets, getAccountInfo, getAccountRewards } = useAccounts();
  const [modalOpen, deactivateModalOpen, activateModalOpen] = useToggle(false);
  const { addressId } = useParams<{ addressId: string }>();
  const [showKeyPopup, setShowKeyPopup] = useState(false);
  const [showAUMPopup, setShowAUMPopup] = useState(false);
  const [showNamePopup, setShowNamePopup] = useState(false);
  const [showNumberPopup, setShowNumberPopup] = useState(false);
  const [showSequencePopup, setShowSequencePopup] = useState(false);

  useEffect(() => {
    getAccountAssets({ address: addressId });
    getAccountInfo(addressId);
    getAccountRewards(addressId);
  }, [getAccountAssets, getAccountInfo, getAccountRewards, addressId]);

  const {
    accountName = '--',
    accountNumber = '--',
    accountType = '--',
    publicKey = { base64: '', sigList: [], type: '' },
    sequence = '--',
    tokens = { fungibleCount: 0, nonFungibleCount: 0 },
    accountAum = { amount: 0, denom: '' },
  } = accountInfo;

  const { base64, sigList, type: publicKeyType } = publicKey;

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

  const popupNoteName = {
    visibility: { visible: showNamePopup, setVisible: setShowNamePopup },
    icon: { name: 'HELP_OUTLINE', size: '1.7rem' },
    method: ['click', 'hover'],
    fontColor: 'FONT_WHITE',
    data: [
      {
        title: '',
        value: 'The alias applied to this address. If N/A, it does not exist.',
        externalLink: 'https://provenance-io.github.io/provenance-docs/docs/pb/modules/name-module',
        linkValue: 'Docs',
      },
    ],
    titleMinWidth: '0px',
    noteMinWidth: '250px',
  };

  const popupNoteNumber = {
    visibility: { visible: showNumberPopup, setVisible: setShowNumberPopup },
    icon: { name: 'HELP_OUTLINE', size: '1.7rem' },
    method: ['click', 'hover'],
    fontColor: 'FONT_WHITE',
    data: [
      {
        title: '',
        value: 'The number of this account in the Provenance Network.',
        hideTitle: true,
      },
    ],
    titleMinWidth: '0px',
    noteMinWidth: '150px',
  };

  const popupNoteSequence = {
    visibility: { visible: showSequencePopup, setVisible: setShowSequencePopup },
    icon: { name: 'HELP_OUTLINE', size: '1.7rem' },
    method: ['click', 'hover'],
    fontColor: 'FONT_WHITE',
    data: [
      {
        title: '',
        value: 'The number of transactions signed by this account.',
        hideTitle: true,
      },
    ],
    titleMinWidth: '0px',
    noteMinWidth: '150px',
  };

  interface ItemProps {
    title: string;
    value: string;
    popupNote?: PopupDataProps;
    link?: string;
    copy?: string;
    button?: JSX.Element;
  }

  const cardData: ItemProps[] = [
    {
      title: 'Total AUM',
      value: `$${formatDenom(Number(accountAum.amount), accountAum.denom, {
        decimal: 2,
        minimumFractionDigits: 2,
      })}`,
      popupNote: popupNoteAccountAUM as PopupDataProps,
    },
    { title: 'Type', value: accountType },
    { title: 'Fungible Tokens', value: String(tokens.fungibleCount) },
    {
      title: 'Non-Fungible Tokens',
      value: String(tokens.nonFungibleCount),
      link: `/nfts/${addressId}`,
    },
    { title: 'Name', value: accountName || 'N/A', popupNote: popupNoteName as PopupDataProps },
    { title: 'Number', value: String(accountNumber), popupNote: popupNoteNumber as PopupDataProps },
    {
      title: 'Public Key',
      value: base64 && maxLength(base64, 12, '3'),
      copy: base64 && base64,
      popupNote: popupNoteKeyType as PopupDataProps,
      button: !base64 ? (
        <Button icon="INVENTORY" onClick={activateModalOpen}>
          View All
        </Button>
      ) : (
        <></>
      ),
    },
    { title: 'Sequence', value: String(sequence), popupNote: popupNoteSequence as PopupDataProps },
  ];

  return (
    <>
      <>
        {cardData.map((item) => (
          <DataCard
            title={item.title}
            popup={item.popupNote}
            key={item.title}
            titleMargin={item.button && '0 0 15px 0'}
          >
            <Group>
              {item.button && item.button}
              {item.link ? <Link to={item.link}>{item.value}</Link> : item.value}
              {item.copy && (
                <CopyValue value={item.copy} title={`Copy ${item.title}`} size="2rem" />
              )}
            </Group>
          </DataCard>
        ))}
      </>
      <AccountMultiSigModal modalOpen={modalOpen} onClose={deactivateModalOpen} data={sigList} />
    </>
  );
};
