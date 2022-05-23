import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { useTheme } from 'styled-components';
import { Link as BaseLink } from 'react-router-dom';
import { useWallet } from '@provenanceio/wallet-lib';
import useOnClickOutside from 'react-tiny-hooks/use-on-click-outside';
import useOnEscape from 'react-tiny-hooks/use-on-escape';
import useToggle from 'react-tiny-hooks/use-toggle';
import { breakpoints, FIGURE_WALLET_URL, ICON_NAMES, PROVENANCE_WALLET_URL } from 'consts';
import { useApp, useWalletLogin } from 'redux/hooks';
import { maxLength } from 'utils';
import Button from '../Button';
import PopupNote from '../PopupNote';
import Sprite from '../Sprite';

const Container = styled.div`
  position: relative;
`;

const PopupTxt = styled.p`
  text-align: center;

  @media ${breakpoints.up('md')} {
    white-space: nowrap;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  @media ${breakpoints.up('md')} {
    flex-direction: row;
  }
`;

const WalletBtn = styled(Button)`
  margin: 0 auto;

  &:last-child {
    margin-top: 10px;
  }

  @media ${breakpoints.up('md')} {
    margin: 0;

    &:last-child {
      margin-top: 0;
      margin-left: 10px;
    }
  }
`;

const AccountBtn = styled(Button)`
  border: none;
  background: none;
  /* animate.css @keyframe */
  animation: heartBeat;
  animation-duration: 1s;
  animation-delay: 2s;
  animation-iteration-count: ${({ isLoggedIn }) => (isLoggedIn ? 0 : 2)};
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

const UserAccount = ({ isMobile }) => {
  const { walletService } = useWallet();
  useWalletLogin(walletService);
  const { isLoggedIn, setWalletUrl, setIsLoggedIn } = useApp();
  const [showPopup, toggleShowPopup, , deactivateShowPopup] = useToggle();
  const containerRef = useOnClickOutside(deactivateShowPopup);
  const theme = useTheme();
  const position = isMobile ? 'below' : 'left';
  const [visible, setVisible] = useState(false);

  useOnEscape(deactivateShowPopup);

  useEffect(() => {
    setIsLoggedIn(!!walletService.state.address);
  }, [walletService.state.address, setIsLoggedIn]);

  const handleLogout = () => {
    setWalletUrl('');
    walletService.disconnect();
    walletService.updateState();
  };

  const handleConnect = url => {
    setWalletUrl(url);
    walletService.setWalletUrl(url);
    walletService.connect();
  };

  return (
    <Container
      ref={containerRef}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <PopupNote show={visible} position="left" zIndex="201">
        Login
      </PopupNote>
      <AccountBtn onClick={toggleShowPopup} isLoggedIn={isLoggedIn}>
        <Sprite
          icon={isLoggedIn ? ICON_NAMES.ACCOUNT : ICON_NAMES.KEY}
          color={theme.FONT_NAV}
          size="20px"
        />
      </AccountBtn>

      {isLoggedIn && (
        <PopupNote show={showPopup} position={position} delay={0}>
          <PopupTxt>You are currently logged in as</PopupTxt>
          <PopupTxt>
            <Link to={`/accounts/${walletService.state.address}`}>
              {isMobile
                ? maxLength(walletService.state.address, 11, 3)
                : walletService.state.address}
            </Link>
          </PopupTxt>
          <LogoutButton color="secondary" onClick={handleLogout} icon={ICON_NAMES.LOGOUT}>
            Sign Out
          </LogoutButton>
        </PopupNote>
      )}

      {!isLoggedIn && (
        <PopupNote show={showPopup} position={position} delay={0}>
          <PopupTxt>Select a wallet provider to connect</PopupTxt>
          <ButtonGroup>
            <WalletBtn
              onClick={() => handleConnect(PROVENANCE_WALLET_URL)}
              color="secondary"
              icon={ICON_NAMES.PROVENANCE}
              iconColor={theme.FONT_NAV}
              iconSize="20px;"
            >
              Provenance Blockchain Wallet
            </WalletBtn>

            <WalletBtn
              onClick={() => handleConnect(FIGURE_WALLET_URL)}
              color="secondary"
              icon={ICON_NAMES.FIGURE}
              iconColor={theme.FONT_NAV}
              iconSize="20px;"
            >
              Figure Wallet
            </WalletBtn>
          </ButtonGroup>
        </PopupNote>
      )}
    </Container>
  );
};

UserAccount.propTypes = {
  isMobile: PropTypes.bool,
};

UserAccount.defaultProps = {
  isMobile: false,
};

export default UserAccount;
