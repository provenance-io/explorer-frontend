// @ts-nocheck
import styled, { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from 'theme';
import { useColorScheme } from 'redux/hooks';
import { Section, Content, Wrapper, Footer, SpriteSheet, BaseStyle } from 'Components';

const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  padding: 100px 0;
`;
const GiantText = styled.div`
  font-size: 5rem;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT_BOLDEST};
  color: ${({ theme }) => theme.FONT_PRIMARY};
  flex-basis: 100%;
  text-align: center;
`;
const InfoText = styled.div`
  font-size: 2rem;
  color: ${({ theme }) => theme.FONT_TITLE_INFO};
  margin: 40px 150px;
  flex-basis: 100%;
  line-height: 45px;
  text-align: center;
`;

export const Maintenance = () => {
  const { activeTheme } = useColorScheme();
  return (
    <>
      <BrowserRouter basename={process.env.PUBLIC_URL || ''}>
        <GlobalStyle theme={activeTheme} />
        <SpriteSheet />
        <ThemeProvider theme={activeTheme}>
          <BaseStyle>
            <Wrapper noHeader>
              <Section>
                <Content>
                  <TextWrapper>
                    <GiantText>Explorer under maintenance</GiantText>
                    <InfoText>
                      Provenance Blockchain Explorer is currently undergoing maintenance, and will
                      be back online shortly. Thank you for your patience.
                    </InfoText>
                    <InfoText>
                      Please visit{' '}
                      <a
                        href={'https://www.mintscan.io/provenance'}
                        target="_blank"
                        rel="noreferrer"
                      >
                        mintscan
                      </a>{' '}
                      or{' '}
                      <a href={'https://ping.pub/provenance'} target="_blank" rel="noreferrer">
                        ping.pub
                      </a>{' '}
                      for information on Provenance Blockchain activity during this time.
                    </InfoText>
                  </TextWrapper>
                </Content>
              </Section>
            </Wrapper>
            <Footer />
          </BaseStyle>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
};
