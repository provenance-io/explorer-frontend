import { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
// @ts-ignore
import useOnClickOutside from 'react-tiny-hooks/use-on-click-outside';
// @ts-ignore
import useOnEscape from 'react-tiny-hooks/use-on-escape';
// @ts-ignore
import useToggle from 'react-tiny-hooks/use-toggle';
import { useChain } from '@cosmos-kit/react';
import { CHAIN_NAME } from '../../config';
import { ICON_NAMES } from '../../consts';
import { useApp } from '../../redux/hooks';
import { PopupNote } from '../../Components/PopupNote';
import Button from '../Button';
import Sprite from '../Sprite';

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

const UserAccount = ({ isMobile }: { isMobile: boolean }) => {
  const { isLoggedIn, setIsLoggedIn, setWalletAddress } = useApp();
  const theme = useTheme();
  const position = isMobile ? 'above' : 'left';
  const [visible, setVisible] = useState(false);

  const [, , , deactivateShowPopup] = useToggle();
  const containerRef = useOnClickOutside(deactivateShowPopup);
  useOnEscape(deactivateShowPopup);

  const { status, connect, address } = useChain(CHAIN_NAME);

  useEffect(() => {
    setIsLoggedIn(status === 'Connected');
    if (address) {
      setWalletAddress(address);
    }
  }, [status, setIsLoggedIn, address, setWalletAddress]);

  const handleLoginClick = () => {
    connect();
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
    </Container>
  );
};

export default UserAccount;
