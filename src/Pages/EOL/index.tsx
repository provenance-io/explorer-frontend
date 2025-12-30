import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { breakpoints } from '../../consts';
import { Wrapper } from '../../Components';

const TitleDiv = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  width: 100%;
  height: 100%;
  font-size: 1.5rem;
  font-weight: bold;
  padding-bottom: 2rem;
  text-align: center;
`;

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  text-align: center;
  padding-bottom: 2rem;
  gap: 1rem;
  @media ${breakpoints.up('md')} {
    flex-direction: row;
    justify-content: center;
    align-content: center;
  }
`;

const ExternalLink = styled.a`
  align-items: center;
  color: ${({ theme, color }) => theme[`BUTTON_${color}_FONT`]};
  background: ${({ theme, color }) => theme[`BUTTON_${color}`]};
  border-radius: 4px;
  border: 1px solid ${({ theme, color }) => theme[`BUTTON_${color}`]};
  padding: 6px 12px;
  font-size: 0.875rem;
  width: fit-content;
  cursor: pointer;
  &:focus {
    background: ${({ theme, color }) => theme[`BUTTON_${color}_FOCUS`]};
    border-color: ${({ theme, color }) => theme[`BUTTON_${color}_FOCUS`]};
  }
  &:hover {
    background: ${({ theme, color }) => theme[`BUTTON_${color}_HOVER`]};
    border-color: ${({ theme, color }) => theme[`BUTTON_${color}_FOCUS`]};
  }
  &:active {
    background: ${({ theme, color }) => theme[`BUTTON_${color}_ACTIVE`]};
    border-color: ${({ theme, color }) => theme[`BUTTON_${color}_FOCUS`]};
  }
  &:disabled {
    background: ${({ theme }) => theme.BUTTON_DISABLED};
    cursor: not-allowed;
    border-color: ${({ theme }) => theme.BUTTON_DISABLED};
  }
`;

const Ul = styled.ul`
  text-align: start;
  font-size: 0.7rem;
`;

const Li = styled.li`
  text-align: start;
  font-size: 0.7rem;
`;

export default function EOL() {
  return (
    <Wrapper noHeader>
      <Helmet>
        <title>Provenance Blockchain Explorer - End of Life Announcement</title>
      </Helmet>
      <TitleDiv>Provenance Explorer has reached its End of Life</TitleDiv>
      <Div>
        Explorer services are now provided by Zonescan, Ping, Provenance Pulse, and the Figure
        Markets app
      </Div>
      <Div>
        <ExternalLink
          href="https://zonescan.io/provenance/overview"
          target="_blank"
          rel="noopener noreferrer"
          color="primary"
        >
          Visit Zonescan
        </ExternalLink>
        <ExternalLink
          href=" https://ping.pub/provenance "
          target="_blank"
          rel="noopener noreferrer"
          color="primary"
        >
          Visit Ping
        </ExternalLink>
        <ExternalLink
          href="https://www.provenance.io/pulse"
          target="_blank"
          rel="noopener noreferrer"
          color="primary"
        >
          Visit Pulse
        </ExternalLink>
        <ExternalLink
          href="https://www.figuremarkets.com/"
          target="_blank"
          rel="noopener noreferrer"
          color="primary"
        >
          Visit Figure Markets
        </ExternalLink>
      </Div>
      <Div style={{ paddingTop: '1rem', fontSize: '0.7rem' }}>
        Governance and Delegations actions remain supported through other applications
        <Ul>
          <Li>Governance voting supported by Ping and Provenance Pulse.</Li>
          <Li>
            Delegation supported by Ping, Zonescan, Provenance Pulse, and the Figure Markets app
          </Li>
        </Ul>
      </Div>
    </Wrapper>
  );
}
