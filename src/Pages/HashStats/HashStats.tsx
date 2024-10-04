// @ts-nocheck
import styled from 'styled-components';
import { Section } from 'Components';
import { HashDashboard, PriceHistory } from 'Pages/Dashboard/Components';

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1050;
  background-color: white;
`;

export const HashStats = () => (
  <Background>
    <Section>
      <HashDashboard />
      <PriceHistory />
    </Section>
  </Background>
);
