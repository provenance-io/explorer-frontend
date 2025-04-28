import { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { wallets as leapExtension } from '@cosmos-kit/leap-extension';
import { wallets as arculus } from '@cosmos-kit/arculus';
import { wallets as keplr } from '@cosmos-kit/keplr';
import { QRCodeModal, useWalletConnect } from '@provenanceio/walletconnect-js';
import { Link as BaseLink } from 'react-router-dom';
// @ts-ignore
import useOnClickOutside from 'react-tiny-hooks/use-on-click-outside';
// @ts-ignore
import useOnEscape from 'react-tiny-hooks/use-on-escape';
// @ts-ignore
import useToggle from 'react-tiny-hooks/use-toggle';
import { useChain } from '@cosmos-kit/react';
import { cosmos } from '@provlabs/provenancejs';
import { maxLength } from '../../utils';
import { signJWT } from '../../utils/jwt';
import { CHAIN_NAME } from '../../config';
import { breakpoints, ICON_NAMES, isProd } from '../../consts';
import { useApp } from '../../redux/hooks';
import { PopupNote } from '../../Components/PopupNote';
import Button from '../Button';
import Sprite from '../Sprite';
import Modal from '../../Components/Modal';
import figureWallet from '../../assets/figureMobileWalletIcon.png';

const Container = styled.div`
  position: relative;
`;

const AccountBtn = styled(Button) <{ isLoggedIn?: boolean }>`
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
  const { isLoggedIn, setIsLoggedIn, setWalletAddress, setAuthToken, authToken, setWalletUrl } = useApp();
  const theme = useTheme();
  const position = isMobile ? 'above' : 'left';
  const [visible, setVisible] = useState(false);

  const [showPopup, toggleShowPopup, , deactivateShowPopup] = useToggle();
  const containerRef = useOnClickOutside(deactivateShowPopup);
  useOnEscape(deactivateShowPopup);
  // This is the old Figure Wallet stuff
  const { walletConnectService: wcs, walletConnectState } = useWalletConnect();
  //  This is Cosmos Kit wallets (Leap, Keplr, Arculus) 
  const {
    status,
    connect,
    address,
    signArbitrary,
    isWalletDisconnected,
    wallet,
    getSigningStargateClient,
    getAccount,
  } = useChain(CHAIN_NAME);
  const provJWT = localStorage.getItem('provenanceJWT');
  const jwtInfo = provJWT ? JSON.parse(provJWT) : '';
  const signedJWT = jwtInfo.expires < Date.now() / 1000 ? '' : jwtInfo.jwt;

  console.dir(wallet);

  useEffect(() => {
    if (isWalletDisconnected && !walletConnectState.connected) {
      localStorage.removeItem('provenanceJWT');
      setIsLoggedIn(false);
      setWalletAddress('');
    }
  }, [setAuthToken, setWalletAddress, status, isWalletDisconnected, setIsLoggedIn, walletConnectState]);

  useEffect(() => {
    if (jwtInfo && jwtInfo.expires < Date.now() / 1000) {
      localStorage.removeItem('provenanceJWT');
      setWalletAddress('');
      setIsLoggedIn(false);
    }
  }, [jwtInfo, setIsLoggedIn, setWalletAddress]);

  useEffect(() => {
    if (signedJWT && status === 'Connected') {
      setAuthToken(signedJWT);
    }
  }, [setAuthToken, signedJWT, status]);

  useEffect(() => {
    setIsLoggedIn(status === 'Connected' || walletConnectState.status === 'connected');
    if (address || walletConnectState.address) {
      setWalletAddress(address || walletConnectState.address);
    }
  }, [status, address, setIsLoggedIn, setWalletAddress, walletConnectState]);

  // This only occurs when connecting to Cosmos Kit wallets 
  useEffect(() => {
    const initialSigningEvent = async () => {
      if (
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
    // Currently supported Cosmos Kit wallets - this is gross because each new wallet will need to be added here
    if (wallet?.name.includes('leap') || wallet?.name.includes('arculus') || wallet?.name.includes('keplr')) {
      connect()
    } else {
      toggleShowPopup();
      wcs.connect();
    }
  };

  const handleLogoutFigureWallet = () => {
    setWalletAddress('')
    setWalletUrl('')
    setIsLoggedIn(false)
    wcs.disconnect();
    setVisible(false);
  }

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
              {isMobile ? maxLength(walletConnectState.address, 11, '3') : walletConnectState.address}
            </Link>
          </PopupTxt>
          <LogoutButton color="secondary" onClick={handleLogoutFigureWallet} icon={ICON_NAMES.LOGOUT}>
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
              <WalletTitle>Leap Wallet</WalletTitle>
              <img src={leapExtension[0].walletInfo.logo as string} alt="Leap Wallet" />
            </ModalWalletButton>
            <ModalWalletButton
              onClick={() => {
                setOpenSelectWalletModal(false);
                connect();
              }}
            >
              <WalletTitle>Arculus</WalletTitle>
              <img src={arculus[0].walletInfo.logo as string} alt="Arculus" />
            </ModalWalletButton>
            <ModalWalletButton
              onClick={() => {
                setOpenSelectWalletModal(false);
                connect();
              }}
            >
              <WalletTitle>Keplr</WalletTitle>
              <img src={keplr[0].walletInfo.logo as string} alt="Keplr" />
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
