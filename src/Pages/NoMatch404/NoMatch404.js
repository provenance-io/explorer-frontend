import styled from 'styled-components';

import { useHistory } from 'react-router-dom';
import { Section, Content, Wrapper } from 'Components';

const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  padding: 100px 0;
`;
const GiantText = styled.div`
  font-size: 10rem;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT_BOLDEST};
  color: ${({ theme }) => theme.FONT_PRIMARY};
  flex-basis: 100%;
  text-align: center;
`;
const InfoText = styled.div`
  font-size: 2rem;
  color: ${({ theme }) => theme.FONT_TITLE_INFO};
  margin: 40px 0;
  flex-basis: 100%;
  text-align: center;
`;
const BackButtonWrapper = styled.div`
  background: ${({ theme }) => theme.BUTTON_PRIMARY};
  border-radius: 10px;
  padding: 10px 30px;
  cursor: pointer;
`;
const BackButtonText = styled.div`
  color: ${({ theme }) => theme.FONT_WHITE};
`;

const NoMatch404 = () => {
  const { goBack } = useHistory();

  return (
    <Wrapper>
      <Section>
        <Content>
          <TextWrapper>
            <GiantText>404</GiantText>
            <InfoText>Seems like you've taken a wrong path somewhere, this page doesn't exist.</InfoText>
            <BackButtonWrapper onClick={goBack}>
              <BackButtonText>Back</BackButtonText>
            </BackButtonWrapper>
          </TextWrapper>
        </Content>
      </Section>
    </Wrapper>
  );
};

export default NoMatch404;
