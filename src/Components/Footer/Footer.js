import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useApp } from 'redux/hooks';
import { breakpoints, SOCIAL_GITHUB_URL, SOCIAL_DISCORD_URL, SOCIAL_PROVENANCE_URL } from 'consts';
import Sprite from '../Sprite';
import { version } from '../../../package.json';

const FooterContainer = styled.footer`
  padding: 20px 50px;
  background: ${({ theme }) => theme.BACKGROUND_NAV};
  color: ${({ theme }) => theme.FONT_SECONDARY};
  display: flex;
  position: absolute;
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
  a {
    display: block;
  }
  @media ${breakpoints.down('md')} {
    flex-basis: 100%;
    text-align: center;
    justify-content: center;
  }
`;
const SocialIcon = styled(Sprite)`
  margin: 4px;
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
        Chain ID: {chaincodeId} |{' '}
        <a href="/explorer/faucet" title={`${chaincodeId} faucet`}>
          Faucet
        </a>
      </FooterData>
      <FooterSocial>
        <a href={SOCIAL_PROVENANCE_URL} target="_blank" rel="noreferrer" title="Visit Provenance">
          <SocialIcon icon="PROVENANCE" size="1.8rem" color="WHITE" />
        </a>
        <a href={SOCIAL_GITHUB_URL} target="_blank" rel="noreferrer" title="Provenance Explorer GitHub">
          <SocialIcon icon="GITHUB" size="1.8rem" color="WHITE" />
        </a>
        <a href={SOCIAL_DISCORD_URL} target="_blank" rel="noreferrer" title="Provenance Explorer Discord">
          <SocialIcon icon="DISCORD" size="1.8rem" color="WHITE" />
        </a>
        <FooterVersion>v{version ? version : '?.?.?'}</FooterVersion>
      </FooterSocial>
    </FooterContainer>
  );
};

export default Footer;
