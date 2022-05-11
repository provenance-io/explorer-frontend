import React from 'react';
import styled from 'styled-components';
import { breakpoints } from 'consts';

const PageWrapper = styled.div<{ noHeader: boolean }>`
  padding: 106px 10%;
  position: relative;
  background-color: transparent;
  font-size: 1.4rem;
  @media ${breakpoints.down('lg')} {
    padding: ${({ noHeader }) => (noHeader ? '68px 10%' : '96px 10%')};
  }
  @media ${breakpoints.down('md')} {
    padding: ${({ noHeader }) => (noHeader ? '96px 4%' : '110px 4%')};
  }
`;

interface WrapperProps {
  children?: React.ReactNode | null;
  noHeader?: boolean;
}

const Wrapper = ({ children = null, noHeader = false }: WrapperProps) => (
  <PageWrapper noHeader={noHeader}>{children}</PageWrapper>
);

export default Wrapper;