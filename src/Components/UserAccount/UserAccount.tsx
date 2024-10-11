import { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
// @ts-ignore
import useOnClickOutside from 'react-tiny-hooks/use-on-click-outside';
// @ts-ignore
import useOnEscape from 'react-tiny-hooks/use-on-escape';
// @ts-ignore
import useToggle from 'react-tiny-hooks/use-toggle';
import { useChain } from '@cosmos-kit/react';
import { signJWT } from '../../utils/jwt';
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
  const [publicKey, setPublicKey] = useState<string>();
  const [signature, setSignature] = useState<string>();

  const [, , , deactivateShowPopup] = useToggle();
  const containerRef = useOnClickOutside(deactivateShowPopup);
  useOnEscape(deactivateShowPopup);

  const { status, connect, address, signArbitrary } = useChain(CHAIN_NAME);
  const { setAuthToken, authToken } = useApp();
  const provJWT = localStorage.getItem('provenanceJWT');
  const jwtInfo = provJWT ? JSON.parse(provJWT) : '';
  const signedJWT = jwtInfo.expires < Date.now() / 1000 ? '' : jwtInfo.jwt;

  useEffect(() => {
    if (status === 'Disconnected') {
      setAuthToken('');
      localStorage.removeItem('provenanceJWT');
      setWalletAddress('');
    }
  }, [setAuthToken, setWalletAddress, status]);

  useEffect(() => {
    if (jwtInfo && jwtInfo.expires < Date.now() / 1000) {
      localStorage.removeItem('provenanceJWT');
    }
  });

  useEffect(() => {
    if (signedJWT) {
      setAuthToken(signedJWT);
    }
  });

  useEffect(() => {
    setIsLoggedIn(status === 'Connected');
    if (address) {
      setWalletAddress(address);
    }
    if (!authToken && !signedJWT && status === 'Connected' && address) {
      if (!publicKey || !signature) {
        signArbitrary(address, 'Approve the connection to Provenance').then((c) => {
          setPublicKey(c.pub_key.value);
          setSignature(c.signature);
        });
      }
      if (publicKey && signature) {
        signJWT({
          address,
          signature,
          publicKey,
        }).then((res) => {
          localStorage.setItem(
            'provenanceJWT',
            JSON.stringify({ jwt: res.result.signedJWT, expires: res.result.expires })
          );
          setAuthToken(res.result.signedJWT);
        });
      }
    }
  }, [
    status,
    setIsLoggedIn,
    address,
    setWalletAddress,
    authToken,
    signedJWT,
    publicKey,
    signature,
    signArbitrary,
    setAuthToken,
  ]);

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
