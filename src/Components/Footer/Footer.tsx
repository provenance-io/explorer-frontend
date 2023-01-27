import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  breakpoints,
  SOCIAL_GITHUB_URL,
  // SOCIAL_SLACK_URL,
  SOCIAL_PROVENANCE_URL,
  SOCIAL_DISCORD_URL,
  isProd,
} from '../../consts';
import { useGetChaincodeIdQuery } from '../../redux/services';
import { Loading, Sprite } from '..';
import packageInfo from '../../../package.json';

const { version } = packageInfo;

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

export const Footer = () => {
  const {
    data: chaincodeId,
    isLoading: chaincodeIdLoading,
    isFetching: chaincodeIdFetching,
  } = useGetChaincodeIdQuery();

  return !chaincodeIdLoading && !chaincodeIdFetching ? (
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
          title="Visit Provenance Blockchain"
        >
          <Sprite icon="PROVENANCE" size="1.8rem" color="WHITE" />
        </SocialLink>
        <SocialLink
          href={SOCIAL_GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          title="Provenance Blockchain Explorer GitHub"
        >
          <Sprite icon="GITHUB" size="1.8rem" color="WHITE" />
        </SocialLink>
        {/* <SocialLink
          href={SOCIAL_SLACK_URL}
          target="_blank"
          rel="noreferrer"
          title="Join Provenance.io on Slack"
        >
          <Sprite icon="SLACK" size="1.8rem" color="WHITE" />
        </SocialLink> */}
        <SocialLink
          href={SOCIAL_DISCORD_URL}
          target="_blank"
          rel="noreferrer"
          title="Provenance Blockchain Explorer Discord"
        >
          <Sprite icon="DISCORD" size="2.2rem" color="WHITE" />
        </SocialLink>
        <FooterVersion>v{version ? version : '?.?.?'}</FooterVersion>
      </FooterSocial>
    </FooterContainer>
  ) : (
    <Loading />
  );
};
