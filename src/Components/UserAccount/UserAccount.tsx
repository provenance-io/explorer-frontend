import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { useTheme } from 'styled-components';
import { Link as BaseLink } from 'react-router-dom';
import { QRCodeModal, useWalletConnect } from '@provenanceio/walletconnect-js';
// @ts-ignore
import useOnClickOutside from 'react-tiny-hooks/use-on-click-outside';
// @ts-ignore
import useOnEscape from 'react-tiny-hooks/use-on-escape';
// @ts-ignore
import useToggle from 'react-tiny-hooks/use-toggle';
import { breakpoints, ICON_NAMES, isProd } from 'consts';
import { useApp } from 'redux/hooks';
import { maxLength } from 'utils';
import { PopupNote } from 'Components/PopupNote';
import Button from '../Button';
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

const AccountBtn = styled(Button)<{ isLoggedIn?: boolean }>`
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

const UserAccount = ({ isMobile }: { isMobile: boolean }) => {
  const { isLoggedIn, setWalletUrl, setIsLoggedIn } = useApp();
  const { walletConnectService: wcs, walletConnectState } = useWalletConnect();
  const { status, address } = walletConnectState;
  const theme = useTheme();
  const position = isMobile ? 'above' : 'left';
  const [visible, setVisible] = useState(false);

  const [showPopup, toggleShowPopup, , deactivateShowPopup] = useToggle();
  const containerRef = useOnClickOutside(deactivateShowPopup);
  useOnEscape(deactivateShowPopup);

  useEffect(() => {
    setIsLoggedIn(status === 'connected');
  }, [status, setIsLoggedIn]);

  const handleLogout = () => {
    setWalletUrl('');
    wcs.disconnect();
    // Don't show Login prompt again
    setVisible(false);
  };

  const handleLoginClick = () => {
    toggleShowPopup();
    wcs.connect();
  };

  return (
    <Container
      ref={containerRef}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <PopupNote show={!isLoggedIn && visible} position={position} zIndex="201">
        Login
      </PopupNote>
      <AccountBtn onClick={handleLoginClick} isLoggedIn={isLoggedIn}>
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
            <Link to={`/accounts/${address}`}>
              {isMobile ? maxLength(address, 11, '3') : address}
            </Link>
          </PopupTxt>
          <LogoutButton color="secondary" onClick={handleLogout} icon={ICON_NAMES.LOGOUT}>
            Sign Out
          </LogoutButton>
        </PopupNote>
      )}
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

UserAccount.propTypes = {
  isMobile: PropTypes.bool,
};

UserAccount.defaultProps = {
  isMobile: false,
};

export default UserAccount;
