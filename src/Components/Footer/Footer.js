import { useEffect } from 'react';
import styled from 'styled-components';
import { useApp } from 'redux/hooks';
import { Link } from 'react-router-dom';
import {
  breakpoints,
  SOCIAL_GITHUB_URL,
  SOCIAL_DISCORD_URL,
  SOCIAL_PROVENANCE_URL,
  isProd,
} from 'consts';
import Sprite from '../Sprite';
import { version } from '../../../package.json';

const FooterContainer = styled.footer`
  padding: 20px 50px;
  background: ${({ theme }) => theme.BACKGROUND_NAV};
  color: ${({ theme }) => theme.FONT_SECONDARY};
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: space-between;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  flex-wrap: wrap;
  @media ${breakpoints.down('md')} {
    justify-content: center;
  }
  @media ${breakpoints.down('sm')} {
    padding: 10px;
  }
`;

const FooterData = styled.div`
  @media ${breakpoints.down('md')} {
    flex-basis: 100%;
    text-align: center;
  }
`;

const FooterSocial = styled.div`
  display: flex;
  align-items: center;
  @media ${breakpoints.down('md')} {
    flex-basis: 100%;
    text-align: center;
    justify-content: center;
  }
`;
const SocialLink = styled.a`
  display: block;
  margin: 4px;
  svg {
    display: block;
  }
`;
const FooterVersion = styled.div`
  margin-left: 25px;
`;

const Footer = () => {
  const { getChaincodeID, chaincodeId } = useApp();

  useEffect(() => {
    if (!chaincodeId) {
      getChaincodeID();
    }
  }, [chaincodeId, getChaincodeID]);

  return (
    <FooterContainer>
      <FooterData>Provenance Blockchain Explorer</FooterData>
      <FooterData>
        Chain ID: {chaincodeId}
        {!isProd && (
          <>
            {' '}
            |{' '}
            <Link to="/faucet" title={`${chaincodeId} faucet`}>
              Faucet
            </Link>
          </>
        )}
      </FooterData>
      <FooterSocial>
        <SocialLink
          href={SOCIAL_PROVENANCE_URL}
          target="_blank"
          rel="noreferrer"
          title="Visit Provenance"
        >
          <Sprite icon="PROVENANCE" size="1.8rem" color="WHITE" />
        </SocialLink>
        <SocialLink
          href={SOCIAL_GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          title="Provenance Explorer GitHub"
        >
          <Sprite icon="GITHUB" size="1.8rem" color="WHITE" />
        </SocialLink>
        <SocialLink
          href={SOCIAL_DISCORD_URL}
          target="_blank"
          rel="noreferrer"
          title="Provenance Explorer Discord"
        >
          <Sprite icon="DISCORD" size="1.8rem" color="WHITE" />
        </SocialLink>
        <FooterVersion>v{version ? version : '?.?.?'}</FooterVersion>
      </FooterSocial>
    </FooterContainer>
  );
};

export default Footer;
