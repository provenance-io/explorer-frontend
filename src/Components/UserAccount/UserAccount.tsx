import { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
// @ts-ignore
import useOnClickOutside from 'react-tiny-hooks/use-on-click-outside';
// @ts-ignore
import useOnEscape from 'react-tiny-hooks/use-on-escape';
// @ts-ignore
import useToggle from 'react-tiny-hooks/use-toggle';
import { useChain } from '@cosmos-kit/react';
import { cosmos } from '@provlabs/provenancejs';
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

  const [, , , deactivateShowPopup] = useToggle();
  const containerRef = useOnClickOutside(deactivateShowPopup);
  useOnEscape(deactivateShowPopup);

  const { status, connect, address, signArbitrary, getSigningStargateClient, getAccount, wallet } =
    useChain(CHAIN_NAME);
  const { setAuthToken, authToken } = useApp();
  const provJWT = localStorage.getItem('provenanceJWT');
  const jwtInfo = provJWT ? JSON.parse(provJWT) : '';
  const signedJWT = jwtInfo.expires < Date.now() / 1000 ? '' : jwtInfo.jwt;

  useEffect(() => {
    if (status === 'Disconnected') {
      localStorage.removeItem('provenanceJWT');
      setIsLoggedIn(false);
      setAuthToken('');
      setWalletAddress('');
    }
  }, [setAuthToken, setWalletAddress, status, setIsLoggedIn]);

  useEffect(() => {
    if (jwtInfo && jwtInfo.expires < Date.now() / 1000) {
      localStorage.removeItem('provenanceJWT');
      setIsLoggedIn(false);
      setAuthToken('');
      setWalletAddress('');
    }
  }, [jwtInfo, setAuthToken, setIsLoggedIn, setWalletAddress]);

  useEffect(() => {
    if (signedJWT) {
      setAuthToken(signedJWT);
    }
  }, [setAuthToken, signedJWT]);

  useEffect(() => {
    setIsLoggedIn(status === 'Connected');
    if (address) {
      setWalletAddress(address);
    }
  }, [status, address, setIsLoggedIn, setWalletAddress]);

  // This is the effect that signs the local JWT to access the explorer service
  useEffect(() => {
    const initialSigningEvent = async () => {
      if (
        !authToken &&
        status === 'Connected' &&
        address &&
        wallet &&
        !localStorage.getItem('provenanceJWT')
      ) {
        let publicKey = '';
        let signature = '';
        if (wallet.name === 'leap-extension') {
          const response = await signArbitrary(address, 'Approve the connection to Provenance');
          signature = response.signature;
          publicKey = response.pub_key.value;
        } else {
          const client = await getSigningStargateClient();
          const account = await getAccount();
          const signed = await client.sign(
            address,
            [
              {
                typeUrl: '/cosmos.bank.v1beta1.MsgSend',
                value: {
                  fromAddress: '',
                  toAddress: '',
                  amount: [
                    {
                      amount: '0',
                      denom: 'nhash',
                    },
                  ],
                },
              },
            ],
            {
              amount: [
                {
                  amount: '0',
                  denom: 'nhash',
                },
              ],
              gas: '0',
            },
            'Approve the connection to Provenance. Because the signArbitrary method is not supported by Leap, signing into your account will cost a small amount of hash. We are working to resolve this issue.'
          );
          publicKey = cosmos.crypto.ed25519.PubKey.toAmino({ key: account.pubkey }).key as string;
          signature = (cosmos.tx.v1beta1.TxRaw.toAmino(signed).signatures ? [0] : '') as string;
        }
        if (publicKey && signature) {
          const jwtResponse = await signJWT({
            address,
            publicKey,
            signature,
          });
          if (jwtResponse) {
            localStorage.setItem(
              'provenanceJWT',
              JSON.stringify({
                jwt: jwtResponse.result.signedJWT,
                expires: jwtResponse.result.expires,
              })
            );
            setAuthToken(jwtResponse.result.signedJWT);
          }
        }
      }
    };
    initialSigningEvent();
  }, [
    address,
    authToken,
    getAccount,
    getSigningStargateClient,
    setAuthToken,
    signArbitrary,
    signedJWT,
    status,
    wallet,
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
