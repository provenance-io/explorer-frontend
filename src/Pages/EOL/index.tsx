import { Helmet } from 'react-helmet';
import styled from 'styled-components';
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
  align-content: center;
  width: 100%;
  height: 100%;
  text-align: center;
  padding-bottom: 2rem;
  gap: 1rem;
`;

const ExternalLink = styled.a`
  align-items: center;
  color: ${({ theme, color }) => theme[`BUTTON_${color}_FONT`]};
  background: ${({ theme, color }) => theme[`BUTTON_${color}`]};
  border-radius: 4px;
  border: 1px solid ${({ theme, color }) => theme[`BUTTON_${color}`]};
  padding: 6px 12px;
  font-size: 0.875rem;
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

export default function EOL() {
  return (
    <Wrapper noHeader>
      <Helmet>
        <title>Provenance Blockchain Explorer - End of Life Announcement</title>
      </Helmet>
      <TitleDiv>Provenance Explorer has reached its End of Life</TitleDiv>
      <Div>Explorer services are now provided by Zonescan and Provenance Pulse</Div>
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
          href="https://www.provenance.io/pulse"
          target="_blank"
          rel="noopener noreferrer"
          color="primary"
        >
          Visit Pulse
        </ExternalLink>
      </Div>
    </Wrapper>
  );
}
