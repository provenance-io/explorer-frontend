import React from 'react';
import styled from 'styled-components';
import { breakpoints, isProd } from '../../../consts';

const NavigationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  height: 100%;
  width: 100%;
  min-height: 1.5rem;
  padding: 0 10% 0 9%;
  background: ${({ theme }) => theme.CHART_PIE_L};
  border: ${({ theme }) => theme.BACKGROUND_NAV};
  @media ${breakpoints.down('lg')} {
    padding: 0 4% 0 2%;
  }
  @media ${breakpoints.down('md')} {
    min-height: 40px;
  }
`;

const EOLBanner = () => (
  <NavigationWrapper>
    <span style={{ fontSize: '0.7rem' }}>
      Provenance Explorer End of Life will be 22 May 2026. Please begin moving to{' '}
      <a
        href={`https://zonescan.io/${isProd ? 'provenance' : 'provenancetestnet'}/overview`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: 'underline', textAlign: 'center', color: 'white' }}
      >
        Zonescan
      </a>
      .
    </span>
  </NavigationWrapper>
);

export default EOLBanner;
