import { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { QRCodeModal, useWalletConnect } from '@provenanceio/walletconnect-js';
import { Link as BaseLink } from 'react-router-dom';
// @ts-ignore
import useOnClickOutside from 'react-tiny-hooks/use-on-click-outside';
// @ts-ignore
import useOnEscape from 'react-tiny-hooks/use-on-escape';
// @ts-ignore
import useToggle from 'react-tiny-hooks/use-toggle';
import { useChain } from '@cosmos-kit/react';
import { maxLength } from '../../utils';
import { CHAIN_NAME } from '../../config';
import { breakpoints, ICON_NAMES, isProd } from '../../consts';
import { useApp } from '../../redux/hooks';
import { PopupNote } from '../PopupNote';
import Button from '../Button';
import Sprite from '../Sprite';
import Modal from '../../Components/Modal';
import figureWallet from '../../assets/figureMobileWalletIcon.png';

const Container = styled.div`
  position: relative;
`;

const AccountBtn = styled(Button)<{ isLoggedIn?: boolean }>`
  border: none;
  background: none;
  /* animate.css @keyframe */
  animation: heartBeat;
  animation-duration: 1s;
  animation-delay: 2s;
  animation-iteration-count: ${({ isLoggedIn }) => (isLoggedIn ? 0 : 2)};
`;

const PopupTxt = styled.p`
  text-align: center;
  @media ${breakpoints.up('md')} {
    white-space: nowrap;
  }
`;

const LogoutButton = styled(Button)`
  float: right;
`;

const Link = styled(BaseLink)`
  &&& {
    :hover {
      opacity: 1;
      text-decoration: underline;
    }

    :visited {
      color: ${({ theme }) => theme.FONT_NAV_VISITED};
    }

    color: ${({ theme }) => theme.FONT_NAV};
  }
`;

const ModalContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  justify-items: center;
  grid-auto-columns: max-content;
  @media ${breakpoints.up('md')} {
    grid-template-columns: 1fr 1fr;
  }
`;

const ModalTitle = styled.div`
  font-weight: ${({ theme }) => theme.FONT_WEIGHT_BOLD};
  margin: 5px 0 10px 0;
  font-size: 1.063rem;
`;

const ModalWalletButton = styled.div`
  padding: 0 20px 20px 20px;
  border-radius: 8px;
  font-size: 1rem;
  width: 100%;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT_BOLD};
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-items: center;
  justify-content: center;
  max-width: 200px;
  cursor: pointer;

  :hover {
    background-color: ${({ theme }) => theme.BACKGROUND_LIGHT};
  }
`;

const WalletTitle = styled.p`
  margin-bottom: 4px;
`;

const UserAccount = ({ isMobile }: { isMobile: boolean }) => {
  const { isLoggedIn, setIsLoggedIn, setWalletAddress, setAuthToken, authToken, setWalletUrl } =
    useApp();
  const theme = useTheme();
  const position = isMobile ? 'above' : 'left';
  const [visible, setVisible] = useState(false);

  const [showPopup, toggleShowPopup, , deactivateShowPopup] = useToggle();
  const containerRef = useOnClickOutside(deactivateShowPopup);
  useOnEscape(deactivateShowPopup);
  // This is the old Figure Wallet stuff
  const { walletConnectService: wcs, walletConnectState } = useWalletConnect();
  //  This is Cosmos Kit wallets (Leap, Keplr, Arculus)
  const { status, connect, address, wallet } = useChain(CHAIN_NAME);

  useEffect(() => {
    setIsLoggedIn(status === 'Connected' || walletConnectState.status === 'connected');
    if (address || walletConnectState.address) {
      setWalletAddress(address || walletConnectState.address);
    }
  }, [status, address, setIsLoggedIn, setWalletAddress, walletConnectState]);

  const handleLoginClick = () => {
    // Currently supported Cosmos Kit wallets
    if (wallet) {
      connect();
    } else {
      toggleShowPopup();
      wcs.connect();
    }
  };

  const handleLogoutFigureWallet = () => {
    setWalletAddress('');
    setWalletUrl('');
    setIsLoggedIn(false);
    wcs.disconnect();
    setVisible(false);
  };

  const [openSelectWalletModal, setOpenSelectWalletModal] = useState(false);

  return (
    <Container
      ref={containerRef}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <PopupNote show={!isLoggedIn && visible} position={position} zIndex="201">
        Login
      </PopupNote>
      <AccountBtn
        onClick={isLoggedIn ? handleLoginClick : () => setOpenSelectWalletModal(true)}
        isLoggedIn={isLoggedIn}
      >
        <Sprite
          icon={isLoggedIn ? ICON_NAMES.ACCOUNT : ICON_NAMES.KEY}
          color={theme.FONT_NAV}
          size="20px"
        />
      </AccountBtn>
      {isLoggedIn && (
        <PopupNote show={showPopup} position={position} delay={0} zIndex="201">
          <PopupTxt>You are currently logged in as</PopupTxt>
          <PopupTxt>
            <Link to={`/accounts/${walletConnectState.address}`}>
              {isMobile
                ? maxLength(walletConnectState.address, 11, '3')
                : walletConnectState.address}
            </Link>
          </PopupTxt>
          <LogoutButton
            color="secondary"
            onClick={handleLogoutFigureWallet}
            icon={ICON_NAMES.LOGOUT}
          >
            Sign Out
          </LogoutButton>
        </PopupNote>
      )}
      <Modal isOpen={openSelectWalletModal} onClose={() => setOpenSelectWalletModal(false)}>
        <div>
          <ModalTitle>Select a Wallet Provider</ModalTitle>
          <ModalContent>
            <ModalWalletButton
              onClick={() => {
                setOpenSelectWalletModal(false);
                connect();
              }}
            >
              <WalletTitle>Cosmos Wallets</WalletTitle>
              <img src="/PB_Logo_Color_Dark.png" alt="Provenance Wallets" />
            </ModalWalletButton>
            <ModalWalletButton
              onClick={() => {
                setOpenSelectWalletModal(false);
                wcs.connect();
              }}
            >
              <WalletTitle>Figure Wallet</WalletTitle>
              <img src={figureWallet} alt="Figure Wallet" />
            </ModalWalletButton>
          </ModalContent>
        </div>
      </Modal>
      <QRCodeModal
        walletConnectService={wcs}
        title="Scan the QRCode with your mobile Provenance Blockchain Wallet."
        className="QR-Code-Modal"
        devWallets={[
          'figure_mobile_test',
          'figure_hosted_test',
          // @ts-ignore
          'provenance_extension',
          // @ts-ignore
          'provenance_mobile',
        ]}
        hideWallets={isProd ? ['figure_hosted_test'] : ['figure_hosted']}
      />
    </Container>
  );
};

export default UserAccount;
